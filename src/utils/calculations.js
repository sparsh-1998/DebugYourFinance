/**
 * Calculate SIP (Systematic Investment Plan) returns
 * @param {number} monthlyInvestment - Monthly investment amount
 * @param {number} annualReturn - Expected annual return (%)
 * @param {number} years - Investment period in years
 * @returns {object} - { investedAmount, futureValue, wealthGained, yearlyData }
 */
export function calculateSIP(monthlyInvestment, annualReturn, years) {
  const monthlyRate = annualReturn / 12 / 100;
  const months = years * 12;
  const investedAmount = monthlyInvestment * months;

  // Future Value formula: M × [{(1 + r)^n - 1} / r] × (1 + r)
  const futureValue = monthlyInvestment *
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

  const wealthGained = futureValue - investedAmount;

  // Generate yearly data for chart
  const yearlyData = [];
  for (let year = 1; year <= years; year++) {
    const m = year * 12;
    const invested = monthlyInvestment * m;
    const fv = monthlyInvestment *
      (((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate));
    yearlyData.push({
      year,
      invested: Math.round(invested),
      wealth: Math.round(fv - invested),
      total: Math.round(fv)
    });
  }

  return {
    investedAmount: Math.round(investedAmount),
    futureValue: Math.round(futureValue),
    wealthGained: Math.round(wealthGained),
    yearlyData
  };
}

/**
 * Calculate EMI (Equated Monthly Installment)
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate (%)
 * @param {number} years - Loan tenure in years
 * @returns {number} - Monthly EMI
 */
export function calculateEMI(principal, annualRate, years) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  if (monthlyRate === 0) return principal / months;

  // EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(emi);
}

/**
 * Calculate loan tenure reduction and interest savings with prepayment
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate (%)
 * @param {number} years - Original tenure in years
 * @param {number} prepayment - Prepayment amount
 * @param {string} frequency - 'onetime', 'annual', or 'monthly'
 * @returns {object} - Loan analysis with and without prepayment
 */
export function calculatePrepaymentImpact(principal, annualRate, years, prepayment, frequency) {
  const monthlyRate = annualRate / 12 / 100;
  const emi = calculateEMI(principal, annualRate, years);
  const originalMonths = years * 12;

  // Original scenario
  const originalInterest = (emi * originalMonths) - principal;

  // With prepayment scenario
  let remainingPrincipal = principal;
  let totalInterest = 0;
  let monthsPassed = 0;
  const yearlyData = [];

  for (let month = 1; month <= originalMonths; month++) {
    const interestForMonth = remainingPrincipal * monthlyRate;
    const principalForMonth = emi - interestForMonth;

    totalInterest += interestForMonth;
    remainingPrincipal -= principalForMonth;

    // Apply prepayment based on frequency
    if (frequency === 'onetime' && month === 12) {
      remainingPrincipal -= prepayment;
    } else if (frequency === 'annual' && month % 12 === 0) {
      remainingPrincipal -= prepayment;
    } else if (frequency === 'monthly') {
      remainingPrincipal -= (prepayment / 12);
    }

    if (remainingPrincipal <= 0) {
      monthsPassed = month;
      break;
    }

    // Store yearly data for chart
    if (month % 12 === 0) {
      yearlyData.push({
        year: month / 12,
        withoutPrepayment: Math.round(principal - (principalForMonth * month)),
        withPrepayment: Math.round(Math.max(0, remainingPrincipal))
      });
    }
  }

  if (monthsPassed === 0) monthsPassed = originalMonths;

  const newYears = Math.floor(monthsPassed / 12);
  const newMonths = monthsPassed % 12;
  const interestSaved = originalInterest - totalInterest;
  const tenureReduced = originalMonths - monthsPassed;

  return {
    original: {
      tenure: `${years} years`,
      totalInterest: Math.round(originalInterest)
    },
    withPrepayment: {
      tenure: `${newYears} years ${newMonths} months`,
      totalInterest: Math.round(totalInterest),
      tenureReduced: `${Math.floor(tenureReduced / 12)} years ${tenureReduced % 12} months`,
      interestSaved: Math.round(interestSaved)
    },
    yearlyData
  };
}

/**
 * Calculate tax based on Indian tax regime
 * @param {number} income - Annual gross income
 * @param {object} deductions - Object containing deduction amounts
 * @param {string} regime - 'old' or 'new'
 * @returns {object} - Tax calculation details
 */
export function calculateTax(income, deductions, regime) {
  let taxableIncome = income;
  let standardDeduction = 0;
  let totalDeductions = 0;

  if (regime === 'old') {
    // Old regime: Standard deduction + 80C + 80D + HRA + Home Loan
    standardDeduction = 50000;
    totalDeductions = standardDeduction +
      Math.min(deductions.section80C || 0, 150000) +
      Math.min(deductions.section80D || 0, 50000) +
      (deductions.hra || 0) +
      Math.min(deductions.homeLoan || 0, 200000);

    taxableIncome = Math.max(0, income - totalDeductions);

    // Old regime slabs
    let tax = 0;
    if (taxableIncome <= 250000) tax = 0;
    else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
    else if (taxableIncome <= 1000000) {
      tax = 12500 + (taxableIncome - 500000) * 0.20;
    } else {
      tax = 112500 + (taxableIncome - 1000000) * 0.30;
    }

    // Add 4% cess
    tax = tax * 1.04;

    return {
      regime: 'Old Regime',
      taxableIncome: Math.round(taxableIncome),
      tax: Math.round(tax),
      takehome: Math.round(income - tax),
      deductions: totalDeductions
    };
  } else {
    // New regime: Standard deduction only (75K)
    // FY 2025-26 Budget 2025 - Updated slabs
    standardDeduction = 75000;
    taxableIncome = Math.max(0, income - standardDeduction);

    // New regime slabs (FY 2025-26)
    let tax = 0;
    if (taxableIncome <= 400000) {
      // Up to ₹4L: Nil
      tax = 0;
    } else if (taxableIncome <= 800000) {
      // ₹4L - ₹8L: 5%
      tax = (taxableIncome - 400000) * 0.05;
    } else if (taxableIncome <= 1200000) {
      // ₹8L - ₹12L: 10%
      tax = 20000 + (taxableIncome - 800000) * 0.10;
    } else if (taxableIncome <= 1600000) {
      // ₹12L - ₹16L: 15%
      tax = 60000 + (taxableIncome - 1200000) * 0.15;
    } else if (taxableIncome <= 2000000) {
      // ₹16L - ₹20L: 20%
      tax = 120000 + (taxableIncome - 1600000) * 0.20;
    } else if (taxableIncome <= 2400000) {
      // ₹20L - ₹24L: 25%
      tax = 200000 + (taxableIncome - 2000000) * 0.25;
    } else {
      // Above ₹24L: 30%
      tax = 300000 + (taxableIncome - 2400000) * 0.30;
    }

    // Add 4% cess
    tax = tax * 1.04;

    // Apply Section 87A rebate (up to ₹12L income = NIL tax)
    // If taxable income <= ₹12L and tax is calculated, rebate makes it NIL
    if (taxableIncome <= 1200000 && tax > 0) {
      tax = 0; // Full rebate under Section 87A
    }

    return {
      regime: 'New Regime',
      taxableIncome: Math.round(taxableIncome),
      tax: Math.round(tax),
      takehome: Math.round(income - tax),
      deductions: standardDeduction
    };
  }
}

/**
 * Format number to Indian currency format
 * @param {number} num - Number to format
 * @returns {string} - Formatted string with ₹ symbol
 */
export function formatCurrency(num) {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} L`;
  } else {
    return `₹${num.toLocaleString('en-IN')}`;
  }
}
