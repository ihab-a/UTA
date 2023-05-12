import React, { useRef, useState, useEffect, useContext } from 'react';
import '/resources/css/player.css';
import { fetchSong } from '/resources/js/api/song.js';
import { store } from '../index';

export default function Player(){
	const [target, setTarget] = useState(parseInt(Math.random() * 200 % 200) + 1);
	const [playing, setPlaying] = useState(false);
	const [song, setSong] = useState({});
	const Store = useContext(store);
	const player = useRef();

	const togglePlay = () => {
		setPlaying(!playing);
	};

	Store.player = {target, setTarget};

	useEffect(() => {
		if(playing)
			player.current.play();
		else
			player.current.pause();
	}, [playing]);

	useEffect(() => {
		setPlaying(false);
		if(target !== null)
			fetchSong(target).then(d => setSong(d));
	}, [target]);

	useEffect(() => {
		setPlaying(true);
	}, [song]);

	return <div id="player" className="border">
		<audio src={`/api/song/${target}/listen`} ref={player}/>
		<div style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "space-around",
			width: "100%",
			position: "absolute"
		}}>
			{song.title}<span style={{
				fontSize: "2rem",
				display: "inline"
			}} onClick={togglePlay}>{playing ? "⏸️" : "▶️"}</span>
		</div>
	</div>
}