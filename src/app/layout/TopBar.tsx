import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { DISCLAIMERS } from '@/features/safety/copy';

export function TopBar() {
  const ribbon = DISCLAIMERS['DISC-APP-FOOTER'].ribbon;

  return (
    <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-app h-14 px-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline flex items-center gap-2 text-base font-semibold tracking-tight text-primary"
          aria-label="NurStuHelp 首頁"
        >
          NurStuHelp
          {ribbon && (
            <span className="text-[11px] font-normal text-warn bg-warn-soft border border-warn/30 rounded-full px-2 py-0.5">
              {ribbon}
            </span>
          )}
        </Link>
        <Link
          to="/settings"
          aria-label="設定"
          className="inline -mr-2 p-2 rounded-btn text-text-muted hover:text-text hover:bg-bg"
        >
          <Settings className="size-5" />
        </Link>
      </div>
    </header>
  );
}
