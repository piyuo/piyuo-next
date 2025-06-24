"use client";
import { useEffect, useState } from "react";
import { getTranslator } from "./i18n";

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const [t, setT] = useState<((key: string) => string) | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslator = async () => {
      setIsLoading(true);
      try {
        const translator = await getTranslator(lang);
        setT(() => translator);
      } catch (error) {
        console.error('Failed to load translator:', error);
        // Fallback function
        setT(() => (key: string) => key);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslator();
  }, [lang]);

  if (isLoading || !t) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="text-lg">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">{t('index_video_title')}</h1>
        <p className="text-lg mb-8 max-w-xl text-center sm:text-left">{t('app_desc')}</p>
        <button
          className="rounded border px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm mb-8"
          onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
        >
          {t('index_language')}: {lang === 'en' ? 'English' : '中文'}
        </button>
      </main>
    </div>
  );
}
