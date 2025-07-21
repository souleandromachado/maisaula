import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://resumo-service-gz31.onrender.com';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [busca, setBusca] = useState('');
  const [materiaSelecionada, setMateriaSelecionada] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setCarregando(true);
      try {
        const res = await axios.get(`${API_URL}/resumos`);
        setPosts(res.data);
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
        setPosts([]);
      }
      setCarregando(false);
    };

    fetchPosts();
  }, []);

  const materias = [...new Set(posts.map((post) => post.materia).filter(Boolean))];

  const postsMateria = materiaSelecionada
    ? posts.filter(
        (post) => (post.materia || '').toLowerCase() === materiaSelecionada.toLowerCase()
      )
    : posts;

  const postsFiltrados = postsMateria.filter((post) => {
    const textoBusca = busca.toLowerCase();
    return (
      (post.titulo || '').toLowerCase().includes(textoBusca) ||
      (post.autor || '').toLowerCase().includes(textoBusca) ||
      (post.conteudo || '').toLowerCase().includes(textoBusca)
    );
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detalhes', { post: item })}
    >
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.autor}>{item.autor}</Text>
      <Text numberOfLines={2} style={styles.conteudo}>{item.conteudo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por título, autor ou conteúdo"
        value={busca}
        onChangeText={setBusca}
      />

      <View style={styles.filtros}>
        <TouchableOpacity onPress={() => setMateriaSelecionada('')}>
          <Text style={[
            styles.filtro,
            materiaSelecionada === '' && styles.filtroSelecionado
          ]}>
            Todos
          </Text>
        </TouchableOpacity>
        {materias.map((materia) => (
          <TouchableOpacity key={materia} onPress={() => setMateriaSelecionada(materia)}>
            <Text style={[
              styles.filtro,
              materiaSelecionada === materia && styles.filtroSelecionado
            ]}>
              {materia}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={postsFiltrados}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 8, marginBottom: 12,
  },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  filtro: {
    backgroundColor: '#eee', padding: 8,
    borderRadius: 8, marginRight: 8, marginBottom: 8,
  },
  filtroSelecionado: {
    backgroundColor: '#007bff', color: '#fff',
  },
  lista: { paddingBottom: 16 },
  card: {
    backgroundColor: '#f9f9f9', padding: 16,
    borderRadius: 8, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3, elevation: 2,
  },
  titulo: { fontSize: 16, fontWeight: 'bold' },
  autor: { fontSize: 14, color: '#666', marginBottom: 4 },
  conteudo: { fontSize: 14, color: '#333' },
});

export default HomeScreen;
