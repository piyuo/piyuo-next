import {
    getBestMatchingLocale,
    isSupportedLocale,
    supportedLocales
} from './i18n';

describe('i18n CSV conversion results', () => {
  it('should support all converted locales', () => {
    expect(supportedLocales).toContain('en');
    expect(supportedLocales).toContain('fr');
    expect(supportedLocales).toContain('es');
    expect(supportedLocales).toContain('zh');
    expect(supportedLocales).toContain('ja');
    expect(supportedLocales.length).toBe(83);
  });

  it('should correctly identify supported locales', () => {
    expect(isSupportedLocale('en')).toBe(true);
    expect(isSupportedLocale('fr')).toBe(true);
    expect(isSupportedLocale('zh_CN')).toBe(true);
    expect(isSupportedLocale('invalid')).toBe(false);
  });

  it('should find best matching locale', () => {
    expect(getBestMatchingLocale('en')).toBe('en');
    expect(getBestMatchingLocale('en-US')).toBe('en');
    expect(getBestMatchingLocale('zh-CN')).toBe('zh_CN');
    expect(getBestMatchingLocale('invalid')).toBe('en');
  });

  // Test locale message files exist
  it('should have message files for major locales', () => {
    const fs = require('fs');
    const path = require('path');

    const majorLocales = ['en', 'fr', 'es', 'de', 'zh', 'ja', 'ko'];

    majorLocales.forEach(locale => {
      const messagePath = path.join(__dirname, `../messages/${locale}/page.json`);
      expect(fs.existsSync(messagePath)).toBe(true);
    });
  });

  // Test message file content structure
  it('should have valid JSON structure in locale files', () => {
    const fs = require('fs');
    const path = require('path');

    const enPath = path.join(__dirname, '../messages/en/page.json');
    const enContent = fs.readFileSync(enPath, 'utf-8');
    const enMessages = JSON.parse(enContent);

    expect(typeof enMessages).toBe('object');
    expect(enMessages).toHaveProperty('index_download');
    expect(typeof enMessages.index_download).toBe('string');

    const frPath = path.join(__dirname, '../messages/fr/page.json');
    const frContent = fs.readFileSync(frPath, 'utf-8');
    const frMessages = JSON.parse(frContent);

    expect(typeof frMessages).toBe('object');
    expect(frMessages).toHaveProperty('index_download');
    expect(frMessages.index_download).toBe('Télécharger');
  });
});
