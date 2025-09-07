import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { match, P } from 'ts-pattern';
import { ActivityIndicator } from '../components/ActivityIndicator';

import { UploadButton } from '../components/UploadButton';
import { CatCardSkeleton } from '../features/CatCard/CatCardSkeleton';
import { ImageList } from '../features/HomePage/ImageList';
import { ImageListWrapper } from '../features/HomePage/ImageListWrapper';
import { NoImagesFound } from '../features/HomePage/NoImagesFound';
import { UploadImageSheet } from '../features/UploadImageModal/UploadImageSheet';
import { useAppSelector } from '../store/overrides';
import { getIsImageUploading } from '../store/selectors/getIsImageUploading';
import {
  useGetMyFavouritesQuery,
  useGetMyImagesQuery,
  useGetMyVotesQuery,
} from '../store/services/CatApi';

const Home = () => {
  const { data: images = [], isLoading: isImagesLoading } = useGetMyImagesQuery(
    {},
  );
  const { isLoading: isFavouritesLoading } = useGetMyFavouritesQuery();
  const { isLoading: isVotesLoading } = useGetMyVotesQuery();
  const isImageUploading = useAppSelector(getIsImageUploading);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleUploadButtonPress = useCallback(() => {
    setIsBottomSheetOpen(true);
  }, []);
  const handleBottomSheetClose = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

  const isLoading = isImagesLoading || isFavouritesLoading || isVotesLoading;

  return (
    <View style={styles.container}>
      {match({ isLoading, isImageUploading, images })
        .with({ isLoading: true, images: P.any }, () => (
          <ActivityIndicator
            expand
            size="large"
          />
        ))
        .with({ isLoading: false, isImageUploading: false, images: [] }, () => (
          <NoImagesFound />
        ))
        .with(
          {
            isLoading: false,
            isImageUploading: true,
            images: [],
          },
          () => (
            <ImageListWrapper>
              <CatCardSkeleton />
              <ImageList />
            </ImageListWrapper>
          ),
        )
        .with(
          {
            isLoading: false,
            isImageUploading: false,
            images: [P.any, ...P.array()],
          },
          () => (
            <ImageListWrapper>
              <ImageList />
            </ImageListWrapper>
          ),
        )
        .with(
          {
            isLoading: false,
            isImageUploading: true,
            images: [P.any, ...P.array()],
          },
          () => (
            <ImageListWrapper>
              <CatCardSkeleton />
              <ImageList />
            </ImageListWrapper>
          ),
        )
        .exhaustive()}
      <View style={styles.overlay}>
        <UploadButton onPress={handleUploadButtonPress} />
      </View>
      <UploadImageSheet
        open={isBottomSheetOpen}
        onClose={handleBottomSheetClose}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme, runtime) => ({
  container: {
    flex: 1,
    // padding: theme.space.$2,
    backgroundColor: theme.colors.background.$5,
  },
  overlay: {
    position: 'absolute',
    height: '10%',
    left: 0,
    right: 0,
    bottom: runtime.insets.bottom,
  },
}));

export default Home;
