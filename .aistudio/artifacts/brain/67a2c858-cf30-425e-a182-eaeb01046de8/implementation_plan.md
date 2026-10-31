# ARIKA by NEXARIS — Retail Pack Packaging Integration & Interactive Pouch Showcase

Integrate the official **"ARIKA by NEXARIS"** consumer retail spice pouch packaging collection (Turmeric, Red Chilli, Coriander, Cumin, and Garam Masala 200g pouches) across the NEXARIS web application, featuring interactive front-and-back 3D flip card inspection with real nutritional information, regulatory compliance details, and trade sample ordering.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the following design and architectural choices:
> - **Brand Nomenclature**: Consumer retail packs are officially branded as **"ARIKA by NEXARIS"**, while the parent company remains **NEXARIS Foods & Agri Export**.
> - **Placement**: ARIKA is elevated as our **flagship consumer retail brand** featured prominently on the Homepage (`/`) and throughout the Products catalogue (`/products`).
> - **Interactive Packaging Experience**: Each pouch features an **interactive 3D flip inspection** allowing buyers and consumers to examine both the front artwork (brand, aroma claims, raw spice photography) and the back panel (per-100g nutritional table, ingredients, FSSAI license, barcode, and storage specs).

---

## 1. Overview & Core Concept

- **What It Does**: Showcases the high-fidelity **ARIKA by NEXARIS** retail pouch packaging series with interactive dual-sided packaging inspection. Retail grocery buyers, modern trade category managers (DMart, Reliance Retail, Nature's Basket), and overseas supermarket distributors can inspect the exact shelf-ready 200g stand-up zipper pouches, review complete nutritional profiles, and request retail trade samples.
- **Target Audience**: Modern trade retail category buyers, supermarket procurement officers, distributors, and quality-conscious home cooks seeking unadulterated spices.
- **Key Value**: Bridges the gap between digital trade inquiries and physical supermarket shelf confidence by showing authentic, print-ready packaging artwork with 100% regulatory transparency.

---

## 2. User Experience & Visual Design

### The 5 Featured ARIKA Pouch Variants
1. **ARIKA Turmeric Powder (200g)**: Warm saffron yellow pouch, *"Pure. Natural. Aromatic."*, high-curcumin Lakadong/Salem roots, 354 kcal, 7.8g protein.
2. **ARIKA Red Chilli Powder (200g)**: Crimson red pouch, *"Bold. Pure. Authentic."*, Guntur stemless chillies, 282 kcal, 12.0g protein, natural heat & deep red color.
3. **ARIKA Coriander Powder (200g)**: Crisp botanical green pouch, *"Fresh. Earthy. Natural."*, Gujarat Dhana seeds, 298 kcal, 12.4g protein, high essential oil retention.
4. **ARIKA Cumin Powder (200g)**: Warm spice umber brown pouch, *"Strong. Warm. Flavourful."*, Unjha APMC Sortex-cleaned Jeera, 375 kcal, 17.8g protein.
5. **ARIKA Garam Masala Powder (200g)**: Rich espresso burgundy pouch, *"A Rich Blend of Natural Spices"*, whole cloves, cinnamon, green cardamom, black pepper, nutmeg & mace, 320 kcal, 11.2g protein.

### Interactive 3D Flip Card Interaction
- **Default Front View**: High-contrast pouch render, net weight 200g, aroma guarantee badges (*100% Natural, No Added Colours, Rich Aroma*), ceramic spice bowl imagery.
- **Hover/Tap Trigger**: A subtle interactive pill or hover effect (*"Tap to Flip / View Nutrition Facts & Back"*).
- **Smooth 3D Rotation**: Pouch card rotates smoothly along the Y-axis using CSS `transform: rotateY(180deg)` with hardware-accelerated 3D perspective (`perspective: 1000px`).
- **Back Panel Detail**:
  - Nutrition table per 100g (Energy, Protein, Carbohydrates, Fat).
  - Ingredient statement and regional spice variety name.
  - Storage guidelines (*"Store in a cool, dry place away from direct sunlight"*).
  - Barcode (`8 906123 45678x`), FSSAI license (`Lic. No. 11223344000056`), QR verification code, and recycling logos.
- **Full Collection Zoom Modal**: A "View Full 10-Pack Design Sheet" button opens a lightbox displaying the original high-resolution packaging artwork (`/assets/aistudio/ARIKA_Spice_Pouch_Packaging_Collection_38480970.png`) with crisp detail zoom.

### Visual Palette & Styling
- **Parent Institution**: Deep Navy (`#0A192F`), Warm Gold (`#D4AF37`), Warm Ivory (`#FAF8F5`).
- **ARIKA Product Hues**: Authentic color-coordinated brand accents matching each spice pouch:
  - Turmeric: `#D97706` (Amber Gold)
  - Red Chilli: `#DC2626` (Ruby Crimson)
  - Coriander: `#16A34A` (Leaf Green)
  - Cumin: `#854D0E` (Earthy Spice Ochre)
  - Garam Masala: `#4C1D95` / `#701A75` (Rich Deep Plum / Espresso)

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: CSS Pouch Crop vs. Static Full Image**
  - *Approach*: Crop individual pouches from the master collection image using precision responsive CSS backgrounds (`object-fit: cover` with focused aspect ratios) and provide an interactive interactive flip view alongside the master collection lightbox modal.
  - *Why*: Allows users to view and interact with each specific spice individually (e.g., flipping Turmeric separately from Chilli) while retaining the original ultra-crisp graphic quality.
- **Decision 2: Dual-Brand Coexistence (ARIKA by NEXARIS)**
  - *Approach*: Position "ARIKA by NEXARIS" as the consumer retail packaged goods brand, while "NEXARIS Foods & Agri Export" remains the corporate identity, manufacturing mill, and bulk export entity.
  - *Why*: Perfectly aligns with FMCG industry standards (like Tata Consumer / Tata Sampann or ITC / Aashirvaad) giving retail credibility without diluting corporate export scale.
- **Decision 3: RFQ Integration for Retail Distribution**
  - *Approach*: Add a "Request Retail Distribution / Sample Kit" action directly on the pouch cards that pre-fills the Enquiry Modal with the selected ARIKA spice variant and 200g pack size.

---

## 4. Technical Architecture & System Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXARIS WEB APPLICATION                         │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌─────────────────────┐             ┌────────────────────────────┐   │
│   │   Homepage (/)      │             │   Products Page (/products)│   │
│   │ ─────────────────── │             │ ────────────────────────── │   │
│   │ • Hero Banner       │             │ • Division Filters (Spices,│   │
│   │ • 5-Step Quality    │             │   Pulses, Dry Fruits)      │   │
│   │ • Welcome / About   │             │ • ARIKA Flagship Showcase  │   │
│   │ • Metrics Ledger    │             │ • Alternating Cards with   │   │
│   │ • [ARIKA SHOWCASE]  │◄────────────┤   Interactive 3D Flip      │   │
│   │ • Processing Mills  │             │ • Nutritional Drawer       │   │
│   │ • Certificates      │             │ • Other Products Matrix    │   │
│   │ • Connected Desk    │             └─────────────┬──────────────┘   │
│   └──────────┬──────────┘                           │                  │
│              │                                      │                  │
│              ▼                                      ▼                  │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                ArikaPouchCard (Interactive 3D)                 │   │
│   │ ────────────────────────────────────────────────────────────── │   │
│   │ • State: isFlipped (boolean), isModalOpen (boolean)            │   │
│   │ • Front Face: High-res pouch artwork, badges, aroma claims     │   │
│   │ • Back Face: Nutritional table, ingredients, barcode, FSSAI   │   │
│   │ • Action: Request Sample / Quick Retail Order                  │   │
│   └────────────────────────────────┬───────────────────────────────┘   │
│                                    │                                   │
│                                    ▼                                   │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │             Master Pouch Collection Lightbox Modal             │   │
│   │ ────────────────────────────────────────────────────────────── │   │
│   │ • High-resolution display of master artwork                    │   │
│   │   (/assets/aistudio/ARIKA_Spice_Pouch_Packaging_Collection... │   │
│   │ • 200g multi-angle front & back inspection                     │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & Data Modifications
1. **Data Model (`src/data/arikaProducts.ts` & `src/data/products.ts`)**:
   - Define the 5 ARIKA retail spice items with exact specs from the package artwork: net weight (200g), nutritional table (energy, protein, carbohydrate, fat), barcode, ingredients list, and aroma claims.
2. **`ArikaPouchCard.tsx`**:
   - Reusable component featuring CSS 3D perspective flip (`rotateY(180deg)`), flip toggle button, front design with raw spice callouts, back design with nutrition facts table, and "Enquire for Retail" CTA.
3. **`RetailBrandsShowcase.tsx`**:
   - Transform the homepage showcase section into the dedicated **"ARIKA by NEXARIS"** retail presentation.
   - Add "View Packaging Artwork Sheet" button linking to the master 10-pack collection image.
4. **`ProductsPage.tsx`**:
   - Feature the ARIKA 3D flip cards in the Spices division and prominently highlight retail availability alongside bulk container export options.
5. **Asset Reference**:
   - Use `/assets/aistudio/ARIKA_Spice_Pouch_Packaging_Collection_38480970.png` directly in code for the master artwork lightbox and high-resolution inspection.
