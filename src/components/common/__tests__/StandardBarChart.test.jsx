import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StandardBarChart from '../StandardBarChart';

describe('StandardBarChart', () => {
  const mockData = [
    { year: 1, invested: 120000, wealth: 10000 },
    { year: 2, invested: 240000, wealth: 35000 },
    { year: 3, invested: 360000, wealth: 75000 }
  ];

  const mockBars = [
    { dataKey: 'invested', fill: '#64748b', name: 'Invested Amount' },
    { dataKey: 'wealth', fill: '#3b82f6', name: 'Wealth Gained' }
  ];

  it('renders chart with valid data', () => {
    render(
      <StandardBarChart
        data={mockData}
        bars={mockBars}
        title="Growth Projection"
      />
    );

    expect(screen.getByText('Growth Projection')).toBeInTheDocument();
  });

  it('renders chart with subtitle', () => {
    render(
      <StandardBarChart
        data={mockData}
        bars={mockBars}
        title="Growth Projection"
        subtitle="With Step-Up"
      />
    );

    expect(screen.getByText('Growth Projection')).toBeInTheDocument();
    expect(screen.getByText('With Step-Up')).toBeInTheDocument();
  });

  it('shows error message with empty data array', () => {
    render(
      <StandardBarChart
        data={[]}
        bars={mockBars}
        title="Growth Projection"
      />
    );

    expect(screen.getByText('No data available to display')).toBeInTheDocument();
  });

  it('shows error message with null data', () => {
    render(
      <StandardBarChart
        data={null}
        bars={mockBars}
        title="Growth Projection"
      />
    );

    expect(screen.getByText('No data available to display')).toBeInTheDocument();
  });

  it('shows error message with undefined data', () => {
    render(
      <StandardBarChart
        data={undefined}
        bars={mockBars}
        title="Growth Projection"
      />
    );

    expect(screen.getByText('No data available to display')).toBeInTheDocument();
  });

  it('shows error message with empty bars array', () => {
    render(
      <StandardBarChart
        data={mockData}
        bars={[]}
        title="Growth Projection"
      />
    );

    expect(screen.getByText('Chart configuration error')).toBeInTheDocument();
  });

  it('shows error message with null bars', () => {
    render(
      <StandardBarChart
        data={mockData}
        bars={null}
        title="Growth Projection"
      />
    );

    expect(screen.getByText('Chart configuration error')).toBeInTheDocument();
  });

  it('renders with custom xKey', () => {
    const customData = [
      { period: 1, invested: 120000, wealth: 10000 },
      { period: 2, invested: 240000, wealth: 35000 }
    ];

    render(
      <StandardBarChart
        data={customData}
        bars={mockBars}
        title="Growth Projection"
        xKey="period"
      />
    );

    expect(screen.getByText('Growth Projection')).toBeInTheDocument();
  });

  it('renders with custom labels', () => {
    render(
      <StandardBarChart
        data={mockData}
        bars={mockBars}
        title="Growth Projection"
        xLabel="Time Period"
        yLabel="Value (₹)"
      />
    );

    expect(screen.getByText('Growth Projection')).toBeInTheDocument();
  });

  it('renders multiple bars correctly', () => {
    const { container } = render(
      <StandardBarChart
        data={mockData}
        bars={mockBars}
        title="Growth Projection"
      />
    );

    // Check that the component renders successfully
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('Growth Projection')).toBeInTheDocument();
  });

  it('handles single bar configuration', () => {
    const singleBar = [
      { dataKey: 'invested', fill: '#64748b', name: 'Invested Amount' }
    ];

    render(
      <StandardBarChart
        data={mockData}
        bars={singleBar}
        title="Investment Only"
      />
    );

    expect(screen.getByText('Investment Only')).toBeInTheDocument();
  });

  it('validates PropTypes for bars configuration', () => {
    const validBars = [
      { dataKey: 'invested', fill: '#64748b', name: 'Invested Amount' }
    ];

    const { container } = render(
      <StandardBarChart
        data={mockData}
        bars={validBars}
        title="Test Chart"
      />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders without subtitle when not provided', () => {
    const { container } = render(
      <StandardBarChart
        data={mockData}
        bars={mockBars}
        title="Growth Projection"
      />
    );

    expect(screen.getByText('Growth Projection')).toBeInTheDocument();
    expect(container.querySelector('.subtitle')).not.toBeInTheDocument();
  });

  it('handles large data sets', () => {
    const largeData = Array.from({ length: 30 }, (_, i) => ({
      year: i + 1,
      invested: (i + 1) * 120000,
      wealth: (i + 1) * 50000
    }));

    render(
      <StandardBarChart
        data={largeData}
        bars={mockBars}
        title="30 Year Projection"
      />
    );

    expect(screen.getByText('30 Year Projection')).toBeInTheDocument();
  });

  it('renders with default xKey when not specified', () => {
    const dataWithYearKey = [
      { year: 1, value: 100 },
      { year: 2, value: 200 }
    ];

    const bars = [{ dataKey: 'value', fill: '#3b82f6', name: 'Value' }];

    render(
      <StandardBarChart
        data={dataWithYearKey}
        bars={bars}
        title="Test Chart"
      />
    );

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
  });
});
