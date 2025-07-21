import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from './authContext';

export default function LoginScreen({ navigation }) {
  const { setIsLogado, setTipoUsuario, setUsuarioLogado } = useContext(AuthContext);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (senha === '1234') {
      if (usuario === 'professor1') {
        setIsLogado(true);
        setTipoUsuario('professor');
        setUsuarioLogado(usuario);
      } else if (usuario === 'aluno1') {
        setIsLogado(true);
        setTipoUsuario('aluno');
        setUsuarioLogado(usuario);
      } else {
        Alert.alert('Erro', 'Usuário inválido');
      }
    } else {
      Alert.alert('Erro', 'Usuário ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>+Aula</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#ccc"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.botaoPadrao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E1C5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#000',
    width: '100%'
  },
  botaoPadrao: {
    backgroundColor: '#2496ED',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
});
