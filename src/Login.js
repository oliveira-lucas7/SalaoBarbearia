import React, { useContext, useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from './Context/UserContext'
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location'

export default function Login() {

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
    

    const [location, setLocation] = useState();
    const [errorMsg, setErrorMsg] = useState();

    const mapRef = useRef();

    const {Login} = useContext( UserContext );

    function realizaLogin() {
        
        Login(email, senha)
    }

    function alternarTela() {
        setNaTelaDeCadastro(!naTelaDeCadastro);
    }

    function alternarCadastro() {
        setTipoDeCadastro(!tipoDeCadastro);
    }

    async function getLocation()
    {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Algo deu erro, tente novamente!');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }

    useEffect( () => {
        getLocation();

        Location.watchPositionAsync({
            accuracy: Location.LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, ( response ) => {
            setLocation( response );
            mapRef.current?.animateCamera({
                center: response.coords
            })
        })

    }, []);


    return (
        <>  
                <View style={styles.containerImg}>
                    <Image source={require('../assets/LogoBarbearia.png')} style={styles.imagem} />
                    <Text style={styles.title}>{naTelaDeCadastro ? "Login" : tipoDeCadastro ? "Cadastro de Cliente" : "Cadastro de Barbeiro"}</Text>
                </View>
                {naTelaDeCadastro ? (
                    <View style={styles.formsLogin}>
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
                <ScrollView>
                    <View style={styles.containerButton}>
                        <TouchableOpacity onPress={realizaLogin} style={styles.login}>
                            <Text style={styles.btnText}>{naTelaDeCadastro ? "Login" : tipoDeCadastro ? "Cadastrar" : "Cadastrar Salão"}</Text>
                        </TouchableOpacity>
                        {/* {naTelaDeCadastro ? "" : tipoDeCadastro ? "" :
                        <TouchableOpacity style={styles.local}>
                            <Text style={styles.btnText}>Usar Localização Atual</Text>
                        </TouchableOpacity>
                        } */}
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
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginTop: "6%",
    },
    containerImg: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginTop: "3%",
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
        marginTop: "-38%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    formsLogin: {
        width: "90%",
        marginTop: "-33%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
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