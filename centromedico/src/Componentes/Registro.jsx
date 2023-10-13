import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Registro = () => {
    const [pacientes, setPacientes] = useState([]);
    const [error, setError] = useState('');
    const [succesful, setSuccesful] = useState('');

    useEffect(() => {
        setSuccesful('');
        const getPacientes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/pacientes/');
                if (response.ok) {
                    const data = await response.json();
                    setPacientes(data);
                } else {
                    console.error('Error al obtener pacientes');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getPacientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            rut: document.getElementById('rut').value,
            dv: document.getElementById('dv').value,
            contraseña: document.getElementById('contraseña').value,
            nombre: document.getElementById('nombre').value,
            appaterno: document.getElementById('apellido-paterno').value,
            apmaterno: document.getElementById('apellido-materno').value,
            gmail: document.getElementById('gmail').value,
            telefono: document.getElementById('telefono').value,
            prevision: document.getElementById('prevision').value
        };

        // Verificar si el rut o el gmail ya están registrados
        const rutExists = pacientes.some(paciente => paciente.rut === parseInt(formData.rut));
        const gmailExists = pacientes.some(paciente => paciente.gmail === formData.gmail);
        console.log(rutExists);
        console.log(gmailExists);
        if (rutExists || gmailExists) {
            setSuccesful('');
            setError('Rut o Gmail ya registrado');
        } else {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/pacientes/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setError('');
                    setSuccesful('Cuenta creada exitosamente');
                    // Limpiar los campos
                    document.getElementById('rut').value = '';
                    document.getElementById('dv').value = '';
                    document.getElementById('contraseña').value = '';
                    document.getElementById('nombre').value = '';
                    document.getElementById('apellido-paterno').value = '';
                    document.getElementById('apellido-materno').value = '';
                    document.getElementById('gmail').value = '';
                    document.getElementById('telefono').value = '';
                } else {
                    console.error('Error al registrar');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
    <div className='conteiner'>
        <form className='form-registro' onSubmit={handleSubmit}>
            <h1>Formulario de Registro</h1>
            <div className='conteiner-inputs'>
                <div className='div-input'>
                    <label htmlFor="rut">Rut</label>
                    <div className='input-rut'>
                        <input id='rut' name='rut' type="number" placeholder='12345678' required/>
                        <span>-</span>
                        <input id='dv' name='dv' type="text" placeholder='k'  required/>
                    </div>
                </div>
                <div className='div-input'>
                    <label htmlFor="contraseña">Contraseña</label>
                    <input id='contraseña' name='contraseña' type="password" placeholder='********'/>
                </div>
                <div className='div-input'>
                    <label htmlFor="nombre">Nombre</label>
                    <input id='nombre' name='nombre' type="text" placeholder='Cristobal' required/>
                </div>
                <div className='div-input'>
                    <label htmlFor="apellido-paterno">Apellido Paterno</label>
                    <input id='apellido-paterno' name='apellido-paterno' type="text" placeholder='Salamanca'required/>
                </div>
                <div className='div-input'>
                    <label htmlFor="apellido-materno">Apellido Materno</label>
                    <input id='apellido-materno' name='apellido-materno' type="text" placeholder='Torres'required/>
                </div>
                <div className='div-input'>
                    <label htmlFor="gmail">Gmail</label>
                    <input id='gmail' name='gmail' type='email' placeholder='Ejemplo123@gmail.com'required/>
                </div>
                <div className='div-input'>
                    <label htmlFor="telefono">Telefono</label>
                    <input id='telefono' name='telefono' type='number' placeholder='912345678'required/>
                </div>
                <div className='div-input'>
                <label htmlFor="prevision">Previsión</label>
                    <select id='prevision' name='prevision'>
                        <option value='Fonasa'>Fonasa</option>
                        <option value='Isapre'>Isapre</option>
                    </select>
                </div>
            </div>
            <span id='error'>{error}</span>
            <span id='succesful'>{succesful}</span>
            <input id='submit' type="submit" value="Registrarse" required/>
        </form>
        <div className='back'>
            <Link id='Link' to='/'>Volver</Link>
        </div>
    </div>
    )
}

export default Registro;