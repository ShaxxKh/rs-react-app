import { Person } from '../api/users.api';
import Card from './Card';

export default function CardList(props: { results: Person[] }) {
  return (
    <ul style={{ textAlign: 'start' }}>
      {props.results.map((result, index) => (
        <Card key={index} data={result} />
      ))}
    </ul>
  );
}
