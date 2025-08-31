import {
  useGetMyFavouritesQuery,
  useGetMyImagesQuery,
  useGetMyVotesQuery,
} from '@/src/store/services/CatApi';
import { useAppSelector } from '@/src/store/overrides';
import { getIsImageUploading } from '@/src/store/selectors/getIsImageUploading';
import { StyleSheet } from 'react-native-unistyles';
import { useCallback, useState } from 'react';
import { ActivityIndicator } from '@/src/components/ActivityIndicator';
import { UploadImageSheet } from '@/src/features/UploadImageModal/UploadImageSheet';
import { match, P } from 'ts-pattern';
import { NoImagesFound } from '@/src/features/HomePage/NoImagesFound';
import { ImageListWrapper } from '@/src/features/HomePage/ImageListWrapper';
import { CatCardSkeleton } from '@/src/features/CatCard/CatCardSkeleton';
import { ImageList } from '@/src/features/HomePage/ImageList';
import { UploadButton } from '@/src/components/UploadButton';
import { View } from 'react-native';

export const DiscoverFeed = () => {
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
