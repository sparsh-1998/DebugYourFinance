import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Receipt } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { calculateTax, formatCurrency } from '../../utils/calculations';
import FormInput from '../common/FormInput';
import SectionHeader from '../common/SectionHeader';
import ComparisonCard from '../common/ComparisonCard';
import AlertBanner from '../common/AlertBanner';
import ChartContainer from '../common/ChartContainer';
import InfoBox from '../common/InfoBox';
import CalculatorCard from '../common/CalculatorCard';
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
import { COLOR_CHART_GRID, COLOR_SLATE_500, COLOR_CHART_PRIMARY, COLOR_CHART_NEUTRAL } from '../../constants/colors';
import { CHART_TOOLTIP_STYLE, CHART_STROKE_DASHARRAY, CHART_BAR_RADIUS, CHART_HEIGHT } from '../../constants/chartStyles';
import { ANIMATION_DURATION_SLOW } from '../../constants/animations';

export default function TaxRegimeSimulator() {
  const [income, setIncome] = useLocalStorage('tax_income', 1000000);
  const [section80C, setSection80C] = useLocalStorage('tax_deductions_80c', 150000);
  const [section80D, setSection80D] = useLocalStorage('tax_deductions_80d', 25000);
  const [hra, setHra] = useLocalStorage('tax_hra', 0);
  const [npsPersonal, setNpsPersonal] = useLocalStorage('tax_nps_personal', 0);
  const [npsEmployer, setNpsEmployer] = useLocalStorage('tax_nps_employer', 0);
  const [otherDeductions, setOtherDeductions] = useLocalStorage('tax_other_deductions', 0);

  const [oldRegimeResult, setOldRegimeResult] = useState(null);
  const [newRegimeResult, setNewRegimeResult] = useState(null);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const deductions = { section80C, section80D, hra, npsPersonal, npsEmployer, otherDeductions };
    const oldResult = calculateTax(income, deductions, 'old');
    const newResult = calculateTax(income, {}, 'new');

    setOldRegimeResult(oldResult);
    setNewRegimeResult(newResult);
    setSavings(newResult.tax - oldResult.tax);
  }, [income, section80C, section80D, hra, npsPersonal, npsEmployer, otherDeductions]);

  const comparisonData = oldRegimeResult && newRegimeResult ? [
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
  ] : [];

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
          <ChartContainer title={TAX_VISUAL_COMPARISON}>
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray={CHART_STROKE_DASHARRAY} stroke={COLOR_CHART_GRID} className="dark:stroke-slate-600" />
                <XAxis dataKey="name" tick={{ fill: COLOR_SLATE_500 }} className="dark:fill-slate-400" />
                <YAxis
                  tick={{ fill: COLOR_SLATE_500 }}
                  className="dark:fill-slate-400"
                  tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={CHART_TOOLTIP_STYLE}
                />
                <Legend />
                <Bar dataKey="old" fill={COLOR_CHART_NEUTRAL} name={CHART_OLD_REGIME} radius={CHART_BAR_RADIUS} />
                <Bar dataKey="new" fill={COLOR_CHART_PRIMARY} name={CHART_NEW_REGIME} radius={CHART_BAR_RADIUS} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>
      )}

      {/* Educational Sections */}
      <div className="mt-12 space-y-8">
        {/* How to Use This Tool */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">How to Use This Tool</h3>
          <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300">
            <li><strong>Enter your annual gross income</strong> - Your total salary/income before any deductions (CTC or gross income)</li>
            <li><strong>Fill in applicable deductions</strong> - Add investments and expenses eligible for tax deductions under various sections</li>
            <li><strong>Compare tax regimes</strong> - Review which regime (Old vs New) saves you more money based on your deductions</li>
          </ol>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">What is Section 80C and what qualifies?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Section 80C allows deductions up to ₹1.5 lakhs per year for investments in: PPF, EPF, ELSS mutual funds,
                life insurance premiums, NSC, tax-saving FDs, principal repayment of home loan, tuition fees, and Sukanya
                Samriddhi Yojana. These are the most common tax-saving investments available to Indian taxpayers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">Should I choose Old or New Tax Regime?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Choose the <strong>Old Regime</strong> if you have significant deductions (₹2.5+ lakhs in 80C, HRA, home loan interest, etc.).
                Choose the <strong>New Regime</strong> if you have minimal deductions and prefer lower tax slabs without claiming exemptions.
                The new regime has lower rates but doesn't allow most deductions. Use this calculator to find which saves you more!
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">What is Section 80CCD(1B) for NPS?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                Section 80CCD(1B) provides an additional deduction of up to ₹50,000 for contributions to the National Pension
                System (NPS). This is over and above the ₹1.5 lakh limit of Section 80C, allowing a total deduction of ₹2 lakhs.
                It's one of the best tax-saving options with dual benefits of retirement planning and tax savings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">How is HRA exemption calculated?</h4>
              <p className="text-slate-700 dark:text-slate-300">
                HRA (House Rent Allowance) exemption is the minimum of: 1) Actual HRA received, 2) Rent paid minus 10% of salary,
                or 3) 50% of salary (metro) or 40% (non-metro). Only applicable if you're living in a rented house. Not available
                in the new tax regime.
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Block */}
        <div className="bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 rounded-lg p-6 border-2 border-accent/20 dark:border-accent/30">
          <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">How Tax Calculation Works</h3>
          <div className="text-slate-700 dark:text-slate-300 space-y-4">
            <p>
              Tax calculation in India follows a <strong>slab-based progressive system</strong>. Your income is divided into
              slabs, and each slab is taxed at a different rate:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded p-4">
                <h4 className="font-semibold mb-2">Old Tax Regime Slabs (FY 2024-25)</h4>
                <ul className="text-sm space-y-1">
                  <li>Up to ₹2.5L: 0%</li>
                  <li>₹2.5L - ₹5L: 5%</li>
                  <li>₹5L - ₹10L: 20%</li>
                  <li>Above ₹10L: 30%</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded p-4">
                <h4 className="font-semibold mb-2">New Tax Regime Slabs (FY 2024-25)</h4>
                <ul className="text-sm space-y-1">
                  <li>Up to ₹3L: 0%</li>
                  <li>₹3L - ₹7L: 5%</li>
                  <li>₹7L - ₹10L: 10%</li>
                  <li>₹10L - ₹12L: 15%</li>
                  <li>₹12L - ₹15L: 20%</li>
                  <li>Above ₹15L: 30%</li>
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
              <li><strong>Less: Rebate:</strong> ₹12,500 rebate if income under ₹7L (New Regime)</li>
              <li><strong>Final Tax:</strong> Total tax payable for the year</li>
            </ol>

            <p>
              <strong>Take-home Calculation:</strong> Take-home = Gross Income - Total Tax Payable. This is the actual amount
              you receive in hand after all taxes.
            </p>

            <p className="text-sm mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-700">
              <strong>Note:</strong> This calculator provides estimates based on standard tax rules. Actual tax may vary based
              on additional income sources, special deductions, surcharge for high earners, and state-specific taxes. Consult
              a tax professional for precise calculations.
            </p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
