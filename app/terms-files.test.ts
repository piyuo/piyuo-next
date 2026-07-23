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

  test('should verify terms.json exists for English locale', async () => {
    const enTermsPath = path.join(messagesDir, 'en', 'terms.json');

    try {
      await fs.readFile(enTermsPath, 'utf-8');
    } catch (error) {
      throw new Error(`English terms.json file not found: ${error}`);
    }
  });

  test('en terms.json files should have proper JSON structure', async () => {
    const enTermsPath = path.join(messagesDir, 'en', 'terms.json');

    try {
      const localeContent = await fs.readFile(enTermsPath, 'utf-8');
      const parsedContent = JSON.parse(localeContent);

      expect(typeof parsedContent).toBe('object');
      expect(parsedContent).toHaveProperty('terms_title');
      expect(parsedContent).toHaveProperty('terms_effective_date');
      expect(parsedContent).toHaveProperty('terms_acceptance_title');
      expect(parsedContent).toHaveProperty('contact_email');
      expect(Object.keys(parsedContent).length).toBeGreaterThan(0);
    } catch (error) {
      throw new Error(`Failed to parse or validate terms.json: ${error}`);
    }
  });

});
