import { useEffect, useState } from 'react';
import { fetchPersonById, Person, PersonWithoutUrl } from '../api/users.api';
import Card from './Card';
import { Outlet, useSearchParams } from 'react-router';
import DetailedCard from './DetailedCard';
import Spinner from './Spinner/Spinner';

interface ResultsProps {
  results: Person[];
  currentPage: number;
  isNextPage: boolean;
  onPageChange: (page: number) => void;
}

export default function Results(props: ResultsProps) {
  const [currentCard, setCurrentCard] = useState<PersonWithoutUrl | null>(null);
  const [isFetchPersonByIdLoading, setIsFetchPersonByIdLoading] =
    useState(false);
  const [searchParams] = useSearchParams();
  const { results, currentPage, isNextPage, onPageChange } = props;
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      setIsFetchPersonByIdLoading(true);
      fetchPersonById(id)
        .then(({ name, birth_year, gender, eye_color, hair_color }) => {
          setCurrentCard({
            name,
            birth_year,
            gender,
            eye_color,
            hair_color,
          });
        })
        .finally(() => setIsFetchPersonByIdLoading(false));
    }
  }, [id]);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h2>Results</h2>
        <ul style={{ textAlign: 'start' }}>
          {results.map((result, index) => (
            <Card key={index} data={result} />
          ))}
        </ul>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!isNextPage}
        >
          Next
        </button>
      </div>
      <Outlet />
      {isFetchPersonByIdLoading ? (
        <Spinner />
      ) : (
        currentCard && <DetailedCard data={currentCard} />
      )}
    </div>
  );
}
