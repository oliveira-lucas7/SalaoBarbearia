import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ setLogado }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [naTelaDeCadastro, setNaTelaDeCadastro] = useState(false);
    const [tipoDeCadastro, setTipoDeCadastro] = useState(false);
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [salao, setSalao] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");
    const [erro, setErro] = useState( false );

    async function handleLogin() {
        
        if( email == "lucas@gmail.com" && senha == "123")
        {
            await AsyncStorage.setItem('usuario', email);
            setLogado(true);
        } else 
        {
            setErro(true);
        }
    }

    function alternarTela() {
        setNaTelaDeCadastro(!naTelaDeCadastro);
    }

    function alternarCadastro() {
        setTipoDeCadastro(!tipoDeCadastro);
    }

    return (
        <>
            <View style={styles.container}>
                <Image source={require('../assets/LogoBarbearia.png')} style={styles.imagem} />
                <Text style={styles.title}>{naTelaDeCadastro ? "Login" : tipoDeCadastro ? "Cadastro de Cliente" : "Cadastro de Barbeiro"}</Text>
            </View>
            {naTelaDeCadastro ? (
                <View style={styles.forms}>
                    <TextInput
                        placeholder="Seu Email"
                        style={styles.input}
                        onChangeText={(digitado) => setEmail(digitado)}
                        value={email}
                    />
                    <TextInput
                        placeholder="Sua Senha"
                        style={styles.input}
                        onChangeText={(digitado) => setSenha(digitado)}
                        value={senha}
                        secureTextEntry={true}
                    />
                </View>
            ) : (
                <View style={styles.forms}>
                    {tipoDeCadastro ? (
                        <View style={styles.container}>
                            <TextInput
                                placeholder="Seu Nome"
                                style={styles.input}
                                onChangeText={(digitado) => setNome(digitado)}
                                value={nome}
                            />
                            <TextInput
                                placeholder="Data de Nascimento"
                                style={styles.input}
                                onChangeText={(digitado) => setNascimento(digitado)}
                                value={nascimento}
                            />
                            <TextInput
                                placeholder="Seu CPF"
                                style={styles.input}
                                onChangeText={(digitado) => setCpf(digitado)}
                                value={cpf}
                            />
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <TextInput
                                placeholder="Nome do Salão"
                                style={styles.input}
                                onChangeText={(digitado) => setSalao(digitado)}
                                value={salao}
                            />
                            <TextInput
                                placeholder="Seu CNPJ ou CPF"
                                style={styles.input}
                                onChangeText={(digitado) => setCnpj(digitado)}
                                value={cnpj}
                            />
                            <TextInput
                                placeholder="Seu Endereço"
                                style={styles.input}
                                onChangeText={(digitado) => setEndereco(digitado)}
                                value={endereco}
                            />
                        </View>
                    )}
                    <TextInput
                        placeholder="Seu Email"
                        style={styles.input}
                        onChangeText={(digitado) => setEmail(digitado)}
                        value={email}
                    />
                    <TextInput
                        placeholder="Sua Senha"
                        style={styles.input}
                        onChangeText={(digitado) => setSenha(digitado)}
                        value={senha}
                        secureTextEntry={true}
                    />
                </View>
            )}
            <View style={styles.containerButton}>
                <TouchableOpacity onPress={handleLogin} style={styles.login}>
                    <Text style={styles.btnText}>{naTelaDeCadastro ? "Login" : tipoDeCadastro ? "Cadastrar" : "Cadastrar Salão"}</Text>
                </TouchableOpacity>
                {naTelaDeCadastro ? "" : tipoDeCadastro ? "" :
                <TouchableOpacity style={styles.local}>
                    <Text style={styles.btnText}>Usar Localização Atual</Text>
                </TouchableOpacity>
                }
                <TouchableOpacity onPress={alternarTela}>
                    <Text style={styles.links}>
                        {naTelaDeCadastro ? "Ainda não sou Cadastrado" : "Já sou Cadastrado"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={alternarCadastro}>
                    <Text style={styles.linksSalao}>
                        {naTelaDeCadastro ? "" : tipoDeCadastro ? "Cadastrar-Se Como Barbeiro" : "Cadastrar-Se Como Cliente"}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginTop: "10%",
    },
    containerButton: {
        width: "100%",
        marginTop: -15,
        display: "flex",
        margin: 'auto',
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    imagem: {
        width: "50%",
        height: "40%"
    },
    input: {
        width: "100%",
        height: 60,
        borderBottomWidth: 2,
        padding: 2,
        marginVertical: 10,
        display: "flex",
    },
    forms: {
        width: "90%",
        marginTop: "-50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        // marginTop: 10,
    },
    btnText: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
    },
    login: {
        backgroundColor: "#365CAB",
        color: "white",
        width: "90%",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        height: 60,
        display: "flex",
        margin: 'auto',
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    },

    local: {
        backgroundColor: "#ED2839",
        color: "white",
        width: "90%",
        padding: 15,
        borderRadius: 10,
        marginTop: 5,
        height: 60,
        display: "flex",
        margin: 'auto',
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    },


    links: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "blue",
        marginTop: 20
    },
    linksSalao: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "blue",
        marginTop: 10,
    },
    title: {
        fontSize: 22,
        marginTop: 5
    },
    
})