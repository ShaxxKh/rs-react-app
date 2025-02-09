import { useEffect, useState } from 'react';
import Results from '../components/Results';
import { fetchPeople, Person } from '../api/users.api';
import Controls from '../components/Controls';
// import CustomError from '../common/errors/CustomError';
import { useSearchParams } from 'react-router';
import useSearchTermFromLocalStorage from '../common/hooks/useSearchTermFromLocalStorage';

export default function SearchPage() {
  const { searchTerm, setSearchTerm } = useSearchTermFromLocalStorage();
  const [results, setResults] = useState<Person[]>([]);
  // const [error, setError] = useState<Error | null>(null);
  const [isFetchPeopleLoading, setIsFetchPeopleLoading] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  async function getPeopleAndUpdateResults(
    name?: string,
    page?: number
  ): Promise<void> {
    try {
      setIsFetchPeopleLoading(true);
      const { results, next } = await fetchPeople(name, page);

      setResults(results);
      setIsNextPage(Boolean(next));
      // setError(null);
    } catch (error) {
      if (error instanceof Error) {
        // setError(error);
      }

      throw error;
    } finally {
      setIsFetchPeopleLoading(false);
    }
  }

  // function handleErrorButtonClick() {
  //   setError(new CustomError('Error Button Clicked'));
  // }

  function handlePageChange(newPage: number) {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  }

  useEffect(() => {
    getPeopleAndUpdateResults(searchTerm, page);
  }, [page]);

  // if (error) {
  //   throw error;
  // }

  return (
    <div className="search_page">
      <Controls
        searchTerm={searchTerm}
        handleSearchClick={async () =>
          await getPeopleAndUpdateResults(searchTerm)
        }
        setSearchTerm={setSearchTerm}
      />
      <Results
        results={results}
        currentPage={page}
        isNextPage={isNextPage}
        isFetchPeopleLoading={isFetchPeopleLoading}
        onPageChange={handlePageChange}
      />
      <button>Error Button</button>
    </div>
  );
}
