import UserProvider from './src/Context/UserContext';
import 'react-native-gesture-handler';

import Rotas from './src/Rotas';

export default function App(){

    return(
      <>
      <UserProvider>
          <Rotas/>
        </UserProvider>
      </>
    )
}
