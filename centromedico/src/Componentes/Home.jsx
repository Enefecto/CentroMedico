import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  const goReservarHora = () => {
    navigate('/reservar-hora')
  }

  const goAgregarDisponibilidad = () => {
    navigate('/agregar-disponibilidad')
  }

  const goAdministrar = () => {
    navigate('/administrar')
  }
  
  return (
  <div className='conteiner conteiner-home'>
    <nav className='navigation-bar'>
      <ul>
        <li onClick={goReservarHora}>Reservar Hora</li>
        <li onClick={goAgregarDisponibilidad}>Agregar Disponibilidad</li>
        <li onClick={goAdministrar}>Administrar</li>
      </ul>
    </nav>
  </div>
  )
}

export default Home;