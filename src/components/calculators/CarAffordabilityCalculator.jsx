import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import { useCalculatorStore } from '../../store/calculatorStore';
import { formatCurrency } from '../../utils/calculations';
import {
  FormInput,
  RangeSlider,
  SectionHeader,
  ComparisonCard,
  AlertBanner,
  CalculatorCard,
  HowToUseSection,
  FAQSection,
  AnalysisSection,
  NoteBox,
  StandardBarChart
} from '../common';
import {
  CALC_CAR_AFFORDABILITY,
  CALC_CAR_AFFORDABILITY_DESC,
  CAR_RULE_20,
  CAR_RULE_4,
  CAR_RULE_10,
  CAR_MONTHLY_SALARY,
  CAR_ON_ROAD_PRICE,
  CAR_DOWN_PAYMENT_PERCENT,
  CAR_LOAN_TENURE_YEARS,
  CAR_INTEREST_RATE,
  CAR_FUEL_COST,
  CAR_INSURANCE_COST,
  CAR_MAINTENANCE_COST,
  CAR_DOWN_PAYMENT_AMOUNT,
  CAR_LOAN_AMOUNT,
  CAR_MONTHLY_EMI,
  CAR_TOTAL_RUNNING_COST,
  CAR_TOTAL_MONTHLY_EXPENSE,
  CAR_PERCENT_OF_SALARY,
  CAR_AFFORDABLE,
  CAR_NOT_AFFORDABLE,
  CAR_REQUIRED_SALARY,
  CAR_VERDICT_AFFORDABLE,
  CAR_VERDICT_NOT_AFFORDABLE,
  CAR_20_4_10_RULE,
  CAR_RULE_EXPLANATION,
  CAR_BREAKDOWN_TITLE,
  CAR_RULE_COMPLIANCE
} from '../../constants/messages';
import {
  CAR_HOW_TO_USE,
  CAR_FAQ
} from '../../constants/educationalContent';

const CarAffordabilityCalculator = () => {
  // State management with Zustand
  const car = useCalculatorStore((state) => state.car);
  const updateCar = useCalculatorStore((state) => state.updateCar);

  const {
    monthlySalary,
    onRoadPrice,
    downPaymentPercent,
    loanTenureYears,
    interestRate,
    fuelCost,
    insuranceCost,
    maintenanceCost,
  } = car;

  // Setter functions
  const setMonthlySalary = (value) => updateCar('monthlySalary', value);
  const setOnRoadPrice = (value) => updateCar('onRoadPrice', value);
  const setDownPaymentPercent = (value) => updateCar('downPaymentPercent', value);
  const setLoanTenureYears = (value) => updateCar('loanTenureYears', value);
  const setInterestRate = (value) => updateCar('interestRate', value);
  const setFuelCost = (value) => updateCar('fuelCost', value);
  const setInsuranceCost = (value) => updateCar('insuranceCost', value);
  const setMaintenanceCost = (value) => updateCar('maintenanceCost', value);

  // Calculations
  const calculations = useMemo(() => {
    const downPaymentAmount = Math.round((onRoadPrice * downPaymentPercent) / 100);
    const loanAmount = Math.round(onRoadPrice - downPaymentAmount);
    const monthlyInterestRate = interestRate / 100 / 12;
    const loanTenureMonths = loanTenureYears * 12;

    // Calculate EMI using formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
    let monthlyEMI = 0;
    if (loanAmount > 0 && monthlyInterestRate > 0 && loanTenureMonths > 0) {
      const emi =
        (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTenureMonths)) /
        (Math.pow(1 + monthlyInterestRate, loanTenureMonths) - 1);
      monthlyEMI = Math.round(emi);
    }

    const totalRunningCost = fuelCost + insuranceCost + maintenanceCost;
    const totalMonthlyExpense = Math.round(monthlyEMI + totalRunningCost);
    const percentOfSalary = (totalMonthlyExpense / monthlySalary) * 100;

    // Check 20/4/10 rule compliance
    const isDownPaymentCompliant = downPaymentPercent >= 20;
    const isTenureCompliant = loanTenureYears <= 4;
    const isExpenseCompliant = percentOfSalary <= 10;
    const isAffordable = isDownPaymentCompliant && isTenureCompliant && isExpenseCompliant;

    // Calculate required salary if not affordable
    const requiredSalary = isExpenseCompliant ? 0 : Math.round(totalMonthlyExpense / 0.1);

    return {
      downPaymentAmount,
      loanAmount,
      monthlyEMI,
      totalRunningCost,
      totalMonthlyExpense,
      percentOfSalary,
      isAffordable,
      isDownPaymentCompliant,
      isTenureCompliant,
      isExpenseCompliant,
      requiredSalary
    };
  }, [
    monthlySalary,
    onRoadPrice,
    downPaymentPercent,
    loanTenureYears,
    interestRate,
    fuelCost,
    insuranceCost,
    maintenanceCost
  ]);

  // Chart data
  const breakdownChartData = [
    { category: 'EMI', amount: calculations.monthlyEMI },
    { category: 'Fuel', amount: fuelCost },
    { category: 'Insurance', amount: insuranceCost },
    { category: 'Maintenance', amount: maintenanceCost }
  ];

  const breakdownChartBars = [{ dataKey: 'amount', fill: '#3b82f6', name: 'Monthly Cost (₹)' }];

  return (
    <CalculatorCard>
      <SectionHeader
        icon={Car}
        title={CALC_CAR_AFFORDABILITY}
        description={CALC_CAR_AFFORDABILITY_DESC}
      />

      {/* Main Input Section */}
      <div className="space-y-6 mb-8">
        <FormInput
          label={CAR_MONTHLY_SALARY}
          value={monthlySalary}
          setValue={setMonthlySalary}
          placeholder="e.g., 50,000"
        />

        <FormInput
          label={CAR_ON_ROAD_PRICE}
          value={onRoadPrice}
          setValue={setOnRoadPrice}
          placeholder="e.g., 10,00,000"
        />

        <RangeSlider
          label={CAR_DOWN_PAYMENT_PERCENT}
          value={downPaymentPercent}
          onChange={setDownPaymentPercent}
          min={0}
          max={100}
          step={5}
          unit="%"
        />
        <p className="text-xs text-slate-600 dark:text-slate-400 -mt-4 mb-4">
          {formatCurrency((onRoadPrice * downPaymentPercent) / 100)} | Recommended: 20% or more ({formatCurrency((onRoadPrice * 20) / 100)})
        </p>

        <RangeSlider
          label={CAR_LOAN_TENURE_YEARS}
          value={loanTenureYears}
          onChange={setLoanTenureYears}
          min={3}
          max={7}
          step={1}
          unit=" years"
        />
        <p className="text-xs text-slate-600 dark:text-slate-400 -mt-4 mb-4">
          Recommended: 4 years or less
        </p>

        <RangeSlider
          label={CAR_INTEREST_RATE}
          value={interestRate}
          onChange={setInterestRate}
          min={6}
          max={12}
          step={0.1}
          unit="% p.a."
        />
        <p className="text-xs text-slate-600 dark:text-slate-400 -mt-4 mb-4">
          Typical car loan rates: 8-10% p.a.
        </p>
      </div>

      {/* Running Costs Section */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 space-y-4 mb-8 border-2 border-slate-200 dark:border-slate-600">
        <h4 className="font-semibold text-primary dark:text-white mb-3">
          Monthly Running Costs
        </h4>

        <FormInput
          label={CAR_FUEL_COST}
          value={fuelCost}
          setValue={setFuelCost}
          placeholder="e.g., 5,000"
        />

        <FormInput
          label={CAR_INSURANCE_COST}
          value={insuranceCost}
          setValue={setInsuranceCost}
          placeholder="e.g., 2,000"
        />
        <p className="text-xs text-slate-600 dark:text-slate-400 -mt-2">
          Annual insurance / 12 months
        </p>

        <FormInput
          label={CAR_MAINTENANCE_COST}
          value={maintenanceCost}
          setValue={setMaintenanceCost}
          placeholder="e.g., 1,500"
        />
      </div>

      {/* Affordability Verdict */}
      <div className="mb-8">
        <AlertBanner
          type={calculations.isAffordable ? 'success' : 'error'}
          title={calculations.isAffordable ? CAR_AFFORDABLE : CAR_NOT_AFFORDABLE}
          message={
            calculations.isAffordable
              ? CAR_VERDICT_AFFORDABLE
              : CAR_VERDICT_NOT_AFFORDABLE(formatCurrency(calculations.requiredSalary))
          }
        />
      </div>

      {/* 20/4/10 Rule Compliance */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <ComparisonCard
          title={CAR_RULE_20}
          items={[
            {
              label: 'Your Down Payment',
              value: `${downPaymentPercent}%`,
              valueColor: calculations.isDownPaymentCompliant ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            },
            {
              label: 'Status',
              value: calculations.isDownPaymentCompliant ? '✅ Compliant' : '❌ Too Low',
              valueColor: calculations.isDownPaymentCompliant ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }
          ]}
          variant="default"
        />

        <ComparisonCard
          title={CAR_RULE_4}
          items={[
            {
              label: 'Your Tenure',
              value: `${loanTenureYears} years`,
              valueColor: calculations.isTenureCompliant ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            },
            {
              label: 'Status',
              value: calculations.isTenureCompliant ? '✅ Compliant' : '❌ Too Long',
              valueColor: calculations.isTenureCompliant ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }
          ]}
          variant="default"
        />

        <ComparisonCard
          title={CAR_RULE_10}
          items={[
            {
              label: 'Your Expense',
              value: `${calculations.percentOfSalary.toFixed(1)}%`,
              valueColor: calculations.isExpenseCompliant ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            },
            {
              label: 'Status',
              value: calculations.isExpenseCompliant ? '✅ Compliant' : '❌ Too High',
              valueColor: calculations.isExpenseCompliant ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }
          ]}
          variant="default"
        />
      </div>

      {/* Cost Breakdown */}
      <div className="grid md:grid-cols-2 gap-6 mb-8 md:items-stretch">
        <ComparisonCard
          title={CAR_BREAKDOWN_TITLE}
          items={[
            {
              label: CAR_DOWN_PAYMENT_AMOUNT,
              value: formatCurrency(calculations.downPaymentAmount)
            },
            {
              label: CAR_LOAN_AMOUNT,
              value: formatCurrency(calculations.loanAmount)
            },
            {
              label: CAR_MONTHLY_EMI,
              value: formatCurrency(calculations.monthlyEMI)
            },
            {
              label: CAR_TOTAL_RUNNING_COST,
              value: formatCurrency(calculations.totalRunningCost)
            },
            {
              label: CAR_TOTAL_MONTHLY_EXPENSE,
              value: formatCurrency(calculations.totalMonthlyExpense),
              valueColor: calculations.isAffordable
                ? 'text-accent font-bold text-lg'
                : 'text-red-600 dark:text-red-400 font-bold text-lg',
              bordered: true
            },
            {
              label: CAR_PERCENT_OF_SALARY,
              value: `${calculations.percentOfSalary.toFixed(1)}%`,
              valueColor: calculations.isAffordable
                ? 'text-accent font-bold text-lg'
                : 'text-red-600 dark:text-red-400 font-bold text-lg'
            }
          ]}
          variant="default"
        />

        <StandardBarChart
          data={breakdownChartData}
          bars={breakdownChartBars}
          xKey="category"
          title="Monthly Cost Breakdown"
          height={300}
        />
      </div>

      {/* The 20/4/10 Rule Explanation */}
      <div className="mb-8">
        <AnalysisSection title={CAR_20_4_10_RULE}>
          <p>{CAR_RULE_EXPLANATION}</p>
        </AnalysisSection>
      </div>

      {/* How to Use */}
      <div className="mb-8">
        <HowToUseSection steps={CAR_HOW_TO_USE} />
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <FAQSection faqs={CAR_FAQ} />
      </div>

      {/* Additional Notes */}
      <NoteBox>
        The 20/4/10 rule is a guideline, not a law. If you live in
        a city with excellent public transport, you might aim for even lower car expenses. If
        you need a car for business, factor in tax deductions. Always consider your complete
        financial picture including emergency fund, retirement savings, and other goals.
      </NoteBox>
    </CalculatorCard>
  );
};

export default memo(CarAffordabilityCalculator);
