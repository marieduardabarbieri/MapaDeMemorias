import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import { MapaMemorias } from "./src/screens/MapaMemorias";

export type RootStackParamList = {
  Home: undefined;
  MapaMemorias: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); //serve para a navegação por aba

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MapaMemorias" component={MapaMemorias} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
