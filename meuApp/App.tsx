import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import { MapaMemorias } from "./src/screens/MapaMemorias";
import { SQLiteProvider } from "expo-sqlite"; //O SQLiteProvider disponibiliza a conexão com o banco para todas as telas da aplicação através do Context API do React.
import { inicializarBanco } from "./database/database";

export type RootStackParamList = {
  Home: undefined;
  MapaMemorias: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); //serve para a navegação por aba

export default function App() {
  return (
    <SQLiteProvider databaseName="memorias.db" onInit={inicializarBanco}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MapaMemorias" component={MapaMemorias} />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
