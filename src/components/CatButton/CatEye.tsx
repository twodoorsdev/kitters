import * as React from 'react';
import Svg, { SvgProps, Circle } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Circle
      cx={9.5}
      cy={9.5}
      r={9.5}
      fill={props.color}
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export { Memo as CatEye };
