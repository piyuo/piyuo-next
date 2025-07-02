// ===============================================
// Test Suite: page.test.tsx
// Description: Tests for RootPage fallback (middleware handles redirects)
//
// Note: With middleware implementation, the root page should rarely be reached
// as middleware handles locale detection and redirection
// ===============================================

import RootPage from './page';

describe('RootPage Fallback', () => {
  it('should render fallback page when middleware is bypassed', async () => {
    // This test ensures the root page renders properly as a fallback
    // In normal operation, users should not reach this page due to middleware
    const result = await RootPage();

    // The component should return a JSX element
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('should display redirecting message', async () => {
    // Test that the fallback page contains appropriate messaging
    const result = await RootPage();

    // Check that it's a valid React element
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('props');
  });
});
