import type { MenuItemConfig } from '../types';

export function getFooterLinks(): MenuItemConfig[] {
  return [
    {
      title: 'Tool',
      items: [
        { title: 'Random Hero', href: '/', external: false },
        { title: 'Team Generator', href: '/', external: false },
        { title: 'Challenge Generator', href: '/', external: false },
        { title: 'Character Gallery', href: '/#gallery', external: false },
      ],
    },
    {
      title: 'Legal',
      items: [
        { title: 'Cookie Policy', href: '/cookie', external: false },
        { title: 'Privacy Policy', href: '/privacy', external: false },
        { title: 'Terms of Service', href: '/terms', external: false },
      ],
    },
  ];
}
