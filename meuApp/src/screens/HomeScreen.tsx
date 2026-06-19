import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require("../../img/background-image.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.titulo}>Mapa de Memórias</Text>

        <Text style={styles.subtitulo}>
          Colecione os momentos que merecem ser lembrados.
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("MapaMemorias")}
        >
          <Text style={styles.textoBotao}>Começar Jornada</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  titulo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },

  subtitulo: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 50,
    lineHeight: 28,
  },

  botao: {
    backgroundColor: "#79A3C3",
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 30,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
