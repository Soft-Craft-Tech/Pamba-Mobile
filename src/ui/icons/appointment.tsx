import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path, Rect } from 'react-native-svg';

export const AppointmentSvg = ({ color = '#0F1C35', ...props }: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.582 1.87h2.701c.918 0 1.662.744 1.662 1.662v14.75c0 .918-.744 1.662-1.662 1.662H1.662C.744 19.944 0 19.2 0 18.282V3.531c0-.918.744-1.662 1.662-1.662h2.701V.623c0-.345.278-.623.623-.623.345 0 .623.278.623.623v1.247h3.74V.623c0-.345.278-.623.623-.623.345 0 .623.278.623.623v1.247h3.75V.623c0-.345.278-.623.623-.623.345 0 .623.278.623.623v1.247z"
      fill={color}
    />
    <Rect x={4.363} y={7.479} width={2.493} height={1.87} fill={color} />
    <Rect x={4.363} y={10.596} width={2.493} height={1.87} fill={color} />
    <Rect x={4.363} y={13.712} width={2.493} height={1.87} fill={color} />
    <Rect x={8.726} y={13.712} width={2.493} height={1.87} fill={color} />
    <Rect x={8.726} y={10.596} width={2.493} height={1.87} fill={color} />
    <Rect x={8.726} y={7.479} width={2.493} height={1.87} fill={color} />
    <Rect x={13.088} y={13.712} width={2.493} height={1.87} fill={color} />
    <Rect x={13.088} y={10.596} width={2.493} height={1.87} fill={color} />
    <Rect x={13.088} y={7.479} width={2.493} height={1.87} fill={color} />
  </Svg>
);
