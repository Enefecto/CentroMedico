import './App.css';
import Registro from './Componentes/Registro';
import Login from './Componentes/Login';
import { useState } from 'react';

function App() {

  const [displayLogin, setDisplayLogin] = useState(true);
  const [displayRegister, setDisplayRegister] = useState(false);
  
  if (displayLogin){
    return (
      <Login  setDisplayLogin={setDisplayLogin}
              setDisplayRegister={setDisplayRegister}/>
    );
  } else if (displayRegister){
    return (
      <Registro />
    )
  }
}

export default App;