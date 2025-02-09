// types/testing-library.d.ts
import '@testing-library/jest-dom';

declare module '@testing-library/jest-dom' {
  export interface Matchers<R> {
    toBeInTheDocument(): R;
    // Add other custom matchers if needed
  }
}
