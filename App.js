import React from 'react';
import Rotas from './src/Rotas';
import UserProvider from './src/Context/UserContext';
import { FavoritosProvider } from './src/Context/FavoritosContext'; 

export default function App() {
  return (
    <UserProvider>
      <FavoritosProvider>
        <Rotas />
      </FavoritosProvider>
    </UserProvider>
  );
}
