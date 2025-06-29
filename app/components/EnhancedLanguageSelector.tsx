/**
 * Table of Contents
 * - Enhanced Language Selector Component
 * - Dynamic language loading from messages folder
 * - URL redirection with router.push for full navigation
 * - Dropdown interface with native language names
 * - Current language indication with check mark
 */

"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { SupportedLocale } from '../i18n';
import { getAvailableLanguages, getLanguageDisplayName } from '../utils/language-utils';

interface EnhancedLanguageSelectorProps {
  currentLocale: string;
  languageLabel: string;
}

export function EnhancedLanguageSelector({ currentLocale, languageLabel }: EnhancedLanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState<SupportedLocale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Load available languages on component mount
  useEffect(() => {
    async function loadLanguages() {
      try {
        setIsLoading(true);
        const languages = await getAvailableLanguages();
        setAvailableLanguages(languages);
      } catch (error) {
        console.error('Failed to load available languages:', error);
        // Fallback to some common languages if loading fails
        setAvailableLanguages(['en', 'zh'] as SupportedLocale[]);
      } finally {
        setIsLoading(false);
      }
    }

    loadLanguages();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (languageCode: SupportedLocale) => {
    // Construct new URL by replacing the current locale with the selected one
    const segments = pathname.split('/');

    // Remove empty first segment and current locale
    const pathSegments = segments.slice(2); // Remove ['', 'currentLocale']

    // Construct new path with selected language
    const newPath = `/${languageCode}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;

    // Use router.push for full navigation to trigger ISR page fetch
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors p-1"
        disabled={isLoading}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">{languageLabel}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-center text-gray-500">
              Loading languages...
            </div>
          ) : availableLanguages.length === 0 ? (
            <div className="px-4 py-3 text-center text-gray-500">
              No languages available
            </div>
          ) : (
            availableLanguages.map((languageCode) => (
              <button
                key={languageCode}
                onClick={() => handleLanguageSelect(languageCode)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3"
              >
                {/* Check icon */}
                <div className="w-6 flex justify-center">
                  {languageCode === currentLocale && (
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Language info */}
                <div className="flex-1">
                  <div className="text-gray-900 font-medium">
                    {getLanguageDisplayName(languageCode)}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
