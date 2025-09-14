import { StyleSheet } from 'react-native-unistyles';

import { Tabs } from '../../components/TopTabNavigator';

const NavigationLayout = () => {
  return (
    <Tabs style={styles.root}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Discover' }}
      />
      <Tabs.Screen
        name="from-follows"
        options={{ title: 'From follows' }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile' }}
      />
    </Tabs>
  );
};

const Layout = () => {
  return <NavigationLayout />;
};

export default Layout;

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
