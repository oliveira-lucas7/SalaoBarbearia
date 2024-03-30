import React from 'react';
import { View, FlatList } from 'react-native';
import Salao from './Saloes';
import { useFavoritos } from '../src/Context/FavoritosContext';

export default function Favoritos() {
  const { favoritos } = useFavoritos();

  return (
    <View>
      <FlatList
        data={favoritos}
        renderItem={({ item }) => <Salao titulo={item} image={item.image} />} // Passar também a propriedade image
        keyExtractor={(item) => item.id} // Use a propriedade id como chave
        numColumns={2} // Definir dois itens por coluna
      />
    </View>
  );
}