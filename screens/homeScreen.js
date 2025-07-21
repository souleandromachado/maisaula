import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';

import axios from 'axios';
import { AuthContext } from './authContext';
import { useRoute } from '@react-navigation/native';

// Substitua pelo IP ou URL do seu backend
const API_URL = 'https://resumo-service-gz31.onrender.com/';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const { setIsLogado, setTipoUsuario, tipoUsuario } = useContext(AuthContext);
  const route = useRoute();
  const { materiaSelecionada } = route.params || {};

  // Configura header com título e logout
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#F5E1C5',
        height: 70,
      },
      headerLeft: () => (
        <View style={{ paddingLeft: 15, paddingTop: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#00838F' }}>+Aula</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ paddingRight: 10, paddingTop: 20, flexDirection: 'row', alignItems: 'center' }}>
          {tipoUsuario === 'professor' && (
            <TouchableOpacity
              onPress={() => navigation.navigate('CreatePost')}
              style={{
                backgroundColor: '#2496ED',
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 5,
                marginRight: 10,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                Novo Post
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: '#d9534f',
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, tipoUsuario]);

  useEffect(() => {
    const fetchPosts = async () => {
      setCarregando(true);
      try {
        const res = await axios.get(`${API_URL}/posts`);
        setPosts(res.data); // espera array de posts no formato correto
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as postagens.');
        setPosts([]); // limpa lista em caso de erro
      }
      setCarregando(false);
    };

    fetchPosts();
  }, []);

  const deletarPost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  // Filtra os posts pela matéria selecionada
  const postsMateria = materiaSelecionada
    ? posts.filter(
        (post) => post.materia.toLowerCase() === materiaSelecionada.toLowerCase()
      )
    : posts; // Mostrar todos se não filtrar por matéria

  // Aplica filtro de busca
  const postsFiltrados = postsMateria.filter((post) => {
    const textoBusca = busca.toLowerCase();
    return (
      post.titulo.toLowerCase().includes(textoBusca) ||
      post.autor.toLowerCase().includes(textoBusca) ||
      post.conteudo.toLowerCase().includes(textoBusca)
    );
  });

  function handleLogout() {
    setIsLogado(false);
  }

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00796b" />
        <Text>Carregando postagens...</Text>
      </View>
    );
  }

  const handleDeletePost = async (id) => {
    Alert.alert('Confirmar', 'Deseja realmente excluir esta postagem?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/posts/${id}`);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            Alert.alert('Sucesso', 'Postagem excluída com sucesso');
          } catch (error) {
            Alert.alert('Erro', 'Erro ao excluir postagem');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>+Aula</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.btnSair}>
          <Text style={styles.textoBtnSair}>Sair</Text>
        </TouchableOpacity>
      </View>

      {tipoUsuario === 'aluno' && (
        <TouchableOpacity onPress={() => navigation.navigate('SelecionarMateria')} style={styles.btnVoltar}>
          <Text style={styles.textoBtnVoltar}>← Trocar matéria</Text>
        </TouchableOpacity>
      )}

      {tipoUsuario === 'professor' && (
        <TouchableOpacity
          onPress={() => navigation.navigate('CriarQuiz')}
          style={styles.btnCriarPostagem}
        >
          <Text style={styles.textoCriarPostagem}>+ Nova Postagem</Text>
        </TouchableOpacity>
      )}

      <TextInput
        placeholder="Buscar postagens..."
        value={busca}
        onChangeText={setBusca}
        style={styles.campoBusca}
      />

      <FlatList
        data={postsFiltrados}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>Nenhuma postagem encontrada.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {tipoUsuario === 'professor' && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditarPost', {
                      id: item.id,
                      titulo: item.titulo,
                      conteudo: item.conteudo,
                      materia: item.materia,
                    })
                  }
                  style={styles.editButton}
                >
                  <Text style={styles.actionText}>✏️</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleDeletePost(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.actionText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Post', {
                  id: item.id,
                  titulo: item.titulo,
                  autor: item.autor,
                  conteudo: item.conteudo,
                  onDelete: deletarPost,
                })
              }
              style={{ flex: 1 }}
            >
              <Text style={styles.postTitulo}>{item.titulo}</Text>
              <Text style={styles.postAutor}>por {item.autor}</Text>
              <Text style={styles.postTrecho}>
                {item.conteudo.length > 50
                  ? item.conteudo.substring(0, 50) + '...'
                  : item.conteudo}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5E1C5',
    paddingTop: 50,
  },
  campoBusca: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  card: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  postTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00838F',
  },
  postAutor: {
    fontSize: 14,
    marginTop: 4,
    color: '#00838F',
  },
  postTrecho: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
    fontStyle: 'italic',
  },
  btnVoltar: {
    alignSelf: 'flex-start',
    backgroundColor: '#00838F',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  textoBtnVoltar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  btnSair: {
    backgroundColor: '#d9534f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  textoBtnSair: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnCriarPostagem: {
    alignSelf: 'flex-end',
    backgroundColor: '#2496ED',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },

  textoCriarPostagem: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionButtons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    zIndex: 2,
  },
  editButton: {
    marginRight: 8,
  },
  deleteButton: {},
  actionText: {
    fontSize: 18,
    color: '#007bff',
  },
});
