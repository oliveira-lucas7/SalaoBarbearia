// import { View, Text } from 'react-native'
import React, { useContext } from 'react'
// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState } from 'react';
// import { StyleSheet, View } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AsyncStorage from '@react-native-async-storage/async-storage';


//Components
import Home from './Home';
import Agendar from './Agendar'
import Menu from './Menu';
import Servico from './Servico'
import Login from './Login'
import { UserContext } from './Context/UserContext';


  const Tab = createBottomTabNavigator();

export default function Rotas() {

    const {logado} = useContext( UserContext );

    if( logado == false )
    {
      return ( <Login/> )
    }

  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
                }}
                />
            <Tab.Screen 
                name="Agendar" 
                component={Agendar} 
                options={{
                tabBarLabel: 'Agendar',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="calendar-month-outline" color={color} size={size} />
                ),
                }}
                />
            <Tab.Screen 
                name="Servico" 
                component={Servico} 
                options={{
                tabBarLabel: 'Servico',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="heart" color={color} size={size} />
                ),
                }}
                />
            <Tab.Screen 
                name="Menu" 
                component={Menu} 
                options={{
                tabBarLabel: 'Menu',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
                }}
                />
        </Tab.Navigator>
  </NavigationContainer>
  )
}