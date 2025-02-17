import { useEffect } from 'react';
import Results from '../components/Results';
import { useGetPeopleQuery } from '../api/users.api';
import Controls from '../components/Controls';
// import CustomError from '../common/errors/CustomError';
import { useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchTerm,
  setIsFetchPeopleLoading,
  setIsNextPage,
  setResults,
} from '../features/people/peopleSlice';
import { RootState } from '@/app/store';

export default function SearchPage() {
  // const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => selectSearchTerm(state));
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isFetching } = useGetPeopleQuery({
    search: searchTerm,
    page: currentPage,
  });

  useEffect(() => {
    if (data?.results) {
      const { results, next } = data;
      dispatch(setResults(results));
      dispatch(setIsNextPage(Boolean(next)));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setIsFetchPeopleLoading(isLoading || isFetching));
  }, [isLoading, isFetching, dispatch]);

  // function handleErrorButtonClick() {
  //   setError(new CustomError('Error Button Clicked'));
  // }

  // if (error) {
  //   throw error;
  // }

  return (
    <div className="search_page">
      <Controls />
      <Results />
      <button>Error Button</button>
    </div>
  );
}
