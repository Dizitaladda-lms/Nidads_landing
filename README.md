# 🚀 NIDADS High-Converting Ad Landing Page (Next.js)

Coding Ninjas Job Bootcamp ke structure aur design se inspired ek high-converting, mobile-first **Ad Landing Page / Lead Capture Page**. 
Isko specifically **Google Ads**, **Meta (Facebook/Instagram) Ads**, aur **YouTube Ads** ke liye banaya gaya hai.

---

## 🌟 Key Features (Iss Landing Page me kya special hai)

1. **Zero Traffic Leakage (Isolated Page)**:
   - Ad se aane wale bache sirf iss landing page pe rahenge. Koi faltu external link ya main website ka menu nahi hai jo traffic ko distract kare.
2. **Above-the-Fold High-Converting Form**:
   - Page khulte hi left me strong value props (35 LPA highest CTC, 128% hike, 1200+ companies) aur right me conversion-optimized lead capture form hai.
3. **Coding Ninjas Jaisa Sticky Navigation**:
   - Overview, Why This Course, Curriculum, Projects, Placements, Success Stories, Mentors, FAQs me smooth scroll jump karta hai.
4. **Interactive Curriculum Breakdown**:
   - Phase 1 se Phase 6 tak ka complete syllabus accordion style me khulta hai + "Download Syllabus PDF" CTA button.
5. **Real-World Capstone Projects**:
   - Industry-level projects showcase (Credit Risk ML, Healthcare BI, GenAI Multi-Agent, RAG, etc.).
6. **Career Switch & Success Stories**:
   - Before vs After CTC transformation cards (e.g. 3.6 LPA se 18.5 LPA).
7. **Mobile Sticky Bottom Bar**:
   - 80%+ ads traffic mobile par hota hai. Mobile me bottom me hamesha "Book Free Counselling" ka floating button visible rehta hai.
8. **Direct WhatsApp Floating Button**:
   - Indian students WhatsApp pe instantly connect karna pasand karte hain—1-click WhatsApp chat pre-configured hai.
9. **Built-in Lead Manager & 1-Click CSV Export**:
   - Har lead browser me save hoti hai. Footer me **Admin Leads** button se aap saari leads dekh sakte ho aur **CSV download** kar sakte ho bina kisi database setup ke!
10. **Ready API Route (`/api/lead`)**:
    - Leads ko directly Google Sheets, Zapier, ya CRM pe bhejne ke liye ready backend route.

---

## 🛠️ How to Run Locally (Apne Computer Par Kaise Chalayein)

Terminal me iss folder me ye command chalayein:

```bash
# Windows PowerShell me:
npm.cmd run dev

# Agar npm directly accessible hai:
npm run dev
```

Browser me open karein: `http://localhost:3000`

---

## 📦 Apni Existing Next.js Website Me Kaise Add Karein

Agar aapki main website pehle se Next.js me bani hai aur aap chahte ho ki ye landing page kisi route jaise `/bootcamp` ya `/lead` ya `/apply` pe dikhe:

1. Apni existing website ke `components/` folder me ye saare components copy kar lein:
   - `Navbar.tsx`
   - `HeroSection.tsx`
   - `SubNav.tsx`
   - `HiringPartners.tsx`
   - `WhyBootcamp.tsx`
   - `Curriculum.tsx`
   - `ProjectsShowcase.tsx`
   - `PlacementEcosystem.tsx`
   - `SuccessStories.tsx`
   - `MentorsSection.tsx`
   - `CertificationSection.tsx`
   - `FAQSection.tsx`
   - `LeadModal.tsx`
   - `MobileStickyBar.tsx`
   - `WhatsAppButton.tsx`
   - `AdminLeadViewer.tsx`

2. Apne Next.js project me naya route banayein, e.g.:
   `app/bootcamp/page.tsx`
   Aur usme hamara `app/page.tsx` ka code paste kar de!

3. `app/api/lead/route.ts` ko apne project ke `app/api/lead/route.ts` me daal de.

> **Note:** Kyunki ye isolated page hai, ispe aapke main website ka header/footer load na ho iske liye `app/bootcamp/layout.tsx` me direct `{children}` render kar sakte ho.

---

## ✏️ Content Kaise Change Karein (Text, Course, Phone No.)

Sabhi components clean aur modular hain:

| Cheez Jo Change Karni Hai | File Ka Naam | Details |
|---|---|---|
| **Course Name & Headlines** | `components/HeroSection.tsx` | Line 73 pe Title aur Subheading change karein |
| **Phone Number & WhatsApp** | `components/WhatsAppButton.tsx` & `Navbar.tsx` | Apna actual 10-digit WhatsApp number daalein |
| **Syllabus / Modules** | `components/Curriculum.tsx` | Weeks, Topics aur Tools ki list apne course hisab se update karein |
| **Projects** | `components/ProjectsShowcase.tsx` | Apne course ke capstone projects ke naam update karein |
| **Success Stories & Reviews** | `components/SuccessStories.tsx` | Apne real students ke naam, photos aur package update karein |
| **Faculty & Mentors** | `components/MentorsSection.tsx` | Apne teachers ke naam aur credentials daalein |
| **FAQs** | `components/FAQSection.tsx` | Fees, batch timing, refund policy ke answers update karein |

---

## 📊 Google Sheets Se Kaise Connect Karein (Free Automatic Webhook)

Agar aap chahte ho ki koi bhi bacha form bhare toh lead directly aapki Google Sheet me chali jaye:

1. Ek nayi Google Sheet banayein (Columns: `Name`, `Email`, `Phone`, `Status`, `Date`).
2. Google Sheets me **Extensions -> Apps Script** par click karein.
3. Waha ye simple script paste karein:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.fullName, data.email, "'" + data.phone, data.experience, data.timestamp]);
  return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
}
```

4. **Deploy -> New Deployment -> Web app** select karein (Access: "Anyone").
5. Jo Webhook URL mile, usko apne `.env.local` me daal dein:
   ```env
   LEAD_WEBHOOK_URL="https://script.google.com/macros/s/XXXXX/exec"
   ```
Ab har lead automatic aapki Google Sheet me live record hogi!

---

## 🎯 Meta & Google Ads Conversion Tracking

Form submit hone par Google Tag Manager ya Meta Pixel event trigger karne ke liye `HeroSection.tsx` aur `LeadModal.tsx` ke `handleSubmit` function me ye line add kar sakte hain:

```javascript
// Facebook Pixel Lead Event:
if (typeof window !== 'undefined' && window.fbq) {
  window.fbq('track', 'Lead');
}

// Google Ads Conversion Event:
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXXXX/XXXXXX' });
}
```

---

## 🔒 Admin Leads Viewer

Page ke footer me right side par **Admin Leads** ka discreet option diya gaya hai. 
Aap uspe click karke kabhi bhi:
- Saari captured leads ki list dekh sakte ho
- **Download CSV** button dabake Excel file export kar sakte ho.
