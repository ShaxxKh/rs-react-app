import { Link, useSearchParams } from 'react-router';
import { Person } from '../api/users.api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import {
  selectIsPersonSelected,
  setSelectedPerson,
  unselectPerson,
} from '../features/people/peopleSlice';
import Checkbox from './Checkbox';

export default function Card(props: { data: Person }) {
  const [searchParams] = useSearchParams();
  const [cardId, setCardId] = useState(null);
  const dispatch = useDispatch();
  const { name, birth_year, gender, hair_color, eye_color, url } = props.data;
  const person = useSelector((state: RootState) =>
    selectIsPersonSelected(state, Number(cardId))
  );

  useEffect(() => {
    const urlSplitted = url.split('/');
    const id = urlSplitted[urlSplitted.length - 2];
    searchParams.set('id', id);
    setCardId(Number(id));
  }, [searchParams, url]);

  const handleOnCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      dispatch(
        setSelectedPerson({
          id: cardId,
          isSelected: event.target.checked,
          data: { name, birth_year, gender, hair_color, eye_color },
        })
      );
    } else {
      dispatch(unselectPerson({ id: cardId }));
    }
  };

  return (
    <li>
      <Checkbox
        isChecked={person?.isSelected}
        handleOnCheckboxChange={handleOnCheckboxChange}
      />
      <Link to={{ search: searchParams.toString() }}>
        {name} - {birth_year} - {gender}
      </Link>
    </li>
  );
}
