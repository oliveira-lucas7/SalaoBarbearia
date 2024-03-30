import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Agendar() {
    const [salao, setSalao] = useState("");
    const [servico, setServico] = useState("");
    const [horario, setHorario] = useState("");
    const [tipoDeAgenda, setTipoDeAgenda] = useState(false);
    const [eventosAgendados, setEventosAgendados] = useState([]);

    useEffect(() => {
        carregarEventosAgendados();
    }, []);

    const salvarEvento = async () => {
        try {
            const novoEvento = { salao, servico, horario };
            const novosEventos = [...eventosAgendados, novoEvento];
            await AsyncStorage.setItem('eventosAgendados', JSON.stringify(novosEventos));
            setEventosAgendados(novosEventos);
            limparCampos();
            setTipoDeAgenda(true);
        } catch (error) {
            console.error('Erro ao salvar evento:', error);
        }
    };

    const carregarEventosAgendados = async () => {
        try {
            const eventosJSON = await AsyncStorage.getItem('eventosAgendados');
            if (eventosJSON !== null) {
                const eventos = JSON.parse(eventosJSON);
                setEventosAgendados(eventos);
            }
        } catch (error) {
            console.error('Erro ao carregar eventos agendados:', error);
        }
    };

    const limparCampos = () => {
        setSalao("");
        setServico("");
        setHorario("");
    };

    const limparEventos = async () => {
        try {
            await AsyncStorage.removeItem('eventosAgendados');
            setEventosAgendados([]);
        } catch (error) {
            console.error('Erro ao limpar eventos agendados:', error);
        }
    };

    const alternarAgenda = () => {
        if (salao !== "" && servico !== "" && horario !== "") {
            salvarEvento();
        }
        setTipoDeAgenda(!tipoDeAgenda);
    };

    const excluirEvento = async (index) => {
        try {
            const novosEventos = eventosAgendados.filter((evento, i) => i !== index);
            await AsyncStorage.setItem('eventosAgendados', JSON.stringify(novosEventos));
            setEventosAgendados(novosEventos);
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Image source={require('../assets/LogoBarbearia.png')} style={styles.imagem} />
                <Text style={styles.title}>{tipoDeAgenda ? "Agendar" : "Agendados"}</Text>
            </View>
            {tipoDeAgenda ? (
                <View style={styles.forms}>
                    <TextInput
                        placeholder="Salão"
                        style={styles.input}
                        onChangeText={setSalao}
                        value={salao}
                    />
                    <TextInput
                        placeholder="Serviço"
                        style={styles.input}
                        onChangeText={setServico}
                        value={servico}
                    />
                    <TextInput
                        placeholder="Horário"
                        style={styles.input}
                        onChangeText={setHorario}
                        value={horario}
                    />
                </View>
            ) : (
                <ScrollView style={styles.containerAgendados}>
                    {eventosAgendados.map((evento, index) => (
                        <View key={index} style={styles.formsAgendado}>
                            <Text>Nome do Salão: {evento.salao}</Text>
                            <Text>Nome do Evento: {evento.servico}</Text>
                            <Text>Horário: {evento.horario}</Text>
                            <TouchableOpacity onPress={() => excluirEvento(index)} style={styles.excluirBtn}>
                                <Text style={styles.btnText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}
            <View style={styles.containerButton}>
                {!tipoDeAgenda ? "" : (
                    <TouchableOpacity onPress={alternarAgenda} style={styles.login}>
                        <Text style={styles.btnText}>Agendar Evento</Text>
                    </TouchableOpacity>
                )}
                {tipoDeAgenda ? "" : (
                    <TouchableOpacity onPress={limparEventos} style={styles.login}>
                        <Text style={styles.btnText}>Apagar Tudo</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={alternarAgenda} style={styles.login}>
                    <Text style={styles.btnText}>{tipoDeAgenda ? "Agendados" : "Agendar"}</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 20,
    },
    imagem: {
        height: 250,
        width: 280
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    forms: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    input: {
        width: "100%",
        height: 60,
        borderBottomWidth: 2,
        padding: 2,
        marginVertical: 10,
        display: "flex",
    },
    containerButton: {
        alignItems: "center",
        marginBottom: 20
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
    btnText: {
        color: "white",
        fontWeight: "bold",
    },
    formsAgendado: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: "90%",
        margin: 20,
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
        alignItems: "center",
        elevation: 5,
    },
    excluirBtn: {
        marginTop: 10,
        backgroundColor: "#ED2839",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
});