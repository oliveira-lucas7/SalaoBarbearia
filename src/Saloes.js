import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Saloes({ titulo, image }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{titulo}</Text>
            <Image source={image} style={styles.img} />
            <TouchableOpacity style={styles.servico}>
              <Text>Serviços</Text>
            </TouchableOpacity>
            <View style={styles.buttoms}>
              <TouchableOpacity style={styles.ContainerButUm}>
                <MaterialCommunityIcons name="calendar-month-outline" style={styles.butUm}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ContainerButDois}>
                <MaterialCommunityIcons name="heart-outline" style={styles.butUm}/>
              </TouchableOpacity>
            </View>
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
    }
});
