import { useSelector } from 'react-redux';
import Card from './Card';
import { RootState } from '@/app/store';
import { selectResults } from '../features/people/peopleSlice';

export default function CardList() {
  const results = useSelector((state: RootState) => selectResults(state));

  return results.length > 0 ? (
    <ul style={{ textAlign: 'start' }}>
      {results.map((result, index) => (
        <Card key={index} data={result} />
      ))}
    </ul>
  ) : (
    <h2>No results found</h2>
  );
}
