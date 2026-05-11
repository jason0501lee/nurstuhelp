import { NavLink, useLocation } from 'react-router-dom';
import { BOTTOM_NAV } from '@/config/nav';
import { cn } from '@/lib/cn';

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-20 bg-surface/95 backdrop-blur border-t border-border safe-bottom"
      aria-label="主要導覽"
    >
      <ul className="mx-auto max-w-app grid grid-cols-4">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.to === '/'
              ? pathname === '/'
              : item.matchPrefix
                ? pathname.startsWith(item.matchPrefix)
                : pathname === item.to;
          return (
            <li key={item.to} className="flex">
              <NavLink
                to={item.to}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-xs',
                  isActive
                    ? 'text-primary'
                    : 'text-text-muted hover:text-text',
                )}
              >
                <Icon className="size-6" aria-hidden />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
