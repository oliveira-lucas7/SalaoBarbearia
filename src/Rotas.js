import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';
import Agendar from './Agendar';
import Menu from './Menu';
import Favoritos from './Favoritos';
import Login from './Login';
import Endereco from './Endereco'
import { UserContext } from './Context/UserContext';

const Tab = createBottomTabNavigator();

export default function Rotas() {
  const { logado } = useContext(UserContext);

  if (!logado) {
    return <Login />;
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
              <MaterialCommunityIcons
                name="calendar-month-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={Favoritos}
          options={{
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="heart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Endereco"
          component={Endereco}
          options={{
            tabBarLabel: 'Endereco',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}