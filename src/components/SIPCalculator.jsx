import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateSIP, formatCurrency } from '../utils/calculations';

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useLocalStorage('sip_monthly', 10000);
  const [expectedReturn, setExpectedReturn] = useLocalStorage('sip_return', 12);
  const [timePeriod, setTimePeriod] = useLocalStorage('sip_years', 10);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const calculated = calculateSIP(monthlyInvestment, expectedReturn, timePeriod);
    setResults(calculated);
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-accent/10 p-3 rounded-lg">
          <TrendingUp className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary">SIP Calculator</h3>
          <p className="text-sm text-slate-600">Plan your wealth growth</p>
        </div>
      </div>

      {/* Input Form */}
      <div className="space-y-6 mb-8">
        {/* Monthly Investment */}
        <div>
          <label className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Monthly Investment</span>
            <span className="text-lg font-semibold text-accent">{formatCurrency(monthlyInvestment)}</span>
          </label>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-accent focus:outline-none transition-colors"
            min="500"
            step="500"
          />
        </div>

        {/* Expected Return */}
        <div>
          <label className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Expected Return (% p.a.)</span>
            <span className="text-lg font-semibold text-accent">{expectedReturn}%</span>
          </label>
          <input
            type="range"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full accent-accent"
            min="6"
            max="20"
            step="0.5"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>6%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Time Period */}
        <div>
          <label className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Time Period (Years)</span>
            <span className="text-lg font-semibold text-accent">{timePeriod} years</span>
          </label>
          <input
            type="range"
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
            className="w-full accent-accent"
            min="1"
            max="30"
            step="1"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>1 year</span>
            <span>30 years</span>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Invested Amount</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(results.investedAmount)}</p>
            </div>
            <div className="bg-accent/10 rounded-lg p-4 border-2 border-accent">
              <p className="text-sm text-slate-600 mb-1">Wealth Gained</p>
              <p className="text-2xl font-bold text-accent">{formatCurrency(results.wealthGained)}</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 border-2 border-primary">
              <p className="text-sm text-slate-600 mb-1">Future Value</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(results.futureValue)}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-primary mb-4">Growth Projection</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={results.yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="year"
                  label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                  tick={{ fill: '#64748b' }}
                />
                <YAxis
                  label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                  tick={{ fill: '#64748b' }}
                  tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="invested" fill="#64748b" name="Invested Amount" radius={[4, 4, 0, 0]} />
                <Bar dataKey="wealth" fill="#10b981" name="Wealth Gained" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </div>
  );
}
