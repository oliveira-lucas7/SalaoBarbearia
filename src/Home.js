import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Saloes from "./Saloes";

const dados = [
    {
        id: "01",
        titulo: "Salão 1",
        image: require('../images/SalaoUm.jpg'),
    },
    {
        id: "02",
        titulo: "Salão 2",
        image: require('../images/SalaoDois.jpg'),
    },
    {
        id: "03",
        titulo: "Salão 3",
        image: require('../images/SalaoTres.jpg'),
    },
    {
        id: "04",
        titulo: "Salão 4",
        image: require('../images/SalaoQuatro.jpg'),
    },
    {
        id: "05",
        titulo: "Salão 5",
        image: require('../images/SalaoCinco.jpg'),
    },
    {
        id: "06",
        titulo: "Salão 06",
        image: require('../images/SalaoSeis.jpg'),
    },
    {
        id: "07",
        titulo: "Salão 07",
        image: require('../images/SalaoSete.jpg'),
    },
    {
        id: "08",
        titulo: "Salão 08",
        image: require('../images/SalaoOito.jpg'),
    },
    {
        id: "09",
        titulo: "Salão 09",
        image: require('../images/SalaoNove.jpg'),
    },
    {
        id: "10",
        titulo: "Salão 10",
        image: require('../images/SalaoDez.jpg'),
    },
    {
        id: "11",
        titulo: "Salão 11",
        image: require('../images/SalaoOnze.jpg'),
    },
    {
        id: "12",
        titulo: "Salão 12",
        image: require('../images/SalaoDoze.jpeg'),
    }
];

const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text style={{ flex: 1 }}>{item.titulo}</Text>
    </View>
);

export default function Home({ navigation }) {
    return (
      <View>
        <FlatList
          data={dados}
          renderItem={({ item }) => <Saloes titulo={item.titulo} imagem={item.image} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.container}
          horizontal={false}
          numColumns={2}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
    }
});