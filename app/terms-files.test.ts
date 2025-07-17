// ===============================================
// Test Suite: terms-files.test.ts
// Description: Tests to verify all supported locales have correct terms.json files
//
// Test Groups:
//   - Setup and Imports
//   - Terms JSON Structure Tests
//   - Missing Keys Detection
//   - Specific Locale Validation
// ===============================================

import { promises as fs } from 'fs';
import path from 'path';

describe('Terms JSON Files Validation', () => {
  const messagesDir = path.join(process.cwd(), 'public', 'messages');

  test('en-GB and en-IN should have all required keys from en terms.json', async () => {
    // Get reference keys from the English locale
    const enTermsPath = path.join(messagesDir, 'en', 'terms.json');
    const enContent = await fs.readFile(enTermsPath, 'utf-8');
    const enKeys = Object.keys(JSON.parse(enContent));

    const problematicLocales = ['en-GB', 'en-IN'];
    const localesWithMissingKeys: string[] = [];

    for (const locale of problematicLocales) {
      const localeTermsPath = path.join(messagesDir, locale, 'terms.json');

      try {
        const localeContent = await fs.readFile(localeTermsPath, 'utf-8');
        const localeKeys = Object.keys(JSON.parse(localeContent));

        // Check if all English keys exist in this locale
        const missingKeys = enKeys.filter(key => !localeKeys.includes(key));
        if (missingKeys.length > 0) {
          localesWithMissingKeys.push(`${locale}: missing keys [${missingKeys.join(', ')}]`);
        }
      } catch {
        // File doesn't exist or is invalid JSON
        localesWithMissingKeys.push(`${locale}: file missing or invalid JSON`);
      }
    }

    if (localesWithMissingKeys.length > 0) {
      throw new Error(`Locales with missing keys in terms.json:\n${localesWithMissingKeys.join('\n')}`);
    }

    expect(localesWithMissingKeys).toHaveLength(0);
  });

  test('terms.json files should have proper JSON structure', async () => {
    const testLocales = ['en', 'en-GB', 'en-IN'];

    for (const locale of testLocales) {
      const localeTermsPath = path.join(messagesDir, locale, 'terms.json');

      try {
        const localeContent = await fs.readFile(localeTermsPath, 'utf-8');
        const parsedContent = JSON.parse(localeContent);

        expect(typeof parsedContent).toBe('object');
        expect(parsedContent).toHaveProperty('terms_title');
        expect(parsedContent).toHaveProperty('terms_effective_date');
        expect(parsedContent).toHaveProperty('terms_acceptance_title');
        expect(parsedContent).toHaveProperty('website_url');
        expect(parsedContent).toHaveProperty('contact_email');
        expect(parsedContent).toHaveProperty('privacy_link');
      } catch (error) {
        throw new Error(`Failed to parse or validate terms.json for locale ${locale}: ${error}`);
      }
    }
  });
});
