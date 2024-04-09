import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PaymentIcons = ({ color = '#667085' }) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M18.3332 10V14.1667C18.3332 16.6667 16.6665 18.3334 14.1665 18.3334H5.83317C3.33317 18.3334 1.6665 16.6667 1.6665 14.1667V10C1.6665 7.73337 3.03317 6.15004 5.15817 5.88337C5.37484 5.85004 5.59984 5.83337 5.83317 5.83337H14.1665C14.3832 5.83337 14.5915 5.8417 14.7915 5.87503C16.9415 6.12503 18.3332 7.71671 18.3332 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.793 5.87496C14.593 5.84163 14.3847 5.8333 14.168 5.8333H5.83467C5.60133 5.8333 5.37633 5.84997 5.15967 5.8833C5.27633 5.64997 5.443 5.4333 5.643 5.2333L8.35134 2.51663C9.493 1.38329 11.343 1.38329 12.4847 2.51663L13.943 3.99164C14.4763 4.51664 14.7597 5.18329 14.793 5.87496Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3332 10.4166H15.8332C14.9165 10.4166 14.1665 11.1666 14.1665 12.0833C14.1665 13 14.9165 13.75 15.8332 13.75H18.3332"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PaymentIcons;
