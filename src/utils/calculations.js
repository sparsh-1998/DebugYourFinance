/**
 * Calculate SIP (Systematic Investment Plan) returns
 * @param {number} monthlyInvestment - Initial monthly investment amount
 * @param {number} annualReturn - Expected annual return (%)
 * @param {number} years - Investment period in years
 * @param {number} stepUpPercentage - Annual increase in investment (0 for no step-up)
 * @returns {object} - { investedAmount, futureValue, wealthGained, yearlyData }
 */
export function calculateSIP(monthlyInvestment, annualReturn, years, stepUpPercentage = 0) {
  const monthlyRate = annualReturn / 12 / 100;
  const stepUpRate = stepUpPercentage / 100;

  let totalInvested = 0;
  let futureValue = 0;
  const yearlyData = [];

  // Calculate step-up SIP year by year
  let currentMonthlyInvestment = monthlyInvestment;

  for (let year = 1; year <= years; year++) {
    // Calculate for this year (12 months)
    for (let month = 1; month <= 12; month++) {
      // Add monthly investment
      totalInvested += currentMonthlyInvestment;

      // Calculate growth on current corpus
      futureValue = (futureValue + currentMonthlyInvestment) * (1 + monthlyRate);
    }

    // Store yearly data
    yearlyData.push({
      year,
      invested: Math.round(totalInvested),
      wealth: Math.round(futureValue - totalInvested),
      total: Math.round(futureValue),
      monthlyInvestment: Math.round(currentMonthlyInvestment)
    });

    // Apply step-up for next year
    if (stepUpPercentage > 0 && year < years) {
      currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpRate);
    }
  }

  const wealthGained = futureValue - totalInvested;

  return {
    investedAmount: Math.round(totalInvested),
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
    // Old regime: Multiple deductions available
    standardDeduction = 50000;

    // Calculate major deductions with limits
    const section80C = Math.min(deductions.section80C || 0, 150000);
    const section80D = Math.min(deductions.section80D || 0, 50000);
    const hra = deductions.hra || 0;
    const npsPersonal = Math.min(deductions.npsPersonal || 0, 50000); // 80CCD(1B) - Additional ₹50K
    const npsEmployer = deductions.npsEmployer || 0; // 80CCD(2) - No limit
    const otherDeductions = deductions.otherDeductions || 0; // Home Loan, LTA, Education Loan, Donations, etc.

    totalDeductions = standardDeduction +
      section80C +
      section80D +
      hra +
      npsPersonal +
      npsEmployer +
      otherDeductions;

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
 * Calculate SWP (Systematic Withdrawal Plan)
 * @param {number} lumpsumAmount - Initial corpus amount
 * @param {number} monthlyWithdrawal - Monthly withdrawal amount
 * @param {number} annualReturn - Expected annual return (%)
 * @param {number} years - Withdrawal period in years
 * @param {number} inflationRate - Annual inflation rate (%) for inflation-adjusted withdrawals
 * @returns {object} - { yearlyData, totalWithdrawn, finalCorpus, yearsLastedMonthly }
 */
export function calculateSWP(lumpsumAmount, monthlyWithdrawal, annualReturn, years, inflationRate = 0) {
  const monthlyRate = annualReturn / 12 / 100;

  let corpus = lumpsumAmount;
  let totalWithdrawn = 0;
  let currentWithdrawal = monthlyWithdrawal;
  const yearlyData = [];
  let corpusDepleted = false;
  let monthsDepleted = 0;

  for (let year = 1; year <= years; year++) {
    let yearWithdrawals = 0;

    for (let month = 1; month <= 12; month++) {
      // Apply inflation to withdrawal amount (annual adjustment)
      if (month === 1 && year > 1 && inflationRate > 0) {
        currentWithdrawal = currentWithdrawal * (1 + inflationRate / 100);
      }

      // Check if corpus can support withdrawal
      if (corpus >= currentWithdrawal) {
        corpus -= currentWithdrawal;
        totalWithdrawn += currentWithdrawal;
        yearWithdrawals += currentWithdrawal;

        // Apply monthly returns on remaining corpus
        corpus = corpus * (1 + monthlyRate);
      } else {
        // Corpus depleted
        if (!corpusDepleted) {
          corpusDepleted = true;
          monthsDepleted = (year - 1) * 12 + month;
        }
        corpus = 0;
      }
    }

    yearlyData.push({
      year,
      corpus: Math.round(corpus),
      withdrawn: Math.round(yearWithdrawals),
      monthlyWithdrawal: Math.round(currentWithdrawal),
      cumulativeWithdrawn: Math.round(totalWithdrawn)
    });

    if (corpusDepleted && corpus === 0) break;
  }

  const yearsLasted = corpusDepleted ? Math.floor(monthsDepleted / 12) : years;
  const monthsLasted = corpusDepleted ? monthsDepleted % 12 : 0;

  return {
    yearlyData,
    totalWithdrawn: Math.round(totalWithdrawn),
    finalCorpus: Math.round(corpus),
    yearsLasted,
    monthsLasted,
    corpusDepleted,
    lastingPeriod: corpusDepleted
      ? `${yearsLasted} years ${monthsLasted} months`
      : `${years}+ years (corpus sustains)`
  };
}

/**
 * Calculate Rent vs Buy comparison
 * @param {object} rentData - { monthlyRent, annualRentIncrease }
 * @param {object} buyData - { homePrice, downPayment, loanAmount, interestRate, loanTenure }
 * @param {number} expectedReturn - Expected return on investment (%)
 * @param {number} years - Comparison period in years
 * @returns {object} - Comprehensive comparison data
 */
export function calculateRentVsBuy(rentData, buyData, expectedReturn, years) {
  const { monthlyRent, annualRentIncrease } = rentData;
  const { homePrice, downPayment, loanAmount, interestRate, loanTenure } = buyData;

  // Calculate monthly EMI for home loan
  const emi = calculateEMI(loanAmount, interestRate, loanTenure);

  // Investment calculation for down payment
  const monthlyReturnRate = expectedReturn / 12 / 100;
  let investmentCorpus = downPayment;
  let totalRentPaid = 0;
  let totalEmiPaid = 0;
  let currentRent = monthlyRent;
  let loanBalance = loanAmount;

  const yearlyData = [];

  for (let year = 1; year <= years; year++) {
    let yearRent = 0;
    let yearEmi = 0;

    for (let month = 1; month <= 12; month++) {
      // Rent scenario
      totalRentPaid += currentRent;
      yearRent += currentRent;

      // Grow investment corpus (rent money saved + down payment invested)
      const monthlySavings = year <= loanTenure ? Math.max(0, emi - currentRent) : 0;
      investmentCorpus = (investmentCorpus + monthlySavings) * (1 + monthlyReturnRate);

      // Buy scenario - EMI payment
      if (year <= loanTenure) {
        const monthlyInterest = loanBalance * (interestRate / 12 / 100);
        const principalPaid = emi - monthlyInterest;
        loanBalance = Math.max(0, loanBalance - principalPaid);
        totalEmiPaid += emi;
        yearEmi += emi;
      }
    }

    // Apply annual rent increase
    if (year < years) {
      currentRent = currentRent * (1 + annualRentIncrease / 100);
    }

    // Calculate net worth for both scenarios
    const rentNetWorth = investmentCorpus; // Only investment corpus
    const buyNetWorth = homePrice - loanBalance; // Home equity

    yearlyData.push({
      year,
      rentPaid: Math.round(yearRent),
      emiPaid: Math.round(yearEmi),
      cumulativeRent: Math.round(totalRentPaid),
      cumulativeEmi: Math.round(totalEmiPaid),
      investmentCorpus: Math.round(investmentCorpus),
      homeEquity: Math.round(homePrice - loanBalance),
      rentNetWorth: Math.round(rentNetWorth),
      buyNetWorth: Math.round(buyNetWorth),
      currentRent: Math.round(currentRent)
    });
  }

  // Final comparison
  const rentScenarioValue = investmentCorpus;
  const buyScenarioValue = homePrice - loanBalance; // Assuming home value remains same (conservative)
  const opportunityCost = investmentCorpus - downPayment; // Gains from investing down payment

  return {
    yearlyData,
    totalRentPaid: Math.round(totalRentPaid),
    totalEmiPaid: Math.round(totalEmiPaid),
    finalInvestmentCorpus: Math.round(investmentCorpus),
    finalHomeEquity: Math.round(homePrice - loanBalance),
    opportunityCost: Math.round(opportunityCost),
    rentScenarioNetWorth: Math.round(rentScenarioValue),
    buyScenarioNetWorth: Math.round(buyScenarioValue),
    verdict: rentScenarioValue > buyScenarioValue ? 'Rent' : 'Buy',
    difference: Math.round(Math.abs(rentScenarioValue - buyScenarioValue))
  };
}

/**
 * Format number with Indian numbering system (commas)
 * @param {number} num - Number to format
 * @returns {string} - Formatted string with Indian comma placement
 */
export function formatIndianNumber(num) {
  if (!num && num !== 0) return '';
  const numStr = num.toString();
  const [integer, decimal] = numStr.split('.');

  // Indian numbering: First comma after 3 digits from right, then every 2 digits
  let lastThree = integer.substring(integer.length - 3);
  const otherNumbers = integer.substring(0, integer.length - 3);

  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }

  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  return decimal ? formatted + '.' + decimal : formatted;
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
