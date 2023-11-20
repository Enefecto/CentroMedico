import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../Componentes/Login';
import Registro from '../Componentes/Registro';
import Home from '../Componentes/Home';
import AgregarDisponibilidad from '../Componentes/AgregarDisponibilidad';
import ReservarHora from '../Componentes/ReservarHora';
import Administrar from '../Componentes/Administrar';
import NoLogeado from './NoLogeado';
import Logeado from './Logeado';
import AnularHora from '../Componentes/AnularHora';
import Cajero from '../Componentes/Cajero';
import PantallaMedico from '../Componentes/PantallaMedico';

export const MainRouter = ({loggin, setLoggin}) => {
	
	let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

	useEffect(()=> {
		console.log();
		// eslint-disable-next-line
	},[loggin])
	
	return (
	<div>
	<BrowserRouter>
		<Routes>
		<Route
			path='/'
			element={<Logeado element={<Login setLoggin={setLoggin}/>} authenticated={isLoggedIn} />}
		/>
		<Route
			path='/registro'
			element={<Logeado element={<Registro />} authenticated={isLoggedIn} />}
		/>
		<Route
			path='/inicio'
			element={<NoLogeado element={<Home setLoggin={setLoggin} />} authenticated={isLoggedIn} />}
		/>
		<Route
			path='/agregar-disponibilidad'
			element={<NoLogeado element={<AgregarDisponibilidad />} authenticated={isLoggedIn} />}
		/>
		<Route
			path='/reservar-hora'
			element={<NoLogeado element={<ReservarHora />} authenticated={isLoggedIn} />}
		/>
		<Route
			path='/anular-hora'
			element={<NoLogeado element={<AnularHora />} authenticated={isLoggedIn} />}
		/>
		<Route
			path='/administrar'
			element={<NoLogeado element={<Administrar />} authenticated={isLoggedIn} />}
		/>
		<Route
			path='/cajero'
			element={<NoLogeado element={<Cajero />} authenticated={isLoggedIn} />}
		/>
		<Route
			path='/pantalla-espera'
			element={<NoLogeado element={<PantallaMedico />} authenticated={isLoggedIn} />}
		/>
		<Route path='*' element={<h1 id='error404'>Error 404 pagina no encontrada :(</h1>} />
		</Routes>
	</BrowserRouter>
	</div>
	);
};
