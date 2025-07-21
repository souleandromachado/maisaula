import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogado, setIsLogado] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState('');
  const [posts, setPosts] = useState([
  ]);

  return (
    <AuthContext.Provider
      value={{
        isLogado,
        setIsLogado,
        tipoUsuario,
        setTipoUsuario,
        usuarioLogado,
        setUsuarioLogado,
        posts,
        setPosts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
