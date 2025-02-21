import { Person } from '@/api/users.api';
import { setResults } from '../features/people/peopleSlice';
import { useDispatch } from 'react-redux';

export default function ErrorButton() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(setResults(undefined as Person[]));
      }}
    >
      Error Button
    </button>
  );
}
