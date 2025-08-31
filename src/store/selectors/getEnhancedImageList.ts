import { createSelector } from '@reduxjs/toolkit';
import { getMyFavourites } from './getMyFavourites';
import { getMyImages } from './getMyImages';
import { getMyVotes } from './getMyVotes';

export const getEnhancedImageList = createSelector(
  getMyImages,
  getMyFavourites,
  getMyVotes,
  (images, favourites, votes) =>
    images.map((image) => ({
      ...image,
      favourite: favourites.find((fav) => fav.image_id === image.id),
      votes: votes.filter((vote) => vote.image_id === image.id),
    }))
);
