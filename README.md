# DebugYourFinance

**Master Your Money. Zero Friction.**

A privacy-first financial tools web application built with React, Vite, and Tailwind CSS. All calculations happen in your browser—no servers, no tracking, no compromises.

## Features

### 🧮 Financial Calculators

1. **SIP Calculator**
   - Calculate Systematic Investment Plan returns
   - Visualize wealth growth over time with interactive charts
   - See invested amount vs wealth gained

2. **Tax Regime Simulator**
   - Compare Old vs New Indian tax regimes (FY 2025-26)
   - Input multiple deductions (80C, 80D, HRA, Home Loan)
   - Get instant recommendations on which regime saves more

3. **Loan Tenure Reducer**
   - Calculate how prepayments reduce loan tenure
   - Visualize interest savings
   - Support for one-time, annual, and monthly prepayments

### 📱 Dynamic Instagram Integration

- **Live Feed**: Display your latest Instagram videos dynamically
- **Serverless Architecture**: Secure API integration via Vercel/Netlify Functions
- **Auto-Refresh**: Feed updates automatically (cached for 1 hour)
- **Fallback Support**: Graceful degradation if API is unavailable
- **Helper Scripts**: Automated token management tools included

👉 **[Quick Start (5 min)](INSTAGRAM_QUICK_START.md)** | **[Full Setup Guide](INSTAGRAM_SETUP.md)**

### 🔒 Privacy-First Design

- **No Login Required**: Start using tools immediately
- **No Server Sync**: All data stays in your browser
- **localStorage Persistence**: Your inputs are saved locally
- **Zero Tracking**: No analytics, no cookies, no compromises

### 🎨 Modern UI/UX

- **Minimalist Design**: Clean interface with Slate-900 and Emerald-500 color palette
- **Mobile-First**: Fully responsive across all devices
- **Smooth Animations**: Powered by Framer Motion
- **Interactive Charts**: Beautiful visualizations with Recharts

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Charts**: Recharts 2
- **Animations**: Framer Motion 11
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (recommended)
- npm 10+

### Installation

1. Navigate to the project directory:
```bash
cd DebugYourFinance
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Instagram Feed Setup (Optional)

To display your live Instagram videos:

1. Follow the [Instagram Setup Guide](INSTAGRAM_SETUP.md)
2. Create a `.env` file in the project root:
```bash
cp .env.example .env
```
3. Add your Instagram access token to `.env`:
```env
INSTAGRAM_ACCESS_TOKEN=your_token_here
```
4. Restart the development server

**Note:** The app works perfectly without Instagram integration - it will show placeholder content if not configured.

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
DebugYourFinance/
├── api/                    # Vercel serverless functions
│   └── instagram.js       # Instagram API endpoint
├── netlify/               # Netlify serverless functions
│   └── functions/
│       └── instagram.js   # Instagram API endpoint
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── SIPCalculator.jsx
│   │   ├── TaxRegimeSimulator.jsx
│   │   ├── LoanTenureReducer.jsx
│   │   ├── InstagramSection.jsx  # Dynamic Instagram feed
│   │   ├── AdBanner.jsx
│   │   ├── About.jsx
│   │   └── Footer.jsx
│   ├── hooks/             # Custom React hooks
│   │   └── useLocalStorage.js
│   ├── utils/             # Utility functions
│   │   └── calculations.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── .env.example           # Environment variables template
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── README.md
└── INSTAGRAM_SETUP.md     # Instagram API setup guide
```

## Features in Detail

### SIP Calculator

The SIP Calculator helps you plan your wealth growth through systematic investments.

**Inputs:**
- Monthly Investment: ₹500 - ₹10,00,000
- Expected Return: 6% - 20% p.a.
- Time Period: 1 - 30 years

**Outputs:**
- Total invested amount
- Wealth gained (returns)
- Future value
- Year-by-year growth chart

### Tax Regime Simulator

Compare Old vs New Indian tax regimes to maximize your savings.

**Old Regime (FY 2025-26):**
- Up to ₹2.5L: Nil
- ₹2.5L - ₹5L: 5%
- ₹5L - ₹10L: 20%
- Above ₹10L: 30%
- Deductions: Standard (₹50K) + 80C + 80D + HRA + 24b

**New Regime (FY 2025-26) - Budget 2025:**
- Up to ₹4L: Nil
- ₹4L - ₹8L: 5%
- ₹8L - ₹12L: 10%
- ₹12L - ₹16L: 15%
- ₹16L - ₹20L: 20%
- ₹20L - ₹24L: 25%
- Above ₹24L: 30%
- Deductions: Standard (₹75K) only
- **Special Benefit:** NIL tax up to ₹12L taxable income (Section 87A rebate)

### Loan Tenure Reducer

Calculate the impact of prepayments on your home loan.

**Inputs:**
- Loan amount
- Interest rate
- Original tenure
- Prepayment amount
- Prepayment frequency (one-time, annual, monthly)

**Outputs:**
- Reduced tenure
- Interest saved
- Total savings
- Principal reduction timeline chart

## localStorage Keys

The app uses the following localStorage keys to persist user data:

- `sip_monthly`: Monthly SIP investment
- `sip_return`: Expected return percentage
- `sip_years`: Investment time period
- `tax_income`: Annual income
- `tax_deductions_80c`: Section 80C deductions
- `tax_deductions_80d`: Section 80D deductions
- `tax_hra`: HRA amount
- `tax_homeloan`: Home loan interest
- `loan_principal`: Loan amount
- `loan_rate`: Interest rate
- `loan_tenure`: Loan tenure
- `loan_prepayment`: Prepayment amount
- `loan_frequency`: Prepayment frequency

## Deployment

This app can be deployed to any static hosting service:

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### GitHub Pages

1. Update `vite.config.js` with base path
2. Build and deploy the dist folder

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

## Contact

For questions or feedback, reach out:
- Instagram: [@DebugYourFinance](https://instagram.com/debugyourfinance)
- Twitter: [@DebugYourFinance](https://twitter.com/debugyourfinance)

---

Made with ❤️ for financial freedom
