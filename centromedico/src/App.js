import { useState } from 'react';
import './App.css';
import { MainRouter } from './Routers/MainRouter';

function App() {

  const [loggin , setLoggin] = useState(false);

  return (
    <MainRouter loggin={loggin}
                setLoggin={setLoggin}/>
  )
}

export default App;