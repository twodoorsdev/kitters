import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
    // screenOptions={AppleStackPreset}
    >
      <Stack.Screen
        name="search"
        options={{
          title: 'Search',
          headerSearchBarOptions: {},

          // headerRight: () => (
          // <View className="web:px-4">{/*<LaunchButton />*/}</View>
          // ),
        }}
      />
    </Stack>
  );
}
