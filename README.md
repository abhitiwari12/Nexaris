# NEXARIS — Premium B2B Commodity Trading Platform

A modern, responsive B2B web application for **NEXARIS**, an Indian commodity trading house operating across:
1. **Spices & Oilseeds** (17 wholesale commodities: 13 spices & 4 oilseeds)
2. **Aluminium Scrap** (6 industrial recycling & remelting grades)

**Brand Tagline:** *"One Partner. Many Possibilities."*  
**Supporting Message:** *"Connecting commodities to opportunity."*  
**Primary Domain:** `https://nexaris.co.in`

---

## Technical Stack & Architecture

- **Framework:** React 19 + TypeScript + Vite 8 (Fully structured with semantic HTML & modular components)
- **Styling:** Tailwind CSS v4 with custom corporate design system
- **Design Palette:**
  - Deep Navy: `#10243D`
  - Secondary Navy: `#183653`
  - Steel Grey: `#AEB8C4`
  - Light Surface: `#F1F4F7`
  - Body Text: `#344256`
  - Hairline Borders: `#DCE2E8`
- **Icons:** `lucide-react`
- **Routing:** PushState HTML5 history client router with dynamic document titles, canonical URLs, and direct URL refresh support:
  - `/` — Corporate Homepage
  - `/spices-oilseeds` — Spices & Oilseeds Division Catalogue
  - `/spices-oilseeds/:slug` — Individual product detail routes for all 17 agricultural commodities
  - `/aluminium-scrap` — Aluminium Scrap Division Catalogue
  - `/aluminium-scrap/:slug` — Individual product detail routes for all 6 industrial metal grades
  - `/about` — Corporate overview, structure, and operating principles
  - `/contact` — Commercial quotation request & general enquiries

---

## Commodity Catalogue Structure

### Spices & Oilseeds Division (17 Products)

#### Spices (13 Products)
1. **Red Chilli Powder** — Vibrant colour and balanced heat.
2. **Kashmir Red Chilli** — Deep red colour with mild heat.
3. **Premium Red Chilli** — Selected, sorted chillies with strong colour and pungency.
4. **Chilli Flakes** — Crushed chilli for seasoning, pizza and processing.
5. **Cumin Powder** — Warm, earthy aroma, finely ground.
6. **Cumin Seeds** — Whole, cleaned seeds with strong aroma and natural oils.
7. **Turmeric Powder** — Rich golden colour with natural flavour.
8. **Premium Turmeric Powder** — High curcumin content, bright colour and fine texture.
9. **Black Pepper Flakes** — Bold pungency and fresh aroma.
10. **Clove** — Whole, aromatic buds with strong natural oils.
11. **Cinnamon** — Sweet, warm flavour, available as sticks or bark.
12. **Indian Bay Leaves** — Fragrant dried leaves (tej patta) with a mild cinnamon-like aroma.
13. **Oregano** — Aromatic dried herb for food manufacturing and retail.

#### Oilseeds (4 Products)
14. **Sesame Seeds** — Cleaned and graded for food and oil extraction.
15. **Mustard Seeds** — Sharp flavour, suited to culinary use and oil production.
16. **Black Mustard Seeds** — Strong pungency, used in cooking, pickling and oil extraction. *(Classified under Oilseeds, adjacent to Mustard Seeds)*
17. **Groundnut** — Sorted and graded for oil, snacks and processing.

### Aluminium Scrap Division (6 Products)
1. **Aluminium Wire Scrap** — Clean, high-purity wire scrap for remelting.
2. **Aluminium Taint Tabor** — Clean, mixed, unalloyed aluminium scrap, widely traded for remelting.
3. **Aluminium Rod Scrap** — Offcuts and rod scrap with consistent composition.
4. **Aluminium Extrusion Scrap** — Clean extrusion profiles from fabrication and construction.
5. **Aluminium 6061 Scrap** — A versatile structural alloy containing magnesium and silicon, used in engineering applications.
6. **Aluminium 6063 Scrap** — An architectural alloy with a smooth finish, common in window and door frames.

---

## Production Configuration Checklist

Before pointing production DNS for `nexaris.co.in`, provide the following verified client assets:

1. **WhatsApp Enterprise Number (`VITE_WHATSAPP_NUMBER`)**:
   - Provide the official WhatsApp Business phone number in international format without symbols (e.g., `919876543210`).
   - If not set, the platform safely guards users by presenting a helpful setup modal rather than linking to an invalid or personal number.

2. **Official Business Email (`VITE_BUSINESS_EMAIL`)**:
   - Verified email address (e.g., `trade@nexaris.co.in` or `procurement@nexaris.co.in`).

3. **Trade Desk Phone (`VITE_OFFICIAL_PHONE`)**:
   - Verified office landline or direct trade desk line (e.g., `+91 79 1234 5678`).

4. **Production Enquiry Webhook / API (`VITE_ENQUIRY_API_ENDPOINT`)**:
   - URL for CRM or email dispatch (e.g., SendGrid / Postmark / HubSpot / AWS SES).
   - In the development environment, enquiries are safely validated and structured into verifiable trade payloads with references (`NX-...`).

---

## Build & Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type check and lint
npm run lint

# Production build
npm run build
```

---

## Domain & DNS Setup for `https://nexaris.co.in`

1. **A Records / CNAME:**
   - Host `@` -> Points to hosting server IP or Vercel `76.76.21.21`
   - Host `www` -> `cname.vercel-dns.com` or platform canonical alias
2. **SSL / TLS:**
   - Provision automated Let's Encrypt / Cloudflare certificate
3. **Robots & Sitemap:**
   - Pre-configured at `/robots.txt` and `/sitemap.xml` pointing to `https://nexaris.co.in/sitemap.xml`.
