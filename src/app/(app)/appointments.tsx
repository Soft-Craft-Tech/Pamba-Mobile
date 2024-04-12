import { FlashList } from '@shopify/flash-list';
import * as React from 'react';

import { type AllAppointments, useUpcoming } from '@/api';
import { Card } from '@/components/card';
import { EmptyList, FocusAwareStatusBar, NoData, Text, View } from '@/ui';

export default function Style() {
  const { data, isLoading, isError } = useUpcoming();
  const renderItem = React.useCallback(
    ({ item }: { item: AllAppointments }) => <Card {...item} />,
    []
  );
  if (isError) {
    return (
      <View className="min-h-[400px] flex-1 items-center justify-center">
        <View>
          <NoData />
          <Text className="pt-4 text-center">Error Loading Appointments</Text>
        </View>
      </View>
    );
  }
  return (
    <View className="flex-1 px-8 pt-12">
      <Text className="text-xl font-bold text-[#000000]">
        Upcoming Appointments
      </Text>
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={30}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
