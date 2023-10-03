import React from 'react'

const Registro = () => {

    return (
    <div className='conteiner'>
        <form className='form-registro'>
            <h1>Formulario de Registro</h1>
            <div className='conteiner-inputs'>
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
                <div className='div-input'>
                    <label htmlFor="nombre">Nombre</label>
                    <input id='nombre' name='nombre' type="text" placeholder='Cristobal'/>
                </div>
                <div className='div-input'>
                    <label htmlFor="apellido-paterno">Apellido Paterno</label>
                    <input id='apellido-paterno' name='apellido-paterno' type="text" placeholder='Salamanca'/>
                </div>
                <div className='div-input'>
                    <label htmlFor="apellido-materno">Apellido Materno</label>
                    <input id='apellido-materno' name='apellido-materno' type="text" placeholder='Torres'/>
                </div>
                <div className='div-input'>
                    <label htmlFor="gmail">Gmail</label>
                    <input id='gmail' name='gmail' type='email' placeholder='Ejemplo123@gmail.com'/>
                </div>
                <div className='div-input'>
                    <label htmlFor="telefono">Telefono</label>
                    <input id='telefono' name='telefono' type='number' placeholder='912345678'/>
                </div>
                <div className='div-input'>
                    <label htmlFor="prevision">Previsión</label>
                    <input id='prevision' name='prevision' type='text' placeholder='Fonasa'/>
                </div>
            </div>
            <div className='flex-right'>
                <input id='submit' type="submit" value="Registrarse" />
            </div>
        </form>
    </div>
    )
}

export default Registro;