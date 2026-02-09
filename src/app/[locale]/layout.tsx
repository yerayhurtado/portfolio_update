import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import NeuralBackground from "@/components/NeuralBackground"; // Importación correcta

// Configuramos Inter para el texto general
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans', // Creamos una variable CSS
});

// Configuramos JetBrains Mono para toques técnicos/código
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono', // Creamos una variable CSS
});

export const metadata: Metadata = {
  title: 'Yeray Hurtado | AI Engineer',
  description: 'Portfolio de Yeray Hurtado, especialista en IA y Full Stack Developer',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) return notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground relative`}
      >
        {/* El fondo se renderiza aquí para que sea global y persistente */}
        <NeuralBackground />

        <NextIntlClientProvider messages={messages}>
          {/* El contenedor principal debe ser relativo y con un z-index superior al canvas */}
          <div className="relative z-10">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}