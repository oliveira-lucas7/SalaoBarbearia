import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import Saloes from "./Saloes";

const dados = [
    {
        id: "01",
        titulo: "Salão 1",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "02",
        titulo: "Salão 2",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "03",
        titulo: "Salão 3",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "04",
        titulo: "Salão 4",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "05",
        titulo: "Salão 5",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "06",
        titulo: "Salão 06",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "07",
        titulo: "Salão 07",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "08",
        titulo: "Salão 08",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "09",
        titulo: "Salão 09",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "10",
        titulo: "Salão 10",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "11",
        titulo: "Salão 11",
        image: require('../assets/LogoBarbearia.png'),
    },
    {
        id: "12",
        titulo: "Salão 12",
        image: require('../assets/LogoBarbearia.png'),
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
                renderItem={ ({item}) => <Saloes titulo={item.titulo} image={item.image} />}
                keyExtractor={ item => item.id}
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