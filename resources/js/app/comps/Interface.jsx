import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import SidePanel from './SidePanel';
import Player from './Player';
import '/resources/css/main.css';

export default function Interface(props){
	return <>
		<main id="main">
			<Nav/>
			<section id="content">
				<BrowserRouter>
					<Routes>
						<Route path="/home" element="home"/>
						<Route path="*" element="not found, redirecting to home..."/>
					</Routes>
				</BrowserRouter>
			</section>

			<SidePanel/>
		</main>
		<Player/>
	</>
}