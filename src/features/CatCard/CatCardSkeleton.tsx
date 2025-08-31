import { useEffect } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, {
  StretchInY,
  StretchOutY,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const CatCardSkeleton = () => {


  const sharedValue = useSharedValue(0.6);

  useEffect(() => {
    'worklet';
    sharedValue.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.6, { duration: 1000 })
      ),
      0
    );
  }, [sharedValue]);

  const derivedValue = useDerivedValue(() => {
    return 0.6 + 1 - sharedValue.value;
  });

  const dotStyle = useAnimatedStyle(() => ({
    opacity: sharedValue.value,
  }));

  const dotStyle2 = useAnimatedStyle(() => ({
    opacity: derivedValue.value,
  }));

  return (
    <Animated.View
      entering={StretchInY}
      exiting={StretchOutY}
      style={styles.root}
    >
      <Animated.View style={[styles.image, dotStyle]}>
        <FontAwesome
          name={'circle'}
          color={'#e3e0e0'}
          size={65}
          style={{ marginVertical: 2, marginHorizontal: 8 }}
        />
        <FontAwesome
          name={'circle'}
          color={'#e3e0e0'}
          size={65}
          style={{ marginVertical: 2, marginHorizontal: 8 }}
        />
      </Animated.View>
      <Animated.View style={[styles.base, dotStyle2]}>
        <FontAwesome name={'circle'} color={'#c9c8c8'} size={40} />
        <FontAwesome name={'circle'} color={'#c9c8c8'} size={40} />
        <FontAwesome name={'circle'} color={'#c9c8c8'} size={40} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    borderColor: theme.colors.background.$6,
    borderRadius: theme.radii.$3,
    borderWidth: theme.borderWidths.$1,
    width: theme.space.full,
  },
  base: {
    borderBottomLeftRadius: theme.radii.$3,
    borderBottomRightRadius: theme.radii.$3,
    width: theme.space.full,
    height: 80,
    backgroundColor: theme.colors.background.$5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    borderTopLeftRadius: theme.radii.$3,
    borderTopRightRadius: theme.radii.$3,
    width: theme.space.full,
    height: 180,
    backgroundColor: '#c9c8c8',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
}));
