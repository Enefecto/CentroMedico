import React,{useState,useEffect} from 'react'

const AgregarDisponibilidad = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [HORAS, setHORAS] = useState([]);

    const [formData, setFormData] = useState({
        dia: '',
        hora_inicio: '',
        hora_fin: '',
        idMedico: 0,
    });

    const [horaTermino, setHoraTermino] = useState(19);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        
    };

    useEffect(() => {
        if (new Date(formData.dia).getDay() === 5){
            setHoraTermino(13);
        } else {
            setHoraTermino(19);
        }
    },[formData]);

    const obtenerHorasRegistradas = async () => {
        const user = JSON.parse(localStorage.getItem('User')).userData;
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/disponibilidadMedicoById/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idMedico: user.id }),
            });

            if (response.ok) {
                const data = await response.json();
                setHORAS(data);
            } else {
                console.log('Error al obtener horas registradas');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User')).userData;
        setFormData({
            ...formData,
            idMedico: user.id,
        });
        setError('');
        setSuccess('');
    
        obtenerHorasRegistradas();
        // eslint-disable-next-line
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.hora_inicio = e.target.hora_inicio.value;
        formData.hora_fin = e.target.hora_fin.value;

        if (parseInt(formData.hora_inicio[0] + formData.hora_inicio[1]) >= 
        parseInt(formData.hora_fin[0] + formData.hora_fin[1])){
            setError('Hora de inicio ilogica');
            setSuccess('');

        } else if (new Date (formData.dia).getDay() === 6){
            setError('Intente un dia de trabajo');
            setSuccess('');
        } else {

            // Convertir las horas registradas a formato Date para facilitar la comparación
            const horasRegistradasDate = HORAS.map(hora => ({
                inicio: new Date(`${hora.dia}T${hora.hora_inicio}`),
                fin: new Date(`${hora.dia}T${hora.hora_fin}`)
            }));

            // Convertir la nueva hora a formato Date
            const nuevaHoraInicio = new Date(`${formData.dia}T${formData.hora_inicio}`);
            const nuevaHoraFin = new Date(`${formData.dia}T${formData.hora_fin}`);

            // Verificar si la nueva hora se superpone con alguna de las horas registradas
            const seSuperpone = horasRegistradasDate.some(hora => (
                (nuevaHoraInicio >= hora.inicio && nuevaHoraInicio < hora.fin) ||
                (nuevaHoraFin > hora.inicio && nuevaHoraFin <= hora.fin) ||
                (nuevaHoraInicio <= hora.inicio && nuevaHoraFin >= hora.fin)
            ));

            if (seSuperpone) {
                setError('Imposible agregar hora');
                setSuccess('');
            } else {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/ingresarDisponibilidad/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        setError('');
                        setSuccess('Hora agregada correctamente');
                        obtenerHorasRegistradas();
                    } else {
                        setError('Error inesperado');
                        setSuccess('');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setError('Error inesperado');
                    setSuccess('');
                }
            }
        }
    }

    return (
    <div className='conteiner'>
      <form onSubmit={handleSubmit} className='conteiner-form'>
      <h2>Disponibilidad</h2>
      <div className='inputs-availibility'>
        <label htmlFor="dia">Día:</label>
        <input
            type="date"
            id="dia"
            name="dia"
            value={formData.dia}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className='inputs-availibility'>
        <label htmlFor="hora_inicio">Hora de Inicio:</label>
        <input
            type="time"
            id="hora_inicio"
            name="hora_inicio"
            min="09:00"
            max={`${horaTermino}:00`}
            step="3600"
            required
        />
      </div>
      <div className='inputs-availibility'>
        <label htmlFor="hora_fin">Hora de Fin:</label>
        <input
            type="time"
            id="hora_fin"
            name="hora_fin"
            min="10:00"
            max={`${horaTermino+1}:00`}
            step="3600"
            required
        />
      </div>
      <span id='error'>{error}</span>
      <span id='succesful'>{success}</span>
      <button id='submit' type="submit">Agregar</button>
    </form>
    </div>
    )
}

export default AgregarDisponibilidad;