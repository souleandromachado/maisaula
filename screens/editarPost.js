import React, { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';
import { AuthContext } from './authContext';

const EditarPost = ({ route, navigation }) => {
  const { _id, tema, resumo } = route.params;

  const [novoTitulo, setNovoTitulo] = useState(tema);
  const [novoConteudo, setNovoConteudo] = useState(resumo);
  const { setIsLogado } = useContext(AuthContext);

  const salvarEdicao = async () => {
    try {
      await axios.put(`${API_URL}/resumos/${_id}`, {
        tema: novoTitulo,
        resumo: novoConteudo,
      });
      Alert.alert('Sucesso', 'Postagem atualizada com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a postagem');
    }
  };

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

      <TextInput
        style={styles.input}
        value={novoTitulo}
        onChangeText={setNovoTitulo}
        placeholder="Título"
      />
      <TextInput
        style={[styles.input, { height: 120 }]}
        value={novoConteudo}
        onChangeText={setNovoConteudo}
        placeholder="Conteúdo"
        multiline
      />
      <TouchableOpacity style={styles.btnSalvar} onPress={salvarEdicao}>
        <Text style={styles.textoBtnSalvar}>Salvar Alterações</Text>
      </TouchableOpacity>

    </View>
  );
};

export default EditarPost;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
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
  textoBtnSalvar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnSalvar: {
    backgroundColor: '#2496ED',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 10,
  },
});
