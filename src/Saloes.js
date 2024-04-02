import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavoritos } from '../src/Context/FavoritosContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Salao({ titulo, imagem }) {
  const { toggleFavorito, isFavorito } = useFavoritos();

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{titulo}</Text>
      <Image source={imagem} style={styles.img} />
      <TouchableOpacity onPress={() => toggleFavorito(titulo)} style={styles.ContainerButDois}>
        <View style={styles.butBottom}>
          <MaterialCommunityIcons name={isFavorito(titulo) ? "heart" : "heart-outline"} style={styles.butUm} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: "45%",
        margin: 10,
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        alignItems: "center",
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
    }, 
    img: {
      width: 70,
      height: 150,
      bottom: 10
    },
    buttoms: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-bettwen",
    },
    ContainerButUm: {
      marginRight: 53,
    },
    butUm: {
      fontSize: 38,
    },
    servico: {
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'black', 
      paddingTop: 7,
      paddingBottom: 7,
      paddingLeft: 35,
      paddingRight: 35,
      bottom: 15,
    },
    button: {
      width: 140,
      paddingVertical: 7,
      marginBottom: 20,
      borderWidth: 2,
      borderRadius: 5,
      textAlign: "center",
      alignItems: "center"
    },
    butBottom: {
      display: 'flex',
      flexDirection: "row",
      justifyContent: 'space-between'
    },
    buttonText: {
      fontSize: 14,
    }
});