import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { CardActions } from './CardActions';
import { ImageOverlay } from './ImageOverlay';
import { CardProps } from './shared';
import { Image } from '../../components/Image';

export const CatCard = ({ item }: CardProps) => {
  return (
    <View
      style={styles.root}
      testID={`Card.${item.id}`}
    >
      <Image
        style={styles.image}
        source={item.url}
      />
      <ImageOverlay item={item} />

      <CardActions item={item} />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    borderColor: theme.colors.background.$6,
    borderRadius: theme.radii.$3,
    borderWidth: theme.borderWidths.$1,
    width: theme.space.full,
  },
  image: {
    borderTopLeftRadius: theme.radii.$3,
    borderTopRightRadius: theme.radii.$3,
    width: theme.space.full,
    height: 200,
    backgroundColor: theme.colors.background.$5,
  },
}));
