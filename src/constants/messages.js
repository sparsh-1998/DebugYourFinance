/**
 * Application-wide string constants
 */

// Brand
export const BRAND_NAME = 'DebugYourFinance';
export const BRAND_TAGLINE = 'Privacy-first financial calculators. No login, no tracking, just pure value.';
export const FOOTER_TAGLINE = 'for financial freedom.';

// Navigation
export const NAV_HOME = 'Home';
export const NAV_TOOLS = 'Tools';
export const NAV_SOCIALS = 'Socials';

// Hero Section
export const HERO_TITLE = 'Take Control of Your Financial Future';
export const HERO_SUBTITLE = 'Free, privacy-focused calculators for SIP, tax planning, loan optimization, and more. No signup required.';
export const HERO_CTA = 'Explore Tools';

// Page Titles
export const PAGE_TITLE_TOOLS = 'Financial Tools';

// Calculator Names
export const CALC_SIP = 'SIP Calculator';
export const CALC_SWP = 'SWP Generator';
export const CALC_TAX = 'Tax Simulator';
export const CALC_LOAN = 'Loan Reducer';
export const CALC_RENT_VS_BUY = 'Rent vs Buy';
export const CALC_CAR_AFFORDABILITY = 'Car Affordability Check';

// Calculator Descriptions
export const CALC_SIP_DESC = 'Plan your wealth growth';
export const CALC_SWP_DESC = 'Systematic Withdrawal Plan - Make your corpus last';
export const CALC_TAX_DESC = 'Compare Old vs New tax regime (FY 2025-26)';
export const CALC_LOAN_DESC = 'Calculate prepayment impact';
export const CALC_RENT_VS_BUY_DESC = 'Make the right housing decision with opportunity cost analysis';
export const CALC_CAR_AFFORDABILITY_DESC = 'Smart car buying with the 20/4/10 rule';

// Common Labels
export const LABEL_EXPECTED_RETURN = 'Expected Return (% p.a.)';
export const LABEL_TIME_PERIOD = 'Time Period (Years)';
export const LABEL_ANNUAL_INCOME = 'Annual Gross Income';
export const LABEL_MONTHLY_INVESTMENT = 'Monthly Investment';
export const LABEL_LOAN_AMOUNT = 'Loan Amount';
export const LABEL_INTEREST_RATE = 'Interest Rate (% p.a.)';
export const LABEL_PREPAYMENT_AMOUNT = 'Prepayment Amount';
export const LABEL_MONTHLY_WITHDRAWAL = 'Monthly Withdrawal';
export const LABEL_LUMPSUM_AMOUNT = 'Retirement Corpus / Lumpsum Amount';
export const LABEL_MONTHLY_RENT = 'Monthly Rent';
export const LABEL_HOME_PRICE = 'Home Price';
export const LABEL_DOWN_PAYMENT = 'Down Payment (20% typical)';
export const LABEL_LOAN_TENURE = 'Loan Tenure (Years)';

// Placeholders
export const PLACEHOLDER_10K = 'e.g., 10,000';
export const PLACEHOLDER_10L = 'e.g., 10,00,000';
export const PLACEHOLDER_150K = 'e.g., 1,50,000';
export const PLACEHOLDER_50K = 'e.g., 50,000';
export const PLACEHOLDER_2L = 'e.g., 2,00,000';
export const PLACEHOLDER_1L = 'e.g., 1,00,000';
export const PLACEHOLDER_40L = 'e.g., 40,00,000';
export const PLACEHOLDER_50L = 'e.g., 50,00,000';
export const PLACEHOLDER_25K = 'e.g., 25,000';
export const PLACEHOLDER_30K = 'e.g., 30,000';

// Validation Messages
export const VALIDATION_REQUIRED = 'This field is required';
export const VALIDATION_MIN = (value) => `Minimum value is ${value}`;
export const VALIDATION_MAX = (value) => `Maximum value is ${value}`;

// Tax Calculator Specific
export const TAX_SECTION_80C = 'Section 80C - PPF, ELSS, EPF (max ₹1.5L)';
export const TAX_SECTION_80D = 'Section 80D - Health Insurance (max ₹50K)';
export const TAX_HRA = 'HRA - House Rent Allowance';
export const TAX_NPS_PERSONAL = '80CCD(1B) - Personal NPS (max ₹50K)';
export const TAX_NPS_EMPLOYER = '80CCD(2) - Employer NPS Contribution';
export const TAX_OTHER_DEDUCTIONS = 'Other Deductions';
export const TAX_DEDUCTIONS_SECTION = 'Deductions (Old Regime Only)';
export const TAX_OLD_REGIME = 'Old Regime';
export const TAX_NEW_REGIME = 'New Regime';
export const TAX_GROSS_INCOME = 'Gross Income:';
export const TAX_TOTAL_DEDUCTIONS = 'Total Deductions:';
export const TAX_TAXABLE_INCOME = 'Taxable Income:';
export const TAX_PAYABLE = 'Tax Payable:';
export const TAX_TAKEHOME = 'Take-home:';
export const TAX_VISUAL_COMPARISON = 'Visual Comparison';
export const TAX_NPS_PERSONAL_HELP = 'Additional deduction over 80C';
export const TAX_NPS_EMPLOYER_HELP = 'Limit: 10% of basic salary';
export const TAX_OTHER_DEDUCTIONS_HELP = 'Includes: Home Loan Interest (24b, max ₹2L), LTA, Education Loan (80E), Donations (80G), Savings Interest (80TTA/TTB), and other eligible deductions';
export const TAX_RECOMMENDATION = (savings) => `Choose ${savings > 0 ? 'Old' : 'New'} Regime for maximum savings`;

// SIP Calculator Specific
export const SIP_STEPUP = 'Step-Up SIP';
export const SIP_STEPUP_DESC = 'Increase investment annually';
export const SIP_STEPUP_BADGE = 'NEW';
export const SIP_STEPUP_PERCENTAGE = 'Annual Step-Up %';
export const SIP_INVESTED_AMOUNT = 'Invested Amount';
export const SIP_WEALTH_GAINED = 'Wealth Gained';
export const SIP_FUTURE_VALUE = 'Future Value';
export const SIP_GROWTH_PROJECTION = 'Growth Projection';
export const SIP_STEPUP_NOTE = (initial, final, years, percentage) =>
  `Your monthly investment will grow from ${initial} to ${final} by year ${years} with ${percentage}% annual increase.`;
export const CHART_SUBTITLE_STEP_UP = '(Step-Up SIP)';

// Loan Calculator Specific
export const LOAN_MONTHLY_EMI = 'Monthly EMI';
export const LOAN_PREPAYMENT_FREQUENCY = 'Prepayment Frequency';
export const LOAN_FREQ_ONETIME = 'One-time';
export const LOAN_FREQ_ANNUAL = 'Annual';
export const LOAN_FREQ_MONTHLY = 'Monthly';
export const LOAN_WITHOUT_PREPAYMENT = 'Without Prepayment';
export const LOAN_WITH_PREPAYMENT = 'With Prepayment';
export const LOAN_TENURE = 'Tenure:';
export const LOAN_NEW_TENURE = 'New Tenure:';
export const LOAN_TOTAL_INTEREST = 'Total Interest:';
export const LOAN_YOUR_SAVINGS = 'Your Savings';
export const LOAN_TENURE_REDUCED = 'Tenure Reduced';
export const LOAN_INTEREST_SAVED = 'Interest Saved';
export const LOAN_PRINCIPAL_REDUCTION = 'Principal Reduction Over Time';

// SWP Calculator Specific
export const SWP_INFLATION_ADJUSTED = 'Inflation-Adjusted Withdrawal';
export const SWP_INFLATION_BADGE = 'REALITY CHECK';
export const SWP_INFLATION_DESC = 'Account for rising expenses over time';
export const SWP_INFLATION_RATE = 'Expected Inflation Rate';
export const SWP_CORPUS_DEPLETED = 'Corpus Will Deplete!';
export const SWP_CORPUS_DURATION = 'Corpus Duration';
export const SWP_TOTAL_WITHDRAWN = 'Total Withdrawn';
export const SWP_FINAL_CORPUS = 'Final Corpus';
export const SWP_DEPLETION_TIMELINE = 'Corpus Depletion Timeline';
export const SWP_INFLATION_IMPACT = 'Inflation Impact:';
export const SWP_CONSIDERATION = '💡 Consider: Reducing monthly withdrawal, increasing corpus, or lowering inflation expectations.';

// Rent vs Buy Specific
export const RVB_RENT_SCENARIO = 'RENT';
export const RVB_BUY_SCENARIO = 'BUY';
export const RVB_RENTING_SCENARIO = 'Renting Scenario';
export const RVB_BUYING_SCENARIO = 'Buying Scenario';
export const RVB_INVESTMENT_ASSUMPTIONS = 'Investment Assumptions';
export const RVB_ANNUAL_RENT_INCREASE = 'Annual Rent Increase (%)';
export const RVB_HOME_LOAN_RATE = 'Home Loan Interest Rate (%)';
export const RVB_EXPECTED_RETURN_DESC = 'Applies to down payment invested in equity mutual funds instead of buying';
export const RVB_COMPARISON_PERIOD = 'Comparison Period (Years)';
export const RVB_RENTING_BETTER = '🏠 Renting is Better';
export const RVB_BUYING_BETTER = '🏡 Buying is Better';
export const RVB_NET_WORTH_ADVANTAGE = (amount, years) => `Net worth advantage: ${amount} over ${years} years`;
export const RVB_RENT_INVEST = 'Renting + Investing';
export const RVB_HOME_OWNERSHIP = 'Home Ownership';
export const RVB_TOTAL_RENT_PAID = 'Total Rent Paid:';
export const RVB_INVESTMENT_CORPUS = 'Investment Corpus:';
export const RVB_NET_WORTH = 'Net Worth:';
export const RVB_TOTAL_EMI_PAID = 'Total EMI Paid:';
export const RVB_HOME_EQUITY = 'Home Equity:';
export const RVB_OPPORTUNITY_COST = '💡 Opportunity Cost Analysis';
export const RVB_NET_WORTH_COMPARISON = 'Net Worth Comparison Over Time';
export const RVB_CUMULATIVE_PAYMENTS = 'Cumulative Payments Over Time';
export const RVB_LOAN_AMOUNT = 'Loan Amount:';

// Common Result Labels
export const RESULT_INVESTED_AMOUNT = 'Invested Amount';
export const RESULT_WEALTH_GAINED = 'Wealth Gained';
export const RESULT_FUTURE_VALUE = 'Future Value';

// Footer
export const FOOTER_TOOLS = 'Tools';
export const FOOTER_CONNECT = 'Connect';
export const FOOTER_COPYRIGHT = (year) => `© ${year} DebugYourFinance. Made with`;

// Social Media
export const SOCIAL_INSTAGRAM = 'Instagram';
export const SOCIAL_TWITTER = 'Twitter';

// Chart Labels
export const CHART_YEARS = 'Years';
export const CHART_AMOUNT = 'Amount (₹)';
export const CHART_OUTSTANDING = 'Outstanding (₹)';
export const CHART_NET_WORTH = 'Net Worth (₹)';

// Chart Legend Names
export const CHART_OLD_REGIME = 'Old Regime';
export const CHART_NEW_REGIME = 'New Regime';
export const CHART_WITHOUT_PREPAYMENT = 'Without Prepayment';
export const CHART_WITH_PREPAYMENT = 'With Prepayment';
export const CHART_RENT_INVEST = 'Rent + Invest';
export const CHART_BUY_HOME = 'Buy Home';
export const CHART_TOTAL_RENT = 'Total Rent Paid';
export const CHART_TOTAL_EMI = 'Total EMI Paid';
export const CHART_REMAINING_CORPUS = 'Remaining Corpus';
export const CHART_TOTAL_WITHDRAWN = 'Total Withdrawn';

// Car Affordability Calculator (20/4/10 Rule)
export const CAR_RULE_20 = '20% Down Payment';
export const CAR_RULE_4 = '4 Years Max Loan';
export const CAR_RULE_10 = '10% of Income';
export const CAR_MONTHLY_SALARY = 'Monthly In-Hand Salary';
export const CAR_ON_ROAD_PRICE = 'On-Road Price of Car';
export const CAR_DOWN_PAYMENT_PERCENT = 'Down Payment (%)';
export const CAR_LOAN_TENURE_YEARS = 'Loan Tenure (Years)';
export const CAR_INTEREST_RATE = 'Interest Rate (% p.a.)';
export const CAR_FUEL_COST = 'Monthly Fuel Cost';
export const CAR_INSURANCE_COST = 'Monthly Insurance';
export const CAR_MAINTENANCE_COST = 'Monthly Maintenance';
export const CAR_DOWN_PAYMENT_AMOUNT = 'Down Payment Amount:';
export const CAR_LOAN_AMOUNT = 'Loan Amount:';
export const CAR_MONTHLY_EMI = 'Monthly EMI:';
export const CAR_TOTAL_RUNNING_COST = 'Total Running Cost:';
export const CAR_TOTAL_MONTHLY_EXPENSE = 'Total Monthly Expense:';
export const CAR_PERCENT_OF_SALARY = 'Percentage of Salary:';
export const CAR_AFFORDABLE = '✅ Affordable';
export const CAR_NOT_AFFORDABLE = '❌ Over Budget';
export const CAR_REQUIRED_SALARY = 'Required Salary:';
export const CAR_VERDICT_AFFORDABLE = 'This car is within your budget!';
export const CAR_VERDICT_NOT_AFFORDABLE = (requiredSalary) => `This car is over your budget. You need a monthly salary of ${requiredSalary} to afford this comfortably.`;
export const CAR_20_4_10_RULE = 'The 20/4/10 Rule';
export const CAR_RULE_EXPLANATION = 'The 20/4/10 rule helps you buy a car you can actually afford: Put down 20%, finance for max 4 years, and keep total car expenses under 10% of gross income.';
export const CAR_BREAKDOWN_TITLE = 'Cost Breakdown';
export const CAR_RULE_COMPLIANCE = 'Rule Compliance';

// Budget Calculator (50/30/20 Rule)
export const CALC_BUDGET = '50/30/20 Budget';
export const CALC_BUDGET_DESC = 'Smart budgeting with the 50/30/20 rule';
