import '@testing-library/jest-dom'

// Mock GSAP
jest.mock('gsap', () => ({
  gsap: {
    timeline: jest.fn(() => ({
      fromTo: jest.fn().mockReturnThis(),
      to: jest.fn().mockReturnThis(),
      kill: jest.fn(),
    })),
    to: jest.fn(),
    fromTo: jest.fn(),
    set: jest.fn(),
    registerPlugin: jest.fn(),
    utils: {
      toArray: jest.fn(() => []),
    },
  },
  ScrollTrigger: {
    create: jest.fn(),
    getAll: jest.fn(() => []),
  },
  ScrollToPlugin: {},
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}