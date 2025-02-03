import { Component } from 'react';
import { Person } from '../api/users.api';

interface ResultsProps {
  results: Person[];
}

class Results extends Component<ResultsProps> {
  render() {
    const { results } = this.props;

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
