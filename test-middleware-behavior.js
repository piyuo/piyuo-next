// Test script to verify current middleware behavior for non-locale paths
// This will help us understand what happens when someone visits https://piyuo.com/privacy

const { middleware } = require('./middleware.ts');
const { NextRequest } = require('next/server');

// Mock the i18n functions
jest.mock('./app/i18n', () => ({
  getBestMatchingLocale: (acceptLang) => {
    if (acceptLang.includes('zh')) return 'zh-CN';
    if (acceptLang.includes('fr')) return 'fr';
    return 'en';
  },
  normalizeLocale: () => null,
  supportedLocales: ['en', 'fr', 'zh-CN', 'ja']
}));

// Test what happens when users visit /privacy
console.log('Testing /privacy with different Accept-Language headers:');

// English user
const enRequest = new NextRequest('https://piyuo.com/privacy', {
  headers: { 'accept-language': 'en-US,en;q=0.9' }
});
const enResponse = middleware(enRequest);
console.log('English user → ', enResponse.headers.get('location'));

// Chinese user
const zhRequest = new NextRequest('https://piyuo.com/privacy', {
  headers: { 'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8' }
});
const zhResponse = middleware(zhRequest);
console.log('Chinese user → ', zhResponse.headers.get('location'));

// French user
const frRequest = new NextRequest('https://piyuo.com/privacy', {
  headers: { 'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8' }
});
const frResponse = middleware(frRequest);
console.log('French user → ', frResponse.headers.get('location'));
