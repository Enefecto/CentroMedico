import React, { useEffect, useState } from 'react';

const AnularHora = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User'));
        const pacienteId = user.userData.id;

        fetch(`http://localhost:8000/api/paciente/${pacienteId}/citas/`)
            .then(response => response.json())
            .then(data => {
                setCitas(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleDeleteCita = (citaId) => {

        fetch(`http://localhost:8000/api/citaMedica/${citaId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Actualizar el estado después de eliminar
            const updatedCitas = citas.filter(cita => cita.id !== citaId);
            setCitas(updatedCitas);
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className='conteiner'>
            <div className="conteiner-displayer">
                <h2>Horas Reservadas</h2>
                <ul>
                    {citas.map(cita => (
                        <li key={cita.id}>
                            <span>Dia: <span id='succesful'>{cita.fecha}</span></span>
                            <span>Hora: <span id='succesful'>{cita.hora}</span></span>
                            <span>Estado: <span id='succesful'>{cita.estado}</span></span>
                            <button
                                id='delete'
                                onClick={() => handleDeleteCita(cita.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AnularHora;
