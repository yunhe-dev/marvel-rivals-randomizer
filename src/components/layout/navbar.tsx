import { getNavbarLinks } from '@/config/navbar-config';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import Container from '@/components/layout/container';
import { Link } from '@tanstack/react-router';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { useState } from 'react';

interface NavbarProps {
  scroll?: boolean;
}

export default function Navbar({ scroll }: NavbarProps) {
  const scrolled = useScroll(scroll ? 15 : undefined);
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = getNavbarLinks();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-200',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-border/50'
          : 'bg-background border-transparent',
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            🎲 RivalsRandomizer
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.title}
                to={link.href ?? '/'}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.title}
                to={link.href ?? '/'}
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
