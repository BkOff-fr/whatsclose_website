import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileSection from '../ProfileSection';

// Mock GSAP
jest.mock('gsap', () => ({
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
  })),
  to: jest.fn(),
}));

describe('ProfileSection', () => {
  it('renders all profile tabs', () => {
    render(<ProfileSection />);

    expect(screen.getByRole('tab', { name: /commerçants/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /consommateurs/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /collectivités/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /partenaires/i })).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<ProfileSection />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-label', 'Sélection des profils utilisateur');

    const tabpanel = screen.getByRole('tabpanel');
    expect(tabpanel).toHaveAttribute('aria-live', 'polite');

    const firstTab = screen.getByRole('tab', { name: /commerçants/i });
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  it('displays commercant content by default', () => {
    render(<ProfileSection />);

    expect(screen.getByText(/grâce à whatsclose/i)).toBeInTheDocument();
    expect(screen.getByText(/marie, boulangère/i)).toBeInTheDocument();
  });

  it('switches content when different tab is clicked', async () => {
    const user = userEvent.setup();
    render(<ProfileSection />);

    const consumerTab = screen.getByRole('tab', { name: /consommateurs/i });
    await user.click(consumerTab);

    // Check if tab is selected
    expect(consumerTab).toHaveAttribute('aria-selected', 'true');

    // Check if content includes consumer-specific text
    expect(screen.getByText(/thomas, habitant/i)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<ProfileSection />);

    expect(screen.getByRole('button', { name: /calculez votre impact/i })).toBeInTheDocument();
  });

  it('has correct tab attributes', () => {
    render(<ProfileSection />);

    const commercantTab = screen.getByRole('tab', { name: /commerçants/i });
    expect(commercantTab).toHaveAttribute('aria-controls', 'profile-commercant');
    expect(commercantTab).toHaveAttribute('aria-selected', 'true');

    const consumerTab = screen.getByRole('tab', { name: /consommateurs/i });
    expect(consumerTab).toHaveAttribute('aria-controls', 'profile-consommateur');
    expect(consumerTab).toHaveAttribute('aria-selected', 'false');
  });
});