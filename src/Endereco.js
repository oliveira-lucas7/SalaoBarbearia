import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroSalao() {
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [casa, setCasa] = useState("");
    const [cep, setCep] = useState("");
    const [enderecosSalvos, setEnderecosSalvos] = useState([]);

    useEffect(() => {
        obterEnderecosSalvos();
    }, []);

    const salvarEndereco = async () => {
        try {
            const novoEndereco = { rua, bairro, casa, cep };
            const enderecos = [...enderecosSalvos, novoEndereco];
            await AsyncStorage.setItem('enderecos', JSON.stringify(enderecos));
            setEnderecosSalvos(enderecos);
        } catch (error) {
            console.error('Erro ao salvar endereço:', error);
        }
    };

    const obterEnderecosSalvos = async () => {
        try {
            const enderecosJSON = await AsyncStorage.getItem('enderecos');
            if (enderecosJSON) {
                setEnderecosSalvos(JSON.parse(enderecosJSON));
            }
        } catch (error) {
            console.error('Erro ao obter endereços salvos:', error);
        }
    };

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
                    placeholder="Seu Bairro"
                    style={styles.input}
                    value={bairro}
                    onChangeText={(digitado) => setBairro(digitado)}
                />
                <TextInput
                    placeholder="Número da Casa"
                    style={styles.input}
                    value={casa}
                    onChangeText={(digitado) => setCasa(digitado)}
                />
                <TextInput
                    placeholder="CEP"
                    style={styles.input}
                    value={cep}
                    onChangeText={(digitado) => setCep(digitado)}
                />
                <TouchableOpacity onPress={salvarEndereco} style={styles.cadastro}>
                    <Text style={styles.btnText}>Cadastrar Endereço</Text>
                </TouchableOpacity>
                {enderecosSalvos.length > 0 && (
                    <TouchableOpacity onPress={() => console.log(enderecosSalvos)} style={styles.localizacao}>
                        <Text style={styles.btnText}>Endereço Cadastrado</Text>
                    </TouchableOpacity>
                )}
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
        width: windowWidth * 0.7,
        height: windowHeight * 0.3,
    },
    input: {
        width: "100%",
        height: 60,
        borderBottomWidth: 2,
        padding: 2,
        marginTop: 10,
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
