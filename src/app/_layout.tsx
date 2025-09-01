import { Stack } from 'expo-router/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Toast from 'react-native-toast-message';
import {Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Provider } from 'react-redux';
// import { CustomToast } from '../components/CustomToast';
import { store } from '../store/store';
import {StatusBar} from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from '../components/TopTabNavigator';
import {forwardRef} from "react";

// const toastConfig = {
//   success: CustomToast,
//   error: CustomToast,
// };


// interface CustomTabButtonProps extends React.PropsWithChildren, TabTriggerSlotProps {
// 	icon: keyof typeof Ionicons.glyphMap;
// }
//
// export const CustomTabButton = forwardRef<View, CustomTabButtonProps>(
// 	(props, ref) => {
// 		return (
// 			<Pressable
// 				ref={ref}
// 				{...props}
// 				style={[customTabButtonStyles.button, props.isFocused && customTabButtonStyles.focusedButton]}
// 			>
// 				<Ionicons
// 					name={props.icon}
// 					size={24}
// 					color={props.isFocused ? "#fff" : "#64748B"}
// 				/>
// 				<Text
// 					style={[customTabButtonStyles.text, props.isFocused && customTabButtonStyles.focusedText]}
// 				>
// 					{props.children}
// 				</Text>
// 			</Pressable>
// 		);
// 	}
// );
//
// CustomTabButton.displayName = "CustomTabButton";
//
// const customTabButtonStyles = StyleSheet.create({
// 	button: {
// 		width: 65,
// 		height: 65,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		borderRadius: 32.5,
// 		borderWidth: 1,
// 		borderColor: "#7a7777",
// 		backgroundColor: "#fff"
// 	},
// 	focusedButton: {
// 		backgroundColor: "#6366F1"
// 	},
// 	focusedText: {
// 		color: "#fff",
// 		fontSize: 12,
// 		fontWeight: "500"
// 	},
// 	text: {
// 		color: "#64748B",
// 		fontSize: 12,
// 		marginTop: 4,
// 		fontWeight: "500"
// 	}
// });

const NavigationLayout = () => {
  return (
    <Tabs style={styles.root}>
      <Tabs.Screen name="(home)/index" options={{ title: 'Home' }} />
      <Tabs.Screen name="(home)/second" options={{ title: 'Second' }} />
      <Tabs.Screen name="(home)/third" options={{ title: 'Third' }} />
    </Tabs>
    // <Slot />
    // <Stack>
    //   <Stack.Screen
    //     name="index"
    //     options={{ headerStyle: styles.header, title: 'KitSky' }}
    //   />
    // </Stack>
  );
};

const styles = StyleSheet.create((theme, runtime) => ({
  header: { backgroundColor: theme.colors.background.$3 },
  root: {
    paddingTop: runtime.insets.top
  },
  tabList: {
		display: "flex",
		position: "absolute",
		bottom: 32,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "red",
		padding: 8,
		width: "100%",
	},
	tabTrigger: {
		flex: 1,
		borderWidth: 1,
		borderColor: "blue",
		alignItems: "center",
		justifyContent: "center"
	}
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
