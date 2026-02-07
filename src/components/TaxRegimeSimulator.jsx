import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Receipt, CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateTax, formatCurrency } from '../utils/calculations';

export default function TaxRegimeSimulator() {
  const [income, setIncome] = useLocalStorage('tax_income', 1000000);
  const [section80C, setSection80C] = useLocalStorage('tax_deductions_80c', 150000);
  const [section80D, setSection80D] = useLocalStorage('tax_deductions_80d', 25000);
  const [hra, setHra] = useLocalStorage('tax_hra', 0);
  const [homeLoan, setHomeLoan] = useLocalStorage('tax_homeloan', 0);
  const [oldRegimeResult, setOldRegimeResult] = useState(null);
  const [newRegimeResult, setNewRegimeResult] = useState(null);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const deductions = { section80C, section80D, hra, homeLoan };
    const oldResult = calculateTax(income, deductions, 'old');
    const newResult = calculateTax(income, {}, 'new');

    setOldRegimeResult(oldResult);
    setNewRegimeResult(newResult);
    setSavings(newResult.tax - oldResult.tax);
  }, [income, section80C, section80D, hra, homeLoan]);

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
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-accent/10 p-3 rounded-lg">
          <Receipt className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary">Tax Regime Simulator</h3>
          <p className="text-sm text-slate-600">Compare Old vs New tax regime</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="space-y-6 mb-8">
        {/* Annual Income */}
        <div>
          <label className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Annual Gross Income</span>
            <span className="text-lg font-semibold text-accent">{formatCurrency(income)}</span>
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-accent focus:outline-none transition-colors"
            min="0"
            step="10000"
          />
        </div>

        {/* Deductions Section */}
        <div className="bg-slate-50 rounded-lg p-4 space-y-4">
          <h4 className="font-semibold text-primary mb-3">Deductions (for Old Regime)</h4>

          {/* 80C */}
          <div>
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-700">Section 80C (max ₹1.5L)</span>
              <span className="text-sm font-semibold text-accent">{formatCurrency(section80C)}</span>
            </label>
            <input
              type="number"
              value={section80C}
              onChange={(e) => setSection80C(Math.min(150000, Number(e.target.value)))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-accent focus:outline-none transition-colors"
              min="0"
              max="150000"
              step="10000"
            />
          </div>

          {/* 80D */}
          <div>
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-700">Section 80D (max ₹50K)</span>
              <span className="text-sm font-semibold text-accent">{formatCurrency(section80D)}</span>
            </label>
            <input
              type="number"
              value={section80D}
              onChange={(e) => setSection80D(Math.min(50000, Number(e.target.value)))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-accent focus:outline-none transition-colors"
              min="0"
              max="50000"
              step="5000"
            />
          </div>

          {/* HRA */}
          <div>
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-700">HRA (House Rent Allowance)</span>
              <span className="text-sm font-semibold text-accent">{formatCurrency(hra)}</span>
            </label>
            <input
              type="number"
              value={hra}
              onChange={(e) => setHra(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-accent focus:outline-none transition-colors"
              min="0"
              step="10000"
            />
          </div>

          {/* Home Loan */}
          <div>
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-700">Home Loan Interest (max ₹2L)</span>
              <span className="text-sm font-semibold text-accent">{formatCurrency(homeLoan)}</span>
            </label>
            <input
              type="number"
              value={homeLoan}
              onChange={(e) => setHomeLoan(Math.min(200000, Number(e.target.value)))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-accent focus:outline-none transition-colors"
              min="0"
              max="200000"
              step="10000"
            />
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
          {/* Recommendation Badge */}
          <div className={`mb-6 p-4 rounded-lg border-2 flex items-center space-x-3 ${
            savings > 0
              ? 'bg-accent/10 border-accent'
              : 'bg-blue-50 border-blue-500'
          }`}>
            <CheckCircle2 className={`h-6 w-6 ${savings > 0 ? 'text-accent' : 'text-blue-500'}`} />
            <div>
              <p className="font-semibold text-primary">
                {savings > 0
                  ? `Old Regime saves ${formatCurrency(Math.abs(savings))}`
                  : `New Regime saves ${formatCurrency(Math.abs(savings))}`
                }
              </p>
              <p className="text-sm text-slate-600">
                Choose {savings > 0 ? 'Old' : 'New'} Regime for maximum savings
              </p>
            </div>
          </div>

          {/* Side-by-side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Old Regime */}
            <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
              <h4 className="text-lg font-bold text-primary mb-4">Old Regime</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Taxable Income:</span>
                  <span className="font-semibold">{formatCurrency(oldRegimeResult.taxableIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax Payable:</span>
                  <span className="font-semibold text-red-600">{formatCurrency(oldRegimeResult.tax)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-slate-600 font-medium">Take-home:</span>
                  <span className="font-bold text-accent text-lg">{formatCurrency(oldRegimeResult.takehome)}</span>
                </div>
              </div>
            </div>

            {/* New Regime */}
            <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
              <h4 className="text-lg font-bold text-primary mb-4">New Regime</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Taxable Income:</span>
                  <span className="font-semibold">{formatCurrency(newRegimeResult.taxableIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax Payable:</span>
                  <span className="font-semibold text-red-600">{formatCurrency(newRegimeResult.tax)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-slate-600 font-medium">Take-home:</span>
                  <span className="font-bold text-accent text-lg">{formatCurrency(newRegimeResult.takehome)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-primary mb-4">Visual Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
                <YAxis
                  tick={{ fill: '#64748b' }}
                  tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="old" fill="#64748b" name="Old Regime" radius={[4, 4, 0, 0]} />
                <Bar dataKey="new" fill="#10b981" name="New Regime" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </div>
  );
}
