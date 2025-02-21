import { ReactNode, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import SearchPage from './pages/SearchPage';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';
import ThemeContext, { ThemeType } from './context/ThemeContext';

export default function App(): ReactNode {
  const [theme, setTheme] = useState<ThemeType>('dark');

  return (
    <div className={`app ${theme}`}>
      <ErrorBoundary>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </ErrorBoundary>
    </div>
  );
}
