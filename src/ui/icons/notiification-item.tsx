import React from 'react';
import Svg, { Path } from 'react-native-svg';

const NOtificationItem = ({ color = '#667085' }) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 5.3667V8.1417"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M10.0166 1.66663C6.94992 1.66663 4.46658 4.14996 4.46658 7.21663V8.96663C4.46658 9.53329 4.23325 10.3833 3.94158 10.8666L2.88325 12.6333C2.23325 13.725 2.68325 14.9416 3.88325 15.3416C7.86658 16.6666 12.1749 16.6666 16.1582 15.3416C17.2832 14.9666 17.7666 13.65 17.1582 12.6333L16.0999 10.8666C15.8082 10.3833 15.5749 9.52496 15.5749 8.96663V7.21663C15.5666 4.16663 13.0666 1.66663 10.0166 1.66663Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M12.7751 15.6833C12.7751 17.2083 11.5251 18.4583 10.0001 18.4583C9.24176 18.4583 8.54176 18.1417 8.04176 17.6417C7.54176 17.1417 7.2251 16.4417 7.2251 15.6833"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </Svg>
  );
};

export default NOtificationItem;