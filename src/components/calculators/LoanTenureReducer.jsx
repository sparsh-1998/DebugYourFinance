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
  ChartContainer
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
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
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
          transition={{ duration: 0.5 }}
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
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                  <XAxis
                    dataKey="year"
                    label={{ value: CHART_YEARS, position: 'insideBottom', offset: -5 }}
                    tick={{ fill: '#64748b' }}
                    className="dark:fill-slate-400"
                  />
                  <YAxis
                    label={{ value: CHART_OUTSTANDING, angle: -90, position: 'insideLeft' }}
                    tick={{ fill: '#64748b' }}
                    className="dark:fill-slate-400"
                    tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="withoutPrepayment"
                    stroke="#64748b"
                    strokeWidth={2}
                    name={CHART_WITHOUT_PREPAYMENT}
                    dot={{ fill: '#64748b', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="withPrepayment"
                    stroke="#10b981"
                    strokeWidth={2}
                    name={CHART_WITH_PREPAYMENT}
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </motion.div>
      )}
    </div>
  );
}
