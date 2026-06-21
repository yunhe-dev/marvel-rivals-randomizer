import type { WebsiteConfig } from '../types';

/**
 * Website config for Marvel Rivals Randomizer
 */
export const websiteConfig: WebsiteConfig = {
  ui: {
    mode: {
      defaultMode: 'dark',
      enableSwitch: false,
    },
  },
  metadata: {
    name: 'Marvel Rivals Randomizer',
    title: 'Marvel Rivals Randomizer - Random Hero, Team & Challenge Generator',
    description:
      'Use this fan-made Marvel Rivals randomizer to pick a random hero, generate team comps, spin a character wheel, and create fun challenge rules.',
    images: {
      ogImage: '/og.png',
      logoLight: '/logo.png',
      logoDark: '/logo-dark.png',
    },
  },
  social: {},
  auth: {
    enable: false,
    enableGoogleLogin: false,
    enableCredentialLogin: false,
    enableDeleteAccount: false,
  },
  blog: {
    enable: false,
    paginationSize: 6,
  },
  mail: {
    enable: false,
    provider: 'cloudflare',
    fromEmail: '',
    supportEmail: '',
  },
  newsletter: {
    enable: false,
    provider: 'resend',
    autoSubscribeAfterSignUp: false,
  },
  notification: {
    enable: false,
    provider: 'discord',
  },
  storage: {
    enable: false,
    provider: 'r2',
    maxFileSize: 0,
    allowedTypes: [],
    userFilesFolder: '',
  },
  payment: {
    enable: false,
    provider: undefined,
    price: {
      plans: {} as Record<string, never>,
    },
  },
};
