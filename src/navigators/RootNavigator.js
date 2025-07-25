import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/HomePage';
import AppProvider from '../provider/AppProvider';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabs = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomePage} />
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
      </Stack.Navigator>
    </AppProvider>
  );
};

export default RootNavigator;
