import { FontAwesome5 } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from './Text';

export type ImageSourceProps = ComponentProps<typeof Pressable> & {
  icon: string;
  label?: string;
};
export const ImageSource = ({
  label,
  icon,
  style,
  ...props
}: ImageSourceProps) => {
  return (
    <Pressable style={[styles.root, style as StyleProp<ViewStyle>]} {...props}>
      <FontAwesome5 name={icon} size={32} />
      {label && <Text>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.$5,
    borderStyle: 'dashed',
    borderWidth: theme.borderWidths.$1,
    borderRadius: theme.radii.$2,
    rowGap: theme.space.$2,
  },
}));
