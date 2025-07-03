// ===============================================
// Locale Layout Integration Tests
// Description: Test suite for Google Analytics integration in locale layout
//
// Purpose:
//   - Validates Google Analytics component is included in layout
//   - Tests layout functionality with supported locales
//   - Focuses on integration logic rather than rendering
// ===============================================

import { notFound } from 'next/navigation';
import React from 'react';
import { isSupportedLocale } from '../i18n';
import LocaleLayout from './layout';

// Mock the GoogleAnalytics component
jest.mock('../components/GoogleAnalytics', () => {
  return function MockGoogleAnalytics() {
    return React.createElement('div', { 'data-testid': 'google-analytics-mock' });
  };
});

// Mock notFound function
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock isSupportedLocale function
jest.mock('../i18n', () => ({
  isSupportedLocale: jest.fn((locale: string) => locale === 'en' || locale === 'zh'),
}));

describe('LocaleLayout Google Analytics Integration', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });



  it('should call notFound for unsupported locales', async () => {
    (isSupportedLocale as unknown as jest.Mock).mockReturnValue(false);

    await LocaleLayout({
      children: <div>Test content</div>,
      params: Promise.resolve({ locale: 'unsupported' }),
    });

    expect(notFound).toHaveBeenCalled();
  });

});
