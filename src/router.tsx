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
import AssessmentHomePage from './pages/reference/AssessmentHomePage';
import AssessmentListPage from './pages/reference/AssessmentListPage';
import ToolsHomePage from './pages/tools/ToolsHomePage';
import MedicationCheckPage from './pages/tools/MedicationCheckPage';
import ISBARPage from './pages/tools/ISBARPage';
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
      // Assessment routes come BEFORE the generic :typeSlug catch-all so the
      // 3-level URL (assessment / domain / slug) wins over the 2-level pattern.
      { path: 'reference/assessment', element: <AssessmentHomePage /> },
      { path: 'reference/assessment/:domain', element: <AssessmentListPage /> },
      { path: 'reference/assessment/:domain/:slug', element: <CardDetailPage /> },
      { path: 'reference/:typeSlug', element: <CardListPage /> },
      { path: 'reference/:typeSlug/:slug', element: <CardDetailPage /> },

      { path: 'tools', element: <ToolsHomePage /> },
      { path: 'tools/medcheck', element: <MedicationCheckPage /> },
      { path: 'tools/isbar', element: <ISBARPage /> },

      { path: 'learn', element: <LearnPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
