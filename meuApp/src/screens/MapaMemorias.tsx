import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Button,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

interface Memoria {
  id: string;
  pais: string;
  cidade: string;
  data: string;
  descricao: string;
}

export function MapaMemorias() {
  const [pais, setPais] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [memorias, setMemorias] = useState<Memoria[]>([]);
  const [editando, setEditando] = useState<string | null>(null);

  useEffect(() => {
    console.log("Tela abaerta");
  }, []);

  const salvarMemoria = () => {
    if (!pais || !cidade || !data || !descricao) {
      Alert.alert("Erro", "Preencha os dados corretamente");
      return;
    }

    //se o usuário quiser editar seus  dados
    if (editando) {
      const listaAtualizada = memorias.map((memoria) => {
        if (memoria.id === editando) {
          return {
            ...memoria,
            pais,
            cidade,
            data,
            descricao,
          };
        }
        return memoria;
      });

      setMemorias(listaAtualizada);
      Alert.alert("Sucesso", "Lista de memórias atualizada com sucesso");
      setEditando(null);
    } else {
      const novaMemoria: Memoria = {
        id: Date.now().toString(),
        pais,
        cidade,
        data,
        descricao,
      };
      setMemorias([...memorias, novaMemoria]);
      Alert.alert("Sucesso", "Nova memória cadastrada com sucesso");
    }
    setPais("");
    setCidade("");
    setData("");
    setDescricao("");
  };
  const removerMemoria = (id: string) => {
    const novaLista = memorias.filter((memoria) => memoria.id !== id);
    setMemorias(novaLista);
  };

  const editarMemoria = (memoria: Memoria) => {
    setPais(memoria.pais);
    setCidade(memoria.cidade);
    setData(memoria.data);
    setDescricao(memoria.descricao);

    setEditando(memoria.id);
  };

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
          <Text style={styles.label}>País</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Itália"
            value={pais}
            onChangeText={setPais}
          />

          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Roma"
            value={cidade}
            onChangeText={setCidade}
          />

          <Text style={styles.label}>Data da viagem</Text>
          <TextInput
            style={styles.input}
            placeholder="10/06/2026"
            value={data}
            onChangeText={setData}
          />

          {/* Descrição */}
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.inputDescricao}
            placeholder="Conte um pouco sobre esse momento..."
            multiline
            value={descricao}
            onChangeText={setDescricao}
          />

          {/* Foto */}
          <TouchableOpacity style={styles.fotoContainer}>
            <Ionicons name="camera-outline" size={40} color="#6B8CB0" />

            <Text style={styles.fotoTexto}>Adicionar foto</Text>
          </TouchableOpacity>

          <Button
            title={editando ? "Atualizar Memória" : "Salvar Memória"}
            onPress={salvarMemoria}
          />
        </View>

        <Text style={styles.subtitulo}>
          Minhas Memórias ({memorias.length})
        </Text>

        <FlatList
          data={memorias}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.local}>
                {item.cidade}, {item.pais}
              </Text>

              <Text>{item.data}</Text>

              <Text>{item.descricao}</Text>

              <View style={styles.botoes}>
                <Button title="Editar" onPress={() => editarMemoria(item)} />

                <Button
                  title="Excluir"
                  color="red"
                  onPress={() => removerMemoria(item.id)}
                />
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhuma memória cadastrada.</Text>
          }
        />
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
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
    color: "#4D2F1F",
    alignSelf: "flex-start",
  },
  formulario: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 20,
    width: "100%",
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
  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 3,
  },

  local: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  vazio: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});
