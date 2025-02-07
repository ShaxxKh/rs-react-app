import { ReactNode } from 'react';
import './App.css';
import SearchPage from './pages/SearchPage';
import ErrorBoundary from './components/ErrorBoundary';

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <SearchPage />
    </ErrorBoundary>
  );
}
