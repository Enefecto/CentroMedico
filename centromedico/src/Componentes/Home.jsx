import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({setLoggin}) => {

  const [availabilityButton, setAvailabilityButton] = useState(false);
  const [reserveButton, setReserveButton] = useState(false);
  const [manageButon, setManageButton] = useState(false);
  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'));

    setReserveButton(false);
    setAvailabilityButton(false);
    setManageButton(false);

    if (user.userType === 'Paciente'){
      setReserveButton(true);
    } else if (user.userType === 'Medico'){
      setAvailabilityButton(true);
    } else if (user.userType === 'Secretaria'){
      setManageButton(true);
    }
  },[]);

  const navigate = useNavigate();

  const goReservarHora = () => {
    navigate('/reservar-hora');
  };

  const goAgregarDisponibilidad = () => {
    navigate('/agregar-disponibilidad');
  };

  const goAdministrar = () => {
    navigate('/administrar');
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setLoggin(false);
    navigate('/');
  };

  return (
    <div className='conteiner conteiner-home'>
      <nav className='navigation-bar'>
        <ul>
          {reserveButton ? <li onClick={goReservarHora}>Reservar Hora</li> : <></>}
          {availabilityButton ? <li onClick={goAgregarDisponibilidad}>Agregar Disponibilidad</li> : <></>}
          {manageButon ? <li onClick={goAdministrar}>Administrar</li> : <></>}
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
