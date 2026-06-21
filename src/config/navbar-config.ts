import type { MenuItemConfig } from '../types';

export function getNavbarLinks(): MenuItemConfig[] {
  const links: MenuItemConfig[] = [
    {
      title: 'Random Hero',
      href: '/',
      external: false,
    },
    {
      title: 'Character Gallery',
      href: '/#gallery',
      external: false,
    },
    {
      title: 'FAQ',
      href: '/#faq',
      external: false,
    },
  ];
  return links;
}
