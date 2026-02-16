import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartContainer from './ChartContainer';
import { formatCurrency } from '../../utils/calculations';
import { COLOR_CHART_GRID, COLOR_SLATE_500 } from '../../constants/colors';
import { CHART_TOOLTIP_STYLE, CHART_STROKE_DASHARRAY, CHART_BAR_RADIUS, CHART_HEIGHT, CHART_LABEL_OFFSET } from '../../constants/chartStyles';
import { CHART_YEARS, CHART_AMOUNT } from '../../constants/messages';

/**
 * Standardized bar chart component with consistent styling
 * @param {Array} data - Chart data array
 * @param {Array} bars - Array of bar configurations { dataKey, fill, name }
 * @param {string} title - Chart title
 * @param {string} subtitle - Optional subtitle
 * @param {string} xKey - X-axis data key (default: 'year')
 * @param {string} xLabel - X-axis label (default: 'Years')
 * @param {string} yLabel - Y-axis label (default: 'Amount (₹)')
 */
function StandardBarChart({
  data,
  bars,
  title,
  subtitle = null,
  xKey = 'year',
  xLabel = CHART_YEARS,
  yLabel = CHART_AMOUNT
}) {
  return (
    <ChartContainer title={title} subtitle={subtitle}>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray={CHART_STROKE_DASHARRAY}
            stroke={COLOR_CHART_GRID}
            className="dark:stroke-slate-600"
          />
          <XAxis
            dataKey={xKey}
            label={{ value: xLabel, position: 'insideBottom', offset: CHART_LABEL_OFFSET }}
            tick={{ fill: COLOR_SLATE_500 }}
            className="dark:fill-slate-400"
          />
          <YAxis
            label={{ value: yLabel, angle: -90, position: 'insideLeft' }}
            tick={{ fill: COLOR_SLATE_500 }}
            className="dark:fill-slate-400"
            tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
          />
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={CHART_TOOLTIP_STYLE}
          />
          <Legend />
          {bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={bar.fill}
              name={bar.name}
              radius={CHART_BAR_RADIUS}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

StandardBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  bars: PropTypes.arrayOf(PropTypes.shape({
    dataKey: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  xKey: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string
};

export default StandardBarChart;
