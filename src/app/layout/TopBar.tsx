import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 bg-surface/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-app h-14 px-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline text-base font-semibold tracking-tight text-primary"
          aria-label="NurStuHelp 首頁"
        >
          NurStuHelp
          <span className="ml-2 text-xs font-normal text-text-muted">
            護理實習助手
          </span>
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
