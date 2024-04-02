import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useState } from "react";

export default function CadastroSalao() {
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [casa, setCasa] = useState("");
    const [cep, setCep] = useState("");

    function Salvar() {
        // Implemente a lógica de salvar aqui
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <Image source={require('../assets/LogoBarbearia.png')} style={styles.imagem} resizeMode="contain"/>
                {/* <Text>Cadastro de Cliente</Text> */}
            </View>
            <View style={styles.forms}>
                <TextInput
                    placeholder="Nome da Rua"
                    style={styles.input}
                    value={rua}
                    onChangeText={(digitado) => setRua(digitado)}
                />
                <TextInput
                    placeholder="Seu CNPJ"
                    style={styles.input}
                    value={bairro}
                    onChangeText={(digitado) => setBairro(digitado)}
                />
                <TextInput
                    placeholder="Seu Endereço"
                    style={styles.input}
                    value={casa}
                    onChangeText={(digitado) => setCasa(digitado)}
                />
                <TextInput
                    placeholder="Seu Email"
                    style={styles.input}
                    value={cep}
                    onChangeText={(digitado) => setCep(digitado)}
                />
                <TouchableOpacity onPress={Salvar} style={styles.localizacao}>
                    <Text style={styles.btnText}>Usar Localização Atual</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Salvar} style={styles.cadastro}>
                    <Text style={styles.btnText}>Cadastrar Endereço</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    container: {
        alignItems: "center",
        marginTop: 20,
    },
    imagem: {
        width: windowWidth * 0.7, // Definindo a largura da imagem como 70% da largura da tela
        height: windowHeight * 0.3, // Definindo a altura da imagem como 30% da altura da tela
    },
    input: {
        width: "100%",
        height: 60,
        borderBottomWidth: 2,
        padding: 2,
        marginTop: 10, // Reduzindo a margem superior dos inputs
    },
    forms: {
        width: "90%",
        alignItems: "center",
        alignSelf: "center",
        marginTop: -50,
    },
    cadastro: {
        backgroundColor: "#365CAB",
        color: "white",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "white",
        fontSize: 20,
    },
    salao: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "blue",
    },
    localizacao: {
        backgroundColor: "#ED2839",
        color: "white",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
});