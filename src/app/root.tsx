'use client';

import { store } from '@/appStore/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import ThemeContext, { ThemeType } from '@/context/ThemeContext';
import { useState } from 'react';
import { Provider } from 'react-redux';

export function RootClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeType>('dark');

  return (
    <Provider store={store}>
      <div className={`app ${theme}`}>
        <ErrorBoundary>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
          </ThemeContext.Provider>
        </ErrorBoundary>
      </div>
    </Provider>
  );
}
