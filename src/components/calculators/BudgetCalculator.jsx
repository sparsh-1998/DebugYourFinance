import { memo, useMemo, useEffect } from 'react';
import { PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCalculatorStore } from '../../store/calculatorStore';
import { formatCurrency } from '../../utils/calculations';
import {
  FormInput,
  RangeSlider,
  Toggle,
  SectionHeader,
  ComparisonCard,
  ResultCard,
  AlertBanner,
  CalculatorCard,
  HowToUseSection,
  FAQSection,
  AnalysisSection,
  NoteBox,
  StandardBarChart,
} from '../common';
import { BUDGET_HOW_TO_USE, BUDGET_FAQ } from '../../constants/educationalContent';
import { VALIDATION_BUDGET } from '../../constants/validation';
import { COLOR_CHART_PRIMARY, COLOR_SLATE_500 } from '../../constants/colors';

const BudgetCalculator = memo(function BudgetCalculator() {
  // 1. Zustand state
  const budget = useCalculatorStore((state) => state.budget);
  const updateBudget = useCalculatorStore((state) => state.updateBudget);

  const { monthlySalary, annualBonus, bonusEnabled, actualNeeds, actualWants, actualSavings } = budget;

  // 2. Setters
  const setMonthlySalary = (value) => updateBudget('monthlySalary', value);
  const setAnnualBonus = (value) => updateBudget('annualBonus', value);
  const setActualNeeds = (value) => updateBudget('actualNeeds', value);
  const setActualWants = (value) => updateBudget('actualWants', value);
  const setActualSavings = (value) => updateBudget('actualSavings', value);

  // 3. Calculations (all useMemo for performance)
  const effectiveMonthlyIncome = useMemo(() => {
    return monthlySalary + (bonusEnabled ? annualBonus / 12 : 0);
  }, [monthlySalary, annualBonus, bonusEnabled]);

  const idealSplit = useMemo(() => ({
    needs: Math.round(effectiveMonthlyIncome * 0.50),
    wants: Math.round(effectiveMonthlyIncome * 0.30),
    savings: Math.round(effectiveMonthlyIncome * 0.20)
  }), [effectiveMonthlyIncome]);

  const actualPercentages = useMemo(() => ({
    needs: ((actualNeeds / effectiveMonthlyIncome) * 100).toFixed(1),
    wants: ((actualWants / effectiveMonthlyIncome) * 100).toFixed(1),
    savings: ((actualSavings / effectiveMonthlyIncome) * 100).toFixed(1)
  }), [actualNeeds, actualWants, actualSavings, effectiveMonthlyIncome]);

  const complianceChecks = useMemo(() => ({
    needsCompliant: actualNeeds <= idealSplit.needs,
    savingsCompliant: actualSavings >= idealSplit.savings,
    isFullyCompliant: actualNeeds <= idealSplit.needs && actualSavings >= idealSplit.savings
  }), [actualNeeds, actualSavings, idealSplit]);

  const totalActualSpending = actualNeeds + actualWants + actualSavings;
  const isBalanced = totalActualSpending === effectiveMonthlyIncome;
  const remainingAmount = effectiveMonthlyIncome - totalActualSpending;

  // 4. Chart data
  const comparisonChartData = [
    { category: 'Needs', Ideal: idealSplit.needs, Actual: actualNeeds },
    { category: 'Wants', Ideal: idealSplit.wants, Actual: actualWants },
    { category: 'Savings', Ideal: idealSplit.savings, Actual: actualSavings }
  ];

  // 5. Auto-adjust sliders when income changes (good UX)
  useEffect(() => {
    const newNeeds = Math.round(effectiveMonthlyIncome * 0.5);
    const newWants = Math.round(effectiveMonthlyIncome * 0.3);
    const newSavings = effectiveMonthlyIncome - newNeeds - newWants;
    updateBudget('actualNeeds', newNeeds);
    updateBudget('actualWants', newWants);
    updateBudget('actualSavings', newSavings);
  }, [effectiveMonthlyIncome, updateBudget]);

  // 6. JSX with 8 sections
  return (
    <CalculatorCard>
      {/* Section 1: Header */}
      <SectionHeader
        icon={PiggyBank}
        title="50/30/20 Budget Calculator"
        description="Balance your needs, wants, and savings with smart budgeting"
      />

      {/* Section 2: Income Input */}
      <div className="space-y-6 mb-8">
        <FormInput
          label="Monthly In-Hand Salary"
          value={monthlySalary}
          setValue={setMonthlySalary}
          validation={VALIDATION_BUDGET.monthlySalary}
          placeholder="e.g., 50,000"
        />

        <Toggle
          label="Include Annual Bonus"
          description="Divide annual bonus by 12 and add to monthly income"
          badge="OPTIONAL"
          enabled={bonusEnabled}
          onToggle={() => updateBudget('bonusEnabled', !bonusEnabled)}
        />

        {bonusEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormInput
              label="Annual Bonus Amount"
              value={annualBonus}
              setValue={setAnnualBonus}
              validation={VALIDATION_BUDGET.annualBonus}
              placeholder="e.g., 1,00,000"
            />
          </motion.div>
        )}

        <div className="bg-accent/10 rounded-lg p-4 border-2 border-accent dark:border-accent/70">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
            Effective Monthly Income
          </p>
          <p className="text-2xl font-bold text-accent">
            {formatCurrency(effectiveMonthlyIncome)}
          </p>
        </div>
      </div>

      {/* Section 3: Ideal Budget Display */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 mb-8 border-2 border-slate-200 dark:border-slate-600">
        <h4 className="font-semibold text-primary dark:text-white mb-4">
          Ideal 50/30/20 Budget
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <ResultCard
            label="Needs (50%)"
            value={formatCurrency(idealSplit.needs)}
            variant="default"
            subtext="Essential expenses"
          />
          <ResultCard
            label="Wants (30%)"
            value={formatCurrency(idealSplit.wants)}
            variant="default"
            subtext="Lifestyle"
          />
          <ResultCard
            label="Savings (20%)"
            value={formatCurrency(idealSplit.savings)}
            variant="success"
            subtext="Investments"
          />
        </div>
      </div>

      {/* Section 4: Interactive Sliders */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8 border-2 border-blue-500 dark:border-blue-600">
        <h4 className="font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
          Your Actual Spending
          <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
            ADJUST BELOW
          </span>
        </h4>

        <div className="space-y-6">
          <div>
            <RangeSlider
              label="Needs (Rent, Groceries, EMIs)"
              value={actualNeeds}
              onChange={setActualNeeds}
              min={0}
              max={effectiveMonthlyIncome}
              step={500}
            />
            <p className="text-sm mt-2 ml-2">
              <span className={actualNeeds > idealSplit.needs
                ? 'text-red-600 dark:text-red-400 font-semibold'
                : 'text-green-600 dark:text-green-400 font-semibold'}>
                {formatCurrency(actualNeeds)} ({actualPercentages.needs}%)
              </span>
              {" "}— Ideal: {formatCurrency(idealSplit.needs)} (50%)
            </p>
          </div>

          <div>
            <RangeSlider
              label="Wants (Dining, Shopping, Subscriptions)"
              value={actualWants}
              onChange={setActualWants}
              min={0}
              max={effectiveMonthlyIncome}
              step={500}
            />
            <p className="text-sm mt-2 ml-2">
              <span className="text-primary dark:text-white font-semibold">
                {formatCurrency(actualWants)} ({actualPercentages.wants}%)
              </span>
              {" "}— Ideal: {formatCurrency(idealSplit.wants)} (30%)
            </p>
          </div>

          <div>
            <RangeSlider
              label="Savings (Investments, Emergency Fund)"
              value={actualSavings}
              onChange={setActualSavings}
              min={0}
              max={effectiveMonthlyIncome}
              step={500}
            />
            <p className="text-sm mt-2 ml-2">
              <span className={actualSavings < idealSplit.savings
                ? 'text-orange-600 dark:text-orange-400 font-semibold'
                : 'text-green-600 dark:text-green-400 font-semibold'}>
                {formatCurrency(actualSavings)} ({actualPercentages.savings}%)
              </span>
              {" "}— Ideal: {formatCurrency(idealSplit.savings)} (20%)
            </p>
          </div>
        </div>

        {!isBalanced && (
          <AlertBanner
            type="warning"
            title="Budget Not Balanced"
            message={`Your total spending is ${remainingAmount > 0 ? 'under' : 'over'} by ${formatCurrency(Math.abs(remainingAmount))}. Adjust the sliders to match your income.`}
            className="mt-4"
          />
        )}
      </div>

      {/* Section 5: Chart */}
      {isBalanced && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <StandardBarChart
            data={comparisonChartData}
            bars={[
              { dataKey: 'Ideal', fill: COLOR_SLATE_500, name: 'Ideal (50/30/20)' },
              { dataKey: 'Actual', fill: COLOR_CHART_PRIMARY, name: 'Your Spending' }
            ]}
            xKey="category"
            xLabel="Budget Category"
            yLabel="Amount (₹)"
            title="Ideal vs Actual Budget Comparison"
          />
        </motion.div>
      )}

      {/* Section 6: Compliance Cards */}
      {isBalanced && (
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <ComparisonCard
            title="Needs Status"
            items={[
              {
                label: 'Your Spending',
                value: `${actualPercentages.needs}%`,
                valueColor: complianceChecks.needsCompliant
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              },
              {
                label: 'Ideal Target',
                value: '≤ 50%'
              },
              {
                label: 'Status',
                value: complianceChecks.needsCompliant ? '✅ Good' : '❌ Over Budget',
                valueColor: complianceChecks.needsCompliant
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }
            ]}
          />

          <ComparisonCard
            title="Wants Status"
            items={[
              {
                label: 'Your Spending',
                value: `${actualPercentages.wants}%`
              },
              {
                label: 'Ideal Target',
                value: '≤ 30%'
              },
              {
                label: 'Flexibility',
                value: 'Adjustable',
                valueColor: 'text-blue-600 dark:text-blue-400'
              }
            ]}
          />

          <ComparisonCard
            title="Savings Status"
            items={[
              {
                label: 'Your Savings',
                value: `${actualPercentages.savings}%`,
                valueColor: complianceChecks.savingsCompliant
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-orange-600 dark:text-orange-400'
              },
              {
                label: 'Ideal Target',
                value: '≥ 20%'
              },
              {
                label: 'Status',
                value: complianceChecks.savingsCompliant ? '✅ Excellent' : '⚠️ Below Target',
                valueColor: complianceChecks.savingsCompliant
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-orange-600 dark:text-orange-400'
              }
            ]}
          />
        </div>
      )}

      {/* Section 7: Actionable Advice */}
      {isBalanced && (
        <div className="mb-8 space-y-4">
          {!complianceChecks.needsCompliant && (
            <AlertBanner
              type="error"
              title="High Essential Expenses"
              message={`Your needs (${actualPercentages.needs}%) exceed the recommended 50%. Consider: negotiating rent, refinancing loans, or switching to more affordable service providers.`}
            />
          )}

          {!complianceChecks.savingsCompliant && (
            <AlertBanner
              type="warning"
              title="Low Savings Rate"
              message={`Your savings (${actualPercentages.savings}%) are below 20%. Set up automated SIP transfers immediately after salary credit. Even increasing by ${formatCurrency(idealSplit.savings - actualSavings)} can make a huge difference!`}
            />
          )}

          {complianceChecks.isFullyCompliant && (
            <AlertBanner
              type="success"
              title="Excellent Financial Health!"
              message="Your budget aligns with the 50/30/20 rule. You're on track for long-term financial success. Consider increasing savings rate as your income grows."
            />
          )}

          {parseFloat(actualPercentages.wants) > 35 && (
            <AlertBanner
              type="info"
              title="High Lifestyle Spending"
              message={`Your wants (${actualPercentages.wants}%) are above ideal. Small reductions in dining out, subscriptions, or impulse purchases can boost your savings significantly.`}
            />
          )}
        </div>
      )}

      {/* Section 8: Educational Content */}
      <div className="mb-8">
        <AnalysisSection title="What is the 50/30/20 Rule?" variant="info">
          <p className="mb-3">
            The 50/30/20 rule is a simple budgeting framework popularized by Senator Elizabeth Warren.
            It divides your after-tax income into three categories:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-3">
            <li>
              <strong>50% Needs:</strong> Essential expenses you can't avoid (rent, groceries, utilities,
              insurance, EMIs, transportation)
            </li>
            <li>
              <strong>30% Wants:</strong> Lifestyle choices and discretionary spending (dining out,
              entertainment, shopping, vacations, subscriptions)
            </li>
            <li>
              <strong>20% Savings:</strong> Financial goals and future security (investments, emergency fund,
              retirement, debt prepayment)
            </li>
          </ul>
          <p>
            This rule provides a balanced approach to managing money without complex tracking. It ensures
            you cover essentials, enjoy life, and build wealth simultaneously.
          </p>
        </AnalysisSection>
      </div>

      <div className="mb-8">
        <HowToUseSection steps={BUDGET_HOW_TO_USE} />
      </div>

      <div className="mb-8">
        <FAQSection faqs={BUDGET_FAQ} />
      </div>

      <NoteBox type="note">
        <p>
          <strong>Remember:</strong> The 50/30/20 rule is a guideline, not a rigid law. Your percentages
          may vary based on life stage, location, and goals. In expensive cities, needs might be 60%.
          Early career professionals might save only 15%. What matters is conscious spending and consistent
          saving—even 10% savings is better than 0%. Adjust the rule to fit your reality while striving
          for improvement.
        </p>
      </NoteBox>
    </CalculatorCard>
  );
});

export default BudgetCalculator;
