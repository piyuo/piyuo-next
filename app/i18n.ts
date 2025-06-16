import { createTranslator } from 'next-intl';
import en from '../messages/en/page.json';
import zh from '../messages/zh/page.json';

export const messages = { en, zh };

export function getTranslator(locale: 'en' | 'zh') {
  return createTranslator({ locale, messages: messages[locale] });
}
