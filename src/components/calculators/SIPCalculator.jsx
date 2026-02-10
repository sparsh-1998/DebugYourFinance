import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { calculateSIP, formatCurrency } from '../../utils/calculations';
import { FormInput, RangeSlider, Toggle, ResultCard, SectionHeader, ChartContainer, InfoBox } from '../common';
import {
  CALC_SIP,
  CALC_SIP_DESC,
  LABEL_MONTHLY_INVESTMENT,
  LABEL_EXPECTED_RETURN,
  LABEL_TIME_PERIOD,
  PLACEHOLDER_10K,
  SIP_STEPUP,
  SIP_STEPUP_DESC,
  SIP_STEPUP_BADGE,
  SIP_STEPUP_PERCENTAGE,
  SIP_INVESTED_AMOUNT,
  SIP_WEALTH_GAINED,
  SIP_FUTURE_VALUE,
  SIP_GROWTH_PROJECTION,
  SIP_STEPUP_NOTE,
  CHART_YEARS,
  CHART_AMOUNT,
  CHART_SUBTITLE_STEP_UP,
  VALIDATION_SIP
} from '../../constants';
import { UNIT_PERCENT, UNIT_YEARS } from '../../constants/units';

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useLocalStorage('sip_monthly', 10000);
  const [expectedReturn, setExpectedReturn] = useLocalStorage('sip_return', 12);
  const [timePeriod, setTimePeriod] = useLocalStorage('sip_years', 10);
  const [stepUpEnabled, setStepUpEnabled] = useLocalStorage('sip_stepup_enabled', false);
  const [stepUpPercentage, setStepUpPercentage] = useLocalStorage('sip_stepup_percentage', 10);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const calculated = calculateSIP(
      monthlyInvestment,
      expectedReturn,
      timePeriod,
      stepUpEnabled ? stepUpPercentage : 0
    );
    setResults(calculated);
  }, [monthlyInvestment, expectedReturn, timePeriod, stepUpEnabled, stepUpPercentage]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
      <SectionHeader
        icon={TrendingUp}
        title={CALC_SIP}
        description={CALC_SIP_DESC}
      />

      {/* Input Form */}
      <div className="space-y-6 mb-8">
        <FormInput
          label={LABEL_MONTHLY_INVESTMENT}
          value={monthlyInvestment}
          setValue={setMonthlyInvestment}
          validation={VALIDATION_SIP.monthlyInvestment}
          placeholder={PLACEHOLDER_10K}
        />

        <RangeSlider
          label={LABEL_EXPECTED_RETURN}
          value={expectedReturn}
          onChange={setExpectedReturn}
          min={6}
          max={20}
          step={0.5}
          unit={UNIT_PERCENT}
        />

        <RangeSlider
          label={LABEL_TIME_PERIOD}
          value={timePeriod}
          onChange={setTimePeriod}
          min={1}
          max={30}
          step={1}
          unit={UNIT_YEARS}
        />

        {/* Step-Up SIP Section */}
        <div className="bg-gradient-to-r from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-lg p-4 border-2 border-accent/20 dark:border-accent/30">
          <Toggle
            label={SIP_STEPUP}
            description={SIP_STEPUP_DESC}
            badge={SIP_STEPUP_BADGE}
            enabled={stepUpEnabled}
            onToggle={() => setStepUpEnabled(!stepUpEnabled)}
          />

          {stepUpEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pt-3 border-t border-accent/20 dark:border-accent/30">
                <RangeSlider
                  label={SIP_STEPUP_PERCENTAGE}
                  value={stepUpPercentage}
                  onChange={setStepUpPercentage}
                  min={1}
                  max={20}
                  step={1}
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
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <ResultCard
              label={SIP_INVESTED_AMOUNT}
              value={formatCurrency(results.investedAmount)}
              variant="default"
              subtext={stepUpEnabled ? `With ${stepUpPercentage}% annual increase` : ''}
            />
            <ResultCard
              label={SIP_WEALTH_GAINED}
              value={formatCurrency(results.wealthGained)}
              variant="accent"
            />
            <ResultCard
              label={SIP_FUTURE_VALUE}
              value={formatCurrency(results.futureValue)}
              variant="primary"
            />
          </div>

          {/* Chart */}
          <ChartContainer
            title={SIP_GROWTH_PROJECTION}
            subtitle={stepUpEnabled ? CHART_SUBTITLE_STEP_UP : null}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={results.yearlyData}>
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
                <Bar dataKey="invested" fill="#64748b" name={SIP_INVESTED_AMOUNT} radius={[4, 4, 0, 0]} />
                <Bar dataKey="wealth" fill="#10b981" name={SIP_WEALTH_GAINED} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* Step-Up Info */}
            {stepUpEnabled && results.yearlyData.length > 0 && (
              <InfoBox variant="info" className="mt-4">
                <strong>Note:</strong> {SIP_STEPUP_NOTE(
                  formatCurrency(monthlyInvestment),
                  formatCurrency(results.yearlyData[results.yearlyData.length - 1].monthlyInvestment),
                  timePeriod,
                  stepUpPercentage
                )}
              </InfoBox>
            )}
          </ChartContainer>
        </motion.div>
      )}
    </div>
  );
}
