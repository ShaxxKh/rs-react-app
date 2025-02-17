import { createSlice } from '@reduxjs/toolkit';
import { PersonWithoutUrl } from '../../api/users.api';
import { RootState } from '@/app/store';

export interface PeopleState {
  currentCard: PersonWithoutUrl | null;
  isFetchPersonByIdLoading: boolean;
}

const initialState: PeopleState = {
  currentCard: null,
  isFetchPersonByIdLoading: false,
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
  },
});

export const { resetCurrentCard, setCurrentCard, setIsFetchPersonByIdLoading } =
  peopleSlice.actions;

export const selectCurrentCard = (state: RootState) => state.people.currentCard;
export const selectIsFetchPersonByIdLoading = (state: RootState) =>
  state.people.isFetchPersonByIdLoading;

export default peopleSlice.reducer;
