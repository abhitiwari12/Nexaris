# NEXARIS — Interactive Editorial Spice Brand Website (Matching Reference Video & Screenshots)

Transform the NEXARIS website to replicate the premium Indian spice brand design demonstrated in the reference video (`Recording_2026-11-02_224913_aff1d164.mp4`) and screenshots (`Screenshot_2026-11-02_224812_b7283dfc.png`, `Screenshot_2026-11-02_224758_a0fe40e9.png`).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the following design and architectural choices:
> - **Hero Headline & Copy**: Features **NEXARIS** as the primary title paired with the verified vision statement:
>   *"NEXARIS has consistently aimed to provide quality products. From the beginning, our goal and vision have been clear, focusing on delivering excellence in every product we offer."*
> - **Interactive Hero Spice Switcher**: 4 interactive spices: **Haldi (Turmeric)**, **Kashmiri Chilli**, **Dhaniya (Coriander)**, and **Jeera (Cumin)**.
> - **Dynamic Palette Transition**: The hero section smoothly shifts background colors (Saffron Amber $\to$ Deep Crimson $\to$ Botanical Green $\to$ Spice Ochre) accompanied by giant hollow outline typography behind a floating 3D pouch.
> - **Complete Reference Flow**: Incorporates "The Signature range" (pastel numbered cards), "The NEXARIS range for your kitchen" (filter shelf), and the high-impact "UNDER YOUR OWN BRAND — PRIVATE LABEL" banner.

---

## 1. Overview & Core Concept

- **What It Delivers**: A digital flagship storefront inspired by premier contemporary Indian spice processors (KSP / artisanal direct-to-consumer packaging houses). It elevates ARIKA by NEXARIS into a tactile, sensory brand experience that balances household culinary warmth with modern commercial scale.
- **Target Audience**: Retail grocery shoppers, regional distributors, supermarket category managers, and private-label B2B buyers seeking verified, unadulterated ground spices, whole seeds, and staple pulses.
- **Key Value**: Replaces generic corporate templates with an editorial, highly engaging interactive hero and curated signature showcases that drive both immediate consumer sample requests and commercial B2B private-label inquiries.

---

## 2. User Experience & Visual Design

### 1. Dynamic Interactive Hero Banner (Matching Screenshots 1 & 2)
- **4 Active States with Smooth Background Transition (`duration-700`)**:
  1. **Haldi (Turmeric)**: Warm golden saffron background (`bg-gradient-to-br from-[#9A6B1F] via-[#A16207] to-[#78350F]`), giant outline text **"HALDI"**, 200g Turmeric pouch.
  2. **Kashmiri (Red Chilli)**: Deep ruby crimson background (`bg-gradient-to-br from-[#8B1E1E] via-[#991B1B] to-[#450A0A]`), giant outline text **"KASHMIRI"**, 200g Red Chilli pouch.
  3. **Dhaniya (Coriander)**: Herbal forest green background (`bg-gradient-to-br from-[#27532A] via-[#166534] to-[#14532D]`), giant outline text **"DHANIYA"**, 200g Coriander pouch.
  4. **Jeera (Cumin)**: Warm roasted spice umber background (`bg-gradient-to-br from-[#6B4423] via-[#78350F] to-[#3B1F0B]`), giant outline text **"JEERA"**, 200g Cumin pouch.
- **Giant Hollow Outline Typography**:
  - Super-scaled typography positioned directly behind the floating 3D pouch using CSS `[-webkit-text-stroke: 1.5px rgba(255,255,255,0.35)] text-transparent font-serif tracking-widest text-7xl sm:text-9xl lg:text-[14rem] select-none`.
- **Center Floating 3D Pouch**:
  - Tilted, floating presentation with realistic shadow underneath and gentle floating micro-animation (`translateY(-4px)`).
- **Left Column Brand Content**:
  - Kicker: `GANDHINAGAR · GUJARAT`
  - Title: **NEXARIS** (bold editorial serif)
  - Vision Statement: *"NEXARIS has consistently aimed to provide quality products. From the beginning, our goal and vision have been clear, focusing on delivering excellence in every product we offer."*
  - CTA Button: White rounded pill button `Explore our range →` with right arrow.
- **Bottom-Right Product Indicator & Thumbnail Switcher**:
  - Active spice title & net weight: e.g., `Haldi — PREMIUM TURMERIC POWDER · 200 G`
  - 4 circular thumbnail selectors for Kashmiri, Haldi, Dhaniya, and Jeera with an active gold/white focus ring.
- **Continuous Marquee Ribbon**:
  - Seamlessly running ticker below the hero banner:
    `• GROUND SPICES • UNPOLISHED DALS • PREMIUM DRY FRUITS • WHOLE AROMATIC SEEDS • BULK EXPORT • PRIVATE LABEL • 100% SORTEX CLEANED •`

---

### 2. "The Signature range" Section (Matching Video 00:00 - 00:04)
- **Header**:
  - Title: **The Signature range** (large serif)
  - Subtitle: *"The products NEXARIS is known for, from each corner of the range. Tap one to see its whole category, or order straight from our catalog."*
- **6 Editorial Pastel Cards (3x2 Grid)**:
  1. **N° 01 — Kashmiri (Red Chilli)**: Soft blush pink background (`#FDF2F2`), red accent, 200g pouch.
  2. **N° 02 — Haldi (Turmeric)**: Warm cream gold background (`#FEF9C3`), golden accent, 200g pouch.
  3. **N° 03 — Cumin (Jeera)**: Warm spice beige background (`#FEF3C7`), ochre accent, 200g pouch.
  4. **N° 04 — Toor Dal (Unpolished)**: Soft buttery amber background (`#FDE68A`/40), amber accent, 1 kg pouch.
  5. **N° 05 — Dhaniya (Coriander)**: Pale herbal mint background (`#ECFDF5`), emerald accent, 200g pouch.
  6. **N° 06 — California Almonds**: Soft natural almond taupe background (`#F5EBE0`), warm taupe accent, 200g pouch.
- **Card Details**:
  - Number badge: `N° 01` (mono, quiet top-left)
  - Centered floating pack visual with shadow
  - Category kicker: `POWDER SPICES` / `UNPOLISHED PULSES` / `PREMIUM DRY FRUITS`
  - Product Title (serif bold)
  - Pack weight & variety note
- **Bottom Action Strip**:
  - Green button: `Order now` (triggers instant RFQ enquiry modal)
  - Link: `See the full range →` (links to `/products`)
  - Wholesale hint: `Buying for a shop or in larger quantity? Get in touch.`

---

### 3. "The NEXARIS range for your kitchen" Category Shelf (Matching Video 00:05 - 00:08)
- **Section Header**:
  - Kicker: `OVER 20+ SPICES & PANTRY STAPLES`
  - Title: **The NEXARIS range for your kitchen**
- **Filter Tabs**:
  - `All` | `Powder Spices` | `Whole Seeds` | `Dal & Pulses` | `Dry Fruits`
- **Shelf Row**:
  - Clean shelf presentation showing pouch packs with net weight, name, and single-click sample/quote button.

---

### 4. "UNDER YOUR OWN BRAND — PRIVATE LABEL" Banner (Matching Video 00:08 - 00:10)
- **Styling**: High-impact rich burgundy/navy split banner matching the video.
- **Content**:
  - Left: Subtitle `UNDER YOUR OWN BRAND`, giant bold title **PRIVATE LABEL**.
  - Right: *"Any product on this page, made and packed for yourself. Custom branding, bilingual printing, and container dispatch via Mundra & Kandla seaports."*
  - CTA Button: `See how it works →` (triggers the B2B Private Label inquiry modal).

---

### 5. "OUR CERTIFICATE" Statutory Grid (Matching `Screenshot_2026-11-02_224812_b7283dfc.png` & `image_aebec4ac.png`)
- Clean white background layout with the 8 verified statutory trust badges:
  - GMP Quality, APEDA, Spices Board India, Halal, US FDA, IAF, FSSAI, MSME.

---

### 6. Clean Editorial Footer (Matching Video 00:08 - 00:10)
- Deep navy background (`#0A192F` / `#0D1520`):
  - Column 1: Brand logo `NEXARIS`, brief quality statement, city `Gandhinagar, Gujarat`.
  - Column 2: Explore links (Our range, Bulk supply, Private label, Our story).
  - Column 3: Business & Trade desk (Phone: `+91 85119 12115`, Email: `contact@nexaris.co.in`).
  - Column 4: Visit & Factory dispatch (Gandhinagar, Gujarat, India; Ports: Mundra & Kandla).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dynamic Hero Spice Switcher**
  - *Approach*: Implement active state (`'haldi' | 'kashmiri' | 'dhaniya' | 'jeera'`) in `HeroBanner.tsx` with smooth CSS transition of background gradients, giant outline text, product pouch graphic, and thumbnail focus rings.
  - *Why*: Directly reproduces the signature interactive visual that makes the reference website feel premium and memorable.
- **Decision 2: Signature Range 3x2 Pastel Cards**
  - *Approach*: Build `SignatureRangeSection.tsx` with the exact 6 soft pastel background cards, floating pouches, number tags (`N° 01` to `N° 06`), and bottom order/sample strip.
  - *Why*: Faithfully follows the video recording while presenting our actual ARIKA spice & pulse packs.
- **Decision 3: Private Label B2B Feature Banner**
  - *Approach*: Include the dedicated "PRIVATE LABEL" banner from the video, linking into our existing B2B enquiry flow for bulk/custom branding.
  - *Why*: Essential for commercial buyers (supermarket chains, overseas importers) looking for contract packing and OEM manufacturing.

---

## 4. Technical Architecture & System Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXARIS HOMEPAGE (/)                            │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   [TopUtilityBar] Contact: +91 85119 12115 · Gandhinagar       │   │
│   │   [Header] Brand: NEXARIS · Clean Nav: Home, About, Range,     │   │
│   │   Private Label, Export, Contact · Call CTA                    │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   [DynamicHeroBanner] (Matching Screenshot 1 & 2)              │   │
│   │   • States: Haldi | Kashmiri | Dhaniya | Jeera                 │   │
│   │   • Dynamic Color Shift + Giant Outline Typography (HALDI, etc)│   │
│   │   • Floating 3D Pouch + Quality Vision Statement               │   │
│   │   • 4 Circular Thumbnail Switchers + Explore Pill Button       │   │
│   │   • Continuous Marquee Ticker Ribbon                           │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   [SignatureRangeSection] (Matching Video 00:00 - 00:04)       │   │
│   │   • 6 Soft Pastel Cards (N° 01 to N° 06)                       │   │
│   │   • Hover Lifts, Category Kickers, Pack Weight Details         │   │
│   │   • Bottom Action Bar: Order Now + See Full Range + B2B Note   │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   [KitchenRangeSection] (Matching Video 00:05 - 00:08)         │   │
│   │   • Category Tabs: All | Powder Spices | Dals | Dry Fruits     │   │
│   │   • Shelf Row of ARIKA 200g & 1kg Packs                        │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   [PrivateLabelBanner] (Matching Video 00:08 - 00:10)          │   │
│   │   • Split Rich Banner: "UNDER YOUR OWN BRAND / PRIVATE LABEL"  │   │
│   │   • Custom OEM Packing & Port Shipping Details                 │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   [CertificateGridSection] (Matching Screenshot 1)             │   │
│   │   • Clean White Background with 8 Verified Badges              │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   [EditorialFooter] (Matching Video Footer Layout)             │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Files to Create or Update
1. `src/components/DynamicHeroBanner.tsx`: New interactive hero component with state switcher for the 4 spices, outline typography, thumbnail controls, and marquee ribbon.
2. `src/components/SignatureRangeSection.tsx`: New component implementing the 3x2 pastel card signature collection.
3. `src/components/KitchenRangeSection.tsx`: Interactive category shelf for kitchen pantry packs.
4. `src/components/PrivateLabelBanner.tsx`: High-impact B2B contract packaging banner.
5. `src/pages/HomePage.tsx`: Assemble the sections in exact order.
6. `src/components/Header.tsx` & `src/components/Footer.tsx`: Align navigation and styling with the KSP reference.
