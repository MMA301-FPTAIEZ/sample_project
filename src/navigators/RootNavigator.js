import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/HomePage';
import Favorite from '../screens/Favorite';
import Premiere from '../screens/Premiere';
import AppProvider from '../provider/AppProvider';
import ProductDetail from '../screens/ProductDetail';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabs = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomePage} />
      <Tabs.Screen name="Favorite" component={Favorite} />
      <Tabs.Screen name="Premiere" component={Premiere} />
    </Tabs.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <AppProvider>
      <Stack.Navigator
        screenOptions={{
          animation: 'scale_from_center',
        }}
      >
        <Stack.Screen name="Tabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </AppProvider>
  );
};

export default RootNavigator;
