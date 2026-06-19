import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export function MapaMemorias() {
  return (
    <LinearGradient
      colors={["#79A3C3", "#D6E4ED", "#F7F4EF"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titulo}>Meu Diário de Viagem</Text>
        <Text style={styles.subtitulo}>
          Registre e colecione seus melhores momentos
        </Text>
        <View style={styles.formulario}>
          {/* País */}
          <Text style={styles.label}>País</Text>
          <TextInput style={styles.input} placeholder="Ex: Itália" />

          {/* Cidade */}
          <Text style={styles.label}>Cidade</Text>
          <TextInput style={styles.input} placeholder="Ex: Roma" />

          {/* Data */}
          <Text style={styles.label}>Data da viagem</Text>
          <TextInput style={styles.input} placeholder="10/06/2026" />

          {/* Descrição */}
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.inputDescricao}
            placeholder="Conte um pouco sobre esse momento..."
            multiline
          />

          {/* Foto */}
          <TouchableOpacity style={styles.fotoContainer}>
            <Ionicons name="camera-outline" size={40} color="#6B8CB0" />

            <Text style={styles.fotoTexto}>Adicionar foto</Text>
          </TouchableOpacity>

          {/* Salvar */}
          <TouchableOpacity style={styles.botaoSalvar}>
            <Text style={styles.textoBotao}>Salvar Memória</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 15,
    alignItems: "center",
    paddingBottom: 50,
  },
  titulo: {
    fontSize: 32,
    color: "#4D2F1F",
    fontStyle: "italic",
    fontWeight: "300",
  },

  subtitulo: {
    fontSize: 14,
    marginBottom: 30,
    textAlign: "center",
    color: "#4D2F1F",
    lineHeight: 32,
  },
  formulario: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3C3C3C",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E1DBC9",
    backgroundColor: "#FAF8F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#3C3C3C",
  },

  inputDescricao: {
    borderWidth: 1,
    borderColor: "#E1DBC9",
    backgroundColor: "#FAF8F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#3C3C3C",
  },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  metade: {
    flex: 1,
  },

  fotoContainer: {
    marginTop: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#B1C7D4",
    borderRadius: 18,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FBFD",
  },

  fotoTexto: {
    color: "#6B8CB0",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },

  botaoSalvar: {
    marginTop: 25,
    backgroundColor: "#6B8CB0",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
