import '../index.css';
import { store } from '@/appStore/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import ThemeContext, { ThemeType } from '@/context/ThemeContext';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ThemeType>('dark');

  return (
    <Provider store={store}>
      <div className={`app ${theme}`}>
        <ErrorBoundary>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <Component {...pageProps} />
          </ThemeContext.Provider>
        </ErrorBoundary>
      </div>
    </Provider>
  );
}
