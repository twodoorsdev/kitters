import {
  createNavigatorFactory,
  TabRouter,
  TabActions,
  useNavigationBuilder,
  type TabNavigationState,
  type TabRouterOptions,
  type TabActionHelpers,
  type ParamListBase,
  useTheme,
} from '@react-navigation/native';
import {
  TabBarProps,
  TabView,
  TabBar,
  type Route,
} from 'react-native-tab-view';
import { withLayoutContext } from 'expo-router';
import { useWindowDimensions } from 'react-native';

export type TabViewNavigationOptions = {
  title?: string;
  tabBarLabel?: string;
  tabBarAccessibilityLabel?: string;
  tabBarTestID?: string;
  lazy?: boolean;
  swipeEnabled?: boolean;
};

export type TabViewNavigationEventMap = {
  tabPress: { data: undefined; canPreventDefault: true };
  tabLongPress: { data: undefined };
  swipeStart: { data: undefined };
  swipeEnd: { data: undefined };
};

function TabViewNavigatorView({
  state,
  navigation,
  descriptors,
  ...rest
}: any) {
  const { colors } = useTheme();
  const layout = useWindowDimensions();

  const {
    renderTabBar = <T extends Route>(props: TabBarProps<T>) => (
      <TabBar<T>
        {...props}
        indicatorStyle={{ backgroundColor: colors.primary || '#2196f3' }}
        style={{ backgroundColor: 'white' }}
        activeColor={colors.text || '#000'}
        inactiveColor={colors.text ? `${colors.text}99` : '#00000099'}
      />
    ),
    ...tabViewProps
  } = rest;

  const navigationState = {
    ...state,
    routes: state.routes.map((route: any) => ({
      ...route,
      title:
        descriptors[route.key].options.title ||
        descriptors[route.key].options.tabBarLabel ||
        route.name,
    })),
  };

  return (
    <TabView
      {...tabViewProps}
      navigationState={navigationState}
      renderScene={({ route }) => descriptors[route.key].render()}
      renderTabBar={renderTabBar}
      onIndexChange={(index) => {
        const route = state.routes[index];
        navigation.dispatch({
          ...TabActions.jumpTo(route.name),
          target: state.key,
        });
      }}
      initialLayout={{ width: layout.width }}
      onSwipeStart={() => navigation.emit({ type: 'swipeStart' })}
      onSwipeEnd={() => navigation.emit({ type: 'swipeEnd' })}
    />
  );
}

function TabViewNavigator({
  id,
  initialRouteName,
  backBehavior,
  children,
  screenLayout,
  layout,
  screenListeners,
  screenOptions,
  UNSTABLE_router,
  ...rest
}: any) {
  const { state, descriptors, navigation, NavigationContent } =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      TabViewNavigationOptions,
      TabViewNavigationEventMap
    >(TabRouter, {
      id,
      initialRouteName,
      backBehavior,
      children,
      layout,
      screenListeners,
      screenOptions,
      screenLayout,
      UNSTABLE_router,
    });

  return (
    <NavigationContent>
      <TabViewNavigatorView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </NavigationContent>
  );
}

export function createTabViewNavigator() {
  return createNavigatorFactory(TabViewNavigator)();
}

const { Navigator } = createTabViewNavigator();

export const Tabs = withLayoutContext(Navigator);
