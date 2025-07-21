import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from './authContext';

// ⬇️ Substitua pelo IP do seu backend local
const API_URL = 'https://resumo-service-gz31.onrender.com/';

export default function CriarQuizScreen({ navigation }) {
  const { usuarioLogado, setIsLogado } = useContext(AuthContext);

  const [tema, setTema] = useState('');
  const [resumo, setResumo] = useState('');
  const [perguntas, setPerguntas] = useState([]);
  const [respostasUsuario, setRespostasUsuario] = useState({});
  const [quizCriado, setQuizCriado] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [questaoId, setQuestaoId] = useState('');
  const [loading, setLoading] = useState(false);

  const gerarQuiz = async () => {
    if (!tema.trim()) {
      Alert.alert('Erro', 'Informe o tema para gerar o quiz.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/resumo`, { tema });
      setResumo(res.data.resumo);
      setPerguntas(res.data.perguntas);
      setQuestaoId(res.data.id); // Guarda o ID do quiz
      setQuizCriado(true);
      setResultado(null);
      setRespostasUsuario({});
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível gerar o quiz.');
    }
    setLoading(false);
  };

  const responder = (numero, resposta) => {
    setRespostasUsuario(prev => ({ ...prev, [numero]: resposta }));
  };

  const enviarRespostas = async () => {
    const respostasArray = Object.entries(respostasUsuario).map(([numero, resposta]) => ({
      numero: Number(numero),
      resposta,
    }));

    if (respostasArray.length !== perguntas.length) {
      Alert.alert('Erro', 'Responda todas as perguntas antes de enviar.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/teste`, {
        aluno: usuarioLogado,
        questaoId,
        respostas: respostasArray,
      });
      setResultado(res.data);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao enviar respostas.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setIsLogado(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.header}>
        <Text style={styles.logo}>+Aula</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.btnSair}>
          <Text style={styles.textoBtnSair}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVoltar}>
        <Text style={styles.textoBtnVoltar}>← Voltar para postagens</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Criar nova postagem</Text>

      {!quizCriado ? (
        <>
          <TextInput
            placeholder="Digite o tema para o quiz"
            value={tema}
            onChangeText={setTema}
            style={styles.input}
          />
          <TouchableOpacity style={styles.botao} onPress={gerarQuiz}>
            <Text style={styles.textoBotao}>Gerar Quiz</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitulo}>Resumo:</Text>
          <Text style={styles.resumo}>{resumo}</Text>

          <Text style={styles.subtitulo}>Perguntas:</Text>
          {perguntas.map((p, i) => (
            <View key={i} style={styles.perguntaContainer}>
              <Text style={styles.perguntaTexto}>
                {p.numero}. {p.pergunta}
              </Text>
              {p.opcoes.map((opcao, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.opcao,
                    respostasUsuario[p.numero] === opcao && styles.opcaoSelecionada,
                  ]}
                  onPress={() => responder(p.numero, opcao)}
                >
                  <Text>{opcao}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {resultado ? (
            <View style={styles.resultado}>
              <Text>Você acertou {resultado.pontuacao} de {resultado.total} perguntas.</Text>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => {
                  setQuizCriado(false);
                  setTema('');
                  setPerguntas([]);
                  setRespostasUsuario({});
                  setResultado(null);
                }}
              >
                <Text style={styles.textoBotao}>Criar outro quiz</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.botao} onPress={enviarRespostas}>
              <Text style={styles.textoBotao}>Enviar Respostas</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#F5E1C5',
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#2496ED',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  resumo: {
    fontSize: 16,
    marginBottom: 20,
  },
  perguntaContainer: {
    marginBottom: 15,
  },
  perguntaTexto: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  opcao: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#999',
    marginBottom: 6,
  },
  opcaoSelecionada: {
    backgroundColor: '#CDE8FF',
    borderColor: '#2496ED',
  },
  resultado: {
    marginTop: 20,
    alignItems: 'center',
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
});
