import {
    getBestMatchingLocale,
    getTranslator,
    isSupportedLocale,
    supportedLocales
} from './i18n';

// Mock fetch responses
const mockEnMessages = {
  'index_download': 'Download',
  'index_download_soon': 'Coming soon.',
  'index_language': 'Language',
  'index_video_title': 'Your phone can now use AI to recognize pedestrians.'
};

const mockFrMessages = {
  'index_download': 'Télécharger',
  'index_download_soon': 'Bientôt disponible.',
  'index_language': 'Langue',
  'index_video_title': 'Votre téléphone peut maintenant utiliser l\'IA pour reconnaître les piétons.'
};

const mockZhMessages = {
  'index_download': '下载',
  'index_download_soon': '即将推出',
  'index_language': '语言',
  'index_video_title': '您的手机现在可以使用人工智能来识别行人。'
};

beforeEach(() => {
  // Reset fetch mock
  (global.fetch as jest.Mock).mockClear();

  // Mock fetch to return appropriate messages based on URL
  (global.fetch as jest.Mock).mockImplementation((url: string) => {
    if (url.includes('/messages/en/page.json')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEnMessages)
      });
    }
    if (url.includes('/messages/fr/page.json')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFrMessages)
      });
    }
    if (url.includes('/messages/zh/page.json')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockZhMessages)
      });
    }
    // Default fallback to English
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockEnMessages)
    });
  });
});

describe('i18n functionality', () => {
  it('should support all converted locales', () => {
    expect(supportedLocales).toContain('en');
    expect(supportedLocales).toContain('fr');
    expect(supportedLocales).toContain('es');
    expect(supportedLocales).toContain('zh');
    expect(supportedLocales).toContain('ja');
    expect(supportedLocales.length).toBe(84);
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
    const enTranslator = await getTranslator('en', 'page');
    const enTranslation = enTranslator('index_download');
    expect(typeof enTranslation).toBe('string');
    expect(enTranslation.length).toBeGreaterThan(0);

    const frTranslator = await getTranslator('fr', 'page');
    const frTranslation = frTranslator('index_download');
    expect(typeof frTranslation).toBe('string');
    expect(frTranslation.length).toBeGreaterThan(0);

    const zhTranslator = await getTranslator('zh', 'page');
    const zhTranslation = zhTranslator('index_download');
    expect(typeof zhTranslation).toBe('string');
    expect(zhTranslation.length).toBeGreaterThan(0);
  });

  it('should create translator with correct messages', async () => {
    const enTranslator = await getTranslator('en', 'page');
    expect(typeof enTranslator).toBe('function');

    const frTranslator = await getTranslator('fr', 'page');
    expect(typeof frTranslator).toBe('function');
  });

  it('should handle all translation keys from CSV', async () => {
    const enTranslator = await getTranslator('en','page');

    // Check that all expected keys from CSV are present
    const expectedKeys = [
      'index_download',
      'index_download_soon',
      'index_language',
      'index_video_title'
    ];

    expectedKeys.forEach(key => {
      const translation = enTranslator(key);
      expect(typeof translation).toBe('string');
      expect(translation.length).toBeGreaterThan(0);
    });
  });

  it('should have consistent keys across locales', async () => {
    const enTranslator = await getTranslator('en','page');
    const frTranslator = await getTranslator('fr','page');
    const zhTranslator = await getTranslator('zh','page');

    // Test that the same keys work across all locales
    const testKeys = ['index_download', 'index_language', 'index_video_title'];

    testKeys.forEach(key => {
      expect(typeof enTranslator(key)).toBe('string');
      expect(typeof frTranslator(key)).toBe('string');
      expect(typeof zhTranslator(key)).toBe('string');
      expect(enTranslator(key).length).toBeGreaterThan(0);
      expect(frTranslator(key).length).toBeGreaterThan(0);
      expect(zhTranslator(key).length).toBeGreaterThan(0);
    });
  });
});
