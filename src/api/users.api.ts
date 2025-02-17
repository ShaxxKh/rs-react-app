import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BadRequestError from '../common/errors/BadRequestError';
import ForbiddenError from '../common/errors/ForbiddenError';
import NotFoundError from '../common/errors/NotFoundError';

export type Person = {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  url: string;
};

export type PersonWithoutUrl = Omit<Person, 'url'>;

export type FetchPeopleResponse = {
  count: number;
  next: string;
  previous: string;
  results: Person[];
};

const fetchWithErrorHandling = async <T>(url: string): Promise<T> => {
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

const API_URL = 'https://swapi.dev/api/people';

export const fetchPeople = async (
  name?: string,
  page?: number
): Promise<FetchPeopleResponse> => {
  const params = new URLSearchParams();
  params.set('search', name ?? '');
  params.set('page', String(page ?? ''));

  const url = `${API_URL}/?${params.toString()}`;
  const res = await fetchWithErrorHandling<FetchPeopleResponse>(url);

  return res;
};

export const fetchPersonById = async (
  id: string
): Promise<PersonWithoutUrl> => {
  const url = `${API_URL}/${id}`;
  const res = await fetchWithErrorHandling<PersonWithoutUrl>(url);

  return res;
};

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPeople: builder.query<
      FetchPeopleResponse,
      { search?: string; page?: number }
    >({
      query: ({ search, page }) => ({
        url: '/',
        params: { search, page },
      }),
    }),
    getPersonById: builder.query<PersonWithoutUrl, string>({
      query: (id: string) => `/${id}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonByIdQuery } = peopleApi;
