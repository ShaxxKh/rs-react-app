import { Component, ReactNode } from 'react';
import './App.css';
import SearchPage from './pages/SearchPage';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    );
  }
}

export default App;
