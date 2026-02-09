import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Home, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateRentVsBuy, formatCurrency } from '../utils/calculations';
import {
  FormInput,
  RangeSlider,
  SectionHeader,
  ComparisonCard,
  HighlightCard,
  ChartContainer,
  InfoBox
} from './common';
import {
  CALC_RENT_VS_BUY,
  CALC_RENT_VS_BUY_DESC,
  LABEL_MONTHLY_RENT,
  RVB_ANNUAL_RENT_INCREASE,
  LABEL_HOME_PRICE,
  LABEL_DOWN_PAYMENT,
  LABEL_LOAN_TENURE,
  RVB_HOME_LOAN_RATE,
  RVB_COMPARISON_PERIOD,
  RVB_RENTING_SCENARIO,
  RVB_BUYING_SCENARIO,
  RVB_INVESTMENT_ASSUMPTIONS,
  RVB_TOTAL_RENT_PAID,
  RVB_INVESTMENT_CORPUS,
  RVB_NET_WORTH,
  RVB_TOTAL_EMI_PAID,
  RVB_HOME_EQUITY,
  RVB_LOAN_AMOUNT,
  RVB_RENTING_BETTER,
  RVB_BUYING_BETTER,
  RVB_NET_WORTH_ADVANTAGE,
  RVB_RENT_INVEST,
  RVB_HOME_OWNERSHIP,
  RVB_OPPORTUNITY_COST,
  RVB_EXPECTED_RETURN_DESC,
  RVB_NET_WORTH_COMPARISON,
  RVB_CUMULATIVE_PAYMENTS,
  CHART_YEARS,
  CHART_NET_WORTH,
  CHART_RENT_INVEST,
  CHART_BUY_HOME,
  CHART_TOTAL_RENT,
  CHART_TOTAL_EMI,
  LABEL_EXPECTED_RETURN,
  RVB_RENT_SCENARIO,
  RVB_BUY_SCENARIO,
  PLACEHOLDER_25K,
  PLACEHOLDER_50L,
  PLACEHOLDER_10L
} from '../constants/messages';
import { UNIT_PERCENT, UNIT_YEARS } from '../constants/units';

export default function RentVsBuyCalculator() {
  // Rent inputs
  const [monthlyRent, setMonthlyRent] = useLocalStorage('rvb_rent', 25000);
  const [annualRentIncrease, setAnnualRentIncrease] = useLocalStorage('rvb_rent_increase', 5);

  // Buy inputs
  const [homePrice, setHomePrice] = useLocalStorage('rvb_home_price', 5000000);
  const [downPayment, setDownPayment] = useLocalStorage('rvb_down_payment', 1000000);
  const [interestRate, setInterestRate] = useLocalStorage('rvb_interest_rate', 8.5);
  const [loanTenure, setLoanTenure] = useLocalStorage('rvb_loan_tenure', 20);

  // Investment return
  const [expectedReturn, setExpectedReturn] = useLocalStorage('rvb_return', 12);
  const [timePeriod, setTimePeriod] = useLocalStorage('rvb_years', 20);

  const [results, setResults] = useState(null);

  useEffect(() => {
    const loanAmount = homePrice - downPayment;
    const rentData = { monthlyRent, annualRentIncrease };
    const buyData = { homePrice, downPayment, loanAmount, interestRate, loanTenure };

    const calculated = calculateRentVsBuy(rentData, buyData, expectedReturn, timePeriod);
    setResults(calculated);
  }, [monthlyRent, annualRentIncrease, homePrice, downPayment, interestRate, loanTenure, expectedReturn, timePeriod]);

  const loanAmount = homePrice - downPayment;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
      <SectionHeader
        icon={Home}
        title={CALC_RENT_VS_BUY}
        description={CALC_RENT_VS_BUY_DESC}
      />

      {/* Input Form */}
      <div className="space-y-6 mb-8">
        {/* Rent Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-700">
          <h4 className="font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">{RVB_RENT_SCENARIO}</span>
            {RVB_RENTING_SCENARIO}
          </h4>

          <div className="space-y-4">
            {/* Monthly Rent */}
            <FormInput
              label={LABEL_MONTHLY_RENT}
              value={monthlyRent}
              setValue={setMonthlyRent}
              validation={{ min: 1000, max: 10000000, allowDecimals: false, required: true }}
              placeholder={PLACEHOLDER_25K}
            />

            {/* Annual Rent Increase */}
            <RangeSlider
              label={RVB_ANNUAL_RENT_INCREASE}
              value={annualRentIncrease}
              onChange={setAnnualRentIncrease}
              min={0}
              max={15}
              step={0.5}
              unit={UNIT_PERCENT}
            />
          </div>
        </div>

        {/* Buy Section */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-700">
          <h4 className="font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">{RVB_BUY_SCENARIO}</span>
            {RVB_BUYING_SCENARIO}
          </h4>

          <div className="space-y-4">
            {/* Home Price */}
            <FormInput
              label={LABEL_HOME_PRICE}
              value={homePrice}
              setValue={setHomePrice}
              validation={{ min: 500000, max: 1000000000, allowDecimals: false, required: true }}
              placeholder={PLACEHOLDER_50L}
            />

            {/* Down Payment */}
            <div>
              <FormInput
                label={LABEL_DOWN_PAYMENT}
                value={downPayment}
                setValue={setDownPayment}
                validation={{ min: 0, max: homePrice * 0.8, allowDecimals: false, required: true }}
                placeholder={PLACEHOLDER_10L}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {RVB_LOAN_AMOUNT} <strong>{formatCurrency(loanAmount)}</strong>
              </p>
            </div>

            {/* Interest Rate */}
            <RangeSlider
              label={RVB_HOME_LOAN_RATE}
              value={interestRate}
              onChange={setInterestRate}
              min={6}
              max={12}
              step={0.1}
              unit={UNIT_PERCENT}
            />

            {/* Loan Tenure */}
            <RangeSlider
              label={LABEL_LOAN_TENURE}
              value={loanTenure}
              onChange={setLoanTenure}
              min={5}
              max={30}
              step={1}
              unit={UNIT_YEARS}
            />
          </div>
        </div>

        {/* Investment Assumptions */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-700">
          <h4 className="font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            {RVB_INVESTMENT_ASSUMPTIONS}
          </h4>

          <div className="space-y-4">
            {/* Expected Return */}
            <div>
              <RangeSlider
                label={LABEL_EXPECTED_RETURN}
                value={expectedReturn}
                onChange={setExpectedReturn}
                min={8}
                max={15}
                step={0.5}
                unit={UNIT_PERCENT}
              />
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                {RVB_EXPECTED_RETURN_DESC}
              </p>
            </div>

            {/* Time Period */}
            <RangeSlider
              label={RVB_COMPARISON_PERIOD}
              value={timePeriod}
              onChange={setTimePeriod}
              min={5}
              max={30}
              step={1}
              unit={UNIT_YEARS}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Verdict */}
          <div className={`mb-6 p-4 rounded-lg border-2 flex items-center space-x-3 ${
            results.verdict === 'Rent'
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600'
              : 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600'
          }`}>
            <CheckCircle2 className={`h-6 w-6 ${results.verdict === 'Rent' ? 'text-blue-500' : 'text-green-500'}`} />
            <div>
              <p className="font-semibold text-primary dark:text-white text-lg">
                {results.verdict === 'Rent' ? RVB_RENTING_BETTER : RVB_BUYING_BETTER}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {RVB_NET_WORTH_ADVANTAGE(formatCurrency(results.difference), timePeriod)}
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Rent Scenario */}
            <ComparisonCard
              title={RVB_RENT_INVEST}
              variant="default"
              className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
              items={[
                {
                  label: RVB_TOTAL_RENT_PAID,
                  value: `-${formatCurrency(results.totalRentPaid)}`,
                  valueColor: 'text-red-600 dark:text-red-400'
                },
                {
                  label: RVB_INVESTMENT_CORPUS,
                  value: `+${formatCurrency(results.finalInvestmentCorpus)}`,
                  valueColor: 'text-green-600 dark:text-green-400'
                },
                {
                  label: RVB_NET_WORTH,
                  value: formatCurrency(results.rentScenarioNetWorth),
                  valueColor: 'font-bold text-accent text-lg',
                  bordered: true
                }
              ]}
            />

            {/* Buy Scenario */}
            <ComparisonCard
              title={RVB_HOME_OWNERSHIP}
              variant="default"
              className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
              items={[
                {
                  label: RVB_TOTAL_EMI_PAID,
                  value: `-${formatCurrency(results.totalEmiPaid)}`,
                  valueColor: 'text-red-600 dark:text-red-400'
                },
                {
                  label: RVB_HOME_EQUITY,
                  value: `+${formatCurrency(results.finalHomeEquity)}`,
                  valueColor: 'text-green-600 dark:text-green-400'
                },
                {
                  label: RVB_NET_WORTH,
                  value: formatCurrency(results.buyScenarioNetWorth),
                  valueColor: 'font-bold text-accent text-lg',
                  bordered: true
                }
              ]}
            />
          </div>

          {/* Opportunity Cost Highlight */}
          <InfoBox variant="warning" className="mb-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700">
            <h4 className="font-semibold text-primary dark:text-white mb-2 flex items-center gap-2">
              {RVB_OPPORTUNITY_COST}
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              If you had invested your down payment of <strong>{formatCurrency(downPayment)}</strong> at {expectedReturn}% returns
              instead of buying, it would have grown to <strong className="text-accent">{formatCurrency(results.finalInvestmentCorpus)}</strong>.
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              That's a gain of <strong className="text-green-600 dark:text-green-400">{formatCurrency(results.opportunityCost)}</strong> just from investing
              the down payment alone!
            </p>
          </InfoBox>

          {/* Net Worth Comparison Chart */}
          <ChartContainer title={RVB_NET_WORTH_COMPARISON} className="mb-6">
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
                  label={{ value: CHART_NET_WORTH, angle: -90, position: 'insideLeft' }}
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
                  dataKey="rentNetWorth"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name={CHART_RENT_INVEST}
                  dot={{ fill: '#3b82f6' }}
                />
                <Line
                  type="monotone"
                  dataKey="buyNetWorth"
                  stroke="#10b981"
                  strokeWidth={2}
                  name={CHART_BUY_HOME}
                  dot={{ fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Monthly Payment Comparison */}
          <ChartContainer title={RVB_CUMULATIVE_PAYMENTS}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={results.yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: '#64748b' }}
                  className="dark:fill-slate-400"
                />
                <YAxis
                  tick={{ fill: '#64748b' }}
                  className="dark:fill-slate-400"
                  tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#1e293b', border: '2px solid #334155', borderRadius: '8px', color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="cumulativeRent" fill="#3b82f6" name={CHART_TOTAL_RENT} radius={[4, 4, 0, 0]} />
                <Bar dataKey="cumulativeEmi" fill="#10b981" name={CHART_TOTAL_EMI} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>
      )}
    </div>
  );
}
