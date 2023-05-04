import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Split from './split/split';
import '/resources/css/main.css';

export default function Main(props){
	return <>
		<main id="main">
			<nav id="nav" className="border">
				nav
			</nav>

			<section id="content">
				<BrowserRouter>
					<Routes>
						<Route path="/home" element="home"/>
						<Route path="*" element="not found, redirecting to home..."/>
					</Routes>
				</BrowserRouter>
			</section>

			<nav id="side-panel" className="border">
				side panel
			</nav>
		</main>
		<div id="player" className="border">
			player
		</div>
	</>
}