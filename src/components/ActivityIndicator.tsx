import { ComponentProps } from 'react';
import { ActivityIndicator as RNActivityIndicator, View } from 'react-native';
import {
  StyleSheet,
  UnistylesVariants, useUnistyles,
} from 'react-native-unistyles';

export type ActivityIndicatorProps = ComponentProps<
  typeof RNActivityIndicator
> &
  UnistylesVariants<typeof styles>;

export const ActivityIndicator = ({
  expand = false,
  size = 'large',
}: ActivityIndicatorProps) => {
  const { theme } = useUnistyles()
  styles.useVariants({
    expand,
  })
  return (
    <View style={styles.root}>
      <RNActivityIndicator size={size} color={theme.colors.typography.$5} />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    variants: {
      expand: {
        false: {},
        true: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  },
}));
