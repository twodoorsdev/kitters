import { ColorValue } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import { StyleSheet } from 'react-native-unistyles';
import { Octicons } from '@expo/vector-icons';
import { ComponentProps, useEffect, useMemo, useState } from 'react';

type IconName = ComponentProps<typeof Octicons>['name'];

export type AnimatedIconToggleProps = {
  toggled: boolean;
  iconName: IconName;
  toggledIconName?: IconName;
  iconColor?: ColorValue;
  toggledIconColor?: ColorValue;
  fade?: boolean;
  scale?: boolean;
};

export const AnimatedIconToggle = ({
  toggled,
  iconName,
  fade = false,
  scale = false,
  toggledIconName = iconName,
  iconColor = '#000',
  toggledIconColor = '#000',
}: AnimatedIconToggleProps) => {
  const [currentIcon, setCurrentIcon] = useState<IconName>(iconName);
  const [currentColor, setCurrentColor] = useState<ColorValue>(iconColor);
  const anim = useSharedValue(1);

  const configIn = useMemo(() => {
    return {
      easing: Easing.in(Easing.ease),
      duration: 100,
    };
  }, []);
  const configOut = useMemo(() => {
    return {
      easing: Easing.elastic(2),
      duration: 200,
    };
  }, []);

  useEffect(() => {
    'worklet';
    anim.value = withSequence(
      withTiming(0, configIn),
      withTiming(1, configOut),
    );
  }, [anim, configIn, configOut, toggled]);

  useDerivedValue(() => {
    if (anim.value === 0) {
      runOnJS(setCurrentIcon)(toggled ? toggledIconName : iconName);
      runOnJS(setCurrentColor)(toggled ? toggledIconColor : iconColor);
    }
  }, [anim, toggled]);

  const iconStyles = useAnimatedStyle(() => {
    return {
      opacity: fade ? anim.value : 1,
      transform: [{ scale: scale ? anim.value : 1 }],
    };
  });

  return (
    <Animated.View style={[styles.root, iconStyles]}>
      <Octicons
        name={currentIcon}
        size={24}
        color={currentColor}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
