import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const Time = () => {
  return (
    <Svg width="14" height="13" viewBox="0 0 14 13" fill="none">
      <Circle
        cx="7"
        cy="6.5"
        r="5.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 3.20001V6.50001L9.2 7.60001"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Time;
