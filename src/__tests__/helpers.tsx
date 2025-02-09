import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

export const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};
