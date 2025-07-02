import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getBestMatchingLocale } from './i18n';

// Root page that handles locale detection and redirection
// Uses server-side redirection for better SEO and performance with ISR
export default async function RootPage() {
  // Get headers to detect user's preferred language
  const headersList = await headers();
	const acceptLanguage = headersList.get('accept-language') || 'en';
	console.log('Accept-Language:', acceptLanguage);

  // Detect best matching locale
  const bestLocale = getBestMatchingLocale(acceptLanguage);

  // Server-side redirect to the best matching locale
  redirect(`/${bestLocale}/`);

}