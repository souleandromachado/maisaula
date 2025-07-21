import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './screens/authContext';

import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import PostScreen from './screens/postScreen';
import SelecionarMateriaScreen from './screens/selecionaMateria';
import QuizScreen from './screens/quizPage';
import CriarQuizScreen from './screens/createQuizScreen';
import EditarPost from './screens/editarPost';

const Stack = createNativeStackNavigator();

function Routes() {
  const { isLogado, tipoUsuario } = React.useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLogado ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <Stack.Screen name="SelecionarMateria" component={SelecionarMateriaScreen} />
          <Stack.Screen name="QuizScreen" component={QuizScreen} />

          {tipoUsuario === 'professor' ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="CriarQuiz" component={CriarQuizScreen} />
              <Stack.Screen name="Post" component={PostScreen} />
              <Stack.Screen name="EditarPost" component={EditarPost} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Post" component={PostScreen} />
            </>
          )}
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
