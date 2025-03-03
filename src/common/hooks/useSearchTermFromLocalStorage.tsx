import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../features/people/peopleSlice';

export default function useSearchTermToLocalStorage() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTermToLocalState] = useState('');

  useEffect(() => {
    const searchTermFromLS = String(localStorage.getItem('searchTerm'));
    setSearchTermToLocalState(searchTermFromLS);
    dispatch(setSearchTerm(searchTermFromLS));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  return { searchTerm, setSearchTermToLocalState };
}
