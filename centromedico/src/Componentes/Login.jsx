import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate();

    const tryLogin = (e) => {
        e.preventDefault();
        navigate('./inicio')
        console.log('Ola');
    }

    return (
    <div className='conteiner'>
    <form className='form-login' onSubmit={tryLogin}>
        <h1>Bienvenido</h1>
        <div className="conteiner-inputs">
            <div className='div-input'>
                <label htmlFor="rut">Rut</label>
                <div className='input-rut'>
                    <input id='rut' name='rut' type="number" placeholder='12345678'/>
                    <span>-</span>
                    <input id='dv' name='dv' type="text" placeholder='k'/>
                </div>
            </div>
            <div className='div-input'>
                <label htmlFor="contraseña">Contraseña</label>
                <input id='contraseña' name='contraseña' type="password" placeholder='********'/>
            </div>
            <div className="flex-left">
                <p>Recuperar contraseña</p>
            </div>
        </div>
        <input id='submit' type="submit" value="Iniciar Sesión"/>
        <p>¿No tienes una cuenta?<Link id='link-register' to="/registro"> Registrate</Link></p>
    </form>
    </div>
    )
}

export default Login;