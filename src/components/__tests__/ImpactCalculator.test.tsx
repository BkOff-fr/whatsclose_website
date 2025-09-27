import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImpactCalculator from '../ImpactCalculator';

// Mock GSAP
jest.mock('gsap', () => ({
  to: jest.fn(),
}));

describe('ImpactCalculator', () => {
  it('renders calculator elements', () => {
    render(<ImpactCalculator />);

    expect(screen.getByText(/calculez votre impact/i)).toBeInTheDocument();
    expect(screen.getByText(/combien de ventes faites-vous par jour/i)).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ImpactCalculator />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-label', 'Curseur pour sélectionner le nombre de ventes par jour');
    expect(slider).toHaveAttribute('aria-describedby', 'sales-description');
    expect(screen.getByText(/utilisez ce curseur/i)).toHaveClass('sr-only');
  });

  it('updates values when slider changes', async () => {
    const user = userEvent.setup();
    render(<ImpactCalculator />);

    const slider = screen.getByRole('slider');

    // Change slider value
    await user.clear(slider);
    await user.type(slider, '100');

    // Check if the displayed value updates
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('displays initial values correctly', () => {
    render(<ImpactCalculator />);

    expect(screen.getByText('50')).toBeInTheDocument(); // Initial sales value
    expect(screen.getByText('8')).toBeInTheDocument(); // Initial time saved
    expect(screen.getByText('25')).toBeInTheDocument(); // Sales increase percentage
    expect(screen.getByText('1200')).toBeInTheDocument(); // Initial revenue
  });

  it('has proper slider range', () => {
    render(<ImpactCalculator />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('min', '10');
    expect(slider).toHaveAttribute('max', '200');
    expect(slider).toHaveAttribute('value', '50');
  });
});