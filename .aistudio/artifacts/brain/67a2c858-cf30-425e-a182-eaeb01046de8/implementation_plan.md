# NEXARIS — 100% Agricultural Commodity Trading & Sourcing House Upgrade

A comprehensive upgrade transitioning NEXARIS into a specialized B2B Agricultural Commodity Sourcing House based in Gandhinagar, Gujarat. This plan establishes the 3-division agricultural catalogue (Wholesale Spices, Graded Oilseeds, Natural Jaggery Sweeteners), spec-first interactive product cards with technical drawers and instant TDS downloads, a dual-track conversion funnel for international buyers and domestic farm suppliers, leadership profile updates, and updated SEO/JSON-LD schemas.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following key user preferences were confirmed during the interactive clarification phase:
> - **TDS Download Behavior**: Instant PDF Technical Data Sheet preview modal and simulated PDF download, with an option to connect with the Trade Desk on WhatsApp (+91 98246 18484 / +91 85119 12115) for lot-specific laboratory COAs.
> - **Division Positioning**: The hero and top navigation balance all 3 agricultural divisions (Wholesale Spices, Graded Oilseeds, and Natural Cane Sweeteners) under the institutional tagline *"One Partner. Many Possibilities."*
> - **Port Logistics**: Primary loading operations consolidated around Mundra and Kandla ports in Gujarat with transparent FOB/CIF/CFR Incoterms 2020 coordination.

---

### 1. Overview & Core Concept

- **What It Does**: Upgrades the NEXARIS web platform from an industrial/metals legacy to a high-credibility, agricultural B2B commodity export portal with deep origin roots in Gandhinagar and Saurashtra, Gujarat.
- **Target Audience / Persona**:
  1. **International Bulk Buyers & Importers**: Food processors, spice millers, beverage manufacturers, retail distributors, and supermarket sourcing managers in the GCC, Europe, North America, and Southeast Asia looking for verifiable lot specifications, HS codes, and container freight terms.
  2. **Domestic Farmers & FPOs**: Agricultural producers, aggregation centers, and millers across Gujarat looking to sell bulk commodities directly into institutional export pipelines.
- **Key Value**: Replaces generic marketing hype with spec-driven clarity: exact moisture thresholds, active curcumin/sucrose/oil content, Sortex purity levels, custom export packaging options, and direct trade desk WhatsApp routing.

---

### 2. User Experience & Visual Design

#### Visual Identity & Theme
- **Institutional Color Palette**:
  - Primary Background: Deep Institutional Navy (`#0A192F` / `#0F172A`) for heroes, headers, and footer anchors.
  - Surface Neutral: Warm Ivory / Clean Off-White (`#FAF8F5` and `#FFFFFF`) for high-legibility specification tables and product cards.
  - Structural Borders: Hairline slate borders (`border-stone-200 / border-slate-700/40`).
  - Brand Accent: Warm Refined Gold (`#D4AF37` / `#C5A059`) for key badges, active highlights, and action buttons.
- **Typography & Scale**:
  - Display Font: `Plus Jakarta Sans` / `Outfit` (Bold, clean geometric hierarchy).
  - Body Font: `DM Sans` / `Plus Jakarta Sans` for dense, scannable technical reading.
  - Spec & Numeric Font: `font-mono tabular-nums` for precise parameters, HS codes, moisture tolerances, and brix readings.
- **Zero-Pill Discipline**:
  - Category and HS code metadata rendered with clean unboxed text and typographic separators (`·` or `/`).
  - Interactive tabs styled as clean segmented controls without candy badge styling.

#### Key User Flows & Interactive Features
1. **Spec-First Product Cards with Expandable Drawer**:
   - Each card displays commodity imagery, prominent HS Code, origin, and key agricultural parameters.
   - An expandable "Technical Specifications" drawer reveals: Moisture %, Purity/Sortex grade, Active Chemical/Natural Content (Curcumin/Sucrose/Oil %), Packaging formats, and Preferred Loading Ports (Mundra / Kandla).
   - Two distinct CTA buttons:
     - `Request Quote (RFQ)`: Opens the Buyer RFQ Modal pre-filled with the commodity and HS code.
     - `Request Spec Sheet (TDS)`: Launches an instant Technical Data Sheet summary modal with printable/downloadable PDF specifications and WhatsApp COA dispatch.
2. **Dual-Track Conversion Funnel**:
   - **Buyer Track ("Request RFQ")**: Modal & dedicated page with structured inputs for destination port, required volume (MT / 20ft FCL / 40ft FCL), Incoterms (FOB Mundra, FOB Kandla, CIF, CFR, EXW), and packaging specifications.
   - **Supplier Track ("Sell to NEXARIS")**: Accessible registration interface for Gujarat farmers and FPOs to submit lot size, commodity grade, moisture/lab availability, and contact information.
   - Form completions generate structured WhatsApp payloads to `+91 98246 18484` and `mailto:` pre-fills for `contact@nexaris.co.in`.
3. **Leadership, Verification & Quality Strip**:
   - Leadership profiles featuring Mr. Abhi Nilesh Tiwari (Managing Partner - Strategy & Technology), Mr. Krishnapalsinh Rajendrasinh Parmar (Partner - Business Development), and Mr. Rudra Aniruddhkumar Pandya (Partner - Operations).
   - Transparent Gandhinagar registered office address and export compliance credentials (APEDA, Spices Board India, FSSAI alignment, Phytosanitary & Certificate of Origin protocols).

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Catalogue Organization into 3 Core Divisions**:
  - *Chosen Approach*: Group products under (1) Wholesale Spices (13 products), (2) Graded Oilseeds (4 products), and (3) Natural Sweeteners / Jaggery (4 export grades).
  - *Why*: Reflects real Indian export categories and DGFT / HS Code Chapter classifications (Ch. 09 for Spices, Ch. 12 for Oilseeds, Ch. 17 for Sugars & Jaggery).
  - *Alternatives Considered*: Retaining metals as an archive division — rejected because complete pivot to agricultural commodities is required.
- **Decision 2: Instant TDS Modal + Client-Side PDF Generation**:
  - *Chosen Approach*: Render a clean, printable technical specification certificate inside a modal with immediate browser print/save trigger and quick WhatsApp trade desk link.
  - *Why*: Provides immediate gratification to overseas sourcing teams without requiring server-side PDF rendering infrastructure or broken external links.

---

### 4. Technical Architecture & System Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXARIS Web Application                         │
├────────────────────────────────────────────────────────────────────────┤
│ Navigation Header (3-Zone Contract: Brand | Divisions | Trade Desk CTA)│
├────────────────────────────────────────────────────────────────────────┤
│                          Routes & Page Views                           │
│  ┌───────────────────┐  ┌───────────────────┐  ┌────────────────────┐ │
│  │     HomePage      │  │   Catalogues      │  │  Supplier Portal   │ │
│  │ (Hero, 3-Division │  │ (/spices-oilseeds │  │   (Sell to         │ │
│  │   3D Globe,       │  │   /jaggery)       │  │    NEXARIS Form)   │ │
│  │   Leadership,     │  │ Spec-First Grid   │  │                    │ │
│  │   Compliance)     │  │                   │  │                    │ │
│  └─────────┬─────────┘  └─────────┬─────────┘  └─────────┬──────────┘ │
│            │                      │                      │            │
│            ▼                      ▼                      ▼            │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                  Interactive Modal & Action Layer                │ │
│  │  - Buyer RFQ Modal (pre-selected commodity, volume, Incoterms)   │ │
│  │  - Spec Sheet (TDS) Download & Print Modal                       │ │
│  │  - Direct WhatsApp Dispatch (+91 98246 18484 / +91 85119 12115)  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│                          Data Store Layer                              │
│  - src/data/products.ts (13 Spices, 4 Oilseeds, 4 Jaggery Sweeteners)  │
│  - src/data/jaggery.ts (Detailed specifications for Jaggery items)     │
│  - src/config/site.ts (Contact details, Gandhinagar address, Partners) │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 5. Detailed Implementation Steps

1. **Brand Positioning & Site Configuration (`src/config/site.ts`)**:
   - Update institutional tagline to *"One Partner. Many Possibilities."*
   - Set registered address to `F-203, Sarthak Safal-2, Vavol, Gandhinagar – 382016, Gujarat, India`.
   - Update leadership roster (Abhi Nilesh Tiwari, Krishnapalsinh Parmar, Rudra Pandya) with official emails and roles.
   - Configure trade desk phone numbers: `+91 98246 18484` and `+91 85119 12115`.
2. **Product Data Overhaul (`src/data/products.ts`)**:
   - Ensure the 13 Spices items, 4 Oilseeds items, and 4 Jaggery items are complete with HS codes, active compounds (curcumin, sucrose, oil), moisture thresholds, mesh sizes, and export packaging options.
3. **Spec-First Product Card (`src/components/ProductCard.tsx`)**:
   - Add expandable Technical Drawer toggling moisture, purity, active content, and loading port (Mundra / Kandla).
   - Integrate dual action buttons: `Request Quote (RFQ)` and `Request Spec Sheet (TDS)`.
4. **TDS Modal Component (`src/components/TdsModal.tsx`)**:
   - Build a clean technical specification sheet preview with printing/saving capabilities and direct WhatsApp COA request button.
5. **Dual-Track Funnel Upgrades (`src/components/EnquiryModal.tsx` & `src/pages/ForSuppliersPage.tsx`)**:
   - Enhance the Buyer RFQ Modal with Incoterms (FOB Mundra, FOB Kandla, CIF, CFR, EXW), volume selection, and packaging preferences.
   - Enhance the Supplier Registration Form ("Sell to NEXARIS") with lot size, district/state, moisture/lab status, and farmer/FPO details.
6. **Homepage & Leadership Restructure (`src/pages/HomePage.tsx`)**:
   - Update Hero typography, subheadline, and institutional color accents.
   - Add the Quality & Export Compliance strip (APEDA, Spices Board, FSSAI alignment).
   - Refresh the Leadership Team section with the 3 managing partners.
7. **SEO & Structured Data Sync (`index.html` & `metadata.json`)**:
   - Update `<title>` to: `NEXARIS | Indian Wholesale Spices, Graded Oilseeds & Export Quality Jaggery Sourcing House — Gandhinagar, Gujarat`.
   - Refactor Schema.org Organization and Product JSON-LD to reflect the 3 agricultural divisions.
8. **Verification**:
   - Run `lint_applet` (`tsc --noEmit`) and `compile_applet` (`npm run build`) to ensure zero TypeScript errors or missing imports.
