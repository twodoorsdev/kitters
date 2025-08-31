import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { Tabs } from '../components/TopTabNavigator';

const NavigationLayout = () => {
  return (
    <Tabs style={styles.root}>
      <Tabs.Screen
        name="(home)/index"
        options={{ title: 'Discover' }}
      />
      <Tabs.Screen
        name="(home)/from-follows"
        options={{ title: 'From follows' }}
      />
      <Tabs.Screen
        name="(home)/profile"
        options={{ title: 'Profile' }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create((theme, runtime) => ({
  header: { backgroundColor: theme.colors.background.$3 },
  root: {
    paddingTop: runtime.insets.top,
  },
  tabList: {
    display: 'flex',
    position: 'absolute',
    bottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
    padding: 8,
    width: '100%',
  },
  tabTrigger: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

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
