import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BellIcon = () => {
  return (
    <Svg width="33" height="33" viewBox="0 0 33 33" fill="none">
      <Path
        d="M13.75 27.5C13.75 29.0188 14.9812 30.25 16.5 30.25C18.0188 30.25 19.25 29.0188 19.25 27.5"
        stroke="#0F1C35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M16.5 4.125V6.875"
        stroke="#DB1471"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M16.5 6.875C11.9436 6.875 8.25 10.5686 8.25 15.125V23.375C6.875 23.375 5.5 24.75 5.5 26.125H16.5M16.5 6.875C21.0563 6.875 24.75 10.5686 24.75 15.125V23.375C26.125 23.375 27.5 24.75 27.5 26.125H16.5"
        stroke="#DB1471"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default BellIcon;
