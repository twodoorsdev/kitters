import type { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type ImageListWrapperProps = {
  children?: ReactNode;
};

export const ImageListWrapper = ({ children }: ImageListWrapperProps) => {
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create((theme) => ({
  root: {
    rowGap: theme.space.$2,
  },
}));
