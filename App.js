import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Components
// import CadastroCliente from './src/CadastroCliente';
// import CadastroSalao from './src/CadastroSalao';
import Home from './src/Home';
import Agendar from './src/Agendar';
import Favorito from './src/Favoritos';
import AdicionarServico from './src/AdicionarServico';
import Account from './src/Accout';
import CadastroSalao from './src/CadastroSalao';
import Login from './src/Login';
import Menu from './src/Menu';
import Servico from './src/Servico';
import Produtos from './src/Produtos';
import Endereco from './src/Endereco';


  const Tab = createBottomTabNavigator();

  export default function App()
  {
    return(
      <>
      {!Menu ? <Text></Text> :
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
                {/* <Tab.Screen 
              name="CadastroSalao" 
              component={CadastroSalao} 
              options={{
                tabBarLabel: 'CadastroSalao',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }}
              /> */}
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
         }
      </>
    )
  }
  

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
