import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import SearchPage from './pages/SearchPage';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
