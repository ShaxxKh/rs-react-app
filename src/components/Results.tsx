import { Person } from '../api/users.api';

interface ResultsProps {
  results: Person[];
}

export default function Results(props: ResultsProps) {
  const { results } = props;

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
