import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import OnboardingPage from './pages/OnboardingPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import ReferenceHomePage from './pages/reference/ReferenceHomePage';
import ToolsHomePage from './pages/tools/ToolsHomePage';
import LearnPage from './pages/learn/LearnPage';

export const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'reference', element: <ReferenceHomePage /> },
      { path: 'tools', element: <ToolsHomePage /> },
      { path: 'learn', element: <LearnPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
