import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps & { secondaryColor: string }) => (
  <Svg width={115} height={149} fill="none" {...props}>
    <Path
      fill={props.color}
      d="M25.215 97.155c9.53 51.779 26.273 48.698 40.45 46.089 14.178-2.609 45.089-22.487 36.926-50.55C94.429 64.63 26.657 9.136 26.657 9.136s-10.971 36.24-1.442 88.02Z"
    />
    <Path
      fill={props.secondaryColor}
      d="M31.832 81.034c4.418 28.843 6.199 25.275 18.125 16.743 8.51-6.088 20.82-14.445 17.095-30.068C63.326 52.086 32.154 31.95 32.154 31.95s-4.74 20.242-.322 49.084Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export { Memo as CatEarL };
