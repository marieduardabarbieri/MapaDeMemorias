import { View, Text, StyleSheet } from "react-native";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela de Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
