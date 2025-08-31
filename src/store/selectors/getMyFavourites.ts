import { ApiFavourite } from '../services/CatApi';
import { RootState } from '../store';

export const getMyFavourites = (state: RootState) =>
  (state.catsApi.queries?.['getMyFavourites(undefined)']?.data ??
    []) as ApiFavourite[];
