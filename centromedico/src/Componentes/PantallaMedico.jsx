import React,{useState, useEffect} from 'react'

const PantallaMedico = () => {

    const [CITAS, setCITAS] = useState([]);
    const [PACIENTES, setPACIENTES] = useState([]);

    useEffect(() => {
        const medico = JSON.parse(localStorage.getItem('User')).userData;

        //Obtener citas
        fetch(`http://localhost:8000/api/medico/citaMedica/${medico.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            const today = new Date().toISOString().split('T')[0];
            const citasHoy = data.filter(cita => cita.fecha === today && cita.estado === 'En espera');
            setCITAS(citasHoy);
        })
        .catch(error => console.error('Error:', error));

        // Obtener pacientes
		fetch('http://127.0.0.1:8000/api/pacientes/')
        .then(response => response.json())
        .then(data => {
            setPACIENTES(data);
        })
        .catch(error => console.error('Error:', error));
        // eslint-disable-next-line
    },[])

    const handleUpdateCita = (citaId) => {
        // Obtener la cita actual que se va a actualizar
        const citaToUpdate = CITAS.find(cita => cita.id === citaId);

        if (!citaToUpdate) {
            console.error('Cita no encontrada para actualizar');
            return;
        }

        // Actualizar el estado de la cita a 'Atendido'

        const citaSerializer = {
            "id": citaToUpdate.id,
            "fecha": citaToUpdate.fecha,
            "hora": citaToUpdate.hora,
            "estado": 'Atendido',
            "paciente": citaToUpdate.paciente_id,
            "medico": citaToUpdate.medico_id
        }

        fetch(`http://localhost:8000/api/citaMedica/${citaId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(citaSerializer), // Enviar toda la cita actualizada en el cuerpo de la solicitud
        })
        .then(response => response.json())
        .then(data => {
            // Actualizar el estado después de eliminar
            const updatedCitas = CITAS.filter(cita => cita.id !== citaId);
            setCITAS(updatedCitas);
        })
        .catch(error => console.error('Error:', error));
    };


    return (
    <div className='conteiner'>
        <div className="conteiner-displayer">
            <h2>Pacientes en espera</h2>
            <ul>
                {
                PACIENTES.length !== 0 ? CITAS.map(cita => {
                    const paciente = PACIENTES.find(paciente => paciente.id === cita.paciente_id);
                    return (
                    <li key={cita.id}>
                        <span>Rut: <span id='succesful'>{paciente.rut}-{paciente.dv}</span></span>
                        <span>Nombre: <span id='succesful'>{paciente.nombre} {paciente.appaterno}</span></span>
                        <span>Hora: <span id='succesful'>{cita.hora}</span></span>
                        <button onClick={ () => handleUpdateCita(cita.id)}>
                            <svg id='Confirmed' xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-check" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                                <path d="M9 12l2 2l4 -4" />
                            </svg>
                        </button>
                    </li>
                    )
                    
                    }
                )
                :
                <></>
                }
            </ul>
        </div>
    </div>
    )
}

export default PantallaMedico;