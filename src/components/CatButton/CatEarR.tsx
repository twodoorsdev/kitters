import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps & { secondaryColor: string }) => (
  <Svg
    width={116}
    height={149}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M90.075 97.038c-9.53 51.779-26.273 48.698-40.45 46.089-14.178-2.609-45.09-22.487-36.926-50.55C20.862 64.512 88.633 9.017 88.633 9.017s10.971 36.241 1.442 88.02Z"
    />
    <Path
      fill={props.secondaryColor}
      d="M82.873 81.034c-4.418 28.843-6.199 25.275-18.126 16.743-8.51-6.088-20.82-14.445-17.094-30.068C51.378 52.086 82.55 31.95 82.55 31.95s4.74 20.242.323 49.084Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export { Memo as CatEarR };
