import React from 'react'
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../Componentes/Login';
import Registro from '../Componentes/Registro';
import Home from '../Componentes/Home';
import AgregarDisponibilidad from '../Componentes/AgregarDisponibilidad';
import ReservarHora from '../Componentes/ReservarHora';
import Administrar from '../Componentes/Administrar';

export const MainRouter = () => {
	return (
	<div>
	<BrowserRouter>
	<Routes>
		<Route path='/' element={<Login/>}/>
		<Route path='/registro' element={<Registro/>}/>
		<Route path='/inicio' element={<Home/>}/>
		<Route path='/agregar-disponibilidad' element={<AgregarDisponibilidad/>}/>
		<Route path='/reservar-hora' element={<ReservarHora/>}/>
		<Route path='/administrar' element={<Administrar/>}/>
		<Route path='*' element={<h1 id='error404'>Error 404 pagina no encontrada :(</h1>}/>
	</Routes>
	</BrowserRouter>
	</div>
	)
}