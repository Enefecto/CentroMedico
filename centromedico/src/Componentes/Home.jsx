import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({setLoggin}) => {

  const [availabilityButton, setAvailabilityButton] = useState(false);
  const [screenButton, setScreenButton] = useState(false);
  const [reserveButton, setReserveButton] = useState(false);
  const [manageButon, setManageButton] = useState(false);
  const [boxButton, setBoxButton] = useState(false);
  

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('User'));

    setReserveButton(false);
    setAvailabilityButton(false);
    setManageButton(false);
    setBoxButton(false);
    setScreenButton(false);

    if (user.userType === 'Paciente'){
      setReserveButton(true);
    } else if (user.userType === 'Medico'){
      setAvailabilityButton(true);
      setScreenButton(true);
    } else if (user.userType === 'Secretaria'){
      setManageButton(true);
    } else if (user.userType === 'Cajero'){
      setBoxButton(true);
    } 
  },[]);

  const navigate = useNavigate();

  const goReservarHora = () => {
    navigate('/reservar-hora');
  };

  const goAnularHora = () => {
    navigate('/anular-hora');
  };

  const goAgregarDisponibilidad = () => {
    navigate('/agregar-disponibilidad');
  };

  const goAdministrar = () => {
    navigate('/administrar');
  };

  const goBox = () => {
    navigate('/cajero');
  }
  const goScreen = () => {
    navigate('/pantalla-espera');
  }

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setLoggin(false);
    navigate('/');
  };

  return (
    <div className='conteiner gris'>
      <nav className='navigation-bar'>
        <ul>
          {reserveButton ? <li onClick={goReservarHora}>Reservar Hora</li> : <></>}
          {reserveButton ? <li onClick={goAnularHora}>Anular Hora</li> : <></>}
          {availabilityButton ? <li onClick={goAgregarDisponibilidad}>Agregar Disponibilidad</li> : <></>}
          {screenButton ? <li onClick={goScreen}>Pantalla de espera</li> : <></>}
          {manageButon ? <li onClick={goAdministrar}>Administrar</li> : <></>}
          {boxButton ? <li onClick={goBox}>Cajero</li> : <></>}
          <li className="user-icon" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-arrow-left" width="35" height="35" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 21a9 9 0 1 0 0 -18a9 9 0 0 0 0 18" />
              <path d="M8 12l4 4" />
              <path d="M8 12h8" />
              <path d="M12 8l-4 4" />
            </svg>
            <span>Cerrar Sesión</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
