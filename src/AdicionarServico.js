import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function AdicionarServico()
{

    const[ servico, setServico ] = useState("");
    const[ profissional, setProfissional ] = useState("");
    const[ tempo, setTempo ] = useState("");
    const[ preco, setPreco ] = useState("");

    function Salvar()
    {
        
    }

    return(
        <>
            <View style={styles.container}>
                <Image source={require('../assets/LogoBarbearia.png')} style={styles.imagem}/>
                {/* <Text>Cadastro de Cliente</Text> */}
            </View>
            <View style={styles.forms}>
                    <TextInput 
                    placeholder="Nome do Serviço" 
                    style={styles.input}
                    textInput={servico}    
                    onChangeText={ (digitado) => setServico(digitado)}
                    value={servico}
                    > 
                    </TextInput>

                    <TextInput 
                    placeholder="Profissional" 
                    style={styles.input}
                    textInput={profissional}  
                    onChangeText={ (digitado) => setProfissional(digitado)}
                    value={profissional}
                    >                   
                    </TextInput>

                    <TextInput 
                    placeholder="Tempo" 
                    style={styles.input}
                    textInput={tempo}  
                    onChangeText={ (digitado) => setTempo(digitado)}
                    value={tempo}
                    >                   
                    </TextInput>

                    <TextInput 
                    placeholder="Preço" 
                    style={styles.input}
                    textInput={preco}  
                    onChangeText={ (digitado) => setPreco(digitado)}
                    value={preco}
                    >                   
                    </TextInput>

                    <TouchableOpacity onPress={Salvar} style={styles.cadastro}>
                        <Text style={styles.btnText}>Adicionar Serviço</Text>
                    </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 70,
        display: "flex",
        alignItems: "center",
    },
    imagem: {
        width: "70%",
        height: "50%"
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
    },
    cadastro: {
        backgroundColor: "#365CAB",
        color: "white",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        height: 60,
    },
    btnText: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
    },
    salao: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "blue"
    },
    localizacao: {
        backgroundColor: "#ED2839",
        color: "white",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        height: 60,
    }
})