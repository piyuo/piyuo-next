// ===============================================
// Google Analytics Component Tests
// Description: Test suite for Google Analytics integration using @next/third-parties
//
// Purpose:
//   - Validates Google Analytics integration with @next/third-parties
//   - Tests environment variable handling
//   - Ensures proper component rendering
// ===============================================

import { render } from '@testing-library/react';
import GoogleAnalytics from './GoogleAnalytics';

// Mock @next/third-parties/google
jest.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: jest.fn(({ gaId }: { gaId: string }) => (
    <div data-testid="google-analytics" data-ga-id={gaId} />
  )),
}));

describe('GoogleAnalytics Component', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should not render when GA_MEASUREMENT_ID is not set', () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

    const { container } = render(<GoogleAnalytics />);

    expect(container.firstChild).toBeNull();
  });

  it('should not render when GA_MEASUREMENT_ID is empty', () => {
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = '';

    const { container } = render(<GoogleAnalytics />);

    expect(container.firstChild).toBeNull();
  });

  it('should render GoogleAnalytics component when GA_MEASUREMENT_ID is provided', () => {
    const measurementId = 'G-XXXXXXXXXX';
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = measurementId;

    const { getByTestId } = render(<GoogleAnalytics />);

    const analyticsComponent = getByTestId('google-analytics');
    expect(analyticsComponent).toBeInTheDocument();
    expect(analyticsComponent).toHaveAttribute('data-ga-id', measurementId);
  });

  it('should pass the correct GA ID to the GoogleAnalytics component', () => {
    const measurementId = 'G-TEST123456';
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = measurementId;

    const { getByTestId } = render(<GoogleAnalytics />);

    const analyticsComponent = getByTestId('google-analytics');
    expect(analyticsComponent).toHaveAttribute('data-ga-id', measurementId);
  });

  it('should handle special characters in measurement ID', () => {
    const measurementId = 'G-ABC-123_DEF';
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = measurementId;

    const { getByTestId } = render(<GoogleAnalytics />);

    const analyticsComponent = getByTestId('google-analytics');
    expect(analyticsComponent).toHaveAttribute('data-ga-id', measurementId);
  });

  it('should handle the provided GA ID correctly', () => {
    const measurementId = 'G-HZZ3PMK1HC';
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = measurementId;

    const { getByTestId } = render(<GoogleAnalytics />);

    const analyticsComponent = getByTestId('google-analytics');
    expect(analyticsComponent).toHaveAttribute('data-ga-id', measurementId);
  });
});
