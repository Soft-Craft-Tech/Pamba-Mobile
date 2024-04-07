import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Clear = () => {
  return (
    <Svg height="24" viewBox="0 -960 960 960" width="24">
      <Path
        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        fill="black"
      />
    </Svg>
  );
};

export default Clear;
