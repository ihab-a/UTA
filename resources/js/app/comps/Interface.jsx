import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import SidePanel from './SidePanel';
import Player from './Player';
import Error from './Error';
import Home from './Home';
import Profile from './Profile';
import '/resources/css/main.css';

export default function Interface(props){
	return <>
		<main id="main">
			<Nav/>
			<section id="content">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home/>}/>
						<Route path="/profile" element={<Profile/>}/>
						<Route path="*" element={<Error code="404"/>}/>
					</Routes>
				</BrowserRouter>
			</section>

			<SidePanel/>
		</main>
		<Player/>
	</>
}