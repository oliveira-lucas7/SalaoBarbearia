import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Salao from './Saloes';
import { useFavoritos } from '../src/Context/FavoritosContext';
import * as Network from 'expo-network';

export default function Favoritos({ titulo, imagem }) {
  const { favoritos } = useFavoritos();
  const [rede, setRede] = useState(false);

  async function getStatus() {
    const status = await Network.getNetworkStateAsync();
    if (status.isConnected && status.type === Network.NetworkStateType.WIFI) {
      setRede(true);
    } else {
      setRede(false);
    }
  }

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    getStatus();
  }, [rede]);

  return (
    <View>
      {rede ? (
        <FlatList
          data={favoritos}
          renderItem={({ item }) => (
            <Salao titulo={item} imagem={item.image} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      ) : (
        <Text style={styles.textInternet}>Conecte-se a internet para ver os seus salões favoritos</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInternet: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 25,
  },
})