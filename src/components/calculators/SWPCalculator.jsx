import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { calculateSWP, formatCurrency } from '../../utils/calculations';
import {
  FormInput,
  RangeSlider,
  Toggle,
  ResultCard,
  SectionHeader,
  AlertBanner,
  InfoBox,
  ChartContainer
} from '../common';
import {
  CALC_SWP,
  CALC_SWP_DESC,
  LABEL_LUMPSUM_AMOUNT,
  LABEL_MONTHLY_WITHDRAWAL,
  LABEL_EXPECTED_RETURN,
  LABEL_TIME_PERIOD,
  SWP_INFLATION_ADJUSTED,
  SWP_INFLATION_DESC,
  SWP_INFLATION_BADGE,
  SWP_INFLATION_RATE,
  SWP_CORPUS_DEPLETED,
  SWP_CONSIDERATION,
  SWP_CORPUS_DURATION,
  SWP_TOTAL_WITHDRAWN,
  SWP_FINAL_CORPUS,
  SWP_DEPLETION_TIMELINE,
  SWP_INFLATION_IMPACT,
  CHART_YEARS,
  CHART_AMOUNT,
  CHART_REMAINING_CORPUS,
  CHART_TOTAL_WITHDRAWN,
  PLACEHOLDER_50L,
  PLACEHOLDER_30K
} from '../../constants/messages';
import { UNIT_PERCENT, UNIT_YEARS } from '../../constants/units';

export default function SWPCalculator() {
  const [lumpsumAmount, setLumpsumAmount] = useLocalStorage('swp_lumpsum', 5000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useLocalStorage('swp_withdrawal', 30000);
  const [expectedReturn, setExpectedReturn] = useLocalStorage('swp_return', 10);
  const [timePeriod, setTimePeriod] = useLocalStorage('swp_years', 20);
  const [inflationEnabled, setInflationEnabled] = useLocalStorage('swp_inflation_enabled', false);
  const [inflationRate, setInflationRate] = useLocalStorage('swp_inflation_rate', 6);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const calculated = calculateSWP(
      lumpsumAmount,
      monthlyWithdrawal,
      expectedReturn,
      timePeriod,
      inflationEnabled ? inflationRate : 0
    );
    setResults(calculated);
  }, [lumpsumAmount, monthlyWithdrawal, expectedReturn, timePeriod, inflationEnabled, inflationRate]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
      <SectionHeader
        icon={TrendingDown}
        title={CALC_SWP}
        description={CALC_SWP_DESC}
      />

      {/* Input Form */}
      <div className="space-y-6 mb-8">
        {/* Lumpsum Amount */}
        <FormInput
          label={LABEL_LUMPSUM_AMOUNT}
          value={lumpsumAmount}
          setValue={setLumpsumAmount}
          validation={{ min: 100000, max: 1000000000, allowDecimals: false, required: true }}
          placeholder={PLACEHOLDER_50L}
        />

        {/* Monthly Withdrawal */}
        <FormInput
          label={LABEL_MONTHLY_WITHDRAWAL}
          value={monthlyWithdrawal}
          setValue={setMonthlyWithdrawal}
          validation={{ min: 1000, max: lumpsumAmount, allowDecimals: false, required: true }}
          placeholder={PLACEHOLDER_30K}
        />

        {/* Expected Return */}
        <RangeSlider
          label={LABEL_EXPECTED_RETURN}
          value={expectedReturn}
          onChange={setExpectedReturn}
          min={4}
          max={15}
          step={0.5}
          unit={UNIT_PERCENT}
        />

        {/* Time Period */}
        <RangeSlider
          label={LABEL_TIME_PERIOD}
          value={timePeriod}
          onChange={setTimePeriod}
          min={5}
          max={40}
          step={1}
          unit={UNIT_YEARS}
        />

        {/* Inflation Adjusted Withdrawal Toggle */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4 border-2 border-orange-200 dark:border-orange-700">
          <Toggle
            label={SWP_INFLATION_ADJUSTED}
            description={SWP_INFLATION_DESC}
            badge={SWP_INFLATION_BADGE}
            enabled={inflationEnabled}
            onToggle={() => setInflationEnabled(!inflationEnabled)}
          />

          {/* Inflation Rate Slider */}
          {inflationEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pt-3 border-t border-orange-200 dark:border-orange-700">
                <RangeSlider
                  label={SWP_INFLATION_RATE}
                  value={inflationRate}
                  onChange={setInflationRate}
                  min={3}
                  max={10}
                  step={0.5}
                  unit={UNIT_PERCENT}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Warning if corpus depletes */}
          {results.corpusDepleted && (
            <AlertBanner
              type="error"
              title={SWP_CORPUS_DEPLETED}
              className="mb-6"
            >
              <p className="mt-1">
                Your corpus will last only <strong>{results.lastingPeriod}</strong>.
                {inflationEnabled && ' Inflation-adjusted withdrawals accelerate depletion.'}
              </p>
              <p className="text-xs mt-2">
                {SWP_CONSIDERATION}
              </p>
            </AlertBanner>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <ResultCard
              label={SWP_CORPUS_DURATION}
              value={results.lastingPeriod}
              variant={results.corpusDepleted ? 'error' : 'success'}
            />
            <ResultCard
              label={SWP_TOTAL_WITHDRAWN}
              value={formatCurrency(results.totalWithdrawn)}
              variant="default"
            />
            <ResultCard
              label={SWP_FINAL_CORPUS}
              value={formatCurrency(results.finalCorpus)}
              variant="accent"
            />
          </div>

          {/* Inflation Impact Info */}
          {inflationEnabled && results.yearlyData.length > 0 && (
            <InfoBox variant="warning" className="mb-6 p-4">
              <p>
                <strong>📊 {SWP_INFLATION_IMPACT}</strong> Your monthly withdrawal will grow from{' '}
                <span className="text-accent font-semibold">{formatCurrency(monthlyWithdrawal)}</span> to{' '}
                <span className="text-accent font-semibold">
                  {formatCurrency(results.yearlyData[results.yearlyData.length - 1].monthlyWithdrawal)}
                </span>{' '}
                by year {results.yearlyData.length} to maintain purchasing power.
              </p>
            </InfoBox>
          )}

          {/* Chart */}
          <ChartContainer
            title={SWP_DEPLETION_TIMELINE}
            subtitle={inflationEnabled ? '(Inflation-Adjusted)' : ''}
          >
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
                  label={{ value: CHART_AMOUNT, angle: -90, position: 'insideLeft' }}
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
                  dataKey="corpus"
                  stroke="#10b981"
                  strokeWidth={2}
                  name={CHART_REMAINING_CORPUS}
                  dot={{ fill: '#10b981' }}
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeWithdrawn"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name={CHART_TOTAL_WITHDRAWN}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>
      )}
    </div>
  );
}
