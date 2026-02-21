import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Default values for all calculators
const defaultValues = {
  // Car Affordability Calculator
  car: {
    monthlySalary: 50000,
    onRoadPrice: 1000000,
    downPaymentPercent: 20,
    loanTenureYears: 4,
    interestRate: 9.5,
    fuelCost: 5000,
    insuranceCost: 2000,
    maintenanceCost: 1500,
  },

  // SIP Calculator
  sip: {
    monthlyInvestment: 10000,
    expectedReturn: 12,
    timePeriod: 10,
    stepUpEnabled: false,
    stepUpPercentage: 10,
  },

  // SWP Calculator
  swp: {
    lumpsumAmount: 5000000,
    monthlyWithdrawal: 30000,
    expectedReturn: 10,
    timePeriod: 20,
    inflationEnabled: false,
    inflationRate: 6,
  },

  // Tax Regime Simulator
  tax: {
    income: 1000000,
    section80C: 150000,
    section80D: 25000,
    hra: 0,
    npsPersonal: 0,
    npsEmployer: 0,
    otherDeductions: 0,
  },

  // Loan Tenure Reducer
  loan: {
    principal: 5000000,
    annualRate: 8.5,
    tenure: 20,
    prepayment: 100000,
    frequency: 'annual',
  },

  // Rent vs Buy Calculator
  rentVsBuy: {
    monthlyRent: 25000,
    annualRentIncrease: 5,
    homePrice: 5000000,
    downPayment: 1000000,
    interestRate: 8.5,
    loanTenure: 20,
    homeAppreciation: 5,
    expectedReturn: 12,
    timePeriod: 20,
  },

  // Budget Calculator (50/30/20 Rule)
  budget: {
    monthlySalary: 50000,
    annualBonus: 0,
    bonusEnabled: false,
    actualNeeds: 25000,
    actualWants: 15000,
    actualSavings: 10000,
  },
};

// Create the store with persist middleware
export const useCalculatorStore = create(
  persist(
    (set, get) => ({
      // State
      ...defaultValues,

      // Car Calculator Actions
      updateCar: (field, value) =>
        set((state) => ({
          car: { ...state.car, [field]: value },
        })),

      resetCar: () => set({ car: defaultValues.car }),

      // SIP Calculator Actions
      updateSIP: (field, value) =>
        set((state) => ({
          sip: { ...state.sip, [field]: value },
        })),

      resetSIP: () => set({ sip: defaultValues.sip }),

      // SWP Calculator Actions
      updateSWP: (field, value) =>
        set((state) => ({
          swp: { ...state.swp, [field]: value },
        })),

      resetSWP: () => set({ swp: defaultValues.swp }),

      // Tax Calculator Actions
      updateTax: (field, value) =>
        set((state) => ({
          tax: { ...state.tax, [field]: value },
        })),

      resetTax: () => set({ tax: defaultValues.tax }),

      // Loan Calculator Actions
      updateLoan: (field, value) =>
        set((state) => ({
          loan: { ...state.loan, [field]: value },
        })),

      resetLoan: () => set({ loan: defaultValues.loan }),

      // Rent vs Buy Calculator Actions
      updateRentVsBuy: (field, value) =>
        set((state) => ({
          rentVsBuy: { ...state.rentVsBuy, [field]: value },
        })),

      resetRentVsBuy: () => set({ rentVsBuy: defaultValues.rentVsBuy }),

      // Budget Calculator Actions
      updateBudget: (field, value) =>
        set((state) => ({
          budget: { ...state.budget, [field]: value },
        })),

      resetBudget: () => set({ budget: defaultValues.budget }),

      // Global Actions
      resetAllCalculators: () => set(defaultValues),

      // Debug/utility actions
      exportData: () => get(),
      importData: (data) => set(data),
    }),
    {
      name: 'debugyourfinance-storage',
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
