import { describe, it, expect } from 'vitest';
import {
  calculateSIP,
  calculateEMI,
  calculateTax,
  calculateSWP,
  calculatePrepaymentImpact,
  calculateRentVsBuy,
  formatCurrency,
  TAX_SLABS
} from './calculations';

describe('formatCurrency', () => {
  it('should format Indian currency correctly', () => {
    expect(formatCurrency(1000)).toContain('₹');
    expect(formatCurrency(100000)).toContain('₹');
    expect(formatCurrency(10000000)).toContain('₹');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('₹0');
  });
});

describe('calculateSIP', () => {
  it('should calculate correct SIP returns without step-up', () => {
    const result = calculateSIP(10000, 12, 10, 0);

    expect(result.investedAmount).toBe(1200000);
    expect(result.futureValue).toBeGreaterThan(2000000);
    expect(result.wealthGained).toBe(result.futureValue - result.investedAmount);
    expect(result.yearlyData).toHaveLength(10);
  });

  it('should handle step-up SIP correctly', () => {
    const result = calculateSIP(10000, 12, 10, 10);

    expect(result.investedAmount).toBeGreaterThan(1200000);
    expect(result.futureValue).toBeGreaterThan(2000000);
  });
});

describe('calculateEMI', () => {
  it('should calculate EMI correctly', () => {
    const emi = calculateEMI(5000000, 8.5, 20);

    expect(emi).toBeGreaterThan(40000);
    expect(emi).toBeLessThan(50000);
  });

  it('should handle zero interest rate', () => {
    const emi = calculateEMI(120000, 0, 12);

    // EMI should be principal / months
    expect(emi).toBeCloseTo(833.33, 1);
  });
});

describe('calculateTax', () => {
  it('should calculate old regime tax correctly', () => {
    const result = calculateTax(1000000, { section80C: 150000 }, 'old');

    expect(result.tax).toBeGreaterThan(0);
    expect(result.deductions).toBe(200000);
    expect(result.takehome).toBe(1000000 - result.tax);
  });

  it('should apply Section 87A rebate in new regime', () => {
    const result = calculateTax(1000000, {}, 'new');

    expect(result.tax).toBe(0);
  });
});

describe('calculateSWP', () => {
  it('should calculate SWP without inflation correctly', () => {
    const result = calculateSWP(5000000, 30000, 10, 20, 0);

    expect(result.totalWithdrawn).toBeGreaterThan(0);
    expect(result.corpusDepleted).toBe(false);
  });

  it('should detect corpus depletion', () => {
    const result = calculateSWP(1000000, 50000, 5, 30, 0);

    expect(result.corpusDepleted).toBe(true);
  });
});

describe('calculatePrepaymentImpact', () => {
  it('should calculate one-time prepayment correctly', () => {
    const result = calculatePrepaymentImpact(5000000, 8.5, 20, 500000, 'onetime');

    // Tenure is a string like "15 years 3 months"
    expect(result.withPrepayment.tenure).toBeTruthy();
    expect(result.withPrepayment.interestSaved).toBeGreaterThan(0);
  });
});

describe('calculateRentVsBuy', () => {
  it('should calculate rent vs buy correctly', () => {
    const rentData = { monthlyRent: 25000, annualRentIncrease: 5 };
    const buyData = {
      homePrice: 5000000,
      downPayment: 1000000,
      loanAmount: 4000000,
      interestRate: 8.5,
      loanTenure: 20,
      homeAppreciation: 5
    };
    const result = calculateRentVsBuy(rentData, buyData, 12, 20);

    expect(result.verdict).toMatch(/Rent|Buy/);
    expect(result.difference).toBeGreaterThan(0);
  });
});

describe('TAX_SLABS', () => {
  it('should have correct structure for old regime', () => {
    expect(TAX_SLABS.old).toHaveProperty('year');
    expect(TAX_SLABS.old).toHaveProperty('standardDeduction');
    expect(TAX_SLABS.old).toHaveProperty('slabs');
  });

  it('should have correct structure for new regime', () => {
    expect(TAX_SLABS.new).toHaveProperty('year');
    expect(TAX_SLABS.new).toHaveProperty('rebateLimit');
  });

  it('should have correct FY year', () => {
    expect(TAX_SLABS.old.year).toBe('FY 2025-26');
    expect(TAX_SLABS.new.year).toBe('FY 2025-26');
  });
});
