import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Receipt } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { calculateTax, formatCurrency, TAX_SLABS } from '../../utils/calculations';
import {
  FormInput,
  SectionHeader,
  ComparisonCard,
  AlertBanner,
  InfoBox,
  CalculatorCard,
  HowToUseSection,
  FAQSection,
  AnalysisSection,
  NoteBox,
  StandardBarChart
} from '../common';
import {
  CALC_TAX,
  CALC_TAX_DESC,
  LABEL_ANNUAL_INCOME,
  TAX_SECTION_80C,
  TAX_SECTION_80D,
  TAX_HRA,
  TAX_NPS_PERSONAL,
  TAX_NPS_EMPLOYER,
  TAX_OTHER_DEDUCTIONS,
  TAX_NPS_PERSONAL_HELP,
  TAX_NPS_EMPLOYER_HELP,
  TAX_OTHER_DEDUCTIONS_HELP,
  TAX_DEDUCTIONS_SECTION,
  TAX_OLD_REGIME,
  TAX_NEW_REGIME,
  TAX_GROSS_INCOME,
  TAX_TOTAL_DEDUCTIONS,
  TAX_TAXABLE_INCOME,
  TAX_PAYABLE,
  TAX_TAKEHOME,
  TAX_VISUAL_COMPARISON,
  TAX_RECOMMENDATION,
  CHART_OLD_REGIME,
  CHART_NEW_REGIME,
  PLACEHOLDER_10L,
  PLACEHOLDER_150K,
  PLACEHOLDER_50K,
  PLACEHOLDER_2L,
  PLACEHOLDER_1L,
} from '../../constants/messages';
import { COLOR_CHART_PRIMARY, COLOR_CHART_NEUTRAL } from '../../constants/colors';
import { ANIMATION_DURATION_SLOW } from '../../constants/animations';
import {
  TAX_HOW_TO_USE,
  TAX_FAQ
} from '../../constants/educationalContent';

export default function TaxRegimeSimulator() {
  const [income, setIncome] = useLocalStorage('tax_income', 1000000);
  const [section80C, setSection80C] = useLocalStorage('tax_deductions_80c', 150000);
  const [section80D, setSection80D] = useLocalStorage('tax_deductions_80d', 25000);
  const [hra, setHra] = useLocalStorage('tax_hra', 0);
  const [npsPersonal, setNpsPersonal] = useLocalStorage('tax_nps_personal', 0);
  const [npsEmployer, setNpsEmployer] = useLocalStorage('tax_nps_employer', 0);
  const [otherDeductions, setOtherDeductions] = useLocalStorage('tax_other_deductions', 0);

  // Memoize tax calculations for old regime
  const oldRegimeResult = useMemo(() => {
    const deductions = { section80C, section80D, hra, npsPersonal, npsEmployer, otherDeductions };
    return calculateTax(income, deductions, 'old');
  }, [income, section80C, section80D, hra, npsPersonal, npsEmployer, otherDeductions]);

  // Memoize tax calculations for new regime
  const newRegimeResult = useMemo(() => {
    return calculateTax(income, {}, 'new');
  }, [income]);

  // Memoize savings calculation
  const savings = useMemo(() => {
    return newRegimeResult.tax - oldRegimeResult.tax;
  }, [oldRegimeResult, newRegimeResult]);

  // Memoize comparison data for chart
  const comparisonData = useMemo(() => {
    return [
      {
        name: 'Taxable Income',
        old: oldRegimeResult.taxableIncome,
        new: newRegimeResult.taxableIncome
      },
      {
        name: 'Tax Payable',
        old: oldRegimeResult.tax,
        new: newRegimeResult.tax
      },
      {
        name: 'Take-home',
        old: oldRegimeResult.takehome,
        new: newRegimeResult.takehome
      }
    ];
  }, [oldRegimeResult, newRegimeResult]);

  return (
    <CalculatorCard>
      <SectionHeader
        icon={Receipt}
        title={CALC_TAX}
        description={CALC_TAX_DESC}
      />

      {/* Input Form */}
      <div className="space-y-6 mb-8">
        {/* Annual Income */}
        <FormInput
          label={LABEL_ANNUAL_INCOME}
          value={income}
          setValue={setIncome}
          validation={{ min: 0, allowDecimals: false, required: true }}
          placeholder={PLACEHOLDER_10L}
        />

        {/* Deductions Section */}
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 space-y-4">
          <h4 className="font-semibold text-primary dark:text-white mb-3">{TAX_DEDUCTIONS_SECTION}</h4>

          {/* 80C */}
          <FormInput
            label={TAX_SECTION_80C}
            value={section80C}
            setValue={setSection80C}
            validation={{ min: 0, max: 150000, allowDecimals: false }}
            placeholder={PLACEHOLDER_150K}
          />

          {/* 80D */}
          <FormInput
            label={TAX_SECTION_80D}
            value={section80D}
            setValue={setSection80D}
            validation={{ min: 0, max: 50000, allowDecimals: false }}
            placeholder={PLACEHOLDER_50K}
          />

          {/* HRA */}
          <FormInput
            label={TAX_HRA}
            value={hra}
            setValue={setHra}
            validation={{ min: 0, allowDecimals: false }}
            placeholder={PLACEHOLDER_2L}
          />

          {/* 80CCD(1B) - Personal NPS */}
          <div>
            <FormInput
              label={TAX_NPS_PERSONAL}
              value={npsPersonal}
              setValue={setNpsPersonal}
              validation={{ min: 0, max: 50000, allowDecimals: false }}
              placeholder={PLACEHOLDER_50K}
            />
            <InfoBox className="mt-2">
              {TAX_NPS_PERSONAL_HELP}
            </InfoBox>
          </div>

          {/* 80CCD(2) - Employer NPS */}
          <div>
            <FormInput
              label={TAX_NPS_EMPLOYER}
              value={npsEmployer}
              setValue={setNpsEmployer}
              validation={{ min: 0, allowDecimals: false }}
              placeholder={PLACEHOLDER_1L}
            />
            <InfoBox className="mt-2">
              {TAX_NPS_EMPLOYER_HELP}
            </InfoBox>
          </div>

          {/* Other Deductions */}
          <div className="border-t border-slate-300 dark:border-slate-600 pt-4">
            <FormInput
              label={TAX_OTHER_DEDUCTIONS}
              value={otherDeductions}
              setValue={setOtherDeductions}
              validation={{ min: 0, allowDecimals: false }}
              placeholder={PLACEHOLDER_2L}
            />
            <InfoBox className="mt-2">
              {TAX_OTHER_DEDUCTIONS_HELP}
            </InfoBox>
          </div>
        </div>
      </div>

      {/* Results */}
      {oldRegimeResult && newRegimeResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION_SLOW }}
        >
          {/* Recommendation Banner */}
          <AlertBanner
            type={savings > 0 ? "success" : "info"}
            title={
              savings > 0
                ? `${TAX_OLD_REGIME} saves ${formatCurrency(Math.abs(savings))}`
                : `${TAX_NEW_REGIME} saves ${formatCurrency(Math.abs(savings))}`
            }
            message={TAX_RECOMMENDATION(savings)}
            className="mb-6"
          />

          {/* Side-by-side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Old Regime */}
            <ComparisonCard
              title={TAX_OLD_REGIME}
              items={[
                {
                  label: TAX_GROSS_INCOME,
                  value: formatCurrency(income),
                  valueColor: 'dark:text-white'
                },
                {
                  label: TAX_TOTAL_DEDUCTIONS,
                  value: `-${formatCurrency(oldRegimeResult.deductions)}`,
                  valueColor: 'text-green-600 dark:text-green-400'
                },
                {
                  label: TAX_TAXABLE_INCOME,
                  value: formatCurrency(oldRegimeResult.taxableIncome),
                  valueColor: 'dark:text-white',
                  bordered: true
                },
                {
                  label: TAX_PAYABLE,
                  value: formatCurrency(oldRegimeResult.tax),
                  valueColor: 'text-red-600 dark:text-red-400'
                },
                {
                  label: TAX_TAKEHOME,
                  value: formatCurrency(oldRegimeResult.takehome),
                  valueColor: 'text-accent text-lg font-bold',
                  bordered: true
                }
              ]}
            />

            {/* New Regime */}
            <ComparisonCard
              title={TAX_NEW_REGIME}
              items={[
                {
                  label: TAX_GROSS_INCOME,
                  value: formatCurrency(income),
                  valueColor: 'dark:text-white'
                },
                {
                  label: TAX_TOTAL_DEDUCTIONS,
                  value: `-${formatCurrency(newRegimeResult.deductions)}`,
                  valueColor: 'text-green-600 dark:text-green-400'
                },
                {
                  label: TAX_TAXABLE_INCOME,
                  value: formatCurrency(newRegimeResult.taxableIncome),
                  valueColor: 'dark:text-white',
                  bordered: true
                },
                {
                  label: TAX_PAYABLE,
                  value: formatCurrency(newRegimeResult.tax),
                  valueColor: 'text-red-600 dark:text-red-400'
                },
                {
                  label: TAX_TAKEHOME,
                  value: formatCurrency(newRegimeResult.takehome),
                  valueColor: 'text-accent text-lg font-bold',
                  bordered: true
                }
              ]}
            />
          </div>

          {/* Chart */}
          <StandardBarChart
            data={comparisonData}
            bars={[
              { dataKey: 'old', fill: COLOR_CHART_NEUTRAL, name: CHART_OLD_REGIME },
              { dataKey: 'new', fill: COLOR_CHART_PRIMARY, name: CHART_NEW_REGIME }
            ]}
            title={TAX_VISUAL_COMPARISON}
            xKey="name"
          />
        </motion.div>
      )}

      {/* Educational Sections */}
      <div className="mt-12 space-y-8">
        <HowToUseSection steps={TAX_HOW_TO_USE} />
        <FAQSection faqs={TAX_FAQ} />
        <AnalysisSection title="How Tax Calculation Works" variant="default">
          <p>
            Tax calculation in India follows a <strong>slab-based progressive system</strong>. Your income is divided into
            slabs, and each slab is taxed at a different rate:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-2">Old Tax Regime Slabs ({TAX_SLABS.old.year})</h4>
              <ul className="text-sm space-y-1">
                {TAX_SLABS.old.slabs.map((slab, index) => {
                  const fromAmount = slab.min === 0 ? 'Up to' : `₹${(slab.min / 100000).toFixed(1)}L -`;
                  const toAmount = slab.max === Infinity ? 'Above' : `₹${(slab.max / 100000).toFixed(1)}L`;
                  const range = slab.min === 0 ? `${fromAmount} ${toAmount}` : slab.max === Infinity ? `${toAmount} ₹${(slab.min / 100000).toFixed(1)}L` : `${fromAmount} ${toAmount}`;
                  return <li key={index}>{range}: {slab.rate}%</li>;
                })}
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded p-4">
              <h4 className="font-semibold mb-2">New Tax Regime Slabs ({TAX_SLABS.new.year})</h4>
              <ul className="text-sm space-y-1">
                {TAX_SLABS.new.slabs.map((slab, index) => {
                  const fromAmount = slab.min === 0 ? 'Up to' : `₹${(slab.min / 100000).toFixed(1)}L -`;
                  const toAmount = slab.max === Infinity ? 'Above' : `₹${(slab.max / 100000).toFixed(1)}L`;
                  const range = slab.min === 0 ? `${fromAmount} ${toAmount}` : slab.max === Infinity ? `${toAmount} ₹${(slab.min / 100000).toFixed(1)}L` : `${fromAmount} ${toAmount}`;
                  return <li key={index}>{range}: {slab.rate}%</li>;
                })}
              </ul>
            </div>
          </div>

          <p>
            <strong>Step-by-step calculation:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li><strong>Gross Income:</strong> Your total annual income</li>
            <li><strong>Less: Deductions:</strong> Section 80C, 80D, HRA, NPS, etc. (only in Old Regime)</li>
            <li><strong>Taxable Income:</strong> Gross Income - Total Deductions</li>
            <li><strong>Tax Calculation:</strong> Apply progressive slab rates to taxable income</li>
            <li><strong>Add: Cess:</strong> 4% Health & Education Cess on total tax</li>
            <li><strong>Less: Rebate:</strong> Section 87A rebate - NIL tax if taxable income up to ₹{(TAX_SLABS.new.rebateLimit / 100000).toFixed(1)}L (New Regime)</li>
            <li><strong>Final Tax:</strong> Total tax payable for the year</li>
          </ol>

          <p>
            <strong>Take-home Calculation:</strong> Take-home = Gross Income - Total Tax Payable. This is the actual amount
            you receive in hand after all taxes.
          </p>

          <NoteBox type="warning">
            This calculator provides estimates based on standard tax rules. Actual tax may vary based
            on additional income sources, special deductions, surcharge for high earners, and state-specific taxes. Consult
            a tax professional for precise calculations.
          </NoteBox>
        </AnalysisSection>
      </div>
    </CalculatorCard>
  );
}
