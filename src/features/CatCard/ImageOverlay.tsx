import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DeleteButton } from './DeleteButton';
import { FavouriteButton } from './FavouriteButton';
import { CardProps } from './shared';

export const ImageOverlay = ({ item }: CardProps) => {
  return (
    <View style={styles.root}>
      <FavouriteButton item={item} />
      <DeleteButton item={item} />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    position: 'absolute',
    right: 0,
  },
}));
