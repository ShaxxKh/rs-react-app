import { createSlice } from '@reduxjs/toolkit';
import { FetchPeopleResponse, PersonWithoutUrl } from '../../api/users.api';
import { RootState } from '@/app/store';

export interface PeopleState {
  currentCard: PersonWithoutUrl | null;
  isFetchPersonByIdLoading: boolean;
  results: FetchPeopleResponse['results'];
  searchTerm: string;
  isFetchPeopleLoading: boolean;
  isNextPage: boolean;
}

const initialState: PeopleState = {
  currentCard: null,
  isFetchPersonByIdLoading: false,
  results: [],
  searchTerm: '',
  isFetchPeopleLoading: false,
  isNextPage: false,
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    resetCurrentCard: (state) => {
      state.currentCard = null;
    },
    setCurrentCard: (state, action: { payload: PersonWithoutUrl }) => {
      state.currentCard = action.payload;
    },
    setIsFetchPersonByIdLoading: (state, action: { payload: boolean }) => {
      state.isFetchPersonByIdLoading = action.payload;
    },
    setResults: (
      state,
      action: { payload: FetchPeopleResponse['results'] }
    ) => {
      state.results = action.payload;
    },
    setSearchTerm: (state, action: { payload: string }) => {
      state.searchTerm = action.payload;
    },
    setIsFetchPeopleLoading: (state, action: { payload: boolean }) => {
      state.isFetchPeopleLoading = action.payload;
    },
    setIsNextPage: (state, action: { payload: boolean }) => {
      state.isNextPage = action.payload;
    },
  },
});

export const {
  resetCurrentCard,
  setCurrentCard,
  setIsFetchPersonByIdLoading,
  setResults,
  setSearchTerm,
  setIsFetchPeopleLoading,
  setIsNextPage,
} = peopleSlice.actions;

export const selectCurrentCard = (state: RootState) => state.people.currentCard;
export const selectIsFetchPersonByIdLoading = (state: RootState) =>
  state.people.isFetchPersonByIdLoading;
export const selectSearchTerm = (state: RootState) => state.people.searchTerm;
export const selectResults = (state: RootState) => state.people.results;
export const selectIsFetchPeopleLoading = (state: RootState) =>
  state.people.isFetchPeopleLoading;
export const selectIsNextPage = (state: RootState) => state.people.isNextPage;

export default peopleSlice.reducer;
