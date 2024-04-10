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
    setRede(status.isConnected && status.type === Network.NetworkStateType.WIFI);
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
          renderItem={({item}) => (
            <Salao titulo={item} imagem={item.image} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.textInternet}>Conecte-se à internet para ver os seus salões favoritos</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInternet: {
    fontSize: 25,
    textAlign: 'center',
  },
});
