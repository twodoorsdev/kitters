import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
import Animated from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const SvgComponent = (props: SvgProps) => {
  return (
    <Svg width={51} height={32} fill="none" {...props}>
      <AnimatedPath
        fill={`rgb(99, 68, 108)`}
        d="M50.133 13c0 6.57-12.33 6.72-16.519 11.165-4.561 4.84-1.283 7.689-8.48 7.689-7.198 0-3.92-2.85-8.482-7.69C12.464 19.72.133 19.57.133 13 .133-.727 12-1.5 25.133 1.854 39.5-1 50.133-.727 50.133 13Z"
      />
    </Svg>
  );
};

const Memo = memo(SvgComponent);
export { Memo as CatNose };
