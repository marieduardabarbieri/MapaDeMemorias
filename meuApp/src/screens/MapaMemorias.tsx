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
import { useSQLiteContext } from "expo-sqlite";

import { Memoria } from "../../types/memoria";

import {
  listarMemorias,
  inserirMemoria,
  excluirMemoria,
  atualizarMemoria,
} from "../../repositories/memoriaRepository";

//interface Memoria não existe mais porque agora ela fica em types/memoria

export function MapaMemorias() {
  const db = useSQLiteContext();

  const [pais, setPais] = useState("");
  const [cidade, setCidade] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  const [memorias, setMemorias] = useState<Memoria[]>([]);
  const [editando, setEditando] = useState<number | null>(null); //aqui é o tipo number porque o SQLite gera: id INTEGER PRIMARY KEY AUTOINCREMENT

  useEffect(() => {
    carregarMemorias();
  }, []);

  async function carregarMemorias() {
    const resultado = await listarMemorias(db);
    setMemorias(resultado);
  }

  async function salvarMemoria() {
    if (!pais || !cidade || !data || !descricao) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (editando) {
      await atualizarMemoria(db, {
        id: editando,
        pais,
        cidade,
        data,
        descricao,
      });

      Alert.alert("Sucesso", "Memória atualizada");
      setEditando(null);
    } else {
      await inserirMemoria(db, {
        pais,
        cidade,
        data,
        descricao,
      });

      Alert.alert("Sucesso", "Memória salva");
    }

    setPais("");
    setCidade("");
    setData("");
    setDescricao("");

    carregarMemorias();
  }

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

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarMemoria}>
            <Text style={styles.textoBotao}>
              {editando ? "Atualizar Memória" : "Salvar Memória"}
            </Text>
          </TouchableOpacity>
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
              <View style={styles.cardInfo}>
                <Text style={styles.local}>{item.cidade}</Text>

                <Text style={styles.pais}>{item.pais}</Text>

                <Text style={styles.dataCard}>📅 {item.data}</Text>

                <Text style={styles.descricaoCard}>{item.descricao}</Text>

                <View style={styles.botoes}>
                  <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={() => editarMemoria(item)}
                  >
                    <Text style={styles.textoBotaoCard}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={() => removerMemoria(item.id)}
                  >
                    <Text style={styles.textoBotaoCard}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text>Nenhuma memória cadastrada.</Text>}
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
    marginTop: 15,
    marginBottom: 25,
    color: "#4D2F1F",
    alignSelf: "flex-start",
  },
  formulario: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderColor: "black",
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
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 130,
    padding: 18,
    marginBottom: 15,
  },

  cardInfo: {
    flex: 1,
  },

  local: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4D2F1F",
  },

  pais: {
    fontSize: 16,
    color: "#7A6C5D",
    marginTop: 2,
  },

  dataCard: {
    marginTop: 8,
    color: "#6B8CB0",
    fontWeight: "600",
  },

  descricaoCard: {
    marginTop: 10,
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },

  botoes: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: "#6B8CB0",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: "#C96A6A",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  textoBotaoCard: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
