import { View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { CatCard } from '../CatCard/CatCard';
import { useGetMyImagesQuery, useGetMyFavouritesQuery, useGetMyVotesQuery } from '../../services/CatApi';
import { useMemo } from 'react';

export const ImageList = () => {
  const { data: images = [] } = useGetMyImagesQuery();
  const { data: favourites = [] } = useGetMyFavouritesQuery();
  const { data: votes = [] } = useGetMyVotesQuery();

  const memoizedImages = useMemo(() => 
    images.map((image) => ({
      ...image,
      favourite: favourites.find((fav) => fav.image_id === image.id),
      votes: votes.filter((vote) => vote.image_id === image.id),
    })),
    [images, favourites, votes]
  );

  return (
    <View style={styles.root}>
      <Animated.FlatList
        testID={`List<CatCard>`}
        // style={styles.list}
        itemLayoutAnimation={LinearTransition}
        contentContainerStyle={styles.list}
        data={memoizedImages}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CatCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  root: {
    width: theme.space.full,
    height: theme.space.full,
  },
  list: {
    paddingTop: theme.space.$2,
    // paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom + 160,
    paddingHorizontal: theme.space.$2,
    rowGap: theme.space.$2,
  },
}));
