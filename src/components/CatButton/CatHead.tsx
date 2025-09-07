import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={297}
    height={246}
    scale={[0.5]}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M296.29 128c0 39.785-15.699 43.904-41.239 70.5-26.933 28.044-64.808 47.5-106.761 47.5-41.953 0-79.828-17.456-106.76-45.5C15.988 173.904.29 167.785.29 128c0-81.738 66.262-128 148-128s148 46.262 148 128Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export { Memo as CatHead };
