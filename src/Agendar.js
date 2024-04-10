import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Platform, Alert, Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Calendar from 'expo-calendar';
import { useBatteryLevel } from 'expo-battery';
import { v4 as uuidv4 } from 'uuid';
import uuid from "react-native-uuid";

export default function Agendar() {
    const [salao, setSalao] = useState("");
    const [servico, setServico] = useState("");
    const [dataEvento, setDataEvento] = useState("");
    const [tipoDeAgenda, setTipoDeAgenda] = useState(false);
    const [eventosAgendados, setEventosAgendados] = useState([]);
    const [ bateria, setBateria ] = useState();

    const batteryLevel = useBatteryLevel();

    useEffect(() => {
        carregarEventosAgendados();
        getPermissions();
    }, []);

    useEffect( () => {
        setBateria( (batteryLevel * 100).toFixed(0));
    }, [batteryLevel])

    const getPermissions = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão Necessária', 'É necessário permitir o acesso ao calendário para agendar eventos.');
        }
    };

    const salvarEvento = async () => {
        if (!salao || !servico || !dataEvento) {
            Alert.alert('Campos Incompletos', 'Por favor, preencha todos os campos.');
            return;
        }

        const novoEvento = { id: uuid.v4(), salao, servico, dataEvento };
        try {
            const novosEventos = [...eventosAgendados, novoEvento];
            await AsyncStorage.setItem('eventosAgendados', JSON.stringify(novosEventos));
            setEventosAgendados(novosEventos);
            limparCampos();
            setTipoDeAgenda(true);
            criarEventoNoCalendario(novoEvento);
        } catch (error) {
            console.error('Erro ao salvar evento:', error);
            Alert.alert('Erro', 'Não foi possível salvar o evento. Por favor, tente novamente.');
        }
    };

    const criarEventoNoCalendario = async (evento) => {
        try {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            let expoCalendar = calendars.find(calendar => calendar.title === 'Expo Calendar');
            if (!expoCalendar) {
                const defaultCalendarSource = Platform.OS === 'ios' ?
                    await Calendar.getDefaultCalendarAsync() :
                    { isLocalAccount: true, name: 'Expo Calendar' };

                expoCalendar = await Calendar.createCalendarAsync({
                    title: 'Expo Calendar',
                    color: 'blue',
                    entityType: Calendar.EntityTypes.EVENT,
                    sourceId: defaultCalendarSource.id,
                    source: defaultCalendarSource,
                    name: 'internalCalendarName',
                    ownerAccount: 'personal',
                    accessLevel: Calendar.CalendarAccessLevel.OWNER,
                });
            }

            const { salao, servico, dataEvento } = evento;
            const [ano, mes, dia] = dataEvento.split("-").map(Number);
            const dataInicio = new Date(ano, mes - 1, dia);
            const dataFim = new Date(ano, mes - 1, dia + 1); // Define o próximo dia como fim

            const newEvent = {
                title: `${salao} - ${servico}`,
                startDate: dataInicio,
                endDate: dataFim,
                location: 'Local do Evento',
                notes: 'Detalhes do Evento',
            };

            await Calendar.createEventAsync(expoCalendar.id, newEvent);
            Alert.alert('Evento Criado', 'O evento foi criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar evento no calendário:', error);
            Alert.alert('Erro', `Não foi possível criar o evento no calendário. Erro: ${error}`);
        }
    };

    const carregarEventosAgendados = async () => {
        try {
            const eventosJSON = await AsyncStorage.getItem('eventosAgendados');
            if (eventosJSON) {
                setEventosAgendados(JSON.parse(eventosJSON));
            }
        } catch (error) {
            console.error('Erro ao carregar eventos agendados:', error);
            Alert.alert('Erro', 'Não foi possível carregar os eventos agendados.');
        }
    };

    const limparCampos = () => {
        setSalao("");
        setServico("");
        setDataEvento("");
    };

    const limparEventos = async () => {
        try {
            await AsyncStorage.removeItem('eventosAgendados');
            setEventosAgendados([]);
        } catch (error) {
            console.error('Erro ao limpar eventos agendados:', error);
            Alert.alert('Erro', 'Não foi possível limpar os eventos agendados.');
        }
    };

    const excluirEvento = async (index) => {
        try {
            const novosEventos = eventosAgendados.filter((evento, i) => i !== index);
            await AsyncStorage.setItem('eventosAgendados', JSON.stringify(novosEventos));
            setEventosAgendados(novosEventos);
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
            Alert.alert('Erro', 'Não foi possível excluir o evento.');
        }
    };

    return (
        <>
            {bateria >= 20 ? ( // Verifica se a bateria é maior ou igual a 20% (0.2 representa 20%)
                <ScrollView>
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
                                placeholder="Data do Evento (YYYY-MM-DD)"
                                style={styles.input}
                                onChangeText={setDataEvento}
                                value={dataEvento}
                            />
                        </View>
                    ) : (
                        <ScrollView style={styles.containerAgendados}>
                            {eventosAgendados.map((evento, index) => (
                                <View key={index} style={styles.formsAgendado}>
                                    <Text>Nome do Salão: {evento.salao}</Text>
                                    <Text>Nome do Evento: {evento.servico}</Text>
                                    <Text>Data do Evento: {evento.dataEvento}</Text>
                                    <TouchableOpacity onPress={() => excluirEvento(index)} style={styles.excluirBtn}>
                                        <Text style={styles.btnText}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                    <View style={styles.containerButton}>
                        {!tipoDeAgenda ? "" : (
                            <TouchableOpacity onPress={salvarEvento} style={styles.login}>
                                <Text style={styles.btnText}>Agendar Evento</Text>
                            </TouchableOpacity>
                        )}
                        {tipoDeAgenda ? "" : (
                            <TouchableOpacity onPress={limparEventos} style={styles.login}>
                                <Text style={styles.btnText}>Apagar Tudo</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => setTipoDeAgenda(!tipoDeAgenda)} style={styles.login}>
                            <Text style={styles.btnText}>{tipoDeAgenda ? "Agendados" : "Agendar"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                <View>
                    <Text>Sem bateria suficiente, recarregue o seu celular</Text>
                </View>
            )}
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