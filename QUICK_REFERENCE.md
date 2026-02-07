# Quick Reference - DebugYourFinance

## 🚀 Start Development

```bash
npm run dev
# Opens at: http://localhost:5173 or http://localhost:5174
```

---

## 📁 Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with tab navigation |
| `src/components/SIPCalculator.jsx` | SIP calculator component |
| `src/components/TaxRegimeSimulator.jsx` | Tax comparison tool |
| `src/components/LoanTenureReducer.jsx` | Loan prepayment calculator |
| `src/utils/calculations.js` | All financial formulas |
| `src/hooks/useLocalStorage.js` | localStorage persistence hook |
| `tailwind.config.js` | Custom colors & theme |

---

## 🎨 Custom Colors

```javascript
// Use in Tailwind classes
className="bg-primary"      // Slate-900 #0f172a
className="text-accent"     // Emerald-500 #10b981
className="bg-slate-50"     // Background #f8fafc
```

---

## 🧮 Calculator Functions

```javascript
import { calculateSIP, calculateTax, calculateEMI } from './utils/calculations';

// SIP
const result = calculateSIP(10000, 12, 10);
// Returns: { investedAmount, futureValue, wealthGained, yearlyData }

// Tax
const tax = calculateTax(1000000, deductions, 'old');
// Returns: { regime, taxableIncome, tax, takehome, deductions }

// EMI
const emi = calculateEMI(5000000, 8.5, 20);
// Returns: monthly EMI amount
```

---

## 💾 localStorage Keys

```javascript
// SIP
'sip_monthly', 'sip_return', 'sip_years'

// Tax
'tax_income', 'tax_deductions_80c', 'tax_deductions_80d', 'tax_hra', 'tax_homeloan'

// Loan
'loan_principal', 'loan_rate', 'loan_tenure', 'loan_prepayment', 'loan_frequency'
```

---

## 🔧 Common Tasks

### Add a new calculator
1. Create component in `src/components/NewCalculator.jsx`
2. Import in `App.jsx`
3. Add to `tools` array with id, name, component

### Modify color theme
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: { DEFAULT: '#0f172a' },
      accent: { DEFAULT: '#10b981' }
    }
  }
}
```

### Add new localStorage value
Use custom hook:
```javascript
import { useLocalStorage } from '../hooks/useLocalStorage';
const [value, setValue] = useLocalStorage('key_name', defaultValue);
```

---

## 🐛 If Something Breaks

### Tailwind not working?
```bash
npm uninstall tailwindcss
npm install -D tailwindcss@^3.4.0
```

### Charts not rendering?
Check recharts import:
```javascript
import { BarChart, Bar, XAxis, YAxis, ... } from 'recharts';
```

### localStorage not persisting?
Check browser settings (incognito mode blocks it)

---

## 📦 Build & Deploy

```bash
# Build
npm run build

# Preview
npm run preview

# Deploy to Vercel
npm install -g vercel
vercel
```

---

## 🎯 Test Checklist

- [ ] All 3 calculators work
- [ ] Charts render properly
- [ ] localStorage persists on refresh
- [ ] Mobile menu works
- [ ] Smooth scroll navigation works
- [ ] Instagram links work
- [ ] Responsive on mobile (375px)
- [ ] Responsive on tablet (768px)
- [ ] Responsive on desktop (1024px+)

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind breakpoints used
sm:  640px   // Small devices
md:  768px   // Tablets
lg:  1024px  // Laptops
xl:  1280px  // Desktops
```

---

## ⚡ Performance Tips

- Charts auto-resize with `ResponsiveContainer`
- Animations use `framer-motion` for GPU acceleration
- localStorage reads are cached in state
- Images use proper aspect ratios

---

## 🔗 Live URLs

**Development:** http://localhost:5174
**Instagram:** https://instagram.com/debugyourfinance
**Twitter:** https://twitter.com/debugyourfinance

---

**Made with ❤️ for financial freedom**
