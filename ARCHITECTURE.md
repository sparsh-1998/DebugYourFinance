# DebugYourFinance - Architecture Documentation

## 📁 Project Structure

```
src/
├── components/
│   ├── common/              # Reusable styled components
│   │   ├── FormInput.jsx    # Text input with formatting & validation
│   │   ├── RangeSlider.jsx  # Range slider with label & value
│   │   ├── Toggle.jsx       # Toggle switch component
│   │   ├── ResultCard.jsx   # Result display card
│   │   ├── SectionHeader.jsx # Section header with icon
│   │   ├── AlertBanner.jsx  # Alert/warning/error messages
│   │   ├── ButtonGroup.jsx  # Button group selector
│   │   └── index.js         # Central export
│   │
│   ├── SIPCalculator.jsx    # ✅ Refactored with reusable components
│   ├── SWPCalculator.jsx
│   ├── TaxRegimeSimulator.jsx
│   ├── LoanTenureReducer.jsx
│   ├── RentVsBuyCalculator.jsx
│   └── ...
│
├── constants/
│   ├── messages.js          # All string constants
│   ├── validation.js        # Validation configuration
│   ├── routes.js            # Route & social link constants
│   └── index.js             # Central export
│
├── hooks/
│   ├── useFormattedNumber.js # Number formatting with validation
│   └── useLocalStorage.js
│
├── utils/
│   └── calculations.js      # Calculation functions
│
└── pages/
    ├── HomePage.jsx
    ├── ToolsPage.jsx
    └── SocialPage.jsx
```

---

## 🧩 Reusable Components

### 1. **FormInput**
Formatted text input with validation and Indian number formatting.

```jsx
import { FormInput } from './common';
import { LABEL_MONTHLY_INVESTMENT, PLACEHOLDER_10K, VALIDATION_SIP } from '../constants';

<FormInput
  label={LABEL_MONTHLY_INVESTMENT}
  value={monthlyInvestment}
  setValue={setMonthlyInvestment}
  validation={VALIDATION_SIP.monthlyInvestment}
  placeholder={PLACEHOLDER_10K}
/>
```

**Props:**
- `label`: Field label text
- `value`: Current numeric value
- `setValue`: State setter function
- `validation`: Validation rules object `{ min, max, allowDecimals, required }`
- `placeholder`: Placeholder text

---

### 2. **RangeSlider**
Range input with label and value display.

```jsx
import { RangeSlider } from './common';
import { LABEL_EXPECTED_RETURN } from '../constants';

<RangeSlider
  label={LABEL_EXPECTED_RETURN}
  value={expectedReturn}
  onChange={setExpectedReturn}
  min={6}
  max={20}
  step={0.5}
  unit="%"
/>
```

**Props:**
- `label`: Slider label
- `value`: Current value
- `onChange`: Change handler
- `min`, `max`, `step`: Range constraints
- `unit`: Unit suffix (e.g., "%", " years")

---

### 3. **Toggle**
Toggle switch with optional badge and description.

```jsx
import { Toggle } from './common';
import { SIP_STEPUP, SIP_STEPUP_DESC, SIP_STEPUP_BADGE } from '../constants';

<Toggle
  label={SIP_STEPUP}
  description={SIP_STEPUP_DESC}
  badge={SIP_STEPUP_BADGE}
  enabled={stepUpEnabled}
  onToggle={() => setStepUpEnabled(!stepUpEnabled)}
/>
```

**Props:**
- `label`: Toggle label
- `description`: Optional description text
- `badge`: Optional badge text
- `enabled`: Boolean state
- `onToggle`: Toggle handler

---

### 4. **ResultCard**
Display card for calculation results with variant styles.

```jsx
import { ResultCard } from './common';
import { SIP_INVESTED_AMOUNT } from '../constants';

<ResultCard
  label={SIP_INVESTED_AMOUNT}
  value={formatCurrency(results.investedAmount)}
  variant="accent"
  subtext="With 10% annual increase"
/>
```

**Props:**
- `label`: Card label
- `value`: Formatted value to display
- `variant`: Style variant (`default` | `primary` | `accent` | `success` | `error`)
- `subtext`: Optional subtitle

---

### 5. **SectionHeader**
Section header with icon and description.

```jsx
import { SectionHeader } from './common';
import { TrendingUp } from 'lucide-react';
import { CALC_SIP, CALC_SIP_DESC } from '../constants';

<SectionHeader
  icon={TrendingUp}
  title={CALC_SIP}
  description={CALC_SIP_DESC}
/>
```

**Props:**
- `icon`: Lucide icon component
- `title`: Header title
- `description`: Subtitle text

---

### 6. **AlertBanner**
Alert/warning/error message display.

```jsx
import { AlertBanner } from './common';

<AlertBanner
  type="error"
  title="Corpus Will Deplete!"
  message="Your corpus will last only 15 years."
/>
```

**Props:**
- `type`: Alert type (`info` | `warning` | `error` | `success`)
- `title`: Alert title
- `message`: Alert message
- `children`: Optional JSX content

---

### 7. **ButtonGroup**
Button group for selecting between options.

```jsx
import { ButtonGroup } from './common';

<ButtonGroup
  options={[
    { value: 'onetime', label: 'One-time' },
    { value: 'annual', label: 'Annual' },
    { value: 'monthly', label: 'Monthly' }
  ]}
  selected={frequency}
  onSelect={setFrequency}
  className="grid-cols-3"
/>
```

**Props:**
- `options`: Array of `{ value, label }` objects
- `selected`: Currently selected value
- `onSelect`: Selection handler
- `className`: Optional grid/flex classes

---

## 📝 Constants Structure

### **messages.js**
All user-facing strings:
- Brand names and taglines
- Navigation labels
- Calculator names and descriptions
- Form labels and placeholders
- Validation messages
- Result labels
- Help text

```js
// Brand
export const BRAND_NAME = 'DebugYourFinance';
export const BRAND_TAGLINE = 'Privacy-first financial calculators...';

// Calculator Names
export const CALC_SIP = 'SIP Calculator';
export const CALC_SIP_DESC = 'Plan your wealth growth';

// Labels
export const LABEL_MONTHLY_INVESTMENT = 'Monthly Investment';
export const PLACEHOLDER_10K = 'e.g., 10,000';

// Dynamic messages (functions)
export const SIP_STEPUP_NOTE = (initial, final, years, percentage) =>
  `Your monthly investment will grow from ${initial} to ${final}...`;
```

### **validation.js**
Validation configuration objects:

```js
export const VALIDATION_SIP = {
  monthlyInvestment: {
    min: 500,
    max: 10000000,
    allowDecimals: false,
    required: true
  }
};

export const VALIDATION_TAX = {
  income: { min: 0, allowDecimals: false, required: true },
  section80C: { min: 0, max: 150000, allowDecimals: false },
  // ...
};
```

### **routes.js**
Route paths and external URLs:

```js
export const ROUTES = {
  HOME: '/',
  TOOLS: '/tools',
  SOCIAL: '/social'
};

export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://instagram.com/debugyourfinance',
  TWITTER: 'https://twitter.com/debugyourfinance',
  LINKEDIN: 'https://linkedin.com/company/debugyourfinance'
};
```

---

## 🎯 Benefits of This Architecture

### 1. **Maintainability**
- ✅ Single source of truth for all strings
- ✅ Easy to update text across the app
- ✅ Consistent styling and behavior

### 2. **Reusability**
- ✅ No code duplication
- ✅ Consistent UI patterns
- ✅ Faster development

### 3. **Type Safety & Discoverability**
- ✅ Import from central constants
- ✅ IDE autocomplete works
- ✅ Refactoring is easier

### 4. **Internationalization Ready**
- ✅ All strings in one place
- ✅ Easy to add i18n later
- ✅ Dynamic message functions

### 5. **Testing**
- ✅ Components can be tested in isolation
- ✅ Constants can be verified
- ✅ Validation rules are centralized

---

## 🔄 Migration Guide

To migrate an existing calculator to use reusable components:

### Before:
```jsx
<div>
  <label className="flex justify-between items-center mb-2">
    <span className="text-sm font-medium text-slate-700">Monthly Investment</span>
    <span className="text-lg font-semibold text-accent">{formatCurrency(value)}</span>
  </label>
  <input
    type="text"
    value={formattedValue}
    onChange={handleChange}
    className={`w-full px-4 py-2 border-2 rounded-lg...`}
    placeholder="e.g., 10,000"
  />
  {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
</div>
```

### After:
```jsx
import { FormInput } from './common';
import { LABEL_MONTHLY_INVESTMENT, PLACEHOLDER_10K, VALIDATION_SIP } from '../constants';

<FormInput
  label={LABEL_MONTHLY_INVESTMENT}
  value={value}
  setValue={setValue}
  validation={VALIDATION_SIP.monthlyInvestment}
  placeholder={PLACEHOLDER_10K}
/>
```

**Lines of code:** 14 → 7 (50% reduction!)

---

## 📋 Checklist for Refactoring Other Calculators

- [ ] Import reusable components from `./common`
- [ ] Import constants from `../constants`
- [ ] Replace hardcoded strings with constants
- [ ] Replace input fields with `<FormInput>`
- [ ] Replace range sliders with `<RangeSlider>`
- [ ] Replace toggles with `<Toggle>`
- [ ] Replace result cards with `<ResultCard>`
- [ ] Replace section headers with `<SectionHeader>`
- [ ] Use validation constants from `validation.js`
- [ ] Test all functionality

---

## 🚀 Next Steps

1. **Refactor remaining calculators** to use reusable components
2. **Add more reusable components** as patterns emerge
3. **Create Storybook** documentation for components
4. **Add unit tests** for components and constants
5. **Consider i18n** for multi-language support

---

## 💡 Best Practices

### For Components:
- Keep components small and focused
- Accept props for configuration
- Use semantic prop names
- Provide sensible defaults
- Export from central `index.js`

### For Constants:
- Use UPPER_SNAKE_CASE for constants
- Group related constants together
- Use functions for dynamic messages
- Export from central `index.js`
- Document complex constants

### For Validation:
- Define validation rules once
- Reuse across similar fields
- Keep min/max values realistic
- Test edge cases

---

## 📖 Example: Full Calculator Refactor

See [SIPCalculator.jsx](src/components/SIPCalculator.jsx) for a complete example of:
- Using all reusable components
- Importing constants
- Clean, readable code
- Consistent patterns

**Before refactor:** ~240 lines
**After refactor:** ~190 lines
**Reduction:** 20% fewer lines, 2x more maintainable!
