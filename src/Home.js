import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image, useWindowDimensions } from 'react-native';
import Saloes from './Saloes'

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

const imagens = [
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

const Carrossel = () => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const screenWidth = useWindowDimensions().width;

    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % imagens.length;
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        }, 3000); // 3 segundos de intervalo entre cada imagem

        return () => clearInterval(timer);
    }, [currentIndex]);

    const renderItem = ({ item }) => {
        return (
            <Image
                source={item.image}
                style={[styles.imagem, { width: screenWidth }]}
                resizeMode="cover"
            />
        );
    };

    return (
        <View style={styles.carrosselContainer}>
            <FlatList
                ref={flatListRef}
                data={imagens}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.floor(
                        event.nativeEvent.contentOffset.x / screenWidth
                    );
                    setCurrentIndex(newIndex);
                }}
            />
        </View>
    );
};

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Carrossel />
            <FlatList
                data={dados}
                renderItem={({ item }) => <Saloes titulo={item.titulo} imagem={item.image} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContainer}
                horizontal={false}
                numColumns={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListContainer: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    carrosselContainer: {
        height: 200,
    },
    imagem: {
        height: '100%',
    },
});