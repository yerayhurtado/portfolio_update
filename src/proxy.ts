import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

// 1. Creamos la instancia del middleware de next-intl
const intlMiddleware = createMiddleware(routing);

// 2. Exportamos explícitamente la función con el nombre 'proxy'
// Next.js 16 busca esto específicamente.
export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

// 3. Configuración del Matcher (¡Corregida!)
// Es vital usar este matcher para evitar el error 404 que tenías antes con los CSS/JS.
export const config = {
  matcher: [
    // Coincide con todo EXCEPTO archivos internos de Next.js, API y estáticos
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};