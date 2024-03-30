import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Calendar from 'expo-calendar'
import uuid from 'react-native-get-random-values'


export default function Agendar() {
    const [salao, setSalao] = useState("");
    const [servico, setServico] = useState("");
    const [horario, setHorario] = useState("");
    const [tipoDeAgenda, setTipoDeAgenda] = useState(false);
    const [eventosAgendados, setEventosAgendados] = useState([]);

    useEffect(() => {
        carregarEventosAgendados();
    }, []);


    const [ agenda, setAgenda ] = useState();
    const [ inicio, setInicio ] = useState();
    const [ final, setFinal ] = useState();
    const [ dados, setDados ] = useState([]);


    async function getPermissions() {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') 
        {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        }
    }

    useEffect(() => {
        getPermissions();
    }, [])


    async function Salvar()
    {
        
        if(agenda != undefined && inicio != undefined && final != undefined)
        {
            Keyboard.dismiss()
            const evento = {
                id: uuid.v4(),
                nome: agenda,
                inicio: inicio,
                final: final
            };
            const novoEvento = [...dados , evento]
            setDados( novoEvento );
            setAgenda("");
            setInicio("");
            setFinal("");

            const defaultCalendarSource =
            Platform.OS === 'ios'
              ? await Calendar.getDefaultCalendarAsync()
              : { isLocalAccount: true, name: 'Expo Calendar' };

              const newCalendarID = await Calendar.createCalendarAsync({
                title: 'Expo Calendar',
                color: 'blue',
                entityType: Calendar.EntityTypes.EVENT,
                sourceId: defaultCalendarSource.id,
                source: defaultCalendarSource,
                name: 'internalCalendarName',
                ownerAccount: 'personal',
                accessLevel: Calendar.CalendarAccessLevel.OWNER,
              });


              let inicioDataHora = inicio.split(" ");
              let inicioData = inicioDataHora[0].split("-");
              let inicioHora = inicioDataHora[1].split(".");

              let finalDataHora = final.split(" ");
              let finalData = finalDataHora[0].split("-");
              let finalHora = finalDataHora[1].split(".");



              const newEvent = {
                title: agenda,
                startDate: new Date(inicioData[2], inicioData[1] -1 , inicioData[0], inicioHora[0], inicioHora[1]),
                endDate: new Date(finalData[2], finalData[1] -1 , finalData[0], finalHora[0], finalHora[1]),
                localtion: 'Sesi',
                notes: 'Meteoro da Paixão',
              };

              try {
                await Calendar.createEventAsync(newCalendarID, newEvent);
                alert('Evento criado com sucesso!')
              } catch(error) {
                alert(`Erro ao criar evento! ${error}`);
              }

        }       
        else
        {
            Alert.alert('Campos Incompletos', 'Por favor, preencha todos os campos.');
        }
    }




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