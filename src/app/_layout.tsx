import { Stack } from 'expo-router/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Toast from 'react-native-toast-message';
import { StyleSheet } from 'react-native-unistyles';
import { Provider } from 'react-redux';
// import { CustomToast } from '../components/CustomToast';
import { store } from '../store/store';
import { Slot } from "expo-router";
import {StatusBar} from "expo-status-bar";

// const toastConfig = {
//   success: CustomToast,
//   error: CustomToast,
// };

const NavigationLayout = () => {
  return (
    <Slot />
    // <Stack>
    //   <Stack.Screen
    //     name="index"
    //     options={{ headerStyle: styles.header, title: 'KitSky' }}
    //   />
    // </Stack>
  );
};

const styles = StyleSheet.create((theme) => ({
  header: { backgroundColor: theme.colors.background.$3 },
}));

const ProviderLayout = () => {
  return (
    <GestureHandlerRootView>
      <StatusBar hidden />
      <Provider store={store}>
        <NavigationLayout />
        {/*<Toast config={toastConfig} />*/}
      </Provider>
    </GestureHandlerRootView>
  );
};

const Layout = () => {
  return <ProviderLayout />;
};

export default Layout;
