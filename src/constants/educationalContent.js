/**
 * Educational content for all calculators
 * Centralized for easy maintenance and consistency
 */

// SIP Calculator Educational Content
export const SIP_HOW_TO_USE = [
  {
    title: 'Enter your monthly investment amount',
    description: 'The amount you can invest every month in mutual funds'
  },
  {
    title: 'Set expected return rate and time period',
    description: 'Choose realistic returns (typically 10-15% for equity funds) and your investment horizon'
  },
  {
    title: 'Enable Step-Up SIP (optional)',
    description: 'Increase your monthly investment annually to combat inflation and build wealth faster'
  }
];

export const SIP_FAQ = [
  {
    question: 'What is a Step-Up SIP?',
    answer: 'A Step-Up SIP allows you to increase your monthly investment amount by a fixed percentage each year. For example, if you start with ₹10,000/month with a 10% step-up, your investment will increase to ₹11,000 in Year 2, ₹12,100 in Year 3, and so on. This helps you match your investments with your growing income.'
  },
  {
    question: 'How does a 10% annual increase affect my corpus?',
    answer: 'A 10% annual step-up can significantly boost your final corpus. With a regular SIP of ₹10,000/month for 20 years at 12% returns, you\'d accumulate approximately ₹99 lakhs. With a 10% step-up, this could grow to around ₹1.5 crores - a 50% increase in wealth!'
  },
  {
    question: 'Is SIP better than Lumpsum?',
    answer: 'SIP is generally better for most investors because it reduces timing risk through rupee cost averaging, makes investing disciplined and automatic, and doesn\'t require large capital upfront. However, lumpsum can work better in a rising market if you have surplus funds. For regular investors, SIP is the recommended approach.'
  },
  {
    question: 'What is a realistic return rate for SIP?',
    answer: 'Equity mutual funds have historically delivered 12-15% returns over long periods (10+ years). Debt funds typically give 7-9%. A balanced portfolio might average 10-12%. Remember, past performance doesn\'t guarantee future returns, so it\'s wise to use conservative estimates (10-12%) for planning.'
  }
];

// SWP Calculator Educational Content
export const SWP_HOW_TO_USE = [
  {
    title: 'Enter your retirement corpus amount',
    description: 'The total amount you have accumulated for generating regular income'
  },
  {
    title: 'Set monthly withdrawal and expected return',
    description: 'Decide how much you need monthly and the expected growth rate of your investment'
  },
  {
    title: 'Enable inflation-adjusted withdrawals (recommended)',
    description: 'Account for rising costs by increasing withdrawal amounts annually'
  }
];

export const SWP_FAQ = [
  {
    question: 'What is SWP (Systematic Withdrawal Plan)?',
    answer: 'SWP is a method to withdraw a fixed amount from your mutual fund investments at regular intervals (usually monthly). It\'s the opposite of SIP - instead of investing regularly, you\'re withdrawing regularly while your remaining corpus continues to grow based on market returns. This is ideal for retirees or anyone needing regular income.'
  },
  {
    question: 'Should I use inflation-adjusted withdrawals?',
    answer: 'Yes, absolutely! Inflation-adjusted withdrawals are crucial for long-term financial planning. If you withdraw a fixed ₹30,000 per month, its purchasing power will decrease every year due to inflation. With a 6% inflation rate, after 10 years you\'d need ₹53,700 to maintain the same lifestyle. Always enable this option for realistic planning.'
  },
  {
    question: 'How much corpus do I need for retirement?',
    answer: 'A common rule is the 4% withdrawal rule - your annual withdrawal should not exceed 4% of your corpus. For example, if you need ₹40,000/month (₹4.8 lakhs/year), you need approximately ₹1.2 crores corpus. However, this depends on your expected returns, inflation, and how long you want the corpus to last.'
  },
  {
    question: 'What if my corpus depletes before my planned period?',
    answer: 'If the calculator shows your corpus will deplete, you have three options: 1) Increase your starting corpus, 2) Reduce monthly withdrawals, or 3) Aim for higher expected returns (by taking calculated risks). The tool will warn you if your withdrawals are unsustainable.'
  }
];

// Tax Regime Simulator Educational Content
export const TAX_HOW_TO_USE = [
  {
    title: 'Enter your annual gross income',
    description: 'Your total salary/income before any deductions (CTC or gross income)'
  },
  {
    title: 'Fill in applicable deductions',
    description: 'Add investments and expenses eligible for tax deductions under various sections'
  },
  {
    title: 'Compare tax regimes',
    description: 'Review which regime (Old vs New) saves you more money based on your deductions'
  }
];

export const TAX_FAQ = [
  {
    question: 'What is Section 80C and what qualifies?',
    answer: 'Section 80C allows deductions up to ₹1.5 lakhs per year for investments in: PPF, EPF, ELSS mutual funds, life insurance premiums, NSC, tax-saving FDs, principal repayment of home loan, tuition fees, and Sukanya Samriddhi Yojana. These are the most common tax-saving investments available to Indian taxpayers.'
  },
  {
    question: 'Should I choose Old or New Tax Regime?',
    answer: 'Choose the Old Regime if you have significant deductions (₹2.5+ lakhs in 80C, HRA, home loan interest, etc.). Choose the New Regime if you have minimal deductions and prefer lower tax slabs without claiming exemptions. The new regime has lower rates but doesn\'t allow most deductions. Use this calculator to find which saves you more!'
  },
  {
    question: 'What is Section 80CCD(1B) for NPS?',
    answer: 'Section 80CCD(1B) provides an additional deduction of up to ₹50,000 for contributions to the National Pension System (NPS). This is over and above the ₹1.5 lakh limit of Section 80C, allowing a total deduction of ₹2 lakhs. It\'s one of the best tax-saving options with dual benefits of retirement planning and tax savings.'
  },
  {
    question: 'How is HRA exemption calculated?',
    answer: 'HRA (House Rent Allowance) exemption is the minimum of: 1) Actual HRA received, 2) Rent paid minus 10% of salary, or 3) 50% of salary (metro) or 40% (non-metro). Only applicable if you\'re living in a rented house. Not available in the new tax regime.'
  }
];

// Loan Tenure Reducer Educational Content
export const LOAN_HOW_TO_USE = [
  {
    title: 'Enter your loan details',
    description: 'Loan amount, interest rate, and tenure (typically from your loan agreement)'
  },
  {
    title: 'Add prepayment amount',
    description: 'The extra amount you plan to pay monthly beyond your regular EMI'
  },
  {
    title: 'Review savings',
    description: 'See how much interest you\'ll save and how quickly you can close your loan'
  }
];

export const LOAN_FAQ = [
  {
    question: 'Should I prepay my home loan?',
    answer: 'Yes, if your loan interest rate is higher than what you can earn from investments. For example, if your home loan is at 9% and your investments give 7-8% returns, prepaying saves you the difference. However, don\'t deplete your emergency fund or compromise essential investments like retirement savings. A balanced approach is ideal - invest for wealth creation while prepaying to reduce debt burden.'
  },
  {
    question: 'How much can I save with prepayments?',
    answer: 'Prepayments can save lakhs in interest! For a ₹50 lakh loan at 9% for 20 years, your total interest is ≈₹60 lakhs. By prepaying just ₹10,000/month extra, you can save ≈₹25 lakhs and close the loan 8 years earlier! Early prepayments have the highest impact because most of your initial EMIs go toward interest, not principal.'
  },
  {
    question: 'What is the best prepayment strategy?',
    answer: 'The best strategy is regular monthly prepayments rather than occasional lump sums. Even small amounts (₹5,000-₹10,000) prepaid every month compound to massive savings. Make prepayments in the early years when interest component is highest. Always opt for "tenure reduction" rather than "EMI reduction" to maximize interest savings (unless you need lower EMIs for cash flow).'
  },
  {
    question: 'Are there prepayment charges?',
    answer: 'For home loans: Most banks don\'t charge prepayment fees on floating-rate loans. Fixed-rate loans may have prepayment charges (typically 2-4%). For personal loans: Banks usually charge 2-5% prepayment penalty. Always check your loan agreement or ask your lender before making prepayments. Even with charges, prepayments are often beneficial if your savings exceed the penalty.'
  }
];

// Rent vs Buy Calculator Educational Content
export const RENT_VS_BUY_HOW_TO_USE = [
  {
    title: 'Enter property and rent details',
    description: 'Property price, down payment, loan interest rate, current rent, and expected rent increases'
  },
  {
    title: 'Set time horizon and investment returns',
    description: 'How long you plan to stay and what returns you expect from alternative investments'
  },
  {
    title: 'Compare net worth scenarios',
    description: 'See which option builds more wealth over your chosen timeline'
  }
];

export const RENT_VS_BUY_FAQ = [
  {
    question: 'Should I rent or buy a home?',
    answer: 'It depends on multiple factors: your financial situation, career stability, city (property appreciation rates), and lifestyle preferences. Generally, buying is better if: you plan to stay 7+ years, property prices are reasonable, you have sufficient down payment, and you value stability. Renting is better if: you\'re young and career-mobile, property prices are inflated, you prefer liquidity, or you can invest the difference at higher returns than real estate appreciation.'
  },
  {
    question: 'What is opportunity cost in this context?',
    answer: 'Opportunity cost is what you give up when choosing to buy. When you pay ₹20 lakhs as down payment, you lose the potential investment returns on that amount. If that ₹20L could have grown to ₹80L in mutual funds over 20 years, but your home only appreciates to ₹70L, you\'ve lost ₹10L in opportunity cost. This calculator accounts for this critical factor that most people ignore.'
  },
  {
    question: 'Why does renting + investing sometimes win?',
    answer: 'When you rent, you only pay rent (~₹30K/month). When you buy, you pay EMI (~₹60K/month for the same property). If you invest the ₹30K difference plus your down payment in equity, and market returns (12%) beat real estate appreciation (5-7%), renting can build more wealth. Plus, rent is lower than EMI initially, giving you more investable surplus. However, this requires investment discipline and doesn\'t account for emotional benefits of ownership.'
  },
  {
    question: 'What about tax benefits on home loans?',
    answer: 'Home loan tax benefits are significant: ₹2 lakhs on interest (Section 24b) + ₹1.5 lakhs on principal (Section 80C). However, these only apply to the old tax regime and only if you have high taxable income. The calculator doesn\'t factor in tax benefits, so buying might be even better if you\'re in higher tax brackets. For most people in the new regime, the basic calculation still holds.'
  }
];

// Car Affordability Calculator Educational Content
export const CAR_HOW_TO_USE = [
  {
    title: 'Enter your monthly in-hand salary',
    description: 'Your actual take-home salary after all deductions'
  },
  {
    title: 'Enter the on-road price of the car',
    description: 'The total cost including registration, insurance, and other charges'
  },
  {
    title: 'Adjust down payment, loan tenure, and interest rate',
    description: 'Set down payment (20%+ recommended), loan tenure (4 years max), and current car loan rates'
  },
  {
    title: 'Add monthly running costs',
    description: 'Estimate fuel, insurance, and maintenance costs for realistic affordability'
  },
  {
    title: 'Check 20/4/10 rule compliance',
    description: 'Verify if the car fits within the recommended affordability guidelines'
  }
];

export const CAR_FAQ = [
  {
    question: 'What is the 20/4/10 rule?',
    answer: 'The 20/4/10 rule is a car affordability guideline: Put down at least 20% as down payment, finance for no more than 4 years, and keep total monthly car expenses (EMI + running costs) under 10% of your gross monthly income.'
  },
  {
    question: 'Why should I follow the 20/4/10 rule?',
    answer: 'This rule prevents you from becoming "car poor" - spending too much on a depreciating asset. It ensures you can afford the car comfortably while still saving and investing for your future.'
  },
  {
    question: 'What is included in total monthly expense?',
    answer: 'Total monthly expense includes your EMI payment plus all running costs: fuel, insurance, and maintenance. This gives a realistic picture of car ownership costs.'
  },
  {
    question: 'Can I buy a car if I don\'t meet the 20/4/10 rule?',
    answer: 'While you can, it\'s not recommended. Overextending yourself on a car means less money for savings, investments, and emergencies. Consider a more affordable car or save up for a larger down payment.'
  },
  {
    question: 'Should I include parking and tolls in monthly costs?',
    answer: 'Yes, ideally you should include all recurring costs like parking fees, tolls, and any other regular expenses to get the most accurate affordability picture.'
  }
];
