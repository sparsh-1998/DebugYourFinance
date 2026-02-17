import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

// Helper function to render with required providers
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Footer', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('DebugYourFinance')).toBeInTheDocument();
  });

  it('displays brand name and description', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('DebugYourFinance')).toBeInTheDocument();
    expect(screen.getByText(/Privacy-first financial calculators/i)).toBeInTheDocument();
  });

  it('displays tool links section', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('SIP Calculator')).toBeInTheDocument();
    expect(screen.getByText('SWP Generator')).toBeInTheDocument();
    expect(screen.getByText('Tax Regime Simulator')).toBeInTheDocument();
    expect(screen.getByText('Loan Tenure Reducer')).toBeInTheDocument();
    expect(screen.getByText('Rent vs Buy')).toBeInTheDocument();
  });

  it('displays social links section', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('has Instagram link', () => {
    renderWithProviders(<Footer />);

    const instagramLink = screen.getByLabelText('Instagram');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/debugyourfinance');
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has Twitter link', () => {
    renderWithProviders(<Footer />);

    const twitterLink = screen.getByLabelText('Twitter');
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/debugyourfinance');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays current year in copyright', () => {
    renderWithProviders(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('displays copyright message with heart icon', () => {
    renderWithProviders(<Footer />);

    const copyrightTexts = screen.getAllByText(/DebugYourFinance/i);
    expect(copyrightTexts.length).toBeGreaterThan(0);
    expect(screen.getByText(/Made with/i)).toBeInTheDocument();
    expect(screen.getByText(/for financial freedom/i)).toBeInTheDocument();
  });

  it('has correct link to SIP calculator', () => {
    renderWithProviders(<Footer />);

    const sipLink = screen.getByText('SIP Calculator').closest('a');
    expect(sipLink).toHaveAttribute('href', '/tools/sip');
  });

  it('has correct link to SWP calculator', () => {
    renderWithProviders(<Footer />);

    const swpLink = screen.getByText('SWP Generator').closest('a');
    expect(swpLink).toHaveAttribute('href', '/tools/swp');
  });

  it('has correct link to Tax simulator', () => {
    renderWithProviders(<Footer />);

    const taxLink = screen.getByText('Tax Regime Simulator').closest('a');
    expect(taxLink).toHaveAttribute('href', '/tools/tax');
  });

  it('has correct link to Loan calculator', () => {
    renderWithProviders(<Footer />);

    const loanLink = screen.getByText('Loan Tenure Reducer').closest('a');
    expect(loanLink).toHaveAttribute('href', '/tools/loan');
  });

  it('has correct link to Rent vs Buy calculator', () => {
    renderWithProviders(<Footer />);

    const rvbLink = screen.getByText('Rent vs Buy').closest('a');
    expect(rvbLink).toHaveAttribute('href', '/tools/rent-vs-buy');
  });

  it('applies hover effects to tool links', () => {
    renderWithProviders(<Footer />);

    const sipLink = screen.getByText('SIP Calculator');
    expect(sipLink).toHaveClass('hover:text-accent');
  });

  it('displays footer in three columns on desktop', () => {
    const { container } = renderWithProviders(<Footer />);

    const grid = container.querySelector('.grid-cols-1.md\\:grid-cols-3');
    expect(grid).toBeInTheDocument();
  });

  it('has correct background color', () => {
    const { container } = renderWithProviders(<Footer />);

    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-primary');
    expect(footer).toHaveClass('dark:bg-slate-950');
  });

  it('has border separator above copyright', () => {
    const { container } = renderWithProviders(<Footer />);

    const borderDiv = container.querySelector('.border-t');
    expect(borderDiv).toBeInTheDocument();
  });

  it('displays heart icon with correct styling', () => {
    const { container } = renderWithProviders(<Footer />);

    const heartIcon = container.querySelector('.text-red-500.fill-current');
    expect(heartIcon).toBeInTheDocument();
  });

  it('has correct spacing and padding', () => {
    const { container } = renderWithProviders(<Footer />);

    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('py-12');
  });

  it('social icons have correct styling', () => {
    const { container } = renderWithProviders(<Footer />);

    const socialLinks = container.querySelectorAll('a[target="_blank"]');
    expect(socialLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('tool links section has correct heading style', () => {
    renderWithProviders(<Footer />);

    const toolsHeading = screen.getByText('Tools');
    expect(toolsHeading).toHaveClass('font-semibold');
  });

  it('displays all sections with proper spacing', () => {
    const { container } = renderWithProviders(<Footer />);

    const sections = container.querySelectorAll('.grid-cols-1.md\\:grid-cols-3 > div');
    expect(sections.length).toBe(3);
  });
});
