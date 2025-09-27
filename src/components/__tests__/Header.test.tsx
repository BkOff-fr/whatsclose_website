import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

// Mock GSAP
jest.mock('gsap', () => ({
  to: jest.fn(),
  registerPlugin: jest.fn(),
}));

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: jest.fn(() => ({ kill: jest.fn() })),
  },
}));

jest.mock('gsap/ScrollToPlugin', () => ({}));

describe('Header', () => {
  it('renders navigation elements', () => {
    render(<Header />);

    expect(screen.getByRole('button', { name: /retour à l'accueil whatsclose/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pour qui/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /expérience/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Navigation principale');

    const homeButton = screen.getByRole('button', { name: /retour à l'accueil whatsclose/i });
    expect(homeButton).toHaveAttribute('aria-label', 'Retour à l\'accueil Whatsclose');
  });

  it('applies correct CSS classes', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
  });
});