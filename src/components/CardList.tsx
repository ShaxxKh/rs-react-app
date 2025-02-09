import { Person } from '../api/users.api';
import Card from './Card';

export default function CardList(props: { results: Person[] }) {
  return props.results.length > 0 ? (
    <ul style={{ textAlign: 'start' }}>
      {props.results.map((result, index) => (
        <Card key={index} data={result} />
      ))}
    </ul>
  ) : (
    <h2>No results found</h2>
  );
}
