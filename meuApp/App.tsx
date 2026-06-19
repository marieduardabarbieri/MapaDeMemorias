import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { MapaMemorias } from "./src/screens/MapaMemorias";

export type RootTabParamList = {
  Home: undefined;
  MapaMemorias: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>(); //serve para a navegação por aba

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="MapaMemorias" component={MapaMemorias} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
