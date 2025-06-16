"use client";
import { useState } from "react";
import { getTranslator } from "./i18n";

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  // Use a type-safe translator function
  const t = getTranslator(lang) as (key: 'title' | 'description' | 'switchLang') => string;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">{t('title')}</h1>
        <p className="text-lg mb-8 max-w-xl text-center sm:text-left">{t('description')}</p>
        <button
          className="rounded border px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm mb-8"
          onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
        >
          {t('switchLang')}
        </button>
      </main>
    </div>
  );
}
