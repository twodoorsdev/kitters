import { ApiFavourite, ApiImage, ApiVote } from '../../store/services/CatApi';

export type CardProps = {
  item: ApiImage & { favourite?: ApiFavourite; votes?: ApiVote[] };
};
