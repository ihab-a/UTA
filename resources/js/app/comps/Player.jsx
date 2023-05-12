import React, { useRef, useState, useEffect } from 'react';
import '/resources/css/player.css';
import { fetchSong } from '/resources/js/api/song.js';

export default function Player(){
	const [target, setTarget] = useState(parseInt(Math.random() % 200) + 1);
	const [playing, setPlaying] = useState(false);
	const [song, setSong] = useState({});
	const player = useRef();

	const togglePlay = () => {
		setPlaying(!playing);
		if(playing)
			player.current.pause();
		else
			player.current.play();
	};

	useEffect(() => {
		if(target !== null)
			fetchSong(target).then(d => setSong(d));
	}, [target]);

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