import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router';
import { ThemeProvider } from '@/components/theme/theme-provider';
import Navbar from '@/components/layout/navbar';
import Container from '@/components/layout/container';
import { DefaultNotFound } from '@/components/layout/default-not-found';
import { Toaster } from '@/components/shared/toaster';
import { websiteConfig } from '@/config/website';
import appCss from '../styles.css?url';
import { DefaultCatchBoundary } from '@/components/layout/default-catch-boundary';
import { getCanonicalUrl, getOgImage } from '@/lib/urls';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Link } from '@tanstack/react-router';
import { lazy } from 'react';

const DevTools = import.meta.env.DEV
  ? lazy(() => import('@/integrations/devtools'))
  : () => null;

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => {
    const ogImage = getOgImage();
    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: websiteConfig.metadata?.title },
        { name: 'description', content: websiteConfig.metadata?.description },
        { name: 'theme-color', content: '#09090b' },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:site_name',
          content: websiteConfig.metadata?.name ?? '',
        },
        { property: 'og:title', content: websiteConfig.metadata?.title ?? '' },
        {
          property: 'og:description',
          content: websiteConfig.metadata?.description ?? '',
        },
        { property: 'og:url', content: getCanonicalUrl('/') },
        ...(ogImage ? [{ property: 'og:image', content: ogImage }] : []),
        { name: 'twitter:title', content: websiteConfig.metadata?.title ?? '' },
        {
          name: 'twitter:description',
          content: websiteConfig.metadata?.description ?? '',
        },
        ...(ogImage
          ? [
              { name: 'twitter:card', content: 'summary_large_image' as const },
              { name: 'twitter:image', content: ogImage },
            ]
          : []),
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
    };
  },
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: DefaultNotFound,
  errorComponent: DefaultCatchBoundary,
});

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname }) ?? '';
  const matches = useRouterState({ select: (s) => s.matches }) ?? [];
  const isNotFound = pathname !== '/' && pathname !== '' && matches.length <= 1;

  if (isNotFound) {
    return (
      <div className="flex min-h-screen flex-col">
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar scroll />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
      <Container>
        <p className="font-bold text-white/60 mb-2">🎲 RivalsRandomizer</p>
        <p>Fan-made Marvel Rivals tool — random hero picker, team generator & challenge creator.</p>
        <p className="mt-1">Not affiliated with Marvel or NetEase Games.</p>
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <Link to="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
          <Link to="/cookie" className="hover:text-white/60 transition-colors">Cookie Policy</Link>
        </div>
      </Container>
    </footer>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster richColors position="top-right" offset={64} />
          </TooltipProvider>
        </ThemeProvider>
        <DevTools />
        <Scripts />
      </body>
    </html>
  );
}
