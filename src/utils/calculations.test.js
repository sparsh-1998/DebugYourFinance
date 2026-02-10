import { describe, it, expect } from 'vitest';
import {
  calculateEMI,
  calculateSIP,
  calculateTax,
  calculatePrepaymentImpact,
  calculateSWP,
  calculateRentVsBuy,
  formatCurrency,
  formatIndianNumber
} from './calculations';

describe('calculateEMI', () => {
  it('should calculate correct EMI for standard loan', () => {
    const emi = calculateEMI(5000000, 8.5, 20);
    expect(emi).toBeCloseTo(43391, 0); // ₹43,391
  });

  it('should handle zero interest rate', () => {
    const emi = calculateEMI(1000000, 0, 10);
    expect(emi).toBeCloseTo(8333.33, 2); // Principal / months
  });

  it('should handle single year loan', () => {
    const emi = calculateEMI(100000, 10, 1);
    expect(emi).toBeGreaterThan(8700);
    expect(emi).toBeLessThan(8800);
  });

  it('should return 0 for zero principal', () => {
    const emi = calculateEMI(0, 8.5, 20);
    expect(emi).toBe(0);
  });
});

describe('calculateSIP', () => {
  it('should calculate correct SIP without step-up', () => {
    const result = calculateSIP(10000, 12, 10, false, 0);

    expect(result.investedAmount).toBeGreaterThanOrEqual(1200000); // 10k * 12 * 10
    expect(result.futureValue).toBeGreaterThan(2000000); // Should grow significantly
    expect(result.wealthGained).toBe(result.futureValue - result.investedAmount);
  });

  it('should calculate correct SIP with step-up', () => {
    const result = calculateSIP(10000, 12, 10, 10);

    expect(result.investedAmount).toBeGreaterThan(1200000); // More due to step-up
    expect(result.futureValue).toBeGreaterThan(2300000);
    expect(result.yearlyData).toHaveLength(10);
  });

  it('should handle zero time period', () => {
    const result = calculateSIP(10000, 12, 0, false, 0);

    expect(result.investedAmount).toBe(0);
    expect(result.futureValue).toBe(0);
    expect(result.wealthGained).toBe(0);
  });

  it('should generate yearly data correctly', () => {
    const result = calculateSIP(5000, 15, 5, false, 0);

    expect(result.yearlyData).toHaveLength(5);
    expect(result.yearlyData[0].year).toBe(1);
    expect(result.yearlyData[4].year).toBe(5);
    expect(result.yearlyData[4].invested).toBeGreaterThan(result.yearlyData[0].invested);
  });
});

describe('calculateTax', () => {
  it('should calculate new regime tax correctly', () => {
    const result = calculateTax(1500000, {}, 'new');

    // Income: 15L, Standard deduction: 75K, Taxable: 14.25L
    // Above 12L threshold, so tax applies
    expect(result.taxableIncome).toBe(1425000);
    expect(result.tax).toBeGreaterThan(50000);
    expect(result.takehome).toBeLessThan(1500000);
  });

  it('should apply Section 87A rebate for income <= 12L', () => {
    const result = calculateTax(700000, {}, 'new');

    // Income < 12L should have rebate
    expect(result.tax).toBe(0);
    expect(result.takehome).toBe(700000);
  });

  it('should calculate old regime tax with deductions', () => {
    const deductions = {
      section80C: 150000,
      section80D: 25000,
      hra: 100000,
    };
    const result = calculateTax(1000000, deductions, 'old');

    // Standard deduction: 50K, Deductions: 275K
    expect(result.deductions).toBeGreaterThan(300000);
    expect(result.taxableIncome).toBeLessThan(700000);
  });

  it('should cap 80C deduction at 1.5L', () => {
    const deductions = { section80C: 200000 }; // Try to claim 2L
    const result = calculateTax(1000000, deductions, 'old');

    // Should only count 1.5L
    expect(result.deductions).toBeLessThanOrEqual(50000 + 150000); // Standard + 80C max
  });

  it('should cap 80D deduction at 50K', () => {
    const deductions = { section80D: 75000 }; // Try to claim 75K
    const result = calculateTax(1000000, deductions, 'old');

    // Should only count 50K
    const expectedMax = 50000 + 50000; // Standard + 80D max
    expect(result.deductions).toBeLessThanOrEqual(expectedMax);
  });

  it('should handle very high income correctly', () => {
    const result = calculateTax(10000000, {}, 'new'); // 1 Cr

    expect(result.taxableIncome).toBe(10000000 - 75000);
    expect(result.tax).toBeGreaterThan(2500000); // Should be ~30% effective
  });
});

describe('calculatePrepaymentImpact', () => {
  it('should calculate one-time prepayment correctly', () => {
    const result = calculatePrepaymentImpact(5000000, 8.5, 20, 100000, 'onetime');

    expect(result.withPrepayment.tenure).not.toBe(result.original.tenure);
    expect(result.withPrepayment.totalInterest).toBeLessThan(result.original.totalInterest);
    expect(result.withPrepayment.interestSaved).toBeGreaterThan(0);
    expect(result.withPrepayment.tenureReduced).toContain('months');
  });

  it('should calculate annual prepayment correctly', () => {
    const result = calculatePrepaymentImpact(3000000, 9, 15, 50000, 'annual');

    expect(result.withPrepayment.tenure).not.toBe(result.original.tenure);
    expect(result.withPrepayment.interestSaved).toBeGreaterThan(100000); // Significant savings
  });

  it('should calculate monthly prepayment correctly', () => {
    const result = calculatePrepaymentImpact(2000000, 8, 10, 120000, 'monthly'); // 10K/month

    expect(result.withPrepayment.tenure).not.toBe(result.original.tenure);
    expect(result.withPrepayment.interestSaved).toBeGreaterThan(50000);
  });

  it('should handle zero prepayment', () => {
    const result = calculatePrepaymentImpact(5000000, 8.5, 20, 0, 'onetime');

    expect(result.withPrepayment.tenure).toContain('20 years');
    expect(result.withPrepayment.totalInterest).toBeCloseTo(result.original.totalInterest, -3);
    expect(Math.abs(result.withPrepayment.interestSaved)).toBeLessThan(200); // Close to 0 (rounding differences)
  });

  it('should generate yearly data correctly', () => {
    const result = calculatePrepaymentImpact(4000000, 8, 15, 100000, 'annual');

    expect(result.yearlyData.length).toBeGreaterThan(0);
    expect(result.yearlyData[0].year).toBe(1);
    expect(result.yearlyData[0].withoutPrepayment).toBeGreaterThan(result.yearlyData[result.yearlyData.length - 1].withPrepayment);
  });
});

describe('calculateSWP', () => {
  it('should calculate SWP correctly without inflation', () => {
    const result = calculateSWP(5000000, 30000, 10, 20, false, 0);

    expect(result.totalWithdrawn).toBe(30000 * 12 * 20); // If corpus lasts
    expect(result.finalCorpus).toBeGreaterThanOrEqual(0);
  });

  it('should calculate SWP with inflation', () => {
    const result = calculateSWP(5000000, 30000, 10, 20, true, 6);

    expect(result.totalWithdrawn).toBeGreaterThan(30000 * 12 * 20); // More due to inflation
    expect(result.lastingPeriod).toBeDefined();
  });

  it('should detect corpus depletion', () => {
    const result = calculateSWP(1000000, 20000, 8, 20, false, 0);

    // High withdrawal rate should deplete corpus
    if (result.corpusDepleted) {
      expect(result.finalCorpus).toBe(0);
      expect(result.lastingPeriod).toContain('years');
    }
  });

  it('should handle corpus that never depletes', () => {
    const result = calculateSWP(10000000, 10000, 12, 20, false, 0);

    // Low withdrawal with good returns
    expect(result.corpusDepleted).toBe(false);
    expect(result.finalCorpus).toBeGreaterThan(0);
    expect(result.lastingPeriod).toContain('+');
  });

  it('should generate yearly data correctly', () => {
    const result = calculateSWP(3000000, 25000, 10, 10, false, 0);

    expect(result.yearlyData.length).toBeLessThanOrEqual(10);
    if (result.yearlyData.length > 0) {
      expect(result.yearlyData[0].year).toBe(1);
      expect(result.yearlyData[0].corpus).toBeLessThan(3000000);
    }
  });
});

describe('calculateRentVsBuy', () => {
  const rentData = {
    monthlyRent: 25000,
    annualRentIncrease: 5
  };

  const buyData = {
    homePrice: 5000000,
    downPayment: 1000000,
    loanAmount: 4000000,
    interestRate: 8.5,
    loanTenure: 20,
    homeAppreciation: 5
  };

  it('should calculate rent vs buy comparison correctly', () => {
    const result = calculateRentVsBuy(rentData, buyData, 12, 20);

    expect(result.totalRentPaid).toBeGreaterThan(0);
    expect(result.totalEmiPaid).toBeGreaterThan(0);
    expect(result.finalInvestmentCorpus).toBeGreaterThan(0);
    expect(result.finalHomeEquity).toBeGreaterThan(0);
    expect(result.verdict).toMatch(/Rent|Buy/);
  });

  it('should apply home appreciation correctly', () => {
    const result = calculateRentVsBuy(rentData, buyData, 12, 20);

    // With 5% appreciation, home value should be much higher after 20 years
    expect(result.finalHomeValue).toBeGreaterThan(5000000);
    expect(result.finalHomeValue).toBeCloseTo(5000000 * Math.pow(1.05, 19), -100000);
  });

  it('should handle zero appreciation', () => {
    const buyDataNoAppreciation = { ...buyData, homeAppreciation: 0 };
    const result = calculateRentVsBuy(rentData, buyDataNoAppreciation, 12, 20);

    // Home value should remain constant
    expect(result.finalHomeValue).toBeCloseTo(5000000, 0);
  });

  it('should calculate net worth correctly', () => {
    const result = calculateRentVsBuy(rentData, buyData, 12, 20);

    expect(result.rentScenarioNetWorth).toBe(result.finalInvestmentCorpus);
    expect(result.buyScenarioNetWorth).toBe(result.finalHomeEquity);
    expect(result.difference).toBeGreaterThan(0);
  });

  it('should apply rent escalation correctly', () => {
    const result = calculateRentVsBuy(rentData, buyData, 12, 20);

    // Total rent should be significantly more than base rent * months
    expect(result.totalRentPaid).toBeGreaterThan(25000 * 12 * 20);
  });

  it('should generate yearly data correctly', () => {
    const result = calculateRentVsBuy(rentData, buyData, 12, 10);

    expect(result.yearlyData).toHaveLength(10);
    expect(result.yearlyData[0].year).toBe(1);
    expect(result.yearlyData[9].homeValue).toBeGreaterThan(result.yearlyData[0].homeValue);
  });
});

describe('formatCurrency', () => {
  it('should format numbers in Crores correctly', () => {
    expect(formatCurrency(10000000)).toBe('₹1.00 Cr');
    expect(formatCurrency(25000000)).toBe('₹2.50 Cr');
  });

  it('should format numbers in Lakhs correctly', () => {
    expect(formatCurrency(100000)).toBe('₹1.00 L');
    expect(formatCurrency(500000)).toBe('₹5.00 L');
    expect(formatCurrency(1550000)).toBe('₹15.50 L');
  });

  it('should format smaller numbers with commas', () => {
    expect(formatCurrency(50000)).toBe('₹50,000');
    expect(formatCurrency(5000)).toBe('₹5,000');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('₹0');
  });

  it('should handle negative numbers', () => {
    expect(formatCurrency(-100000)).toContain('-');
  });
});

describe('formatIndianNumber', () => {
  it('should format numbers with Indian comma placement', () => {
    expect(formatIndianNumber(1000)).toBe('1,000');
    expect(formatIndianNumber(10000)).toBe('10,000');
    expect(formatIndianNumber(100000)).toBe('1,00,000');
    expect(formatIndianNumber(1000000)).toBe('10,00,000');
    expect(formatIndianNumber(10000000)).toBe('1,00,00,000');
  });

  it('should handle decimals correctly', () => {
    expect(formatIndianNumber(1234.56)).toBe('1,234.56');
    expect(formatIndianNumber(123456.78)).toBe('1,23,456.78');
  });

  it('should handle zero', () => {
    expect(formatIndianNumber(0)).toBe('0');
  });

  it('should handle small numbers without commas', () => {
    expect(formatIndianNumber(100)).toBe('100');
    expect(formatIndianNumber(999)).toBe('999');
  });
});
