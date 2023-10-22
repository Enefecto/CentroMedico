import React,{useState, useEffect} from 'react'

const Administrar = () => {

    const [medicos, setMedicos] = useState([]);
    const [error, setError] = useState('');
    const [succesful, setSuccesful] = useState('');

    const getMedicos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/medicos/');
            if (response.ok) {
                const data = await response.json();
                setMedicos(data);
                console.log(data);
            } else {
                console.error('Error al obtener médicos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        setSuccesful('');

        getMedicos();
    }, []);

    const handleSubmit  = async (e) => {
        e.preventDefault();

        const formData = {
            rut: parseInt(e.target.rut.value),
            dv: e.target.dv.value,
            contraseña: e.target.contraseña.value,
            nombre: e.target.nombre.value,
            appaterno: e.target.appaterno.value,
            apmaterno: e.target.apmaterno.value,
            gmail: e.target.gmail.value,
            telefono: parseInt(e.target.telefono.value),
            especialidad: e.target.especialidad.value
        };
        console.log(formData);
        
        // Verificar si el rut o el gmail ya están registrados
        const rutExists = medicos.some(medico => medico.rut === parseInt(formData.rut));
        const gmailExists = medicos.some(medico => medico.gmail === formData.gmail);
        
        if (rutExists || gmailExists) {
            setSuccesful('');
            setError('Rut o Gmail ya registrado');
        } else {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/medicos/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setError('');
                    setSuccesful('Médico agregado exitosamente');
                    getMedicos();

                    //Limpiar Campos
                    e.target.rut.value = '';
                    e.target.dv.value = '';
                    e.target.contraseña.value = '';
                    e.target.nombre.value = '';
                    e.target.appaterno.value = '';
                    e.target.apmaterno.value = '';
                    e.target.gmail.value = '';
                    e.target.telefono.value = '';
                    e.target.especialidad.value = 'Cardiologo';
                } else {
                    console.error('Error al agregar médico');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

    }
    return (
    <div className='conteiner'>
    <div className="box">
        <form className="form-add-medico" onSubmit={handleSubmit}>
            <h1>Agregar Medico</h1>
            <div className="input-rut">
                <div className="div-input">
                    <label htmlFor="rut">RUT:</label>
                    <input type="number" name="rut" placeholder='12345678' required/>
                </div>
                <div className="div-input">
                    <label htmlFor="dv">DV:</label>
                    <input id='dv' type="text" name="dv" maxLength="1" placeholder='k' required/>
                </div>
            </div>
            <div className="div-input">
                <label htmlFor="contraseña">Contraseña:</label>
                <input type="password" name="contraseña" placeholder='******' required/>
            </div>

            <div className="div-input">
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" name="nombre" placeholder='Medico' required/>
            </div>
            <div className="div-input">
                <label htmlFor="appaterno">Apellido Paterno:</label>
                <input type="text" name="appaterno" placeholder='Apellido' required/>
            </div>

            <div className="div-input">
                <label htmlFor="apmaterno">Apellido Materno:</label>
                <input type="text" name="apmaterno" placeholder='Apellido' required/>
            </div>
            
            <div className="div-input">
                <label htmlFor="gmail">Correo Electrónico:</label>
                <input type="email" name="gmail" placeholder='Ejemplo1233@gmail.com' required/>
            </div>

            <div className="div-input">
                <label htmlFor="telefono">Teléfono:</label>
                <input type="tel" name="telefono" placeholder='912345678' required/>
            </div>

            <div className='div-input'>
                <label htmlFor="especialidad">Previsión</label>
                    <select id='especialidad' name='especialidad'>
                        <option value='Cardiologo'>Cardiologo</option>
                        <option value='Dermatologo'>Dermatologo</option>
                        <option value='Medico General'>Medico General</option>
                        <option value='Nutricionista'>Nutricionista</option>
                        <option value='Oftalmologo'>Oftalmologo</option>
                        <option value='Pediatria'>Pediatria</option>
                    </select>
            </div>
            <span id='error'>{error}</span>
            <span id='succesful'>{succesful}</span>
            <input id='submit' type="submit" value="Agregar Medico"/>
        </form>
    </div>
    </div>
  )
}

export default Administrar