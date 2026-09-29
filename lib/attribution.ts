export interface AttributionData {
  adPlatform: 'META' | 'GOOGLE' | 'INSTAGRAM' | 'WEBSITE';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  gclid?: string;
  fbclid?: string;
  gad_source?: string;
  gbraid?: string;
  wbraid?: string;
  referrer?: string;
  landing_page_url?: string;
}

const STORAGE_KEY = 'nidads_ad_attribution_v1';

/**
 * Captures advertising attribution parameters from URL, click IDs, and referrer.
 * Persists in sessionStorage & localStorage so it survives navigation/anchors.
 */
export function captureAttribution(): AttributionData {
  if (typeof window === 'undefined') {
    return { adPlatform: 'WEBSITE' };
  }

  try {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    // Direct UTM and source aliases
    const utm_source = searchParams.get('utm_source') || searchParams.get('source') || searchParams.get('platform') || searchParams.get('ad_source') || undefined;
    const utm_medium = searchParams.get('utm_medium') || searchParams.get('medium') || undefined;
    const utm_campaign = searchParams.get('utm_campaign') || searchParams.get('campaign') || undefined;
    const utm_content = searchParams.get('utm_content') || undefined;
    const utm_term = searchParams.get('utm_term') || searchParams.get('keyword') || undefined;
    const utm_id = searchParams.get('utm_id') || undefined;

    // Platform-specific click identifiers
    const gclid = searchParams.get('gclid') || undefined;
    const gad_source = searchParams.get('gad_source') || undefined;
    const gbraid = searchParams.get('gbraid') || undefined;
    const wbraid = searchParams.get('wbraid') || undefined;
    const fbclid = searchParams.get('fbclid') || undefined;

    const referrer = document.referrer || undefined;

    // Detection logic
    let detectedPlatform: 'META' | 'GOOGLE' | 'INSTAGRAM' | 'WEBSITE' = 'WEBSITE';

    const fullSearch = window.location.search.toLowerCase();
    const refLower = (referrer || '').toLowerCase();
    const sourceLower = (utm_source || '').toLowerCase();
    const mediumLower = (utm_medium || '').toLowerCase();
    const campaignLower = (utm_campaign || '').toLowerCase();

    // 1. Meta / Facebook / Instagram Detection
    const hasMetaSignals = 
      Boolean(fbclid) ||
      fullSearch.includes('fbclid=') ||
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
      refLower.includes('instagram.com') ||
      refLower.includes('facebook.com') ||
      refLower.includes('fb.com');

    // 2. Google Ads Detection
    const hasGoogleSignals =
      Boolean(gclid) ||
      Boolean(gad_source) ||
      Boolean(gbraid) ||
      Boolean(wbraid) ||
      fullSearch.includes('gclid=') ||
      fullSearch.includes('gad_source=') ||
      sourceLower.includes('google') ||
      sourceLower.includes('adwords') ||
      sourceLower.includes('gads') ||
      mediumLower.includes('cpc') ||
      mediumLower.includes('search') ||
      mediumLower.includes('pmax') ||
      mediumLower.includes('google') ||
      refLower.includes('googleads') ||
      refLower.includes('doubleclick');

    if (hasMetaSignals) {
      if (sourceLower.includes('instagram') || sourceLower === 'ig' || refLower.includes('instagram.com')) {
        detectedPlatform = 'INSTAGRAM';
      } else {
        detectedPlatform = 'META';
      }
    } else if (hasGoogleSignals) {
      detectedPlatform = 'GOOGLE';
    }

    const freshData: AttributionData = {
      adPlatform: detectedPlatform,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      utm_id,
      gclid,
      fbclid,
      gad_source,
      gbraid,
      wbraid,
      referrer,
      landing_page_url: window.location.href,
    };

    // If an ad platform is detected on current landing URL, save to storage
    if (detectedPlatform !== 'WEBSITE') {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
      } catch {}
      return freshData;
    }

    // If current URL didn't have ad params (e.g. user scrolled, navigated to hash, or opened modal),
    // retrieve previously preserved attribution from current session!
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AttributionData;
        if (parsed && parsed.adPlatform && parsed.adPlatform !== 'WEBSITE') {
          return parsed;
        }
      }
    } catch {}

    return freshData;
  } catch (err) {
    console.warn('Attribution error:', err);
    return { adPlatform: 'WEBSITE' };
  }
}
