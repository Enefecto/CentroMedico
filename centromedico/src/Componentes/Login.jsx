import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = ({setLoggin}) => {
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            rut: parseInt(e.target.rut.value),
            dv: e.target.dv.value,
            contraseña: e.target.contrasenia.value
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                
                //Guardar en el storage
                const userDataString = JSON.stringify(data);
                localStorage.setItem('User', userDataString);
                localStorage.setItem('isLoggedIn','true');
                setLoggin(true);
                navigate('/inicio')
            } else {
                setError('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
    <div className='conteiner'>
    <form className='form-login' onSubmit={handleSubmit}>
        <h1>Bienvenido</h1>
        <div className="conteiner-inputs">
            <div className='div-input'>
                <label htmlFor="rut">Rut</label>
                <div className='input-rut'>
                    <input id='rut' name='rut' type="number" placeholder='12345678' required/>
                    <span>-</span>
                    <input id='dv' name='dv' type="text" placeholder='k' required/>
                </div>
            </div>
            <div className='div-input'>
                <label htmlFor="contrasenia">Contraseña</label>
                <input id='contrasenia' name='contrasenia' type="password" placeholder='********' required/>
            </div>
            <div className="flex-left">
                <p>Recuperar contraseña</p>
            </div>
        </div>
        <input id='submit' type="submit" value="Iniciar Sesión"/>
        <span id='error'>{error}</span>
        <p>¿No tienes una cuenta?<Link id='link-register' to="/registro"> Registrate</Link></p>
    </form>
    </div>
    )
}

export default Login;