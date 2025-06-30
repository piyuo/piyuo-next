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

  it('should include GoogleAnalytics component in the layout', async () => {
    const result = await LocaleLayout({
      children: <div>Test content</div>,
      params: Promise.resolve({ locale: 'en' }),
    });

    // Check that the layout structure includes Google Analytics
    expect(result.type).toBe('html');
    expect(result.props.lang).toBe('en');

    // Check body content includes both children and GoogleAnalytics
    const bodyContent = result.props.children.props.children;
    expect(Array.isArray(bodyContent)).toBe(true);
    expect(bodyContent).toHaveLength(2);

    // First element should be the children
    expect(bodyContent[0]).toEqual(<div>Test content</div>);

    // Second element should be GoogleAnalytics component
    expect(bodyContent[1].type.name).toBe('MockGoogleAnalytics');
  });

  it('should work with supported locales', async () => {
    const enResult = await LocaleLayout({
      children: <div>English content</div>,
      params: Promise.resolve({ locale: 'en' }),
    });

    const zhResult = await LocaleLayout({
      children: <div>Chinese content</div>,
      params: Promise.resolve({ locale: 'zh' }),
    });

    expect(enResult.props.lang).toBe('en');
    expect(zhResult.props.lang).toBe('zh');

    // Both should include GoogleAnalytics
    expect(enResult.props.children.props.children[1].type.name).toBe('MockGoogleAnalytics');
    expect(zhResult.props.children.props.children[1].type.name).toBe('MockGoogleAnalytics');
  });

  it('should call notFound for unsupported locales', async () => {
    (isSupportedLocale as unknown as jest.Mock).mockReturnValue(false);

    await LocaleLayout({
      children: <div>Test content</div>,
      params: Promise.resolve({ locale: 'unsupported' }),
    });

    expect(notFound).toHaveBeenCalled();
  });

  it('should pass correct className to body', async () => {
    const result = await LocaleLayout({
      children: <div>Test content</div>,
      params: Promise.resolve({ locale: 'en' }),
    });

    const bodyElement = result.props.children;
    expect(bodyElement.props.className).toContain('antialiased');
  });
});
