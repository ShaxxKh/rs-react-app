import BadRequestError from '../common/errors/BadRequestError';
import ForbiddenError from '../common/errors/ForbiddenError';
import NotFoundError from '../common/errors/NotFoundError';

export type Person = {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
};

export type FetchPeopleResponse = {
  count: number;
  next: string;
  previous: string;
  results: Person[];
};

const fetchWithErrorHandling = async (
  url: string
): Promise<FetchPeopleResponse> => {
  const response = await fetch(url);
  const { status, ok } = response;

  if (status === 404) {
    throw new NotFoundError('Not Found');
  } else if (status === 403) {
    throw new ForbiddenError('Forbidden');
  } else if (status === 400) {
    throw new BadRequestError('Bad Request');
  } else if (!ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};

export const fetchPeople = async (
  name?: string
): Promise<FetchPeopleResponse> => {
  const url = `${process.env.API_URL}/?search=${name}`;
  const res = await fetchWithErrorHandling(url);

  return res;
};
