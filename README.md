# 💰 DebugYourFinance

> Privacy-first financial tools for the modern investor. No login, no tracking, just pure value.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple)](https://vitejs.dev/)

**Live Demo:** [debugyourfinance.com](https://debugyourfinance.com)

---

## 🌟 Features

### Financial Calculators
- **SIP Calculator** - Plan systematic investments with step-up options
- **SWP Generator** - Design systematic withdrawal plans for retirement
- **Tax Regime Simulator** - Compare old vs new tax regimes (India)
- **Loan Tenure Reducer** - Optimize prepayments and reduce EMI burden
- **Rent vs Buy** - Make informed housing decisions

### Technical Highlights
- ✅ **Zero Dependencies on Backend** - Fully client-side
- ✅ **Privacy First** - All data stored locally, never leaves your device
- ✅ **Blazing Fast** - Optimized bundle (~256 KB gzipped)
- ✅ **Progressive Web App** - Install and use offline
- ✅ **Dark Mode** - Easy on the eyes
- ✅ **Responsive Design** - Works on all devices
- ✅ **SEO Optimized** - Structured data, meta tags
- ✅ **Accessible** - WCAG compliant with ARIA labels

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm 9+ or yarn/pnpm

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/DebugYourFinance.git
cd DebugYourFinance

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Visit \`http://localhost:5173\` to see the app running.

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| \`npm run dev\` | Start development server with HMR |
| \`npm run build\` | Build for production |
| \`npm run preview\` | Preview production build locally |
| \`npm run lint\` | Run ESLint |
| \`npm test\` | Run tests in watch mode |
| \`npm run test:run\` | Run tests once |
| \`npm run test:coverage\` | Generate coverage report |
| \`npm run test:ui\` | Open Vitest UI |

---

## 🏗️ Project Structure

\`\`\`
DebugYourFinance/
├── public/                 # Static assets
│   ├── favicon.svg        # App icon
│   ├── manifest.json      # PWA manifest
│   ├── robots.txt         # SEO
│   ├── sitemap.xml        # SEO
│   └── _headers           # Security headers
├── src/
│   ├── components/
│   │   ├── calculators/   # Calculator components
│   │   ├── common/        # Reusable UI components
│   │   ├── features/      # Feature-specific components
│   │   └── layout/        # Layout components
│   ├── constants/         # App constants & messages
│   ├── contexts/          # React contexts (Theme)
│   ├── data/              # Static data
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages
│   ├── utils/             # Utility functions
│   └── main.jsx           # App entry point
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
└── vercel.json            # Deployment config
\`\`\`

---

## 🧪 Testing

We use **Vitest** + **React Testing Library** for testing.

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Open test UI
npm run test:ui
\`\`\`

### Test Coverage
- ✅ Utility functions (calculations)
- ✅ Custom hooks (useFormattedNumber, useLocalStorage)
- ✅ Common components (FormInput, RangeSlider, ErrorBoundary)

---

## 🎨 Styling

- **Framework:** Tailwind CSS 3.4
- **Typography:** Inter font family
- **Color Palette:**
  - Primary: Slate shades
  - Accent: Green (#10b981)
  - Supports light & dark mode

---

## 🔒 Security

### Implemented Headers
- \`X-Frame-Options: DENY\`
- \`X-Content-Type-Options: nosniff\`
- \`X-XSS-Protection: 1; mode=block\`
- \`Referrer-Policy: strict-origin-when-cross-origin\`
- \`Permissions-Policy\` (restrictive)

### Data Privacy
- All calculations happen client-side
- No analytics or tracking scripts
- LocalStorage used for preferences only
- No personal data collected

---

## 🚢 Deployment

### Netlify / Cloudflare Pages
Security headers are automatically applied via \`public/_headers\`.

\`\`\`bash
npm run build
# Deploy the dist/ folder
\`\`\`

### Vercel
Security headers configured in \`vercel.json\`.

\`\`\`bash
vercel --prod
\`\`\`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite 7 | Build tool |
| React Router 7 | Client-side routing |
| Tailwind CSS 3 | Styling |
| Framer Motion | Animations |
| Recharts | Data visualization |
| Lucide React | Icons |
| Vitest | Testing |

---

## 📈 Performance

| Metric | Value |
|--------|-------|
| Bundle Size | ~256 KB (gzipped) |
| First Contentful Paint | < 1s |
| Time to Interactive | < 2s |
| Code Splitting | ✅ Per calculator |
| Lazy Loading | ✅ All pages |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

### Code Style
- Follow existing code patterns
- Run \`npm run lint\` before committing
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Font by [Google Fonts](https://fonts.google.com/)

---

## 📧 Contact

- Website: [debugyourfinance.com](https://debugyourfinance.com)
- Instagram: [@debugyourfinance](https://instagram.com/debugyourfinance)

---

**Made with ❤️ for smarter financial decisions**
