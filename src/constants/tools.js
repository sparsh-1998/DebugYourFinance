import { lazy } from 'react';

// Lazy load calculator components
const SIPCalculator = lazy(() => import('../components/calculators/SIPCalculator'));
const SWPCalculator = lazy(() => import('../components/calculators/SWPCalculator'));
const TaxRegimeSimulator = lazy(() => import('../components/calculators/TaxRegimeSimulator'));
const LoanTenureReducer = lazy(() => import('../components/calculators/LoanTenureReducer'));
const RentVsBuyCalculator = lazy(() => import('../components/calculators/RentVsBuyCalculator'));
const CarAffordabilityCalculator = lazy(() => import('../components/calculators/CarAffordabilityCalculator'));
const BudgetCalculator = lazy(() => import('../components/calculators/BudgetCalculator'));

// Centralized tools configuration
export const TOOLS = [
  { id: 'sip', name: 'SIP Calculator', component: SIPCalculator },
  { id: 'swp', name: 'SWP Generator', component: SWPCalculator },
  { id: 'tax', name: 'Tax Simulator', component: TaxRegimeSimulator },
  { id: 'loan', name: 'Loan Reducer', component: LoanTenureReducer },
  { id: 'rent-vs-buy', name: 'Rent vs Buy', component: RentVsBuyCalculator },
  { id: 'car', name: 'Car Affordability Check', component: CarAffordabilityCalculator },
  { id: 'budget', name: 'Monthly Budget Calculator', component: BudgetCalculator },
];

// Helper to get valid tool IDs
export const VALID_TOOL_IDS = TOOLS.map(tool => tool.id);

// Default tool
export const DEFAULT_TOOL = 'sip';
