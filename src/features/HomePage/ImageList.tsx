import { View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { CatCard } from '../CatCard/CatCard';
import { useAppSelector } from '../../store/overrides';
import { getEnhancedImageList } from '../../store/selectors/getEnhancedImageList';

export const ImageList = () => {
  const memoizedImages = useAppSelector(getEnhancedImageList);

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
