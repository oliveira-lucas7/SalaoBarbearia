import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [naTelaDeCadastro, setNaTelaDeCadastro] = useState(false);
    const [tipoDeCadastro, setTipoDeCadastro] = useState(false);
    const[ nome, setNome ] = useState("");
    const[ nascimento, setNascimento ] = useState("");
    const[ cpf, setCpf ] = useState("");

    function handleLogin() {
        // Lógica de autenticação aqui
    }

    function alternarTela() {
        setNaTelaDeCadastro(!naTelaDeCadastro);
    }

    function alternarCadastro()
    {
        setTipoDeCadastro(!tipoDeCadastro);
    }

    return (
        <>
            <View style={styles.container}>
                <Image source={require('../assets/LogoBarbearia.png')} style={styles.imagem}/>
                {/* <Text>Cadastro de Cliente</Text> */}
                <Text style={styles.title}>{naTelaDeCadastro ? "Login" : "Cadastro"}</Text>
            </View>
            {naTelaDeCadastro ? 
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

            :

            <View style={styles.forms}>
                <TextInput 
                placeholder="Seu Nome" 
                style={styles.input}
                textInput={nome}    
                onChangeText={ (digitado) => setNome(digitado)}
                value={nome}
                > 
                </TextInput>

                <TextInput 
                placeholder="Data de nascimento" 
                style={styles.input}
                textInput={nascimento}  
                onChangeText={ (digitado) => setNascimento(digitado)}
                value={nascimento}
                >                   
                </TextInput>

                <TextInput 
                placeholder="Seu cpf" 
                style={styles.input}
                textInput={cpf}  
                onChangeText={ (digitado) => setCpf(digitado)}
                value={cpf}
                >                   
                </TextInput>

                <TextInput 
                placeholder="Seu email" 
                style={styles.input}
                textInput={email}  
                onChangeText={ (digitado) => setEmail(digitado)}
                value={email}
                >                   
                </TextInput>

                <TextInput 
                placeholder="Sua senha" 
                style={styles.input}
                textInput={senha}  
                onChangeText={ (digitado) => setSenha(digitado)}
                value={senha}
                >                   
                </TextInput>
        </View>
    }
    
        <View style={styles.containerButton}>
                <TouchableOpacity onPress={handleLogin} style={styles.login}>
                    <Text style={styles.btnText}>{naTelaDeCadastro ? "Login" : "Cadastrar"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={alternarTela}>
                    <Text style={styles.links}>
                        {naTelaDeCadastro ? "Ainda não sou cadastrado" : "Já tenho cadastrado"}
                    </Text>
                </TouchableOpacity>
        </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
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
        width: "75%",
        height: "45%"
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
        marginTop: "-45%",
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
    links: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "blue",
        marginTop: 20
    },
    title: {
        fontSize: 22,
        marginTop: 5
    }
})