import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { calculateSIP, formatCurrency } from '../../utils/calculations';
import { FormInput, RangeSlider, Toggle, ResultCard, SectionHeader, ChartContainer, InfoBox, CalculatorCard
} from '../common';
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
import { COLOR_CHART_GRID, COLOR_SLATE_500, COLOR_CHART_PRIMARY, COLOR_CHART_NEUTRAL } from '../../constants/colors';
import { CHART_TOOLTIP_STYLE, CHART_STROKE_DASHARRAY, CHART_BAR_RADIUS, CHART_HEIGHT, CHART_LABEL_OFFSET } from '../../constants/chartStyles';
import { ANIMATION_DURATION_SLOW } from '../../constants/animations';

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
    <CalculatorCard>
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
          transition={{ duration: ANIMATION_DURATION_SLOW }}
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
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
              <BarChart data={results.yearlyData}>
                <CartesianGrid strokeDasharray={CHART_STROKE_DASHARRAY} stroke={COLOR_CHART_GRID} className="dark:stroke-slate-600" />
                <XAxis
                  dataKey="year"
                  label={{ value: CHART_YEARS, position: 'insideBottom', offset: CHART_LABEL_OFFSET }}
                  tick={{ fill: COLOR_SLATE_500 }}
                  className="dark:fill-slate-400"
                />
                <YAxis
                  label={{ value: CHART_AMOUNT, angle: -90, position: 'insideLeft' }}
                  tick={{ fill: COLOR_SLATE_500 }}
                  className="dark:fill-slate-400"
                  tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={CHART_TOOLTIP_STYLE}
                />
                <Legend />
                <Bar dataKey="invested" fill={COLOR_CHART_NEUTRAL} name={SIP_INVESTED_AMOUNT} radius={CHART_BAR_RADIUS} />
                <Bar dataKey="wealth" fill={COLOR_CHART_PRIMARY} name={SIP_WEALTH_GAINED} radius={CHART_BAR_RADIUS} />
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

      {/* Educational Sections */}
      <div className="mt-12 space-y-8">
        {/* How to Use This Tool */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">How to Use This Tool</h3>
          <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300">
            <li><strong>Enter your monthly investment amount</strong> - The amount you can invest every month in mutual funds</li>
            <li><strong>Set expected return rate and time period</strong> - Choose realistic returns (typically 10-15% for equity funds) and your investment horizon</li>
            <li><strong>Enable Step-Up SIP (optional)</strong> - Increase your monthly investment annually to combat inflation and build wealth faster</li>
          </ol>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">What is a Step-Up SIP?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                A Step-Up SIP allows you to increase your monthly investment amount by a fixed percentage each year.
                For example, if you start with ₹10,000/month with a 10% step-up, your investment will increase to ₹11,000
                in Year 2, ₹12,100 in Year 3, and so on. This helps you match your investments with your growing income.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">How does a 10% annual increase affect my corpus?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                A 10% annual step-up can significantly boost your final corpus. With a regular SIP of ₹10,000/month for
                20 years at 12% returns, you'd accumulate approximately ₹99 lakhs. With a 10% step-up, this could grow to
                around ₹1.5 crores - a 50% increase in wealth!
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">Is SIP better than Lumpsum?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                SIP is generally better for most investors because it reduces timing risk through rupee cost averaging,
                makes investing disciplined and automatic, and doesn't require large capital upfront. However, lumpsum can
                work better in a rising market if you have surplus funds. For regular investors, SIP is the recommended approach.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">What is a realistic return rate for SIP?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Equity mutual funds have historically delivered 12-15% returns over long periods (10+ years). Debt funds
                typically give 7-9%. A balanced portfolio might average 10-12%. Remember, past performance doesn't guarantee
                future returns, so it's wise to use conservative estimates (10-12%) for planning.
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Block */}
        <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-lg p-6 border-2 border-accent/20 dark:border-accent/30">
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">How SIP Calculation Works</h3>
          <div className="text-slate-700 dark:text-slate-300 space-y-4">
            <p>
              Our SIP calculator uses the <strong>Future Value of Annuity formula</strong> to calculate your investment returns:
            </p>
            <div className="bg-white dark:bg-slate-900 rounded p-4 font-mono text-sm overflow-x-auto">
              FV = P × [(1 + r)ⁿ - 1] / r × (1 + r)
            </div>
            <p>Where:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>FV</strong> = Future Value (Total corpus)</li>
              <li><strong>P</strong> = Monthly investment amount</li>
              <li><strong>r</strong> = Expected monthly return rate (annual rate ÷ 12)</li>
              <li><strong>n</strong> = Total number of months (years × 12)</li>
            </ul>
            <p>
              <strong>For Step-Up SIP:</strong> The calculation is done year by year, where each year's investment amount
              increases by the step-up percentage. The formula applies to each year's contributions separately, and all
              future values are summed to get the final corpus.
            </p>
            <p>
              <strong>Wealth Gained:</strong> This is simply the difference between your Future Value and the total amount
              you invested (Total Invested = Sum of all monthly contributions). This represents the returns generated purely
              from compounding.
            </p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
