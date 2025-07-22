import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { fetchResumos, deleteResumo } from '../services/api';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from './authContext';  // importe o contexto

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const { setIsLogado, tipoUsuario } = useContext(AuthContext);  // pega o tipo do usuário

  const carregarResumos = async () => {
    try {
      const resumos = await fetchResumos();
      setPosts(resumos);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os resumos');
    }
  };

  const confirmarExclusao = (_id) => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja deletar este post?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteResumo(_id);
              carregarResumos();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível deletar o post');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (isFocused) {
      carregarResumos();
    }
  }, [isFocused]);

  function handleLogout() {
    setIsLogado(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>+Aula</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.btnSair}>
          <Text style={styles.textoBtnSair}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.btnVoltar}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.textoBtnVoltar}>Voltar</Text>
      </TouchableOpacity>

      {tipoUsuario === 'professor' && (
        <TouchableOpacity
          style={styles.btnCriar}
          onPress={() => navigation.navigate('CriarQuiz')}
        >
          <Text style={styles.textoBtnCriar}>+ Nova Publicação</Text>
        </TouchableOpacity>
      )}

    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.postContainer}
          onPress={() =>
            navigation.navigate('Post', {
              id: item._id,
              tema: item.tema,
              resumo: item.resumo,
            })
          }
        >
          <Text style={styles.postTitle}>{item.tema}</Text>
          <Text style={styles.postContent}>{item.resumo}</Text>

          {tipoUsuario === 'professor' && (
            <View style={styles.iconRow}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditarPost', {
                    _id: item._id,
                    tema: item.tema,
                    resumo: item.resumo,
                  })
                }
              >
                <Ionicons name="create-outline" size={24} color="blue" style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmarExclusao(item._id)}>
                <Ionicons name="trash-outline" size={24} color="red" style={styles.icon} />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      )}
    />

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5E1C5',
    paddingTop: 50,
  },
  btnCriar: {
    backgroundColor: '#2496ED',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  textoBtnCriar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 12,
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
  btnVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00838F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  textoBtnVoltar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
  },
});
