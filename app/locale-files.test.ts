describe('CSV to locale conversion verification', () => {
  // Test locale message files exist
  it('should have message files for major locales', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');

    const majorLocales = ['en', 'fr', 'es', 'de', 'zh', 'ja', 'ko'];

    majorLocales.forEach(locale => {
      const messagePath = path.join(__dirname, `../messages/${locale}/page.json`);
      expect(fs.existsSync(messagePath)).toBe(true);
    });
  });

  // Test message file content structure
  it('should have valid JSON structure in locale files', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');

    const enPath = path.join(__dirname, '../messages/en/page.json');
    const enContent = fs.readFileSync(enPath, 'utf-8');
    const enMessages = JSON.parse(enContent);

    expect(typeof enMessages).toBe('object');
    expect(enMessages).toHaveProperty('index_download');
    expect(typeof enMessages.index_download).toBe('string');
    expect(enMessages.index_download).toBe('Download');

    const frPath = path.join(__dirname, '../messages/fr/page.json');
    const frContent = fs.readFileSync(frPath, 'utf-8');
    const frMessages = JSON.parse(frContent);

    expect(typeof frMessages).toBe('object');
    expect(frMessages).toHaveProperty('index_download');
    expect(frMessages.index_download).toBe('Télécharger');
  });

  // Test that all locales have the same keys
  it('should have consistent keys across all locale files', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');

    const messagesDir = path.join(__dirname, '../messages');
    const locales = fs.readdirSync(messagesDir).filter((dir: string) =>
      fs.statSync(path.join(messagesDir, dir)).isDirectory()
    );

    expect(locales.length).toBeGreaterThan(80); // Should have 83 locales

    // Get keys from English locale as reference
    const enPath = path.join(messagesDir, 'en/page.json');
    const enContent = fs.readFileSync(enPath, 'utf-8');
    const enMessages = JSON.parse(enContent);
    const enKeys = Object.keys(enMessages).sort();

    // Check a few other locales have the same keys
    const testLocales = ['fr', 'es', 'de', 'zh', 'ja'];
    testLocales.forEach(locale => {
      const localePath = path.join(messagesDir, `${locale}/page.json`);
      const content = fs.readFileSync(localePath, 'utf-8');
      const messages = JSON.parse(content);
      const keys = Object.keys(messages).sort();

      expect(keys).toEqual(enKeys);
    });
  });

  // Test that conversion included all expected keys from CSV
  it('should include all translation keys from CSV', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path');

    const enPath = path.join(__dirname, '../messages/en/page.json');
    const enContent = fs.readFileSync(enPath, 'utf-8');
    const enMessages = JSON.parse(enContent);

    // These are keys we know exist in the CSV
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
});
