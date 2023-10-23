import React, { useState, useEffect } from 'react';

const ReservarHora = () => {
	const [MEDICOS, setMEDICOS] = useState([]);
	const [HORAS, setHORAS] = useState([]);
	const [Dias, setDias] = useState([]);
	const [horasFiltradas, setHorasFiltradas] = useState([]);
	const [Horas, setHoras] = useState([]);
	const [especialidades, setEspecialidades] = useState([]);
    const [formData, setFormData] = useState({
		paciente: 0,
        fecha: '',
        hora: '',
        estado: 'Reservada',
		medico: 0,
    });

    const [succesful, setSuccesful] = useState('');

    const handleChangeEspecialidad = (e) => {
		const especialidad = e.target.value;
	
		// Filtrar los médicos por especialidad y obtener los IDs
		const medicoIds = MEDICOS.filter(medico => medico.especialidad === especialidad).map(medico => medico.id);
		
		// Filtrar las horas por los IDs de los médicos
		const horasFiltr = HORAS.filter(hora => medicoIds.includes(hora.medico));
		
		// Llevar un registro de los días únicos
        const diasRegistrados = [];
        const horasUnicas = horasFiltr.filter(hora => {
            if (!diasRegistrados.includes(hora.dia)) {
                diasRegistrados.push(hora.dia);
                return true;
            }
            return false;
        });

        setDias(horasUnicas);
		setHorasFiltradas(horasFiltr);
	};

	const handleChangeDia = (e) => {
		const dia = e.target.value;
		console.log(dia);
		console.log(horasFiltradas);
		// Filtrar las horas por el día seleccionado
        const horasPorDia = horasFiltradas.filter(hora => hora.dia === dia);
       	setHoras(horasPorDia);
	};
	

    const handleSubmit = async (e) => {
        e.preventDefault();
        const medico = HORAS.filter(hora => hora.dia === formData.fecha && hora.hora_inicio === formData.hora);
        formData.fecha = e.target.dia.value;
        formData.hora = e.target.hora.value;
		const idMedico = medico[0].medico;
		formData.medico = idMedico;
		console.log(formData);

		try {
			const response = await fetch('http://127.0.0.1:8000/api/agregarCitaMedica/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				console.log('GUD');
				setSuccesful('Hora reservada correctamente');
			} else {
				console.error('Error al agregar cita');
				setSuccesful('');
			}
		} catch (error) {
			console.error('Error:', error);
		}
    };

	useEffect(() => {
		setSuccesful('');
		const user = JSON.parse(localStorage.getItem('User')).userData;
		setFormData({
			...formData,
			'paciente': user.id ,
		});

		// Obtener lista de médicos
		fetch('http://127.0.0.1:8000/api/medicos/')
			.then(response => response.json())
			.then(data => setMEDICOS(data))
			.catch(error => console.error('Error:', error));

		// Obtener horas
		fetch('http://127.0.0.1:8000/api/disponibilidadMedico/')
			.then(response => response.json())
			.then(data => setHORAS(data))
			.catch(error => console.error('Error:', error));
		// eslint-disable-next-line
	},[]);

	useEffect(() => {
		const especialidadesArray = [];
		MEDICOS.forEach(medico => {
			if (!especialidadesArray.includes(medico.especialidad)) {
				especialidadesArray.push(medico.especialidad);
			}
		});
		setEspecialidades(especialidadesArray);
	}, [MEDICOS]);
	

    return (
	<div className='conteiner'>
		<form className="conteiner-form" onSubmit={handleSubmit}>
			<h2>Reservar Hora</h2>

			<div className='inputs-availibility'>
                <label htmlFor="especialidad">Especialidad:</label>
				<select id='especialidad' name='especialidad' onChange={handleChangeEspecialidad}>
					{especialidades.length > 0 ? (
						especialidades.map((especialidad, index) => (
							<option key={index} value={especialidad}>
								{especialidad}
							</option>
						))
					) : (
						<option value="" disabled>
							No hay especialidades
						</option>
					)}
				</select>
            </div>
			<div className='inputs-availibility'>
                <label htmlFor="dia">dia:</label>
				<select id='dia' name='dia'  onChange={handleChangeDia}>
					{Dias.length > 0 ? (
						Dias.map((horas) => (
							<option key={horas.id} value={horas.dia}>
								{horas.dia}
							</option>
						))
					) : (
						<option value="" disabled>
							No hay dias
						</option>
					)}
				</select>
            </div>

			<div className='inputs-availibility'>
                <label htmlFor="hora">hora:</label>
				<select id='hora' name='hora'>
					{Horas.length > 0 ? (
						Horas.map((horas) => (
							<option key={horas.id} value={horas.hora_inicio}>
								{horas.hora_inicio}
							</option>
						))
					) : (
						<option value="" disabled>
							No hay horas
						</option>
					)}
				</select>
            </div>
            <span id='succesful'>{succesful}</span>
			<button id='submit' type="submit">Reservar Cita</button>
		</form>
	</div>
    );
}

export default ReservarHora;
