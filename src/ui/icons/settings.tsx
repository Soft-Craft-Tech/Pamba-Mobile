import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Ellipse, Path } from 'react-native-svg';

export const Settings = ({ color = '#0F1C35', ...props }: SvgProps) => (
  <Svg width={19} height={22} viewBox="0 0 19 22" fill="none" {...props}>
    <Ellipse
      cx={9.159}
      cy={5.654}
      rx={4.759}
      ry={4.654}
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.318 20.944H1c0-4.406 3.653-8.078 8.159-8.078 4.508 0 8.159 3.672 8.159 8.078z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
