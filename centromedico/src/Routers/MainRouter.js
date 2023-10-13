import React from 'react'
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../Componentes/Login';
import Registro from '../Componentes/Registro';

export const MainRouter = () => {
	return (
	<div>
	<BrowserRouter>
	<Routes>
		<Route path='/' element={<Login/>}/>
		<Route path='/registro' element={<Registro/>}/>
		<Route path='*' element={<h1 id='error404'>Error 404 pagina no encontrada :(</h1>}/>
	</Routes>
	</BrowserRouter>
	</div>
	)
}