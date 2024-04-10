import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

function UserProvider({children})
{

    const[ usuario, setUsuario ] = useState(null);
    const[ logado, setLogado ] = useState( false );

    async function Login( email, senha)
    {
        if( email == "lucas@gmail.com" && senha == "123")
        {
            await AsyncStorage.setItem( "usuario", "Lucas Oliveira" );
            setLogado(true);
        } 
    }


    async function infoUser()
    {
        const usuario = await AsyncStorage.getItem("usuario");
        if(usuario)
        {
            setUsuario( usuario );
            setLogado( true );
        }
    } 


    useEffect( () => {
        infoUser();
      }, [])

    
    return(
        <UserContext.Provider value={ {usuario: usuario, logado: logado, Login, infoUser} }>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
