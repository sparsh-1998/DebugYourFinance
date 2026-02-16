import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Home, TrendingDown } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { calculateEMI, calculatePrepaymentImpact, formatCurrency } from '../../utils/calculations';
import {
  FormInput,
  RangeSlider,
  ButtonGroup,
  ResultCard,
  SectionHeader,
  ComparisonCard,
  HighlightCard,
  CalculatorCard,
  HowToUseSection,
  FAQSection,
  AnalysisSection,
  FormulaBox,
  VariableList,
  NoteBox,
  StandardLineChart
} from '../common';
import {
  CALC_LOAN_DESC,
  LABEL_LOAN_AMOUNT,
  LABEL_INTEREST_RATE,
  LABEL_LOAN_TENURE,
  LABEL_PREPAYMENT_AMOUNT,
  LOAN_MONTHLY_EMI,
  LOAN_PREPAYMENT_FREQUENCY,
  LOAN_FREQ_ONETIME,
  LOAN_FREQ_ANNUAL,
  LOAN_FREQ_MONTHLY,
  LOAN_WITHOUT_PREPAYMENT,
  LOAN_WITH_PREPAYMENT,
  LOAN_TENURE,
  LOAN_NEW_TENURE,
  LOAN_TOTAL_INTEREST,
  LOAN_YOUR_SAVINGS,
  LOAN_TENURE_REDUCED,
  LOAN_INTEREST_SAVED,
  LOAN_PRINCIPAL_REDUCTION,
  CHART_OUTSTANDING,
  CHART_WITHOUT_PREPAYMENT,
  CHART_WITH_PREPAYMENT,
  PLACEHOLDER_40L,
  PLACEHOLDER_2L
} from '../../constants/messages';
import { UNIT_PERCENT, UNIT_YEARS } from '../../constants/units';
import { COLOR_CHART_PRIMARY, COLOR_CHART_NEUTRAL } from '../../constants/colors';
import { ANIMATION_DURATION_SLOW } from '../../constants/animations';
import {
  LOAN_HOW_TO_USE,
  LOAN_FAQ
} from '../../constants/educationalContent';

export default function LoanTenureReducer() {
  const [principal, setPrincipal] = useLocalStorage('loan_principal', 5000000);
  const [annualRate, setAnnualRate] = useLocalStorage('loan_rate', 8.5);
  const [tenure, setTenure] = useLocalStorage('loan_tenure', 20);
  const [prepayment, setPrepayment] = useLocalStorage('loan_prepayment', 100000);
  const [frequency, setFrequency] = useLocalStorage('loan_frequency', 'annual');

  // Memoize EMI calculation
  const emi = useMemo(() => {
    return calculateEMI(principal, annualRate, tenure);
  }, [principal, annualRate, tenure]);

  // Memoize prepayment impact calculation
  const results = useMemo(() => {
    return calculatePrepaymentImpact(principal, annualRate, tenure, prepayment, frequency);
  }, [principal, annualRate, tenure, prepayment, frequency]);

  const frequencyOptions = [
    { value: 'onetime', label: LOAN_FREQ_ONETIME },
    { value: 'annual', label: LOAN_FREQ_ANNUAL },
    { value: 'monthly', label: LOAN_FREQ_MONTHLY }
  ];

  return (
    <CalculatorCard>
      <SectionHeader
        icon={Home}
        title="Loan Tenure Reducer"
        description={CALC_LOAN_DESC}
      />

      {/* Input Form */}
      <div className="space-y-6 mb-8">
        <FormInput
          label={LABEL_LOAN_AMOUNT}
          value={principal}
          setValue={setPrincipal}
          validation={{ min: 100000, max: 100000000, allowDecimals: false, required: true }}
          placeholder={PLACEHOLDER_40L}
        />

        <RangeSlider
          label={LABEL_INTEREST_RATE}
          value={annualRate}
          onChange={setAnnualRate}
          min={6}
          max={15}
          step={0.1}
          unit={UNIT_PERCENT}
        />

        <RangeSlider
          label={LABEL_LOAN_TENURE}
          value={tenure}
          onChange={setTenure}
          min={5}
          max={30}
          step={1}
          unit={UNIT_YEARS}
        />

        <ResultCard
          label={LOAN_MONTHLY_EMI}
          value={formatCurrency(emi)}
          variant="primary"
        />

        <FormInput
          label={LABEL_PREPAYMENT_AMOUNT}
          value={prepayment}
          setValue={setPrepayment}
          validation={{ min: 0, max: principal, allowDecimals: false }}
          placeholder={PLACEHOLDER_2L}
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {LOAN_PREPAYMENT_FREQUENCY}
          </label>
          <ButtonGroup
            options={frequencyOptions}
            selected={frequency}
            onSelect={setFrequency}
            className="grid-cols-3"
          />
        </div>
      </div>

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION_SLOW }}
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ComparisonCard
              title={LOAN_WITHOUT_PREPAYMENT}
              icon={TrendingDown}
              iconColor="text-slate-600 dark:text-slate-400"
              items={[
                { label: LOAN_TENURE, value: results.original.tenure },
                {
                  label: LOAN_TOTAL_INTEREST,
                  value: formatCurrency(results.original.totalInterest),
                  valueColor: 'text-red-600 dark:text-red-400'
                }
              ]}
            />

            <ComparisonCard
              title={LOAN_WITH_PREPAYMENT}
              icon={TrendingDown}
              iconColor="text-accent"
              variant="accent"
              items={[
                { label: LOAN_NEW_TENURE, value: results.withPrepayment.tenure, valueColor: 'text-accent' },
                {
                  label: LOAN_TOTAL_INTEREST,
                  value: formatCurrency(results.withPrepayment.totalInterest),
                  valueColor: 'text-accent'
                }
              ]}
            />
          </div>

          {/* Savings Highlight */}
          <HighlightCard
            title={LOAN_YOUR_SAVINGS}
            items={[
              { label: LOAN_TENURE_REDUCED, value: results.withPrepayment.tenureReduced },
              {
                label: LOAN_INTEREST_SAVED,
                value: formatCurrency(results.withPrepayment.interestSaved)
              }
            ]}
            className="mb-8"
          />

          {/* Chart */}
          {results.yearlyData.length > 0 && (
            <StandardLineChart
              data={results.yearlyData}
              lines={[
                { dataKey: 'withoutPrepayment', stroke: COLOR_CHART_NEUTRAL, name: CHART_WITHOUT_PREPAYMENT },
                { dataKey: 'withPrepayment', stroke: COLOR_CHART_PRIMARY, name: CHART_WITH_PREPAYMENT }
              ]}
              title={LOAN_PRINCIPAL_REDUCTION}
              yLabel={CHART_OUTSTANDING}
            />
          )}
        </motion.div>
      )}

      {/* Educational Sections */}
      <div className="mt-12 space-y-8">
        <HowToUseSection steps={LOAN_HOW_TO_USE} />
        <FAQSection faqs={LOAN_FAQ} />
        <AnalysisSection title="How Loan Prepayment Works" variant="default">
          <p>
            Loan calculations use the <strong>Reducing Balance Method</strong> with prepayments applied to principal:
          </p>

          <div className="bg-white dark:bg-slate-900 rounded p-4 space-y-2">
            <div className="font-mono text-sm">EMI = [P × r × (1+r)ⁿ] / [(1+r)ⁿ - 1]</div>
            <div className="font-mono text-sm">Monthly Interest = Outstanding × (r/12)</div>
            <div className="font-mono text-sm">Principal Paid = EMI - Monthly Interest</div>
            <div className="font-mono text-sm">New Outstanding = Outstanding - Principal Paid - Prepayment</div>
          </div>

          <VariableList variables={[
            { symbol: 'P', description: 'Loan principal amount' },
            { symbol: 'r', description: 'Monthly interest rate (annual rate ÷ 12 ÷ 100)' },
            { symbol: 'n', description: 'Total number of months' },
            { symbol: 'EMI', description: 'Fixed monthly payment' }
          ]} />

          <p>
            <strong>How Prepayments Work:</strong>
          </p>
          <p>
            When you make a prepayment, it directly reduces your outstanding principal. Since interest is calculated on
            the outstanding amount, a lower principal means lower interest in subsequent months. This creates a snowball
            effect - every rupee prepaid saves you from paying interest on that rupee for the remaining tenure.
          </p>

          <p>
            <strong>Tenure Reduction:</strong> With prepayments, your loan closes earlier because you're paying more than
            the scheduled principal each month. The calculator simulates month-by-month payments until the outstanding
            reaches zero, then compares it with the original timeline to show your savings.
          </p>

          <p>
            <strong>Interest Savings:</strong> This is calculated as: (Total interest without prepayment) - (Total interest
            with prepayment). The earlier you prepay, the higher your savings, because you eliminate years of compound interest.
          </p>

          <NoteBox type="note">
            Even prepaying ₹5,000/month on a 20-year loan can reduce tenure by 5-7 years and
            save ₹10-15 lakhs in interest! Start prepaying as early as possible for maximum benefit.
          </NoteBox>
        </AnalysisSection>
      </div>
    </CalculatorCard>
  );
}
