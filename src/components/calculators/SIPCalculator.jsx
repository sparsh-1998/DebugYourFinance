import { useMemo, memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { calculateSIP, formatCurrency } from '../../utils/calculations';
import {
  FormInput,
  RangeSlider,
  Toggle,
  ResultCard,
  SectionHeader,
  InfoBox,
  CalculatorCard,
  HowToUseSection,
  FAQSection,
  AnalysisSection,
  FormulaBox,
  VariableList,
  NoteBox,
  StandardBarChart
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
  CHART_SUBTITLE_STEP_UP,
  VALIDATION_SIP
} from '../../constants';
import { UNIT_PERCENT, UNIT_YEARS } from '../../constants/units';
import { COLOR_CHART_PRIMARY, COLOR_CHART_NEUTRAL } from '../../constants/colors';
import { ANIMATION_DURATION_SLOW } from '../../constants/animations';
import {
  SIP_HOW_TO_USE,
  SIP_FAQ
} from '../../constants/educationalContent';

const SIPCalculator = memo(function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useLocalStorage('sip_monthly', 10000);
  const [expectedReturn, setExpectedReturn] = useLocalStorage('sip_return', 12);
  const [timePeriod, setTimePeriod] = useLocalStorage('sip_years', 10);
  const [stepUpEnabled, setStepUpEnabled] = useLocalStorage('sip_stepup_enabled', false);
  const [stepUpPercentage, setStepUpPercentage] = useLocalStorage('sip_stepup_percentage', 10);

  // Memoize calculation results to prevent unnecessary recalculations
  const results = useMemo(() => {
    return calculateSIP(
      monthlyInvestment,
      expectedReturn,
      timePeriod,
      stepUpEnabled ? stepUpPercentage : 0
    );
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
          <StandardBarChart
            data={results.yearlyData}
            bars={[
              { dataKey: 'invested', fill: COLOR_CHART_NEUTRAL, name: SIP_INVESTED_AMOUNT },
              { dataKey: 'wealth', fill: COLOR_CHART_PRIMARY, name: SIP_WEALTH_GAINED }
            ]}
            title={SIP_GROWTH_PROJECTION}
            subtitle={stepUpEnabled ? CHART_SUBTITLE_STEP_UP : null}
          />

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
        </motion.div>
      )}

      {/* Educational Sections */}
      <div className="mt-12 space-y-8">
        <HowToUseSection steps={SIP_HOW_TO_USE} />
        <FAQSection faqs={SIP_FAQ} />
        <AnalysisSection title="How SIP Calculation Works" variant="default">
          <p>
            Our SIP calculator uses the <strong>Future Value of Annuity formula</strong> to calculate your investment returns:
          </p>
          <FormulaBox formula="FV = P × [(1 + r)ⁿ - 1] / r × (1 + r)" />
          <VariableList variables={[
            { symbol: 'FV', description: 'Future Value (Total corpus)' },
            { symbol: 'P', description: 'Monthly investment amount' },
            { symbol: 'r', description: 'Expected monthly return rate (annual rate ÷ 12)' },
            { symbol: 'n', description: 'Total number of months (years × 12)' }
          ]} />
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

          <NoteBox type="note">
            The power of SIP lies in consistency and time, not timing the market. Stay invested for at least 5-7 years
            to ride out market volatility. Historical data shows that equity SIPs have generally delivered positive returns
            with average returns of 12-15% over 10+ year periods. Start today, even with a small amount!
          </NoteBox>
        </AnalysisSection>
      </div>
    </CalculatorCard>
  );
});

export default SIPCalculator;
