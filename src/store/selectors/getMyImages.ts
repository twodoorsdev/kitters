import { ApiImage } from '../services/CatApi';
import { RootState } from '../store';

export const getMyImages = (state: RootState) =>
  (state.catsApi.queries?.['getMyImages({})']?.data ?? []) as ApiImage[];
