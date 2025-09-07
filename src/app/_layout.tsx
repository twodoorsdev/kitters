import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';

const NavigationLayout = () => {
  return <Slot />;
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
