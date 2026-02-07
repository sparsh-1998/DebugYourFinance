import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Home, TrendingDown } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateEMI, calculatePrepaymentImpact, formatCurrency } from '../utils/calculations';

export default function LoanTenureReducer() {
  const [principal, setPrincipal] = useLocalStorage('loan_principal', 5000000);
  const [annualRate, setAnnualRate] = useLocalStorage('loan_rate', 8.5);
  const [tenure, setTenure] = useLocalStorage('loan_tenure', 20);
  const [prepayment, setPrepayment] = useLocalStorage('loan_prepayment', 100000);
  const [frequency, setFrequency] = useLocalStorage('loan_frequency', 'annual');
  const [emi, setEmi] = useState(0);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const calculatedEmi = calculateEMI(principal, annualRate, tenure);
    setEmi(calculatedEmi);

    const impact = calculatePrepaymentImpact(principal, annualRate, tenure, prepayment, frequency);
    setResults(impact);
  }, [principal, annualRate, tenure, prepayment, frequency]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-accent/10 p-3 rounded-lg">
          <Home className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary">Loan Tenure Reducer</h3>
          <p className="text-sm text-slate-600">Calculate prepayment impact</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="space-y-6 mb-8">
        {/* Loan Amount */}
        <div>
          <label className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Loan Amount</span>
            <span className="text-lg font-semibold text-accent">{formatCurrency(principal)}</span>
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-accent focus:outline-none transition-colors"
            min="100000"
            step="100000"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <label className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Interest Rate (% p.a.)</span>
            <span className="text-lg font-semibold text-accent">{annualRate}%</span>
          </label>
          <input
            type="range"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="w-full accent-accent"
            min="6"
            max="15"
            step="0.1"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>6%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <label className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Loan Tenure (Years)</span>
            <span className="text-lg font-semibold text-accent">{tenure} years</span>
          </label>
          <input
            type="range"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-accent"
            min="5"
            max="30"
            step="1"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>5 years</span>
            <span>30 years</span>
          </div>
        </div>

        {/* EMI Display */}
        <div className="bg-primary/10 rounded-lg p-4 border-2 border-primary">
          <p className="text-sm text-slate-600 mb-1">Monthly EMI</p>
          <p className="text-3xl font-bold text-primary">{formatCurrency(emi)}</p>
        </div>

        {/* Prepayment Amount */}
        <div>
          <label className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Prepayment Amount</span>
            <span className="text-lg font-semibold text-accent">{formatCurrency(prepayment)}</span>
          </label>
          <input
            type="number"
            value={prepayment}
            onChange={(e) => setPrepayment(Number(e.target.value))}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-accent focus:outline-none transition-colors"
            min="0"
            step="10000"
          />
        </div>

        {/* Prepayment Frequency */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Prepayment Frequency
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['onetime', 'annual', 'monthly'].map((freq) => (
              <button
                key={freq}
                onClick={() => setFrequency(freq)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  frequency === freq
                    ? 'bg-accent text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {freq === 'onetime' ? 'One-time' : freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
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
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Without Prepayment */}
            <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingDown className="h-5 w-5 text-slate-600" />
                <h4 className="text-lg font-bold text-primary">Without Prepayment</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Tenure:</span>
                  <span className="font-semibold">{results.original.tenure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Interest:</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(results.original.totalInterest)}
                  </span>
                </div>
              </div>
            </div>

            {/* With Prepayment */}
            <div className="bg-accent/10 rounded-lg p-6 border-2 border-accent">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingDown className="h-5 w-5 text-accent" />
                <h4 className="text-lg font-bold text-primary">With Prepayment</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">New Tenure:</span>
                  <span className="font-semibold text-accent">{results.withPrepayment.tenure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Interest:</span>
                  <span className="font-semibold text-accent">
                    {formatCurrency(results.withPrepayment.totalInterest)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Highlight */}
          <div className="bg-gradient-to-r from-accent to-emerald-600 rounded-lg p-6 text-white mb-8">
            <h4 className="text-lg font-semibold mb-4">Your Savings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-emerald-100 mb-1">Tenure Reduced</p>
                <p className="text-2xl font-bold">{results.withPrepayment.tenureReduced}</p>
              </div>
              <div>
                <p className="text-sm text-emerald-100 mb-1">Interest Saved</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(results.withPrepayment.interestSaved)}
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          {results.yearlyData.length > 0 && (
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-primary mb-4">Principal Reduction Over Time</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="year"
                    label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                    tick={{ fill: '#64748b' }}
                  />
                  <YAxis
                    label={{ value: 'Outstanding (₹)', angle: -90, position: 'insideLeft' }}
                    tick={{ fill: '#64748b' }}
                    tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: '#fff', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="withoutPrepayment"
                    stroke="#64748b"
                    strokeWidth={2}
                    name="Without Prepayment"
                    dot={{ fill: '#64748b', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="withPrepayment"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="With Prepayment"
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
