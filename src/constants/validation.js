/**
 * Validation configuration constants
 */

// SIP Calculator Validation
export const VALIDATION_SIP = {
  monthlyInvestment: {
    min: 500,
    max: 10000000,
    allowDecimals: false,
    required: true
  }
};

// Tax Calculator Validation
export const VALIDATION_TAX = {
  income: {
    min: 0,
    allowDecimals: false,
    required: true
  },
  section80C: {
    min: 0,
    max: 150000,
    allowDecimals: false
  },
  section80D: {
    min: 0,
    max: 50000,
    allowDecimals: false
  },
  hra: {
    min: 0,
    allowDecimals: false
  },
  npsPersonal: {
    min: 0,
    max: 50000,
    allowDecimals: false
  },
  npsEmployer: {
    min: 0,
    allowDecimals: false
  },
  otherDeductions: {
    min: 0,
    allowDecimals: false
  }
};

// Loan Calculator Validation
export const VALIDATION_LOAN = {
  principal: {
    min: 100000,
    max: 100000000,
    allowDecimals: false,
    required: true
  },
  prepayment: {
    min: 0,
    allowDecimals: false
  }
};

// SWP Calculator Validation
export const VALIDATION_SWP = {
  lumpsumAmount: {
    min: 100000,
    max: 1000000000,
    allowDecimals: false,
    required: true
  },
  monthlyWithdrawal: {
    min: 1000,
    allowDecimals: false,
    required: true
  }
};

// Rent vs Buy Validation
export const VALIDATION_RENT_VS_BUY = {
  monthlyRent: {
    min: 1000,
    max: 10000000,
    allowDecimals: false,
    required: true
  },
  homePrice: {
    min: 500000,
    max: 1000000000,
    allowDecimals: false,
    required: true
  },
  downPayment: {
    min: 0,
    allowDecimals: false,
    required: true
  }
};
