import { createSlice } from '@reduxjs/toolkit';
import { FetchPeopleResponse, PersonWithoutUrl } from '../../api/users.api';
import { RootState } from '@/app/store';

export type SelectedPeople = {
  [key: number]: { isSelected: boolean; data: PersonWithoutUrl };
};

export interface PeopleState {
  currentCard: PersonWithoutUrl | null;
  isFetchPersonByIdLoading: boolean;
  results: FetchPeopleResponse['results'];
  searchTerm: string;
  isFetchPeopleLoading: boolean;
  isNextPage: boolean;
  selectedPeople: SelectedPeople;
}

const initialState: PeopleState = {
  currentCard: null,
  isFetchPersonByIdLoading: false,
  results: [],
  searchTerm: '',
  isFetchPeopleLoading: false,
  isNextPage: false,
  selectedPeople: {},
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
    setSelectedPerson: (
      state,
      action: {
        payload: { id: number; isSelected: boolean; data: PersonWithoutUrl };
      }
    ) => {
      const { id, isSelected, data } = action.payload;
      state.selectedPeople[id] = {
        isSelected,
        data,
      };
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
  setSelectedPerson,
} = peopleSlice.actions;

export const selectCurrentCard = (state: RootState) => state.people.currentCard;
export const selectIsFetchPersonByIdLoading = (state: RootState) =>
  state.people.isFetchPersonByIdLoading;
export const selectSearchTerm = (state: RootState) => state.people.searchTerm;
export const selectResults = (state: RootState) => state.people.results;
export const selectIsFetchPeopleLoading = (state: RootState) =>
  state.people.isFetchPeopleLoading;
export const selectIsNextPage = (state: RootState) => state.people.isNextPage;
export const selectIsPersonSelected = (state: RootState, id: number) =>
  state.people.selectedPeople[id];

export default peopleSlice.reducer;
