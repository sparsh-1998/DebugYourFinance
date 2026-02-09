# Theme System Guide

## 🎨 Overview

DebugYourFinance now supports **Light** and **Dark** themes with a toggle button in the navbar!

---

## 📁 Architecture

### **ThemeContext** ([src/contexts/ThemeContext.jsx](src/contexts/ThemeContext.jsx))

Provides global theme state using React Context API:

```jsx
import { useTheme } from '../contexts/ThemeContext';

function Component() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

**API:**
- `theme`: Current theme string (`'light'` | `'dark'`)
- `setTheme(newTheme)`: Set theme directly
- `toggleTheme()`: Toggle between light/dark
- `isDark`: Boolean helper (`true` if dark mode)

---

## 🔧 Implementation

### **1. Theme Provider** (App.jsx)

Wraps the entire app to provide theme context:

```jsx
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### **2. Theme Toggle Button** (Navbar.jsx)

Added to the navbar with Sun/Moon icons:

```jsx
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const { theme, toggleTheme } = useTheme();

<button onClick={toggleTheme} className="...">
  {theme === 'light' ? <Moon /> : <Sun />}
</button>
```

### **3. Tailwind Configuration** (tailwind.config.js)

Enabled class-based dark mode:

```js
export default {
  darkMode: 'class', // ✅ Enable dark mode with class strategy
  // ...
}
```

### **4. Base Styles** (index.css)

Added dark mode colors with smooth transitions:

```css
body {
  @apply bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100;
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

---

## 🎨 Using Dark Mode in Components

### **Tailwind Dark Mode Classes**

Use the `dark:` variant for dark mode styles:

```jsx
<div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
  Content
</div>
```

### **Common Patterns**

**Background colors:**
```jsx
className="bg-slate-50 dark:bg-slate-900"
className="bg-white dark:bg-slate-800"
className="bg-slate-100 dark:bg-slate-700"
```

**Text colors:**
```jsx
className="text-slate-900 dark:text-slate-100"
className="text-slate-700 dark:text-slate-300"
className="text-slate-600 dark:text-slate-400"
```

**Borders:**
```jsx
className="border-slate-200 dark:border-slate-700"
className="border-slate-300 dark:border-slate-600"
```

**Hover states:**
```jsx
className="hover:bg-slate-100 dark:hover:bg-slate-700"
className="hover:text-slate-900 dark:hover:text-white"
```

---

## 📋 Component Checklist

To make a component dark-mode compatible:

### ✅ Backgrounds
- [ ] Page/section backgrounds
- [ ] Card backgrounds
- [ ] Modal/popup backgrounds
- [ ] Input backgrounds

### ✅ Text
- [ ] Headings
- [ ] Body text
- [ ] Labels
- [ ] Placeholders

### ✅ Borders
- [ ] Card borders
- [ ] Input borders
- [ ] Dividers

### ✅ Interactive Elements
- [ ] Button hover states
- [ ] Link hover states
- [ ] Focus states
- [ ] Active states

### ✅ Charts & Visualizations
- [ ] Chart backgrounds
- [ ] Grid lines
- [ ] Axis colors
- [ ] Tooltips

---

## 🚀 Example: Complete Component

```jsx
export default function Calculator() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6">
      {/* Header */}
      <h3 className="text-2xl font-bold text-primary dark:text-white">
        SIP Calculator
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Plan your wealth growth
      </p>

      {/* Input */}
      <input
        type="text"
        className="w-full px-4 py-2 border-2 border-slate-200 dark:border-slate-700
                   bg-white dark:bg-slate-900 text-slate-900 dark:text-white
                   rounded-lg focus:border-accent focus:outline-none transition-colors"
        placeholder="Enter amount"
      />

      {/* Result Card */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border-2 border-slate-200 dark:border-slate-600">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
          Invested Amount
        </p>
        <p className="text-2xl font-bold text-primary dark:text-white">
          ₹10,00,000
        </p>
      </div>
    </div>
  );
}
```

---

## 🎯 Color System

### **Semantic Colors**

| Usage | Light Mode | Dark Mode |
|-------|------------|-----------|
| **Background** | `bg-slate-50` | `bg-slate-900` |
| **Card Background** | `bg-white` | `bg-slate-800` |
| **Alt Background** | `bg-slate-100` | `bg-slate-700` |
| **Text Primary** | `text-slate-900` | `text-white` |
| **Text Secondary** | `text-slate-700` | `text-slate-300` |
| **Text Tertiary** | `text-slate-600` | `text-slate-400` |
| **Border** | `border-slate-200` | `border-slate-700` |
| **Border Alt** | `border-slate-300` | `border-slate-600` |
| **Accent** | `text-accent` | `text-accent` |

### **Accent Color**

The accent color (green) works in both themes:
```jsx
className="text-accent bg-accent hover:bg-accent/90"
```

---

## 💾 Persistence

Theme preference is automatically saved to localStorage:

```js
// Automatically persisted
localStorage.setItem('theme', 'dark');

// Automatically loaded on page refresh
const savedTheme = localStorage.getItem('theme') || 'light';
```

---

## 🔍 Testing Dark Mode

### **Manual Testing:**
1. Click the Sun/Moon icon in the navbar
2. Verify all components update
3. Refresh page - theme should persist
4. Test on mobile (responsive theme toggle)

### **Visual Checklist:**
- [ ] Navbar looks good
- [ ] Footer looks good
- [ ] All calculator cards readable
- [ ] Input fields visible
- [ ] Buttons have proper contrast
- [ ] Charts remain legible
- [ ] No white boxes in dark mode
- [ ] Smooth transitions

---

## 🎨 Brand Colors Stay Consistent

These colors work in both themes:
- **Accent Green:** `#10b981` (emerald-500)
- **Logo/Icon:** Always uses accent color
- **Charts:** Use consistent color palette

---

## 🚧 TODO: Apply Dark Mode to Remaining Components

Current status:
- ✅ ThemeContext created
- ✅ Navbar updated
- ✅ Theme toggle added
- ✅ Base styles updated
- ⚠️ Calculator components need dark mode classes
- ⚠️ Footer needs dark mode classes
- ⚠️ Hero section needs dark mode classes
- ⚠️ About section needs dark mode classes

### **Quick Migration Pattern:**

For each component, find and replace:
```jsx
// Old
className="bg-white text-slate-900"

// New
className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
```

---

## 📖 Best Practices

1. **Always pair background with text color**
   ```jsx
   // ✅ Good
   className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white"

   // ❌ Bad (text might be invisible)
   className="bg-white dark:bg-slate-800"
   ```

2. **Use semantic colors, not hardcoded values**
   ```jsx
   // ✅ Good
   className="text-slate-700 dark:text-slate-300"

   // ❌ Bad
   style={{ color: '#333' }}
   ```

3. **Test hover states in both themes**
   ```jsx
   className="hover:bg-slate-100 dark:hover:bg-slate-700"
   ```

4. **Maintain sufficient contrast**
   - Light backgrounds → dark text
   - Dark backgrounds → light text
   - Test with WCAG contrast checker

5. **Keep accent colors consistent**
   - Green accent works in both themes
   - Don't change brand colors for dark mode

---

## 🎉 Benefits

✅ **Better UX** - Users can choose preferred theme
✅ **Eye Strain** - Dark mode reduces eye strain in low light
✅ **Modern** - Expected feature in 2024+ apps
✅ **Accessibility** - Helps users with light sensitivity
✅ **Battery** - Dark mode saves battery on OLED screens
✅ **Professional** - Shows attention to detail

---

## 🔗 Resources

- [Tailwind Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)
- [React Context API](https://react.dev/reference/react/createContext)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
