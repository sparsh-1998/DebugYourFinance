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
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
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
          transition={{ duration: 0.5 }}
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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                <XAxis dataKey="name" tick={{ fill: '#64748b' }} className="dark:fill-slate-400" />
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
                <Bar dataKey="old" fill="#64748b" name={CHART_OLD_REGIME} radius={[4, 4, 0, 0]} />
                <Bar dataKey="new" fill="#10b981" name={CHART_NEW_REGIME} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>
      )}
    </div>
  );
}
