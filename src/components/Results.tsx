import { Component } from 'react';
import { Person } from '../api/users.api';
import Fallback from './Fallback';

interface ResultsProps {
  results: Person[];
  error: Error | null;
}

class Results extends Component<ResultsProps> {
  render() {
    const { results, error } = this.props;

    if (error) {
      return <Fallback error={error} />;
    }

    return (
      <div>
        <h2>Results</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {result.name} - {result.birth_year} - {result.gender}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Results;
