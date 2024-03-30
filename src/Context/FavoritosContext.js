import React, { createContext, useState, useContext } from 'react';

const FavoritosContext = createContext();

export const useFavoritos = () => useContext(FavoritosContext);

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (titulo) => {
    setFavoritos((prevFavoritos) => {
      if (prevFavoritos.includes(titulo)) {
        return prevFavoritos.filter((item) => item !== titulo);
      } else {
        return [...prevFavoritos, titulo];
      }
    });
  };

  const isFavorito = (titulo) => favoritos.includes(titulo);

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};