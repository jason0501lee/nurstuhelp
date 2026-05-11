import { Outlet } from 'react-router-dom';
import { TopBar } from './layout/TopBar';
import { BottomNav } from './layout/BottomNav';

export function AppShell() {
  return (
    <div className="min-h-dvh flex flex-col bg-bg text-text">
      <TopBar />
      <main
        id="main"
        className="flex-1 mx-auto w-full max-w-app pb-24"
        role="main"
      >
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
