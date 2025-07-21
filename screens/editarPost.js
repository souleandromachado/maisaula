import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

const EditarPost = ({ route, navigation }) => {
  const { id, titulo, conteudo, materia } = route.params;

  const [novoTitulo, setNovoTitulo] = useState(titulo);
  const [novoConteudo, setNovoConteudo] = useState(conteudo);

  const salvarEdicao = async () => {
    try {
      await axios.put(`${API_URL}/resumos/${id}`, {
        titulo: novoTitulo,
        conteudo: novoConteudo,
        materia,
      });
      Alert.alert('Sucesso', 'Postagem atualizada com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a postagem');
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Salvar Alterações" onPress={salvarEdicao} />
    </View>
  );
};

export default EditarPost;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
  },
});
