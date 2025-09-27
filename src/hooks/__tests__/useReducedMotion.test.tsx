import { renderHook } from '@testing-library/react';
import { useReducedMotion } from '../useReducedMotion';

// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('useReducedMotion', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns false when user does not prefer reduced motion', () => {
    mockMatchMedia(false);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  it('returns true when user prefers reduced motion', () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it('handles server-side rendering', () => {
    // Mock window as undefined to simulate SSR
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    // Restore window
    global.window = originalWindow;
  });

  it('sets up event listeners correctly', () => {
    const mockAddEventListener = jest.fn();
    const mockRemoveEventListener = jest.fn();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      })),
    });

    const { unmount } = renderHook(() => useReducedMotion());

    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});