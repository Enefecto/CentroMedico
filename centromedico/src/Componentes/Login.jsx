import React from 'react'

const Login = ({setDisplayLogin,setDisplayRegister}) => {
    
    const goRegister = () => {
        setDisplayLogin(false);
        setDisplayRegister(true);
    }
    
    return (
    <div className='conteiner'>
        <form className='form-login'>
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
            <input id='submit' type="submit" value="Iniciar Sesión" />
            <p>¿No tienes una cuenta?<span id='link-register' onClick={goRegister} > Registrate</span></p>
        </form>
    </div>
    )
}

export default Login;