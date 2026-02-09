# Reusable Component Library

Complete guide to all reusable components in DebugYourFinance.

---

## 📦 Available Components

### **Form Components**

#### `FormInput`
Text input with label, formatting, and validation.

```jsx
<FormInput
  label="Monthly Investment"
  value={amount}
  setValue={setAmount}
  validation={{ min: 500, max: 100000, allowDecimals: false, required: true }}
  placeholder="e.g., 10,000"
  className="mb-4"
/>
```

**Props:**
- `label` (string) - Input label
- `value` (number) - Current value
- `setValue` (function) - Value setter
- `validation` (object) - Validation rules: `{ min, max, allowDecimals, required }`
- `placeholder` (string) - Placeholder text
- `className` (string) - Additional classes

#### `RangeSlider`
Range slider with label and value display.

```jsx
<RangeSlider
  label="Expected Return"
  value={returnRate}
  onChange={setReturnRate}
  min={6}
  max={20}
  step={0.5}
  unit="%"
/>
```

**Props:**
- `label` (string) - Slider label
- `value` (number) - Current value
- `onChange` (function) - Change handler
- `min` (number) - Minimum value
- `max` (number) - Maximum value
- `step` (number) - Step increment
- `unit` (string) - Unit suffix (e.g., "%", " years")
- `className` (string) - Additional classes

#### `Toggle`
Toggle switch with optional badge and description.

```jsx
<Toggle
  label="Enable Step-Up"
  description="Increase investment annually"
  badge="Advanced"
  enabled={stepUpEnabled}
  onToggle={() => setStepUpEnabled(!stepUpEnabled)}
/>
```

**Props:**
- `label` (string) - Toggle label
- `description` (string, optional) - Helper text
- `badge` (string, optional) - Badge text
- `enabled` (boolean) - Current state
- `onToggle` (function) - Toggle handler
- `className` (string) - Additional classes

#### `ButtonGroup`
Group of selectable buttons.

```jsx
<ButtonGroup
  options={[
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' }
  ]}
  selected={frequency}
  onSelect={setFrequency}
  className="grid-cols-2"
/>
```

**Props:**
- `options` (array) - Array of `{ value, label }` objects
- `selected` (string) - Currently selected value
- `onSelect` (function) - Selection handler
- `className` (string) - Additional classes (e.g., `"grid-cols-3"`)

---

### **Display Components**

#### `ResultCard`
Display card for calculation results.

```jsx
<ResultCard
  label="Future Value"
  value={formatCurrency(10000000)}
  variant="primary"
  subtext="Including gains"
/>
```

**Props:**
- `label` (string) - Card label
- `value` (string) - Formatted value to display
- `variant` (string) - Style variant: `'default'`, `'primary'`, `'accent'`, `'success'`, `'error'`
- `subtext` (string, optional) - Additional info text
- `className` (string) - Additional classes

#### `ComparisonCard`
Card for side-by-side comparisons.

```jsx
<ComparisonCard
  title="Old Regime"
  icon={Receipt}
  iconColor="text-primary"
  variant="default"
  items={[
    { label: 'Tax Payable:', value: '₹2,50,000', valueColor: 'text-red-600' },
    { label: 'Take-home:', value: '₹7,50,000', bordered: true }
  ]}
/>
```

**Props:**
- `title` (string) - Card title
- `icon` (component, optional) - Icon component
- `iconColor` (string) - Icon color class
- `variant` (string) - Style variant: `'default'`, `'accent'`, `'primary'`
- `items` (array) - Array of `{ label, value, valueColor, bordered }` objects
- `className` (string) - Additional classes

#### `HighlightCard`
Gradient card for highlighting savings/results.

```jsx
<HighlightCard
  title="Your Savings"
  items={[
    { label: 'Interest Saved', value: '₹5,00,000' },
    { label: 'Tenure Reduced', value: '5 years' }
  ]}
  gradient="from-accent to-emerald-600"
/>
```

**Props:**
- `title` (string, optional) - Card title
- `items` (array) - Array of `{ label, value }` objects
- `gradient` (string) - Tailwind gradient classes (default: `'from-accent to-emerald-600'`)
- `className` (string) - Additional classes

#### `SectionHeader`
Section header with icon and description.

```jsx
<SectionHeader
  icon={TrendingUp}
  title="SIP Calculator"
  description="Plan your systematic investment"
/>
```

**Props:**
- `icon` (component) - Icon component (from lucide-react)
- `title` (string) - Section title
- `description` (string) - Section description
- `className` (string) - Additional classes

---

### **Feedback Components**

#### `AlertBanner`
Alert/notification banner with variants.

```jsx
<AlertBanner
  type="warning"
  title="High Withdrawal Rate"
  message="Your corpus may deplete before the target period."
/>
```

**Props:**
- `type` (string) - Alert type: `'info'`, `'warning'`, `'error'`, `'success'`
- `title` (string, optional) - Alert title
- `message` (string, optional) - Alert message
- `children` (node, optional) - Custom content
- `className` (string) - Additional classes

#### `InfoBox`
Info/note box with variants.

```jsx
<InfoBox variant="info" icon={AlertCircle}>
  Your monthly investment will increase by 10% annually.
</InfoBox>
```

**Props:**
- `children` (node) - Box content
- `variant` (string) - Style variant: `'info'`, `'warning'`, `'error'`, `'success'`, `'gradient'`
- `icon` (component, optional) - Icon component
- `className` (string) - Additional classes

---

### **Container Components**

#### `ChartContainer`
Container for charts with consistent styling.

```jsx
<ChartContainer
  title="Growth Projection"
  subtitle="(Step-Up SIP)"
>
  <ResponsiveContainer width="100%" height={300}>
    {/* Your chart */}
  </ResponsiveContainer>
</ChartContainer>
```

**Props:**
- `title` (string, optional) - Chart title
- `subtitle` (string, optional) - Chart subtitle (displayed inline with title)
- `children` (node) - Chart content
- `className` (string) - Additional classes

---

## 🎨 Component Variants

### ResultCard Variants
- **default** - Neutral gray card
- **primary** - Navy blue highlight
- **accent** - Green highlight
- **success** - Green success card
- **error** - Red error card

### ComparisonCard Variants
- **default** - Gray card for neutral comparisons
- **accent** - Green card for highlighted option
- **primary** - Navy blue card

### InfoBox Variants
- **info** - Light accent for informational notes
- **warning** - Yellow for warnings
- **error** - Red for errors
- **success** - Green for success messages
- **gradient** - Accent gradient for special notes

### AlertBanner Types
- **info** - Blue informational alert
- **warning** - Yellow warning alert
- **error** - Red error alert
- **success** - Green success alert

---

## 📝 Usage Examples

### Calculator Input Section
```jsx
<div className="space-y-6">
  <FormInput
    label="Investment Amount"
    value={amount}
    setValue={setAmount}
    validation={{ min: 1000, max: 10000000, required: true }}
    placeholder="e.g., 50,000"
  />

  <RangeSlider
    label="Expected Return"
    value={returnRate}
    onChange={setReturnRate}
    min={8}
    max={18}
    step={0.5}
    unit="%"
  />

  <Toggle
    label="Enable Auto-Increment"
    description="Increase investment by 10% annually"
    enabled={autoIncrement}
    onToggle={() => setAutoIncrement(!autoIncrement)}
  />
</div>
```

### Results Display
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <ResultCard
    label="Invested Amount"
    value={formatCurrency(invested)}
    variant="default"
  />
  <ResultCard
    label="Wealth Gained"
    value={formatCurrency(gains)}
    variant="accent"
  />
  <ResultCard
    label="Future Value"
    value={formatCurrency(total)}
    variant="primary"
  />
</div>
```

### Comparison Section
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <ComparisonCard
    title="Option A"
    icon={TrendingDown}
    items={[
      { label: 'Cost:', value: '₹50,000' },
      { label: 'Savings:', value: '₹10,000', valueColor: 'text-green-600' }
    ]}
  />

  <ComparisonCard
    title="Option B"
    icon={TrendingUp}
    variant="accent"
    items={[
      { label: 'Cost:', value: '₹45,000' },
      { label: 'Savings:', value: '₹15,000', valueColor: 'text-accent' }
    ]}
  />
</div>
```

### Chart with Info
```jsx
<ChartContainer title="Growth Over Time" subtitle="(With Annual Increase)">
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      {/* Chart configuration */}
    </BarChart>
  </ResponsiveContainer>

  <InfoBox variant="info" className="mt-4">
    <strong>Note:</strong> Chart shows projected growth with 10% annual increase.
  </InfoBox>
</ChartContainer>
```

---

## 🌓 Dark Mode Support

All components have **built-in dark mode support**:
- Automatically adapt to light/dark themes
- No additional configuration needed
- Consistent styling across themes
- Proper contrast maintained

Components use Tailwind's `dark:` variant internally for seamless theme switching.

---

## 📂 Import Path

All components are exported from a central location:

```jsx
import {
  FormInput,
  RangeSlider,
  Toggle,
  ButtonGroup,
  ResultCard,
  ComparisonCard,
  HighlightCard,
  SectionHeader,
  AlertBanner,
  InfoBox,
  ChartContainer
} from './common';
```

---

## ✨ Benefits

1. **Consistency** - Uniform styling across all calculators
2. **Maintainability** - Update styles in one place
3. **Dark Mode** - Built-in theme support
4. **Validation** - Form components handle validation automatically
5. **Accessibility** - Proper ARIA labels and semantic HTML
6. **Responsive** - Mobile-friendly by default
7. **Type Safety** - Clear prop interfaces
8. **Code Reduction** - Less boilerplate in calculator components

---

## 🔧 Validation Rules

FormInput accepts validation object with these options:

```jsx
validation={{
  min: 1000,              // Minimum value
  max: 100000,            // Maximum value
  allowDecimals: false,   // Allow decimal values (default: true)
  required: true          // Field is required
}}
```

Error messages are automatically formatted and displayed below the input.

---

## 📊 Calculator Components Refactored

All calculator components now use these reusable components:

✅ **SIPCalculator** - Fully refactored (193 lines)
✅ **TaxRegimeSimulator** - Uses common patterns
✅ **LoanTenureReducer** - Fully refactored (206 lines, -24% code)
✅ **SWPCalculator** - Fully refactored (228 lines, -21% code)
✅ **RentVsBuyCalculator** - Fully refactored (342 lines, -20% code)

**Total code reduction:** ~22% across all calculators
**Improved maintainability:** Single source of truth for component styles
