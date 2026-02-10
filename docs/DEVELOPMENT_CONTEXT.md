# Development Context - DebugYourFinance

**Created:** February 7, 2026
**Project Type:** React + Vite + Tailwind CSS Web Application
**Status:** ✅ Complete and Running

---

## 🎯 Project Overview

**DebugYourFinance** is a privacy-first financial tools web application that provides three powerful calculators:
1. SIP Calculator
2. Tax Regime Simulator
3. Loan Tenure Reducer

**Core Philosophy:**
- No login/authentication required
- All data stays in browser (localStorage)
- Zero server-side processing
- Mobile-first responsive design
- Minimalist UI with trustworthy design

---

## 🏗️ What Was Built

### 1. Project Setup
- ✅ Vite + React 18 project scaffolding
- ✅ Tailwind CSS v3.4 with custom theme
- ✅ PostCSS and Autoprefixer configuration
- ✅ All dependencies installed (recharts, framer-motion, lucide-react)

### 2. Custom Utilities
**File:** `src/hooks/useLocalStorage.js`
- Custom React hook for localStorage persistence
- Automatic JSON serialization/deserialization
- Error handling for localStorage access

**File:** `src/utils/calculations.js`
- `calculateSIP()` - SIP future value calculation
- `calculateEMI()` - Loan EMI calculation
- `calculatePrepaymentImpact()` - Loan prepayment analysis
- `calculateTax()` - Indian tax calculation (Old & New regime)
- `formatCurrency()` - Indian currency formatting (₹, L, Cr)

### 3. Components Built

#### Layout Components
- **Navbar.jsx** - Sticky glassmorphism navbar with mobile hamburger menu
- **Hero.jsx** - Gradient hero section with Framer Motion animations
- **Footer.jsx** - Responsive footer with social links
- **AdBanner.jsx** - Reusable ad placeholder component

#### Content Components
- **About.jsx** - Privacy-focused about section with feature grid
- **InstagramSection.jsx** - Instagram reel-style cards (9:16 aspect ratio) with play icons

#### Calculator Components
- **SIPCalculator.jsx**
  - Inputs: Monthly investment, Return %, Time period
  - Recharts bar chart showing invested vs wealth gained
  - localStorage keys: `sip_monthly`, `sip_return`, `sip_years`

- **TaxRegimeSimulator.jsx**
  - Inputs: Income, 80C, 80D, HRA, Home Loan deductions
  - Compares Old vs New regime with recommendations
  - Side-by-side comparison UI with savings highlight
  - localStorage keys: `tax_income`, `tax_deductions_80c`, `tax_deductions_80d`, `tax_hra`, `tax_homeloan`

- **LoanTenureReducer.jsx**
  - Inputs: Principal, Interest rate, Tenure, Prepayment amount, Frequency
  - Recharts line chart showing principal reduction over time
  - Calculates tenure reduction and interest savings
  - localStorage keys: `loan_principal`, `loan_rate`, `loan_tenure`, `loan_prepayment`, `loan_frequency`

### 4. Main Application
**File:** `src/App.jsx`
- Tab-based navigation for three calculators
- Smooth transitions between tools
- Ad banner placements (below hero, between tools)
- Full page layout with all sections

---

## 🎨 Design Specifications

### Color Palette
```css
Primary (Slate-900): #0f172a
Accent (Emerald-500): #10b981
Background (Slate-50): #f8fafc
```

### Typography
- **Font Family:** Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800

### Responsive Breakpoints
- Mobile: 375px+ (1 column)
- Tablet: 768px+ (2 columns)
- Desktop: 1024px+ (3-4 columns)

### Animations
- Framer Motion entrance animations
- Fade-in-up pattern: `initial={{ opacity: 0, y: 20 }}`
- Smooth transitions on all interactive elements

---

## 🔧 Technical Stack

```json
{
  "framework": "React 18.3.1",
  "buildTool": "Vite 7.3.1",
  "styling": "Tailwind CSS 3.4.0",
  "charts": "Recharts 2.12.0",
  "animations": "Framer Motion 11.0.0",
  "icons": "Lucide React 0.460.0"
}
```

---

## 📐 Tax Calculation Details

### Old Regime (FY 2025-26)
```
Up to ₹2.5L: 0%
₹2.5L - ₹5L: 5%
₹5L - ₹10L: 20%
Above ₹10L: 30%
Plus 4% cess

Deductions:
- Standard: ₹50,000
- Section 80C: up to ₹1,50,000
- Section 80D: up to ₹50,000
- HRA: variable
- Home Loan Interest (24b): up to ₹2,00,000
```

### New Regime (FY 2025-26) - Budget 2025
```
Up to ₹4L: 0%
₹4L - ₹8L: 5%
₹8L - ₹12L: 10%
₹12L - ₹16L: 15%
₹16L - ₹20L: 20%
₹20L - ₹24L: 25%
Above ₹24L: 30%
Plus 4% cess

Deductions:
- Standard: ₹75,000 only

Special Benefits:
- Section 87A Rebate: NIL tax up to ₹12L taxable income
- Salaried individuals earning up to ₹12.75L pay NIL tax
  (₹12L + ₹75K standard deduction)
```

---

## 🧮 Financial Formulas Implemented

### SIP Calculation
```javascript
// Future Value Formula
FV = M × [((1 + r)^n - 1) / r] × (1 + r)

Where:
- M = Monthly investment
- r = Monthly rate (annual rate / 12 / 100)
- n = Total months (years × 12)
```

### EMI Calculation
```javascript
// EMI Formula
EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]

Where:
- P = Principal loan amount
- r = Monthly interest rate
- n = Tenure in months
```

### Prepayment Impact
- Reduces principal after each prepayment
- Recalculates remaining tenure with fixed EMI
- Tracks year-by-year principal reduction

---

## 🐛 Issues Resolved

### Issue 1: Tailwind CSS PostCSS Plugin Error
**Problem:** Vite 7 installed Tailwind CSS v4 by default, which requires `@tailwindcss/postcss`

**Error Message:**
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package
```

**Solution:** Downgraded to Tailwind CSS v3.4.0
```bash
npm uninstall tailwindcss
npm install -D tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0
```

**Status:** ✅ Resolved - Server running successfully

---

## 🚀 Current Status

### Development Server
- **URL:** http://localhost:5174
- **Status:** Running
- **Port:** 5174 (5173 was in use)

### Warnings (Non-blocking)
- Node.js version warning (20.17.0 vs required 20.19+)
  - App still works fine
  - Can be ignored or Node can be upgraded

---

## 📦 localStorage Keys Used

All calculator inputs are persisted in browser localStorage:

```javascript
// SIP Calculator
localStorage.getItem('sip_monthly')      // Monthly investment
localStorage.getItem('sip_return')       // Expected return %
localStorage.getItem('sip_years')        // Time period

// Tax Simulator
localStorage.getItem('tax_income')       // Annual income
localStorage.getItem('tax_deductions_80c')  // Section 80C
localStorage.getItem('tax_deductions_80d')  // Section 80D
localStorage.getItem('tax_hra')          // HRA
localStorage.getItem('tax_homeloan')     // Home loan interest

// Loan Reducer
localStorage.getItem('loan_principal')   // Loan amount
localStorage.getItem('loan_rate')        // Interest rate
localStorage.getItem('loan_tenure')      // Tenure in years
localStorage.getItem('loan_prepayment')  // Prepayment amount
localStorage.getItem('loan_frequency')   // onetime/annual/monthly
```

---

## 🎯 Features Implemented

### Core Functionality
- ✅ Three fully functional calculators
- ✅ Real-time calculation updates
- ✅ Interactive charts with tooltips
- ✅ localStorage persistence
- ✅ Mobile-responsive design

### UI/UX
- ✅ Tab navigation for calculators
- ✅ Smooth scroll navigation
- ✅ Mobile hamburger menu
- ✅ Framer Motion animations
- ✅ Glassmorphism effects

### Content
- ✅ Hero section with CTA
- ✅ Instagram section (links to @debugyourfinance)
- ✅ About section with privacy messaging
- ✅ Ad banner placeholders (2 locations)
- ✅ Footer with social links

---

## 📝 Next Steps (Optional Enhancements)

### Phase 1: Testing
- [ ] Test all calculators with edge cases
- [ ] Verify localStorage persistence after page refresh
- [ ] Test mobile responsiveness on real devices
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

### Phase 2: Deployment
- [ ] Build production bundle (`npm run build`)
- [ ] Deploy to Vercel
- [ ] Set up custom domain (optional)
- [ ] Configure meta tags for SEO

### Phase 3: Future Features (Out of Scope)
- [ ] Dark mode toggle
- [ ] Export calculator results as PDF
- [ ] Additional calculators (retirement planning)
- [ ] Real Instagram API integration
- [ ] Google Adsense integration
- [ ] User accounts for saving scenarios

---

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies (if needed)
npm install

# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 📂 Project Structure

```
DebugYourFinance/
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navbar with mobile menu
│   │   ├── Hero.jsx            # Hero section with animations
│   │   ├── SIPCalculator.jsx   # SIP calculator with chart
│   │   ├── TaxRegimeSimulator.jsx  # Tax comparison tool
│   │   ├── LoanTenureReducer.jsx   # Loan prepayment calculator
│   │   ├── InstagramSection.jsx    # Instagram feed showcase
│   │   ├── AdBanner.jsx        # Reusable ad component
│   │   ├── About.jsx           # About/privacy section
│   │   └── Footer.jsx          # Footer with links
│   ├── hooks/
│   │   └── useLocalStorage.js  # Custom localStorage hook
│   ├── utils/
│   │   └── calculations.js     # Financial calculation functions
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles + Tailwind
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── vite.config.js               # Vite configuration
├── README.md                    # User documentation
└── DEVELOPMENT_CONTEXT.md       # This file (dev context)
```

---

## 🔗 Important Links

- **Instagram:** https://instagram.com/debugyourfinance
- **Twitter:** https://twitter.com/debugyourfinance
- **LinkedIn:** https://linkedin.com/company/debugyourfinance

---

## 💡 Key Implementation Notes

1. **No Backend Required:** Everything runs client-side
2. **Privacy First:** No data leaves the browser
3. **Modular Components:** Each calculator is self-contained
4. **Reusable Logic:** Calculations separated in utils
5. **Type Safety:** While using JS, code is structured for easy TS migration
6. **Performance:** Charts use memoization, calculations are optimized
7. **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation

---

## 🎓 Code Quality Notes

### Best Practices Followed
- ✅ Component composition over inheritance
- ✅ Custom hooks for shared logic
- ✅ Utility functions for calculations
- ✅ Consistent naming conventions
- ✅ Mobile-first CSS approach
- ✅ Error handling in localStorage access
- ✅ Responsive images with proper aspect ratios

### Architecture Decisions
- **Tab Navigation:** Chosen over card grid for better UX
- **localStorage:** Chosen over IndexedDB for simplicity
- **Recharts:** Chosen for React integration and customization
- **Tailwind CSS:** Chosen for rapid development and consistency

---

**End of Development Context**

*This document serves as a complete reference for the DebugYourFinance project development.*
