import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroSalao() {
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [casa, setCasa] = useState("");
    const [cep, setCep] = useState("");
    const [enderecosSalvos, setEnderecosSalvos] = useState([]);
    const [exibirCampos, setExibirCampos] = useState(true);

    useEffect(() => {
        obterEnderecosSalvos();
    }, []);

    const salvarEndereco = async () => {
        if (validarCampos()) {
            try {
                const novoEndereco = { rua, bairro, casa, cep };
                const enderecos = [...enderecosSalvos, novoEndereco];
                await AsyncStorage.setItem('enderecos', JSON.stringify(enderecos));
                setEnderecosSalvos(enderecos);
                Alert.alert('Endereço Salvo', 'O endereço foi cadastrado com sucesso!');
            } catch (error) {
                console.error('Erro ao salvar endereço:', error);
                Alert.alert('Erro', 'Não foi possível salvar o endereço. Por favor, tente novamente.');
            }
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
            Alert.alert('Erro', 'Não foi possível obter os endereços salvos.');
        }
    };

    const validarCampos = () => {
        if (!rua || !bairro || !casa || !cep) {
            Alert.alert('Campos Incompletos', 'Por favor, preencha todos os campos.');
            return false;
        }
        return true;
    };

    const renderizarEnderecosSalvos = () => {
        return (
            <ScrollView style={styles.enderecoScrollView}>
                {enderecosSalvos.map((endereco, index) => (
                    <View key={index} style={styles.enderecoSalvo}>
                        <Text style={styles.enderecoText}>Rua: {endereco.rua}</Text>
                        <Text style={styles.enderecoText}>Bairro: {endereco.bairro}</Text>
                        <Text style={styles.enderecoText}>Número: {endereco.casa}</Text>
                        <Text style={styles.enderecoText}>CEP: {endereco.cep}</Text>
                    </View>
                ))}
                <TouchableOpacity onPress={limparEnderecos} style={styles.removerTodos}>
                    <Text style={styles.removerTodosText}>Remover Todos</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    };

    const removerEndereco = async (index) => {
        try {
            const novosEnderecos = [...enderecosSalvos];
            novosEnderecos.splice(index, 1);
            await AsyncStorage.setItem('enderecos', JSON.stringify(novosEnderecos));
            setEnderecosSalvos(novosEnderecos);
            Alert.alert('Endereço Removido', 'O endereço foi removido com sucesso!');
        } catch (error) {
            console.error('Erro ao remover endereço:', error);
            Alert.alert('Erro', 'Não foi possível remover o endereço. Por favor, tente novamente.');
        }
    };

    const limparEnderecos = async () => {
        try {
            await AsyncStorage.removeItem('enderecos');
            setEnderecosSalvos([]);
            Alert.alert('Endereços Removidos', 'Todos os endereços foram removidos com sucesso!');
        } catch (error) {
            console.error('Erro ao limpar endereços:', error);
            Alert.alert('Erro', 'Não foi possível remover todos os endereços. Por favor, tente novamente.');
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <Image source={require('../assets/LogoBarbearia.png')} style={styles.imagem} resizeMode="contain"/>
                    {/* <Text>Cadastro de Cliente</Text> */}
                </View>
                <View style={styles.forms}>
                    {exibirCampos && (
                        <>
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
                                keyboardType="numeric"
                                value={casa}
                                onChangeText={(digitado) => setCasa(digitado)}
                            />
                            <TextInput
                                placeholder="CEP"
                                style={styles.input}
                                keyboardType="numeric"
                                value={cep}
                                onChangeText={(digitado) => setCep(digitado)}
                            />
                            <TouchableOpacity onPress={salvarEndereco} style={styles.cadastro}>
                                <Text style={styles.btnText}>Cadastrar Endereço</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {exibirCampos && enderecosSalvos.length > 0 && (
                        <TouchableOpacity onPress={() => setExibirCampos(false)} style={styles.localizacao}>
                            <Text style={styles.btnText}>Endereços Cadastrados</Text>
                        </TouchableOpacity>
                    )}
                    {!exibirCampos && renderizarEnderecosSalvos()}
                    {!exibirCampos && (
                        <TouchableOpacity onPress={() => setExibirCampos(true)} style={styles.localizacao}>
                            <Text style={styles.btnText}>Voltar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </>
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
        borderRadius: 7,
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
        borderRadius: 7,
        marginTop: 10,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    enderecoScrollView: {
        marginTop: 20,
        width: "100%",
    },
    enderecoSalvo: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 7,
        marginTop: 10,
        elevation: 3,
        alignItems: "center",
    },
    enderecoText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5,
    },
    removerEndereco: {
        marginTop: 5,
        backgroundColor: "#ED2839",
        padding: 8,
        borderRadius: 5,
        alignItems: "center",
    },
    removerEnderecoText: {
        color: "white",
    },
    removerTodos: {
        backgroundColor: "#ED2839",
        borderRadius: 7,
        alignItems: "center",
        width: "100%",
        padding: 15,
        marginTop: 10,
        height: 60,
    },
    removerTodosText: {
        color: "white",
        fontSize: 20,
    },
});
