import { ComponentProps } from 'react';
import { Text as RNText } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type TextProps = ComponentProps<typeof RNText>;

export const Text = ({ style, ...props }: TextProps) => {
  return <RNText style={[styles.root, style]} {...props} />;
};

const styles = StyleSheet.create((theme) => ({
  root: {
    color: theme.colors.typography.$5,
  },
}));
