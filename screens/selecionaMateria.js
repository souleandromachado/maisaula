import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from './authContext';

export default function SelecionarMateriaScreen({ navigation }) {
  const { tipoUsuario, usuarioLogado, setIsLogado } = useContext(AuthContext);

  const materiasPorProfessor = {
    professor1: 'História',
  };

  const materiasDisponiveisParaAlunos = ['História'];

  const handleSelecionar = (materia) => {
    navigation.navigate('Home', { materiaSelecionada: materia });
  };

  const renderMaterias = () => {
    if (tipoUsuario === 'professor') {
      const materia = materiasPorProfessor[usuarioLogado];
      return (
        <TouchableOpacity
          style={styles.botaoMateria}
          onPress={() => handleSelecionar(materia)}
        >
          <Text style={styles.textoBotao}>{materia}</Text>
        </TouchableOpacity>
      );
    } else {
      return materiasDisponiveisParaAlunos.map((materia) => (
        <TouchableOpacity
          key={materia}
          style={styles.botaoMateria}
          onPress={() => handleSelecionar(materia)}
        >
          <Text style={styles.textoBotao}>{materia}</Text>
        </TouchableOpacity>
      ));
    }
  };

  function handleLogout() {
    setIsLogado(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>+Aula</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.btnSair}>
          <Text style={styles.textoBtnSair}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>Selecione a Matéria</Text>
      {renderMaterias()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E1C5',
    padding: 20,
    paddingTop: 40
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botaoMateria: {
    backgroundColor: '#2496ED',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
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
});
