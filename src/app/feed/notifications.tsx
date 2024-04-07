import * as React from 'react';

import { FocusAwareStatusBar, Text, View } from '@/ui';

export default function Style() {
  return (
    <View className="flex-1 px-8 pt-12">
      <Text className="text-xl font-bold text-[#000000]">
        All Notifications
      </Text>
      <FocusAwareStatusBar />
    </View>
  );
}
