import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require("../../img/background-image.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.topo}>
          <Text style={styles.titulo}>Mapa de</Text>

          <Text style={styles.memorias}>Memórias</Text>

          <Text style={styles.subtitulo}>
            Cada destino guarda uma história.
          </Text>

          <View style={styles.botoes_inferiores}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate("MapaMemorias")}
            >
              <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
              <Text style={styles.textoBotao}>Colecione seus momentos</Text>
            </TouchableOpacity>
            <Text style={styles.textoSecundario}>Começar jornada →</Text>
          </View>
        </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 120,
    paddingBottom: 80,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  topo: {
    alignItems: "center",
  },

  titulo: {
    fontSize: 52,
    color: "#4D2F1F",
    fontStyle: "italic",
    fontWeight: "300",
  },

  memorias: {
    fontSize: 68,
    color: "#6B8CB0",
    fontStyle: "italic",
    fontWeight: "300",
    marginTop: -10,
  },

  subtitulo: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 60,
    textAlign: "center",
    color: "white",
    lineHeight: 32,
  },
  botoes_inferiores: {
    alignItems: "center",
  },

  botao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6B8CB0",
    width: "80%",
    paddingRight: 10,
    paddingVertical: 20,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  textoSecundario: {
    marginTop: 20,
    color: "#FFFFFF",
    fontSize: 18,
  },
});
