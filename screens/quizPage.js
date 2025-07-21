import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './authContext';

const perguntas = [
  {
    pergunta: 'Qual é a capital do Brasil?',
    opcoes: ['São Paulo', 'Brasília', 'Rio de Janeiro', 'Salvador'],
    respostaCorreta: 'Brasília',
  },
  {
    pergunta: 'Quem escreveu "Dom Casmurro"?',
    opcoes: ['Machado de Assis', 'Clarice Lispector', 'Carlos Drummond', 'Cecília Meireles'],
    respostaCorreta: 'Machado de Assis',
  },
  {
    pergunta: 'Qual é o resultado de 7 x 8?',
    opcoes: ['54', '56', '58', '60'],
    respostaCorreta: '56',
  },
  {
    pergunta: 'Qual é o elemento químico representado por "O"?',
    opcoes: ['Ouro', 'Oxigênio', 'Prata', 'Ferro'],
    respostaCorreta: 'Oxigênio',
  },
  {
    pergunta: 'Em que continente está o Egito?',
    opcoes: ['Ásia', 'Europa', 'África', 'América'],
    respostaCorreta: 'África',
  },
];

export default function QuizScreen() {
  const navigation = useNavigation();
  const [respostas, setRespostas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [nota, setNota] = useState(0);
  const { setIsLogado } = useContext(AuthContext);

  const selecionarResposta = (indexPergunta, resposta) => {
    if (!mostrarResultado) {
      setRespostas({ ...respostas, [indexPergunta]: resposta });
    }
  };

  const finalizarQuiz = () => {
    let acertos = 0;
    perguntas.forEach((p, i) => {
      if (respostas[i] === p.respostaCorreta) {
        acertos += 1;
      }
    });
    setNota(acertos);
    setMostrarResultado(true);
  };

  const voltarParaMaterias = () => {
    navigation.navigate('SelecionarMateria');
  };

  function handleLogout() {
    setIsLogado(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>+Aula</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.btnSair}>
          <Text style={styles.textoBtnSair}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>Teste de conhecimento</Text>

      {perguntas.map((p, index) => (
        <View key={index} style={styles.perguntaContainer}>
          <Text style={styles.pergunta}>{index + 1}. {p.pergunta}</Text>
          {p.opcoes.map((opcao, i) => (
            <TouchableOpacity
              key={i}
              disabled={mostrarResultado}
              style={[
                styles.botaoOpcao,
                respostas[index] === opcao && styles.opcaoSelecionada,
                mostrarResultado && styles.opcaoDesabilitada
              ]}
              onPress={() => selecionarResposta(index, opcao)}
            >
              <Text style={styles.textoOpcao}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {!mostrarResultado && (
        <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarQuiz}>
          <Text style={styles.textoBotaoFinalizar}>Finalizar Quiz</Text>
        </TouchableOpacity>
      )}

      {mostrarResultado && (
        <>
          <Text style={styles.resultado}>Você acertou {nota} de {perguntas.length} perguntas.</Text>
          <TouchableOpacity style={styles.botaoVoltar} onPress={voltarParaMaterias}>
            <Text style={styles.textoBotaoFinalizar}>Voltar para Matérias</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5E1C5',
    flexGrow: 1,
    paddingTop: 50
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  perguntaContainer: {
    marginBottom: 25,
  },
  pergunta: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botaoOpcao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  opcaoSelecionada: {
    backgroundColor: '#CDE8FF',
    borderColor: '#2496ED',
  },
  opcaoDesabilitada: {
    opacity: 0.6,
  },
  textoOpcao: {
    fontSize: 16,
    color: '#000',
  },
  botaoFinalizar: {
    backgroundColor: '#2496ED',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoVoltar: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  textoBotaoFinalizar: {
    color: '#fff',
    fontSize: 18,
  },
  resultado: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
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
