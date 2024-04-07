import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Circle, Path } from 'react-native-svg';

export const Time = ({ color = '#0F1C35', ...props }: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 14 13" fill="none" {...props}>
    <Circle
      cx="7"
      cy="6.5"
      r="5.5"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 3.20001V6.50001L9.2 7.60001"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
