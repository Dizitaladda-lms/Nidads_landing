import { NextResponse } from 'next/server';

const CRM_ENDPOINT = process.env.CRM_ENDPOINT || 'https://dizitaladda-crm.onrender.com/api/public/leads';
const CRM_COURSE_NAME = process.env.CRM_COURSE_NAME || 'Data Science & AI Bootcamp';
const CRM_API_KEY = process.env.CRM_API_KEY || '';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      fullName, 
      email, 
      phone, 
      experience, 
      mode, 
      source, 
      utm_source, 
      utm_medium, 
      utm_campaign, 
      utm_content, 
      utm_term,
      landing_page_url,
      timestamp 
    } = data;

    // Basic validation
    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Full name and Phone number are required' },
        { status: 400 }
      );
    }

    // Clean phone number (strip +91 or spaces, keep 10 digits)
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);

    // Map source to valid CRM source types: WEBSITE, META, GOOGLE, etc.
    let crmSource = 'WEBSITE';
    if (utm_source) {
      const lower = utm_source.toLowerCase();
      if (lower.includes('fb') || lower.includes('meta') || lower.includes('instagram')) {
        crmSource = 'META';
      } else if (lower.includes('google') || lower.includes('adwords')) {
        crmSource = 'GOOGLE';
      }
    }

    // Prepare payload formatted for DizitalAdda CRM
    const crmPayload = {
      fullName: fullName.trim(),
      mobileNumber: cleanPhone,
      email: email && email.trim() ? email.trim() : null,
      domain: 'Nidads',
      interestedCourse: CRM_COURSE_NAME,
      source: crmSource,
      preferredCentre: mode ? mode : 'Online Live Batch',
      landing_page_url: landing_page_url || 'https://nidads.com',
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
      remarks: `${experience ? `Background: ${experience} | ` : ''}Mode: ${mode || 'Online'} | Form: ${source || 'Hero Form'}`,
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
