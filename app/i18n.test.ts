import {
    getBestMatchingLocale,
    getMessages,
    getTranslator,
    isSupportedLocale,
    supportedLocales
} from './i18n';

describe('i18n functionality', () => {
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

  it('should load messages for supported locales', async () => {
    const enMessages = await getMessages('en');
    expect(enMessages).toHaveProperty('index_download');
    expect(enMessages.index_download).toBe('Download');

    const frMessages = await getMessages('fr');
    expect(frMessages).toHaveProperty('index_download');
    expect(frMessages.index_download).toBe('Télécharger');

    const zhMessages = await getMessages('zh');
    expect(zhMessages).toHaveProperty('index_download');
    expect(zhMessages.index_download).toBe('下載');
  });

  it('should create translator with correct messages', async () => {
    const enTranslator = await getTranslator('en');
    expect(typeof enTranslator).toBe('function');

    const frTranslator = await getTranslator('fr');
    expect(typeof frTranslator).toBe('function');
  });

  it('should handle all translation keys from CSV', async () => {
    const enMessages = await getMessages('en');

    // Check that all expected keys from CSV are present
    const expectedKeys = [
      'index_download',
      'index_download_soon',
      'index_language',
      'index_video_title'
    ];

    expectedKeys.forEach(key => {
      expect(enMessages).toHaveProperty(key);
      expect(typeof enMessages[key]).toBe('string');
      expect(enMessages[key].length).toBeGreaterThan(0);
    });
  });

  it('should have consistent keys across locales', async () => {
    const enMessages = await getMessages('en');
    const frMessages = await getMessages('fr');
    const zhMessages = await getMessages('zh');

    const enKeys = Object.keys(enMessages);
    const frKeys = Object.keys(frMessages);
    const zhKeys = Object.keys(zhMessages);

    expect(enKeys.sort()).toEqual(frKeys.sort());
    expect(enKeys.sort()).toEqual(zhKeys.sort());
  });
});
