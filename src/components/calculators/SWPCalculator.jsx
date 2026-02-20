import { memo, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { TrendingDown } from 'lucide-react';
import { useCalculatorStore } from '../../store/calculatorStore';
import { calculateSWP, formatCurrency } from '../../utils/calculations';
import {
  FormInput,
  RangeSlider,
  Toggle,
  ResultCard,
  SectionHeader,
  AlertBanner,
  InfoBox,
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
  CHART_REMAINING_CORPUS,
  CHART_TOTAL_WITHDRAWN,
  PLACEHOLDER_50L,
  PLACEHOLDER_30K
} from '../../constants/messages';
import { UNIT_PERCENT, UNIT_YEARS } from '../../constants/units';
import { COLOR_CHART_PRIMARY, COLOR_ACCENT_BLUE } from '../../constants/colors';
import { ANIMATION_DURATION_SLOW } from '../../constants/animations';
import {
  SWP_HOW_TO_USE,
  SWP_FAQ
} from '../../constants/educationalContent';

const SWPCalculator = memo(function SWPCalculator() {
  // State management with Zustand
  const swp = useCalculatorStore((state) => state.swp);
  const updateSWP = useCalculatorStore((state) => state.updateSWP);

  const {
    lumpsumAmount,
    monthlyWithdrawal,
    expectedReturn,
    timePeriod,
    inflationEnabled,
    inflationRate,
  } = swp;

  // Setter functions
  const setLumpsumAmount = (value) => updateSWP('lumpsumAmount', value);
  const setMonthlyWithdrawal = (value) => updateSWP('monthlyWithdrawal', value);
  const setExpectedReturn = (value) => updateSWP('expectedReturn', value);
  const setTimePeriod = (value) => updateSWP('timePeriod', value);
  const setInflationEnabled = (value) => updateSWP('inflationEnabled', value);
  const setInflationRate = (value) => updateSWP('inflationRate', value);

  // Memoize calculation results to prevent unnecessary recalculations
  const results = useMemo(() => {
    return calculateSWP(
      lumpsumAmount,
      monthlyWithdrawal,
      expectedReturn,
      timePeriod,
      inflationEnabled ? inflationRate : 0
    );
  }, [lumpsumAmount, monthlyWithdrawal, expectedReturn, timePeriod, inflationEnabled, inflationRate]);

  return (
    <CalculatorCard>
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
          transition={{ duration: ANIMATION_DURATION_SLOW }}
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
          <StandardLineChart
            data={results.yearlyData}
            lines={[
              { dataKey: 'corpus', stroke: COLOR_CHART_PRIMARY, name: CHART_REMAINING_CORPUS },
              { dataKey: 'cumulativeWithdrawn', stroke: COLOR_ACCENT_BLUE, name: CHART_TOTAL_WITHDRAWN }
            ]}
            title={SWP_DEPLETION_TIMELINE}
            subtitle={inflationEnabled ? '(Inflation-Adjusted)' : null}
          />
        </motion.div>
      )}

      {/* Educational Sections */}
      <div className="mt-12 space-y-8">
        <HowToUseSection steps={SWP_HOW_TO_USE} />
        <FAQSection faqs={SWP_FAQ} />
        <AnalysisSection title="How SWP Calculation Works" variant="warning">
          <p>
            The SWP calculation simulates year-by-year corpus depletion using compound interest and monthly withdrawals:
          </p>
          <FormulaBox formula="Corpus(year) = [Corpus(prev) × (1 + r)] - (W × 12)" />
          <VariableList variables={[
            { symbol: 'Corpus(year)', description: 'Remaining corpus at year-end' },
            { symbol: 'Corpus(prev)', description: "Previous year's ending corpus" },
            { symbol: 'r', description: 'Annual expected return rate (as decimal)' },
            { symbol: 'W', description: 'Monthly withdrawal amount' }
          ]} />
          <p>
            <strong>For Inflation-Adjusted Withdrawals:</strong> The monthly withdrawal amount increases annually by the
            inflation rate. So W(year) = W(initial) × (1 + inflation)^(year-1). This ensures your purchasing power remains
            constant despite rising prices.
          </p>
          <p>
            <strong>Corpus Duration:</strong> The calculator continues year-by-year until either the corpus reaches zero
            (depleted) or completes your specified time period. The chart shows both the declining corpus and cumulative
            withdrawals over time.
          </p>
          <p>
            <strong>Final Corpus:</strong> If your corpus lasts the full period, the remaining amount represents your legacy
            or buffer for emergencies. A positive final corpus is ideal for sustainable retirement planning.
          </p>

          <NoteBox type="warning">
            Always enable inflation-adjusted withdrawals for realistic planning. What seems like enough today won't be
            sufficient in 10-20 years. Follow the 4% rule (experts now suggest 3.7-3.9% for 2026) - your annual withdrawal
            should ideally not exceed 4% of your corpus. Keep a safety buffer of 20-30% for medical emergencies and unexpected expenses.
          </NoteBox>
        </AnalysisSection>
      </div>
    </CalculatorCard>
  );
});

export default SWPCalculator;
