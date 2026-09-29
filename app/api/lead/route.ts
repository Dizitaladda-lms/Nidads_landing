import { NextResponse } from 'next/server';

const CRM_ENDPOINT = process.env.CRM_ENDPOINT || 'https://leads.dizitaladda.com/api/public/leads';
const CRM_COURSE_NAME = process.env.CRM_COURSE_NAME || 'Data Science & AI Bootcamp';
const CRM_DOMAIN = process.env.CRM_DOMAIN || 'NIDADS';
const CRM_API_KEY = process.env.CRM_API_KEY || '';

// Rate Limiter: Max 2 leads per 1 minute (60 seconds) per device/IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds
const MAX_LEADS_PER_WINDOW = 2; // 2 leads max

// In-memory sliding window store: clientId -> timestamp[]
const rateLimitCache = new Map<string, number[]>();

function getClientIdentifier(request: Request, bodyDeviceId?: string): string {
  if (bodyDeviceId && typeof bodyDeviceId === 'string' && bodyDeviceId.trim().length > 3) {
    return `device_${bodyDeviceId.trim()}`;
  }

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const ip = forwarded.split(',')[0].trim();
    if (ip) return `ip_${ip}`;
  }

  const realIp = request.headers.get('x-real-ip') || request.headers.get('cf-connecting-ip');
  if (realIp) {
    return `ip_${realIp.trim()}`;
  }

  return 'device_default';
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Extract ad attribution fields
    const { 
      fullName, 
      email, 
      phone, 
      experience, 
      mode, 
      source, 
      deviceId,
      adPlatform,
      gclid,
      fbclid,
      gad_source,
      gbraid,
      wbraid,
      referrer,
      utm_source, 
      utm_medium, 
      utm_campaign, 
      utm_content, 
      utm_term,
      landing_page_url,
      timestamp 
    } = data;

    // Check device rate limit: Max 2 requests per 1 minute
    const clientId = getClientIdentifier(request, deviceId);
    const now = Date.now();

    const previousTimestamps = (rateLimitCache.get(clientId) || []).filter(
      (time) => now - time < RATE_LIMIT_WINDOW_MS
    );

    if (previousTimestamps.length >= MAX_LEADS_PER_WINDOW) {
      const oldestTimestamp = previousTimestamps[0];
      const waitSeconds = Math.max(1, Math.ceil((oldestTimestamp + RATE_LIMIT_WINDOW_MS - now) / 1000));

      console.warn(`🛑 [RATE LIMIT BLOCKED]: ${clientId} exceeded ${MAX_LEADS_PER_WINDOW} requests in 1 min. Retry in ${waitSeconds}s.`);

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `1 minute ke andar same device se maximum 2 baar lead submit ki ja sakti hai. Kripya ${waitSeconds} second baad try karein.`,
          retryAfter: waitSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(waitSeconds),
          },
        }
      );
    }

    // Record this submission in rate limit cache
    previousTimestamps.push(now);
    rateLimitCache.set(clientId, previousTimestamps);

    // Periodically prune stale cache entries
    if (rateLimitCache.size > 1000) {
      const pruneCutoff = now - RATE_LIMIT_WINDOW_MS;
      rateLimitCache.forEach((times, key) => {
        const valid = times.filter((t) => t > pruneCutoff);
        if (valid.length === 0) {
          rateLimitCache.delete(key);
        } else {
          rateLimitCache.set(key, valid);
        }
      });
    }

    // Basic validation
    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Full name and Phone number are required' },
        { status: 400 }
      );
    }

    // Clean phone number (strip +91 or spaces, keep 10 digits)
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);

    // 🎯 Robust Ad Platform Detection (META, GOOGLE, INSTAGRAM, WEBSITE)
    let crmSource = 'WEBSITE';

    const fullUrl = (landing_page_url || '').toLowerCase();
    const sourceLower = String(utm_source || data.source || data.platform || '').toLowerCase();
    const mediumLower = String(utm_medium || '').toLowerCase();
    const campaignLower = String(utm_campaign || '').toLowerCase();
    const refHeader = (request.headers.get('referer') || referrer || '').toLowerCase();

    // Check Meta / Facebook / Instagram signals
    const isMeta = 
      adPlatform === 'META' ||
      adPlatform === 'INSTAGRAM' ||
      Boolean(fbclid) ||
      fullUrl.includes('fbclid=') ||
      sourceLower.includes('meta') ||
      sourceLower.includes('facebook') ||
      sourceLower.includes('instagram') ||
      sourceLower === 'fb' ||
      sourceLower === 'ig' ||
      mediumLower.includes('meta') ||
      mediumLower.includes('facebook') ||
      mediumLower.includes('instagram') ||
      campaignLower.includes('meta') ||
      campaignLower.includes('facebook') ||
      campaignLower.includes('instagram') ||
      refHeader.includes('instagram.com') ||
      refHeader.includes('facebook.com') ||
      refHeader.includes('fb.com');

    // Check Google Ads signals (gclid auto-tagging, gad_source, search, pmax, etc.)
    const isGoogle =
      adPlatform === 'GOOGLE' ||
      Boolean(gclid) ||
      Boolean(gad_source) ||
      Boolean(gbraid) ||
      Boolean(wbraid) ||
      fullUrl.includes('gclid=') ||
      fullUrl.includes('gad_source=') ||
      sourceLower.includes('google') ||
      sourceLower.includes('adwords') ||
      sourceLower.includes('gads') ||
      mediumLower.includes('cpc') ||
      mediumLower.includes('search') ||
      mediumLower.includes('pmax') ||
      mediumLower.includes('google') ||
      refHeader.includes('googleads') ||
      refHeader.includes('doubleclick');

    if (isMeta) {
      if (sourceLower.includes('instagram') || sourceLower === 'ig' || refHeader.includes('instagram.com') || adPlatform === 'INSTAGRAM') {
        crmSource = 'INSTAGRAM';
      } else {
        crmSource = 'META';
      }
    } else if (isGoogle) {
      crmSource = 'GOOGLE';
    } else if (sourceLower.includes('landing') || sourceLower.includes('hero')) {
      crmSource = 'LANDING_PAGE';
    }

    // Build rich ad attribution remarks for the CRM team
    const adInfoParts: string[] = [];
    if (crmSource === 'META' || crmSource === 'INSTAGRAM') {
      adInfoParts.push(`Ad Platform: ${crmSource} (Meta Ads)`);
      if (utm_campaign) adInfoParts.push(`Campaign: ${utm_campaign}`);
      if (utm_content) adInfoParts.push(`Creative: ${utm_content}`);
      if (fbclid) adInfoParts.push(`FBCLID: ${fbclid.slice(0, 16)}...`);
    } else if (crmSource === 'GOOGLE') {
      adInfoParts.push(`Ad Platform: GOOGLE ADS`);
      if (utm_campaign) adInfoParts.push(`Campaign: ${utm_campaign}`);
      if (utm_term) adInfoParts.push(`Keyword: ${utm_term}`);
      if (gclid) adInfoParts.push(`GCLID: ${gclid.slice(0, 16)}...`);
    } else {
      adInfoParts.push(`Ad Platform: Organic / Direct`);
    }

    const remarksText = [
      adInfoParts.join(' | '),
      experience ? `Background: ${experience}` : '',
      mode ? `Mode: ${mode}` : '',
      source ? `Form: ${source}` : '',
    ].filter(Boolean).join(' | ');

    // Prepare payload formatted for DizitalAdda CRM
    const crmPayload = {
      fullName: fullName.trim(),
      mobileNumber: cleanPhone,
      email: email && email.trim() ? email.trim() : null,
      domain: CRM_DOMAIN,
      interestedCourse: data.course || data.interestedCourse || CRM_COURSE_NAME,
      source: crmSource,
      preferredCentre: mode ? mode : 'Online Live Batch',
      landing_page_url: landing_page_url || 'https://ads.nidads.com',
      utm_source: utm_source || (crmSource !== 'WEBSITE' ? crmSource.toLowerCase() : null),
      utm_medium: utm_medium || (crmSource !== 'WEBSITE' ? 'paid' : null),
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
      remarks: remarksText,
    };

    console.log('🚀 [FORWARDING LEAD TO CRM via ENV]:', CRM_ENDPOINT, crmPayload);

    let crmResponseData = null;

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      if (CRM_API_KEY) {
        headers['Authorization'] = `Bearer ${CRM_API_KEY}`;
        headers['x-api-key'] = CRM_API_KEY;
      }

      const crmRes = await fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify(crmPayload),
      });

      crmResponseData = await crmRes.json().catch(() => null);
      console.log('✅ [CRM RESPONSE]:', crmRes.status, crmResponseData);
    } catch (crmErr) {
      console.error('⚠️ [CRM FORWARDING ERROR]:', crmErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured and synced with CRM successfully',
      crmSynced: !!crmResponseData?.success,
      lead: {
        fullName,
        phone: cleanPhone,
        email,
        experience,
        mode,
        source: crmSource,
        timestamp: timestamp || new Date().toISOString(),
      },
    });
  } catch (err: any) {
    console.error('Lead processing error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', message: err.message },
      { status: 500 }
    );
  }
}
