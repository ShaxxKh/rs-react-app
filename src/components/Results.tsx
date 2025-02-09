import { useEffect, useState } from 'react';
import { fetchPersonById, Person, PersonWithoutUrl } from '../api/users.api';
import { useSearchParams } from 'react-router';
import DetailedCard from './DetailedCard';
import Spinner from './Spinner/Spinner';
import CardList from './CardList';

interface ResultsProps {
  results: Person[];
  currentPage: number;
  isNextPage: boolean;
  isFetchPeopleLoading: boolean;
  onPageChange: (page: number) => void;
}

export default function Results(props: ResultsProps) {
  const [currentCard, setCurrentCard] = useState<PersonWithoutUrl | null>(null);
  const [isFetchPersonByIdLoading, setIsFetchPersonByIdLoading] =
    useState(false);
  const [searchParams] = useSearchParams();
  const {
    results,
    currentPage,
    isNextPage,
    isFetchPeopleLoading,
    onPageChange,
  } = props;
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
      {isFetchPeopleLoading ? (
        <Spinner />
      ) : (
        <div>
          <h2>Results</h2>
          <CardList results={results} />
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
      )}

      {isFetchPersonByIdLoading ? (
        <Spinner />
      ) : (
        currentCard && (
          <DetailedCard data={currentCard} setCurrentCard={setCurrentCard} />
        )
      )}
    </div>
  );
}
