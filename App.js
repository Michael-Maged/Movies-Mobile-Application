import { createStackNavigator, Header } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import routes from './utils/routes';
import Details from './screens/Details';
import Usersprovider from './context/usersprovider';
import Favourites from './screens/Favourites';





export default function App() {
  const stack = createStackNavigator()
  return (
      <>
      <Usersprovider>
      <NavigationContainer>
        <stack.Navigator>
        <stack.Screen name={routes.home} component={Home}></stack.Screen>
        <stack.Screen name={routes.details} component={Details}></stack.Screen>
        <stack.Screen name={routes.Favourites} component={Favourites}></stack.Screen>

        </stack.Navigator>
        </NavigationContainer>
        </Usersprovider>
      </>
  );
}