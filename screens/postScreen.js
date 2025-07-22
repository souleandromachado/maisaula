import React, { useLayoutEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from './authContext';
import QuizScreen from './quizPage';

export default function PostScreen({ route, navigation }) {
  const { id, tema, resumo } = route.params;
  const { setIsLogado } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: {
        backgroundColor: '#F5E1C5',
      },
      headerTitleStyle: {
        color: '#00838F',
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const handleDeletar = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja deletar esta postagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => {
            onDelete(_id);
            navigation.goBack();
          },
        },
      ]
    );
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

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVoltar}>
        <Text style={styles.textoBtnVoltar}>← Voltar para postagens</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{tema}</Text>
      <Text style={styles.content}>{resumo}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('QuizScreen')} style={styles.btnQuiz}>
        <Text style={styles.textoBtnVoltar}>Fazer o quiz</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#F5E1C5'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00838F'
  },
  autor: {
    fontSize: 16,
    color: '#00838F',
    marginBottom: 20
  },
  conteudo: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333'
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
    alignSelf: 'flex-start',
    backgroundColor: '#00838F',
    borderRadius: 10,
    marginTop: 10,
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
    btnQuiz: {
    alignSelf: 'flex-start',
    backgroundColor: '#00838F',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  content: {
    fontSize: 16,
    lineHeight: 22
  },
});
