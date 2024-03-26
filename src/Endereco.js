import { Image, Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function CadastroSalao()
{

    const[ rua, setRua ] = useState("");
    const[ bairro, setBairro ] = useState("");
    const[ casa, setCasa ] = useState("");
    const[ cep, setCep ] = useState("");

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
                    placeholder="Nome da Rua" 
                    style={styles.input}
                    textInput={rua}    
                    onChangeText={ (digitado) => setRua(digitado)}
                    value={rua}
                    > 
                    </TextInput>

                    <TextInput 
                    placeholder="Seu CNPJ" 
                    style={styles.input}
                    textInput={bairro}  
                    onChangeText={ (digitado) => setBairro(digitado)}
                    value={bairro}
                    >                   
                    </TextInput>

                    <TextInput 
                    placeholder="Seu Endereço" 
                    style={styles.input}
                    textInput={casa}  
                    onChangeText={ (digitado) => setCasa(digitado)}
                    value={casa}
                    >                   
                    </TextInput>

                    <TextInput 
                    placeholder="Seu Email" 
                    style={styles.input}
                    textInput={cep}  
                    onChangeText={ (digitado) => setCep(digitado)}
                    value={cep}
                    >                   
                    </TextInput>

                    <TouchableOpacity onPress={Salvar} style={styles.localizacao}>
                        <Text style={styles.btnText}>Usar Localização Atual</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Salvar} style={styles.cadastro}>
                        <Text style={styles.btnText}>Cadastrar Endereço</Text>
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
        marginTop: 50,
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
        marginTop: 20,
        marginVertical: 10,
        display: "flex",
    },
    forms: {
        width: "90%",
        marginTop: "-55%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        // marginTop: 10,
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