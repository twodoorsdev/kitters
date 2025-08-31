import { useCallback } from 'react';
import { IconButton } from '../../components/IconButton';
import {
  useFavouriteImageMutation,
  useUnfavouriteImageMutation,
} from '../../store/services/CatApi';
import { CardProps } from './shared';

const getTestId = (isFavourite: boolean, id: string) =>
  `Card.Button<${isFavourite ? 'Unfavourite' : 'Favourite'}>.${id}`;

export const FavouriteButton = ({ item }: CardProps) => {
  const [favouriteMutationFn, { isLoading: isFavouriteLoading }] =
    useFavouriteImageMutation();
  const [unfavouriteMutationFn, { isLoading: isUnfavouriteLoading }] =
    useUnfavouriteImageMutation();
  const handleFavourite = useCallback(() => {
    item.favourite
      ? unfavouriteMutationFn(item.favourite.id)
      : favouriteMutationFn(item.id);
  }, [favouriteMutationFn, item, unfavouriteMutationFn]);

  const isLoading = isFavouriteLoading || isUnfavouriteLoading;

  return (
    <IconButton
      testID={getTestId(Boolean(item.favourite), item.id)}
      rounded
      disabled={isLoading}
      iconProps={{
        name: 'heart',
        size: 24,
        color: 'red',
      }}
      activeIconProps={{
        name: 'heart-fill',
        size: 24,
        color: 'red',
      }}
      onPress={handleFavourite}
    />
  );
};
