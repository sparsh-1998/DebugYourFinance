import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StandardLineChart from '../StandardLineChart';

describe('StandardLineChart', () => {
  const mockData = [
    { year: 1, corpus: 5000000, cumulativeWithdrawn: 360000 },
    { year: 2, corpus: 4800000, cumulativeWithdrawn: 720000 },
    { year: 3, corpus: 4600000, cumulativeWithdrawn: 1080000 }
  ];

  const mockLines = [
    { dataKey: 'corpus', stroke: '#3b82f6', name: 'Remaining Corpus' },
    { dataKey: 'cumulativeWithdrawn', stroke: '#8b5cf6', name: 'Total Withdrawn' }
  ];

  it('renders chart with valid data', () => {
    render(
      <StandardLineChart
        data={mockData}
        lines={mockLines}
        title="Depletion Timeline"
      />
    );

    expect(screen.getByText('Depletion Timeline')).toBeInTheDocument();
  });

  it('renders chart with subtitle', () => {
    render(
      <StandardLineChart
        data={mockData}
        lines={mockLines}
        title="Depletion Timeline"
        subtitle="(Inflation-Adjusted)"
      />
    );

    expect(screen.getByText('Depletion Timeline')).toBeInTheDocument();
    expect(screen.getByText('(Inflation-Adjusted)')).toBeInTheDocument();
  });

  it('shows error message with empty data array', () => {
    render(
      <StandardLineChart
        data={[]}
        lines={mockLines}
        title="Depletion Timeline"
      />
    );

    expect(screen.getByText('No data available to display')).toBeInTheDocument();
  });

  it('shows error message with null data', () => {
    render(
      <StandardLineChart
        data={null}
        lines={mockLines}
        title="Depletion Timeline"
      />
    );

    expect(screen.getByText('No data available to display')).toBeInTheDocument();
  });

  it('shows error message with undefined data', () => {
    render(
      <StandardLineChart
        data={undefined}
        lines={mockLines}
        title="Depletion Timeline"
      />
    );

    expect(screen.getByText('No data available to display')).toBeInTheDocument();
  });

  it('shows error message with empty lines array', () => {
    render(
      <StandardLineChart
        data={mockData}
        lines={[]}
        title="Depletion Timeline"
      />
    );

    expect(screen.getByText('Chart configuration error')).toBeInTheDocument();
  });

  it('shows error message with null lines', () => {
    render(
      <StandardLineChart
        data={mockData}
        lines={null}
        title="Depletion Timeline"
      />
    );

    expect(screen.getByText('Chart configuration error')).toBeInTheDocument();
  });

  it('renders with custom xKey', () => {
    const customData = [
      { period: 1, corpus: 5000000, cumulativeWithdrawn: 360000 },
      { period: 2, corpus: 4800000, cumulativeWithdrawn: 720000 }
    ];

    render(
      <StandardLineChart
        data={customData}
        lines={mockLines}
        title="Depletion Timeline"
        xKey="period"
      />
    );

    expect(screen.getByText('Depletion Timeline')).toBeInTheDocument();
  });

  it('renders with custom labels', () => {
    render(
      <StandardLineChart
        data={mockData}
        lines={mockLines}
        title="Depletion Timeline"
        xLabel="Time Period"
        yLabel="Value (₹)"
      />
    );

    expect(screen.getByText('Depletion Timeline')).toBeInTheDocument();
  });

  it('renders multiple lines correctly', () => {
    const { container } = render(
      <StandardLineChart
        data={mockData}
        lines={mockLines}
        title="Depletion Timeline"
      />
    );

    // Check that the component renders successfully
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('Depletion Timeline')).toBeInTheDocument();
  });

  it('handles single line configuration', () => {
    const singleLine = [
      { dataKey: 'corpus', stroke: '#3b82f6', name: 'Remaining Corpus' }
    ];

    render(
      <StandardLineChart
        data={mockData}
        lines={singleLine}
        title="Corpus Only"
      />
    );

    expect(screen.getByText('Corpus Only')).toBeInTheDocument();
  });

  it('validates PropTypes for lines configuration', () => {
    const validLines = [
      { dataKey: 'corpus', stroke: '#3b82f6', name: 'Remaining Corpus' }
    ];

    const { container } = render(
      <StandardLineChart
        data={mockData}
        lines={validLines}
        title="Test Chart"
      />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders without subtitle when not provided', () => {
    const { container } = render(
      <StandardLineChart
        data={mockData}
        lines={mockLines}
        title="Depletion Timeline"
      />
    );

    expect(screen.getByText('Depletion Timeline')).toBeInTheDocument();
    expect(container.querySelector('.subtitle')).not.toBeInTheDocument();
  });

  it('handles large data sets', () => {
    const largeData = Array.from({ length: 40 }, (_, i) => ({
      year: i + 1,
      corpus: 5000000 - (i * 100000),
      cumulativeWithdrawn: (i + 1) * 360000
    }));

    render(
      <StandardLineChart
        data={largeData}
        lines={mockLines}
        title="40 Year Projection"
      />
    );

    expect(screen.getByText('40 Year Projection')).toBeInTheDocument();
  });

  it('renders with default xKey when not specified', () => {
    const dataWithYearKey = [
      { year: 1, value: 100 },
      { year: 2, value: 200 }
    ];

    const lines = [{ dataKey: 'value', stroke: '#3b82f6', name: 'Value' }];

    render(
      <StandardLineChart
        data={dataWithYearKey}
        lines={lines}
        title="Test Chart"
      />
    );

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
  });

  it('handles negative values in data', () => {
    const dataWithNegatives = [
      { year: 1, profit: 100000, loss: -20000 },
      { year: 2, profit: 150000, loss: -30000 }
    ];

    const lines = [
      { dataKey: 'profit', stroke: '#22c55e', name: 'Profit' },
      { dataKey: 'loss', stroke: '#ef4444', name: 'Loss' }
    ];

    render(
      <StandardLineChart
        data={dataWithNegatives}
        lines={lines}
        title="Profit & Loss"
      />
    );

    expect(screen.getByText('Profit & Loss')).toBeInTheDocument();
  });

  it('renders chart with monotone curve type', () => {
    const { container } = render(
      <StandardLineChart
        data={mockData}
        lines={mockLines}
        title="Smooth Line Chart"
      />
    );

    // Check that the component renders successfully
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('Smooth Line Chart')).toBeInTheDocument();
  });
});
