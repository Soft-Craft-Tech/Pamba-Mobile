import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import type { AllBusiness } from '@/api';
import { useBusinessesQuery } from '@/api/posts/use-businesses';
import { BusinessCard } from '@/components/business-card';
import { EmptyList, FocusAwareStatusBar, Text } from '@/ui';
import Clear from '@/ui/icons/clear';
import { SearchSvg } from '@/ui/icons/search';

export default function Style() {
  const { data, isLoading, isError } = useBusinessesQuery();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredData = React.useMemo(() => {
    if (!searchQuery) {
      return data;
    }
    return data?.filter((item: { business_name: string }) =>
      item.business_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const renderItem = React.useCallback(
    ({ item }: { item: AllBusiness }) => <BusinessCard {...item} />,
    []
  );

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 pt-12">
      <FocusAwareStatusBar />
      <View className="mb-4 flex flex-row items-center justify-between rounded-xl border border-gray-300 p-2 pr-10">
        {searchQuery.length > 0 ? (
          <TouchableOpacity onPress={clearSearch}>
            <Clear />
          </TouchableOpacity>
        ) : (
          <SearchSvg />
        )}
        <TextInput
          className="ml-3 h-full w-full"
          placeholder="Search by Business Name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlashList
        // persistentScrollbar={true}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
