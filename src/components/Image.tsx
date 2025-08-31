import { Image as ExpoImage, ImageProps } from 'expo-image';

export const Image = (props: ImageProps) => {
  return <ExpoImage contentFit="cover" transition={1000} {...props} />;
};
