import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
  ChartContainer,
  CalculatorCard
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
  CHART_YEARS,
  CHART_OUTSTANDING,
  CHART_WITHOUT_PREPAYMENT,
  CHART_WITH_PREPAYMENT,
  PLACEHOLDER_40L,
  PLACEHOLDER_2L
} from '../../constants/messages';
import { UNIT_PERCENT, UNIT_YEARS } from '../../constants/units';
import { COLOR_CHART_GRID, COLOR_SLATE_500, COLOR_CHART_PRIMARY, COLOR_CHART_NEUTRAL } from '../../constants/colors';
import { CHART_TOOLTIP_STYLE, CHART_STROKE_DASHARRAY, CHART_STROKE_WIDTH, CHART_BAR_RADIUS, CHART_DOT_RADIUS, CHART_HEIGHT, CHART_LABEL_OFFSET } from '../../constants/chartStyles';
import { ANIMATION_DURATION_SLOW } from '../../constants/animations';

export default function LoanTenureReducer() {
  const [principal, setPrincipal] = useLocalStorage('loan_principal', 5000000);
  const [annualRate, setAnnualRate] = useLocalStorage('loan_rate', 8.5);
  const [tenure, setTenure] = useLocalStorage('loan_tenure', 20);
  const [prepayment, setPrepayment] = useLocalStorage('loan_prepayment', 100000);
  const [frequency, setFrequency] = useLocalStorage('loan_frequency', 'annual');
  const [emi, setEmi] = useState(0);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const calculatedEmi = calculateEMI(principal, annualRate, tenure);
    setEmi(calculatedEmi);

    const impact = calculatePrepaymentImpact(principal, annualRate, tenure, prepayment, frequency);
    setResults(impact);
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
            <ChartContainer title={LOAN_PRINCIPAL_REDUCTION}>
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <LineChart data={results.yearlyData}>
                  <CartesianGrid strokeDasharray={CHART_STROKE_DASHARRAY} stroke={COLOR_CHART_GRID} className="dark:stroke-slate-600" />
                  <XAxis
                    dataKey="year"
                    label={{ value: CHART_YEARS, position: 'insideBottom', offset: CHART_LABEL_OFFSET }}
                    tick={{ fill: COLOR_SLATE_500 }}
                    className="dark:fill-slate-400"
                  />
                  <YAxis
                    label={{ value: CHART_OUTSTANDING, angle: -90, position: 'insideLeft' }}
                    tick={{ fill: COLOR_SLATE_500 }}
                    className="dark:fill-slate-400"
                    tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={CHART_TOOLTIP_STYLE}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="withoutPrepayment"
                    stroke={COLOR_CHART_NEUTRAL}
                    strokeWidth={CHART_STROKE_WIDTH}
                    name={CHART_WITHOUT_PREPAYMENT}
                    dot={{ fill: COLOR_CHART_NEUTRAL, r: CHART_DOT_RADIUS }}
                  />
                  <Line
                    type="monotone"
                    dataKey="withPrepayment"
                    stroke={COLOR_CHART_PRIMARY}
                    strokeWidth={CHART_STROKE_WIDTH}
                    name={CHART_WITH_PREPAYMENT}
                    dot={{ fill: COLOR_CHART_PRIMARY, r: CHART_DOT_RADIUS }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </motion.div>
      )}

      {/* Educational Sections */}
      <div className="mt-12 space-y-8">
        {/* How to Use This Tool */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">How to Use This Tool</h3>
          <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300">
            <li><strong>Enter your loan details</strong> - Loan amount, interest rate, and tenure (typically from your loan agreement)</li>
            <li><strong>Add prepayment amount</strong> - The extra amount you plan to pay monthly beyond your regular EMI</li>
            <li><strong>Review savings</strong> - See how much interest you'll save and how quickly you can close your loan</li>
          </ol>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">Should I prepay my home loan?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Yes, if your loan interest rate is higher than what you can earn from investments. For example, if your home
                loan is at 9% and your investments give 7-8% returns, prepaying saves you the difference. However, don't
                deplete your emergency fund or compromise essential investments like retirement savings. A balanced approach
                is ideal - invest for wealth creation while prepaying to reduce debt burden.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">How much can I save with prepayments?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Prepayments can save lakhs in interest! For a ₹50 lakh loan at 9% for 20 years, your total interest is ≈₹60 lakhs.
                By prepaying just ₹10,000/month extra, you can save ≈₹25 lakhs and close the loan 8 years earlier! Early prepayments
                have the highest impact because most of your initial EMIs go toward interest, not principal.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">What is the best prepayment strategy?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                The best strategy is <strong>regular monthly prepayments</strong> rather than occasional lump sums. Even small
                amounts (₹5,000-₹10,000) prepaid every month compound to massive savings. Make prepayments in the early years
                when interest component is highest. Always opt for "tenure reduction" rather than "EMI reduction" to maximize
                interest savings (unless you need lower EMIs for cash flow).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">Are there prepayment charges?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                For home loans: Most banks don't charge prepayment fees on floating-rate loans. Fixed-rate loans may have
                prepayment charges (typically 2-4%). For personal loans: Banks usually charge 2-5% prepayment penalty. Always
                check your loan agreement or ask your lender before making prepayments. Even with charges, prepayments are
                often beneficial if your savings exceed the penalty.
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Block */}
        <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-lg p-6 border-2 border-accent/20 dark:border-accent/30">
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">How Loan Prepayment Works</h3>
          <div className="text-slate-700 dark:text-slate-300 space-y-4">
            <p>
              Loan calculations use the <strong>Reducing Balance Method</strong> with prepayments applied to principal:
            </p>

            <div className="bg-white dark:bg-slate-900 rounded p-4 space-y-2">
              <div className="font-mono text-sm">EMI = [P × r × (1+r)ⁿ] / [(1+r)ⁿ - 1]</div>
              <div className="font-mono text-sm">Monthly Interest = Outstanding × (r/12)</div>
              <div className="font-mono text-sm">Principal Paid = EMI - Monthly Interest</div>
              <div className="font-mono text-sm">New Outstanding = Outstanding - Principal Paid - Prepayment</div>
            </div>

            <p>Where:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>P</strong> = Loan principal amount</li>
              <li><strong>r</strong> = Monthly interest rate (annual rate ÷ 12 ÷ 100)</li>
              <li><strong>n</strong> = Total number of months</li>
              <li><strong>EMI</strong> = Fixed monthly payment</li>
            </ul>

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

            <p className="text-sm mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-700">
              <strong>💡 Pro Tip:</strong> Even prepaying ₹5,000/month on a 20-year loan can reduce tenure by 5-7 years and
              save ₹10-15 lakhs in interest! Start prepaying as early as possible for maximum benefit.
            </p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
