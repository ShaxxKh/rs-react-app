import { Link, useSearchParams } from 'react-router';
import { Person } from '../api/users.api';

export default function Card(props: { data: Person }) {
  const [searchParams] = useSearchParams();
  const { name, birth_year, gender, url } = props.data;
  const urlSplitted = url.split('/');
  const id = urlSplitted[urlSplitted.length - 2];
  searchParams.set('id', id);

  return (
    <li>
      <Link to={{ search: searchParams.toString() }}>
        {name} - {birth_year} - {gender}
      </Link>
    </li>
  );
}
