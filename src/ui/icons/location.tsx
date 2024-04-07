import React from 'react';
import Svg, { Ellipse, Path } from 'react-native-svg';

export const LocationIcon = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 12 13" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2298 5.80332C10.2298 9.13999 5.74183 12 5.74183 12C5.74183 12 1.25391 9.13999 1.25391 5.80332C1.25391 3.43401 3.26322 1.51331 5.74183 1.51331C8.22045 1.51331 10.2298 3.43401 10.2298 5.80332V5.80332Z"
        stroke="#CFCFD6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Ellipse
        cx="5.74207"
        cy="5.80329"
        rx="1.49598"
        ry="1.43"
        stroke="#CFCFD6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
