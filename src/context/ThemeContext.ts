import { createContext } from 'react';

export type ThemeType = 'dark' | 'light';
export type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

export default createContext<ThemeContextType>({
  theme: 'dark',
  setTheme() {},
});
