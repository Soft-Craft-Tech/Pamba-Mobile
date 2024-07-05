import { Image as NImage } from "expo-image";
import * as React from "react";

export type ImgProps = React.ComponentProps<typeof NImage> & {
  className?: string;
};

export const CustomImage = ({
  style,
  className,
  placeholder = "L6PZfSi_.AyE_3t7t7R**0o#DgR4",
  ...props
}: ImgProps) => {
  return (
    <NImage
      style={[style, className]} // Merge style and className into the style prop
      placeholder={placeholder}
      {...props}
    />
  );
};

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};
