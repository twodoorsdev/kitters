import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '../lib/queryClient';

const NavigationLayout = () => {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(home)">
        <Label>Home</Label>
        <Icon
          sf="house.fill"
          drawable="custom_android_drawable"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon
          sf="grid.circle.fill"
          drawable="custom_settings_drawable"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger
        name="(search)"
        role="search"
      >
        <Icon
          sf="magnifyingglass"
          drawable="ic_search"
        />
        <Label>Search</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

const ProviderLayout = () => {
  return (
    <GestureHandlerRootView>
      <StatusBar hidden />
      <QueryClientProvider client={queryClient}>
        <NavigationLayout />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

const Layout = () => {
  return <ProviderLayout />;
};

export default Layout;
