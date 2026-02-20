import { memo, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Home, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useCalculatorStore } from '../../store/calculatorStore';
import { calculateRentVsBuy, formatCurrency } from '../../utils/calculations';
import {
  FormInput,
  RangeSlider,
  SectionHeader,
  ComparisonCard,
  InfoBox,
  CalculatorCard,
  HowToUseSection,
  FAQSection,
  AnalysisSection,
  NoteBox,
  StandardBarChart,
  StandardLineChart
} from '../common';
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
} from '../../constants/messages';
import { UNIT_PERCENT, UNIT_YEARS } from '../../constants/units';
import { COLOR_CHART_PRIMARY, COLOR_ACCENT_BLUE } from '../../constants/colors';
import { ANIMATION_DURATION_SLOW } from '../../constants/animations';
import {
  RENT_VS_BUY_HOW_TO_USE,
  RENT_VS_BUY_FAQ
} from '../../constants/educationalContent';

const RentVsBuyCalculator = memo(function RentVsBuyCalculator() {
  // State management with Zustand
  const rentVsBuy = useCalculatorStore((state) => state.rentVsBuy);
  const updateRentVsBuy = useCalculatorStore((state) => state.updateRentVsBuy);

  const {
    monthlyRent,
    annualRentIncrease,
    homePrice,
    downPayment,
    interestRate,
    loanTenure,
    homeAppreciation,
    expectedReturn,
    timePeriod,
  } = rentVsBuy;

  // Setter functions
  const setMonthlyRent = (value) => updateRentVsBuy('monthlyRent', value);
  const setAnnualRentIncrease = (value) => updateRentVsBuy('annualRentIncrease', value);
  const setHomePrice = (value) => updateRentVsBuy('homePrice', value);
  const setDownPayment = (value) => updateRentVsBuy('downPayment', value);
  const setInterestRate = (value) => updateRentVsBuy('interestRate', value);
  const setLoanTenure = (value) => updateRentVsBuy('loanTenure', value);
  const setHomeAppreciation = (value) => updateRentVsBuy('homeAppreciation', value);
  const setExpectedReturn = (value) => updateRentVsBuy('expectedReturn', value);
  const setTimePeriod = (value) => updateRentVsBuy('timePeriod', value);

  // Memoize loan amount calculation
  const loanAmount = useMemo(() => {
    return homePrice - downPayment;
  }, [homePrice, downPayment]);

  // Memoize rent vs buy calculation
  const results = useMemo(() => {
    const rentData = { monthlyRent, annualRentIncrease };
    const buyData = { homePrice, downPayment, loanAmount, interestRate, loanTenure, homeAppreciation };
    return calculateRentVsBuy(rentData, buyData, expectedReturn, timePeriod);
  }, [monthlyRent, annualRentIncrease, homePrice, downPayment, loanAmount, interestRate, loanTenure, homeAppreciation, expectedReturn, timePeriod]);

  return (
    <CalculatorCard>
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

            {/* Home Appreciation */}
            <RangeSlider
              label="Home Appreciation Rate"
              value={homeAppreciation}
              onChange={setHomeAppreciation}
              min={0}
              max={15}
              step={0.5}
              unit={UNIT_PERCENT}
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
          transition={{ duration: ANIMATION_DURATION_SLOW }}
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
          <StandardLineChart
            data={results.yearlyData}
            lines={[
              { dataKey: 'rentNetWorth', stroke: COLOR_ACCENT_BLUE, name: CHART_RENT_INVEST },
              { dataKey: 'buyNetWorth', stroke: COLOR_CHART_PRIMARY, name: CHART_BUY_HOME }
            ]}
            title={RVB_NET_WORTH_COMPARISON}
            yLabel={CHART_NET_WORTH}
          />

          {/* Monthly Payment Comparison */}
          <div className="mt-8">
            <StandardBarChart
              data={results.yearlyData}
              bars={[
                { dataKey: 'cumulativeRent', fill: COLOR_ACCENT_BLUE, name: CHART_TOTAL_RENT },
                { dataKey: 'cumulativeEmi', fill: COLOR_CHART_PRIMARY, name: CHART_TOTAL_EMI }
              ]}
              title={RVB_CUMULATIVE_PAYMENTS}
            />
          </div>
        </motion.div>
      )}

      {/* Educational Sections */}
      <div className="mt-12 space-y-8">
        <HowToUseSection steps={RENT_VS_BUY_HOW_TO_USE} />
        <FAQSection faqs={RENT_VS_BUY_FAQ} />
        <AnalysisSection title="How Rent vs Buy Calculation Works" variant="info">
          <p>
            This calculator simulates two parallel financial scenarios over your chosen time period:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">Rent + Invest Scenario</h4>
              <ol className="text-sm space-y-2 list-decimal list-inside">
                <li>Invest full down payment in market</li>
                <li>Pay monthly rent (increases annually)</li>
                <li>Invest EMI-Rent difference monthly</li>
                <li>Compound all investments at expected return rate</li>
                <li>Final Net Worth = Investment Corpus</li>
              </ol>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">Buy Home Scenario</h4>
              <ol className="text-sm space-y-2 list-decimal list-inside">
                <li>Pay down payment upfront</li>
                <li>Pay monthly EMI until loan tenure</li>
                <li>Home value appreciates annually</li>
                <li>Build equity = Home Value - Outstanding Loan</li>
                <li>Final Net Worth = Home Equity</li>
              </ol>
            </div>
          </div>

          <p>
            <strong>Key Formulas:</strong>
          </p>

          <div className="bg-white dark:bg-slate-900 rounded p-4 space-y-2">
            <div className="text-sm">
              <strong>EMI Calculation:</strong>
              <div className="font-mono mt-1">EMI = [P × r × (1+r)ⁿ] / [(1+r)ⁿ - 1]</div>
            </div>
            <div className="text-sm">
              <strong>Investment Growth (Rent Scenario):</strong>
              <div className="font-mono mt-1">FV = Down Payment × (1+r)ⁿ + Monthly Investments × [(1+r)ⁿ - 1] / r</div>
            </div>
            <div className="text-sm">
              <strong>Home Value Appreciation:</strong>
              <div className="font-mono mt-1">Home Value = Purchase Price × (1 + appreciation rate)ⁿ</div>
            </div>
            <div className="text-sm">
              <strong>Home Equity:</strong>
              <div className="font-mono mt-1">Equity = Current Home Value - Outstanding Loan</div>
            </div>
          </div>

          <p>
            <strong>Net Worth Comparison:</strong>
          </p>
          <p>
            The calculator tracks both scenarios year by year and shows which option creates more wealth. The crossover
            point (if any) indicates when buying starts outperforming renting, or vice versa. Early years favor renting
            due to high EMI-to-equity ratio, but long-term ownership eventually builds wealth as the loan gets paid off.
          </p>

          <p>
            <strong>Important Assumptions:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
            <li>Rent increases by 5% annually (typical in Indian cities)</li>
            <li>Property appreciates at 6% annually (conservative estimate)</li>
            <li>Investment returns assume consistent market performance</li>
            <li>Doesn't include: maintenance, property taxes, transaction costs, or tax benefits</li>
            <li>Assumes disciplined investing of the difference when renting</li>
          </ul>

          <NoteBox type="note">
            This is a purely financial comparison. Home ownership provides intangible benefits
            like stability, customization freedom, and emotional security that can't be quantified. Make your decision based
            on both financial calculations AND personal circumstances.
          </NoteBox>
        </AnalysisSection>
      </div>
    </CalculatorCard>
  );
});

export default RentVsBuyCalculator;
