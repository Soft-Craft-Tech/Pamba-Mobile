import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const Rating = ({ color = 'white', ...props }: SvgProps) => {
  return (
    <Svg width="11" height="11" viewBox="0 0 11 11" fill="none" {...props}>
      <G clipPath="url(#clip0_187_2326)">
        <Path
          d="M10.7289 3.65379L7.58884 3.17415L6.1814 0.176259C6.07628 -0.0476039 5.70899 -0.0476039 5.60387 0.176259L4.19685 3.17415L1.05681 3.65379C0.798901 3.69338 0.695907 4.00704 0.876785 4.19217L3.15797 6.53039L2.61875 9.83599C2.57576 10.0986 2.85623 10.2956 3.08818 10.1667L5.89285 8.61666L8.69752 10.1671C8.92734 10.2948 9.21036 10.1016 9.16695 9.83641L8.62772 6.53082L10.9089 4.1926C11.0898 4.00704 10.9864 3.69338 10.7289 3.65379Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_187_2326">
          <Rect
            width="10.2143"
            height="10.2143"
            fill={color}
            transform="translate(0.785645)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
