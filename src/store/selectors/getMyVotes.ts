import { ApiVote } from '../services/CatApi';
import { RootState } from '../store';

export const getMyVotes = (state: RootState) =>
  (state.catsApi.queries?.['getMyVotes(undefined)']?.data ?? []) as ApiVote[];
