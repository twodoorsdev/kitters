import { CatEarL } from './CatEarL';
import { CatEarR } from './CatEarR';
import { CatHead } from './CatHead';
import { CatNose } from './CatNose';
import { CatEye } from './CatEye';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useCallback, useEffect } from 'react';

type CatButtonProps = {
  animated?: boolean;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
};

export const CatButton = ({ animated, onPress }: CatButtonProps) => {
  const xVal = useSharedValue(-1);
  const yVal = useSharedValue(0);
  const blinkVal = useSharedValue(1);
  const boopVal = useSharedValue(0);

  const idle = useCallback(() => {
    'worklet';
    xVal.value = withRepeat(
      withSequence(
        withDelay(
          2000 + Math.random() * 2000,
          withSpring(-1 + Math.random() * 2)
        ),
        withDelay(2000 + Math.random() * 3000, withSpring(0)),
        withDelay(
          2000 + Math.random() * 2000,
          withSpring(-1 + Math.random() * 2)
        ),
        withDelay(2000 + Math.random() * 3000, withSpring(0))
      ),
      0
    );
    yVal.value = withRepeat(
      withSequence(
        withDelay(
          2000 + Math.random() * 3000,
          withSpring(-1 + Math.random() * 2)
        ),
        withDelay(2000 + Math.random() * 3000, withSpring(0)),
        withDelay(
          2000 + Math.random() * 3000,
          withSpring(-1 + Math.random() * 2)
        ),
        withDelay(2000 + Math.random() * 3000, withSpring(0))
      ),
      0
    );
    blinkVal.value = withRepeat(
      withSequence(
        withSpring(0.9),
        withTiming(0, { duration: 50 }),
        withTiming(1, { duration: 100 }),
        withDelay(2000, withSpring(0.5)),
        withDelay(1000, withSpring(0.9)),
        withTiming(0, { duration: 50 }),
        withTiming(1, { duration: 100 }),
        withDelay(2000, withSpring(0.8))
      ),
      0
    );
  }, [blinkVal, xVal, yVal]);

  const boop = useCallback(() => {
    'worklet';
    xVal.value = withSpring(0);
    yVal.value = 1;
    yVal.value = withSpring(-2, { stiffness: 600 });
    blinkVal.value = withTiming(0.2);
    boopVal.value = withSequence(
      withTiming(1, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );

    setTimeout(() => {
      idle();
      if (onPress) {
        onPress({} as GestureResponderEvent);
      }
    }, 400);
  }, [blinkVal, boopVal, idle, onPress, xVal, yVal]);

  useEffect(() => {
    animated && idle();
  }, [animated, idle]);

  const noseStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(yVal.value, [-1, 1], [20, -20]) },
        { translateX: interpolate(xVal.value, [-1, 1], [-50, 30]) },
      ],
    };
  });

  const leftEyeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(yVal.value, [-1, 1], [-30, -50]) },
        { translateX: interpolate(xVal.value, [-1, 1], [-100, -60]) },
        { scaleY: interpolate(blinkVal.value, [0, 1], [0, 1]) },
      ],
    };
  });

  const rightEyeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(yVal.value, [-1, 1], [-30, -50]) },
        { translateX: interpolate(xVal.value, [-1, 1], [60, 100]) },
        { scaleY: interpolate(blinkVal.value, [0, 1], [0, 1]) },
      ],
    };
  });

  const leftEarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -160 },
        { translateY: interpolate(yVal.value, [-1, 1], [-160, -140]) },
        { scale: interpolate(xVal.value, [-1, 1], [0.95, 1.05]) },
      ],
    };
  });

  const rightEarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: 60 },
        { translateY: interpolate(yVal.value, [-1, 1], [-160, -140]) },
        { scale: interpolate(xVal.value, [-1, 1], [1.05, 0.95]) },
      ],
    };
  });

  const pressAction = animated ? boop : onPress;

  return (
    <Pressable onPress={pressAction}>
      <View
        style={{
          flex: 1,
          transform: [{ scale: 0.5 }],
          shadowOpacity: 1,
          shadowRadius: 10,
          shadowColor: '#000',
        }}
      >
        <Animated.View style={[leftEarStyle, { position: 'absolute' }]}>
          <CatEarL
            stroke={'#444'}
            strokeWidth={5}
            color={'#000'}
            secondaryColor={'#fff'}
          />
        </Animated.View>

        <Animated.View style={[rightEarStyle, { position: 'absolute' }]}>
          <CatEarR
            stroke={'#444'}
            strokeWidth={5}
            color={'#000'}
            secondaryColor={'#fff'}
          />
        </Animated.View>

        <CatHead
          stroke={'#777'}
          strokeWidth={5}
          color={'#000'}
          style={{
            position: 'absolute',
            transform: [{ translateX: -140 }, { translateY: -100 }],
          }}
        />

        <Animated.View style={[noseStyle, { position: 'absolute' }]}>
          <CatNose color={'#fff'} />
        </Animated.View>

        <Animated.View
          style={[
            leftEyeStyle,
            {
              position: 'absolute',
              transform: [{ translateX: -80 }, { translateY: -50 }],
            },
          ]}
        >
          <CatEye color={'#fff'} />
        </Animated.View>

        <Animated.View
          style={[
            rightEyeStyle,
            {
              position: 'absolute',
              transform: [{ translateX: 80 }, { translateY: -40 }],
            },
          ]}
        >
          <CatEye color={'#fff'} />
        </Animated.View>
      </View>
    </Pressable>
  );
};
