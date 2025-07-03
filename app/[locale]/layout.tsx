import { notFound } from "next/navigation";
import "../globals.css";
import { isSupportedLocale } from "../i18n";


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params
  const { locale } = await params;

  // Validate locale
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <>
      {children}
    </>
  );

}
