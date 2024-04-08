import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DropDown = ({ color = '#D9DBDB' }) => {
  return (
    <Svg width="10" height="7" viewBox="0 0 10 7" fill="none">
      <Path
        d="M1.38916 1.70868L4.76689 5.10777L8.14462 1.70868"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DropDown;
