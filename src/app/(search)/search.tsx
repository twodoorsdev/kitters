import type { SearchBarProps } from 'react-native-screens';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';

export function useSearch(options: Omit<SearchBarProps, 'ref'> = {}) {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const interceptedOptions: SearchBarProps = {
      ...options,
      onChangeText(event) {
        setSearch(event.nativeEvent.text);
        options.onChangeText?.(event);
      },
      onSearchButtonPress(e) {
        setSearch(e.nativeEvent.text);
        options.onSearchButtonPress?.(e);
      },
      onCancelButtonPress(e) {
        setSearch('');
        options.onCancelButtonPress?.(e);
      },
    };

    navigation.setOptions({
      headerShown: true,
      headerSearchBarOptions: interceptedOptions,
    });
  }, [options, navigation]);

  return search;
}

export default function SearchPage() {
  const searchQuery = useSearch();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingBottom: 20,
        rowGap: 15,
      }}
    >
      {searchQuery && <Text>Query &quot;{searchQuery}&quot;</Text>}
    </ScrollView>
  );
}
