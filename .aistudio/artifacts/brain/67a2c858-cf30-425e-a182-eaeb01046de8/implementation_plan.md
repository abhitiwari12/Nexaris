# NEXARIS — Brand Simplification, Homepage Banner & Category-First Showcase

Streamline the brand identity to **NEXARIS** (removing "Foods and Agri Export"), redesign the hero banner to match the reference screenshot (`image_11266e18.png`), and replace the 23 individual product cards on the homepage with **3 Premium Visual Category Cards** that link directly into the complete catalogue.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the following design decisions:
> - **Brand Identity**: The company name is strictly **NEXARIS** everywhere (logo, header, footer, meta titles); "Food and Agri Export" is removed completely.
> - **Homepage Banner**: Replicates the reference screenshot (`image_11266e18.png`):
>   - Headline: **NEXARIS**
>   - Statement: *"NEXARIS has consistently aimed to provide quality products. From the beginning, our goal and vision have been clear, focusing on delivering excellence in every product we offer."*
>   - Features the side "Enquiry Now" vertical trigger tab and clean action buttons.
> - **Homepage Product Strategy**: Instead of listing all 23 products on the homepage, showcase **3 Premium Category Cards** (Spices & Whole Seeds, Dal & Pulses, Dry Fruits & Nuts) with pack previews, key highlights, and direct buttons into the respective `/products` catalogue views.

---

## 1. Overview & Core Concept

- **What It Delivers**: A cleaner, high-standard digital presence for **NEXARIS**. The homepage transitions from an exhaustive product listing to an editorial category gateway, reducing visual clutter while directing users into the 23-product ARIKA catalogue on `/products`.
- **Target Audience**: Modern grocery category managers, retail consumers, overseas importers, and wholesale distributors looking for unadulterated spices, unpolished pulses, and handpicked dry fruits.
- **Key Value**: Crisp brand positioning without cluttered sub-labels; immediate category discovery with frictionless navigation into detailed product lines.

---

## 2. User Experience & Visual Design

### 1. Simplified Brand Identity
- **Logo & Header**: Display the bold typographic mark **NEXARIS** in clean gold/white without the "Foods & Agri Export" subscript.
- **Footer & Meta**: Unified corporate name "NEXARIS" with Gandhinagar, Gujarat location.

### 2. Homepage Banner (Matching `image_11266e18.png`)
- **Background**: High-contrast, authentic composition of earthen and ceramic bowls filled with turmeric, cumin, black pepper, and whole red chillies (`/images/brand/spices_pulses_bowls.jpg`).
- **Typography & Copy**:
  - Lead Title: **NEXARIS** (bold serif/grotesque display)
  - Vision Paragraph: *"NEXARIS has consistently aimed to provide quality products. From the beginning, our goal and vision have been clear, focusing on delivering excellence in every product we offer."*
- **Interactive Elements**:
  - Left-edge vertical floating **"Enquiry Now"** tab (matching the green/navy reference tab) for instant 1-click modal access.
  - Primary CTAs: "Explore Product Categories" and "Download Brochure".

### 3. Homepage Category Gateway (3 Premium Cards)
Instead of 23 product cards, render 3 wide, visual cards:
1. **Spices & Whole Seeds**:
   - Artwork preview of ARIKA Turmeric, Red Chilli, Coriander, Cumin, and Whole Masala packs.
   - Highlights: Sortex-cleaned seeds, high essential oils, zero added colours.
   - CTA: *"Explore Spices (11 Products) →"*
2. **Dal & Pulses**:
   - Artwork preview of 1kg unpolished Toor, Moong, Masoor, Chana Dal, and Rajma window pouches.
   - Highlights: Unpolished, natural protein, machine-graded purity.
   - CTA: *"Explore Dal & Pulses (7 Products) →"*
3. **Dry Fruits & Nuts**:
   - Artwork preview of 200g California Almonds, Cashews, Golden Raisins, Walnuts, and Pistachios.
   - Highlights: Vacuum-sealed freshness, rich vitamins & Omega-3.
   - CTA: *"Explore Dry Fruits (5 Products) →"*

### 4. Statutory Quality Certificates (Matching `image_aebec4ac.png`)
- Clean white background section titled **"OUR CERTIFICATE"** with the 8 accredited badges:
  - GMP Quality, APEDA, Spices Board India, Halal, US FDA, IAF, FSSAI, MSME.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Category Gateway vs Full Listing on Homepage**
  - *Chosen Approach*: Show 3 distinct, beautifully photographed category cards on the homepage with sample item lists and direct links to `/products?division=...`.
  - *Why*: Solves homepage clutter, speeds up mobile scrolling, and matches global standard corporate food websites.
- **Decision 2: Retention of 23 ARIKA Products on `/products`**
  - *Chosen Approach*: The full 23-product ARIKA catalogue with category filter tabs remains fully intact on `/products` and the dedicated divisions.
  - *Why*: Ensures zero product data loss; customers clicking any category on the homepage land on the complete shelf listing.
- **Decision 3: Side "Enquiry Now" Floating Button**
  - *Chosen Approach*: Replicate the vertical side tab from the reference screenshot on the viewport left edge, styled in institutional navy and gold.
  - *Why*: Provides high commercial conversion without intrusive popups.

---

## 4. Technical Architecture & System Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXARIS HOMEPAGE (/)                            │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   [TopUtilityBar] Contact: +91 85119 12115 · Gandhinagar       │   │
│   │   [Header] Brand: NEXARIS (No "Foods & Agri Export")           │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   HeroBanner (Matching image_11266e18.png)                     │   │
│   │   • Background: Earthen & ceramic bowls with spices            │   │
│   │   • Title: NEXARIS                                             │   │
│   │   • Vision: Quality & excellence in every product              │   │
│   │   • Fixed Side Tab: "Enquiry Now"                              │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   KeyProcessSection (5 Clean Circular Icons)                   │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   Homepage Categories Showcase (3 Premium Cards)               │   │
│   │   ├── Card 1: Spices & Seeds (11 Products) ──► /products?spices│   │
│   │   ├── Card 2: Dal & Pulses (7 Products)    ──► /products?pulses│   │
│   │   └── Card 3: Dry Fruits & Nuts (5 Prods)  ──► /products?dry...│   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   NumbersLedgerSection (50+ MT · 15+ States · 100% · 02 Mills) │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   CertificateGridSection ("OUR CERTIFICATE" - 8 Badges)        │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   ConnectedSection (Clean Inquiry Form & Gandhinagar Address)   │   │
│   │   Footer (Brand: NEXARIS)                                      │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Edits
1. `src/config/site.ts`: Set name to `"NEXARIS"` and tagline to `"Pure Spices, Dal & Pulses, Dry Fruits"`.
2. `src/components/Header.tsx`: Remove "Foods & Agri Export" sub-text from the logo; display crisp "NEXARIS".
3. `src/components/HeroBanner.tsx`: Update background, headline to "NEXARIS", add vision copy, and include the floating vertical "Enquiry Now" tab matching `image_11266e18.png`.
4. `src/components/RetailBrandsShowcase.tsx`: Refactor into the 3 visual category cards with direct navigation to `/products`.
5. `src/components/Footer.tsx`: Update brand title and description to remove "Foods & Agri Export".
6. `index.html` & `metadata.json`: Keep brand name as "NEXARIS".
