import React from 'react';

import { Text, View } from '@/ui';

type Props = {
  children: React.ReactNode;
  title?: string;
};

export const ItemsContainer = ({ children, title }: Props) => {
  return (
    <>
      {title && (
        <Text className="px-4 pb-2 pt-4 text-lg text-[#667085]">{title}</Text>
      )}
      {<View className=" rounded-md bg-[#F9FAFB]">{children}</View>}
    </>
  );
};
