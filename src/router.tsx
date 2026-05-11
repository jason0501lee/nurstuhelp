import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { OnboardingGate } from './app/providers/OnboardingGate';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import OnboardingPage from './pages/OnboardingPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import ReferenceHomePage from './pages/reference/ReferenceHomePage';
import CardListPage from './pages/reference/CardListPage';
import CardDetailPage from './pages/reference/CardDetailPage';
import ToolsHomePage from './pages/tools/ToolsHomePage';
import LearnPage from './pages/learn/LearnPage';

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/',
    element: (
      <OnboardingGate>
        <AppShell />
      </OnboardingGate>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },

      { path: 'reference', element: <ReferenceHomePage /> },
      { path: 'reference/:typeSlug', element: <CardListPage /> },
      { path: 'reference/:typeSlug/:slug', element: <CardDetailPage /> },

      { path: 'tools', element: <ToolsHomePage /> },

      { path: 'learn', element: <LearnPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
