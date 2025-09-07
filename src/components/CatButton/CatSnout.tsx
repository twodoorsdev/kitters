import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={189}
    height={116}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M189 58.791c0 18.274-10.024 20.165-26.332 32.381C145.472 104.053 121.287 116 94.5 116c-26.787 0-50.971-11.028-68.168-23.91C10.024 79.876 0 77.066 0 58.792 0 21.248 42.31 0 94.5 0 146.691 0 189 21.248 189 58.791Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export { Memo as CatSnout };
