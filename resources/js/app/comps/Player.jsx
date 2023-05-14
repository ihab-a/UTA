import React, { useRef, useState, useEffect, useContext } from 'react';
import '/resources/css/player.css';
import { fetchSong } from '/resources/js/api/song.js';
import { store } from '../index';

export default function Player(){
	const [playOnSongChange, setPlayOnSongChange] = useState(true);
	const [target, setTarget] = useState(7);
	const [playing, setPlaying] = useState(false);
	const [song, setSong] = useState({});
	const [duration, setDuration] = useState(0);
	const Store = useContext(store);
	const player = useRef(new Audio());

	const togglePlay = () => {
		setPlaying(!playing);
	};

	const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

	Store.player = {target, setTarget};

	useEffect(() => {
		let updateDuration;

		if(playing){
			player.current.play();
	        updateDuration = setInterval(() => {
				setDuration(player.current.currentTime);
	        }, 1000);
		}
		else
			player.current.pause();

		return () => {
            clearInterval(updateDuration);
		}
	}, [playing]);

	useEffect(() => {
		player.current.src = `/api/song/${target}/listen`;
		setPlaying(false);
		if(target !== null)
			fetchSong(target).then(d => setSong(d));
	}, [target]);

	useEffect(() => {
		// only if song is fetched allow play on song change
		if(song.id && playOnSongChange) setPlayOnSongChange(false);

		// don't play directly on first render
		if(!playOnSongChange)
			setPlaying(true);
	}, [song]);

	useEffect(() => {
		const handlePlaybackEnded = () => {
			setPlaying(false);
		};

		player.current.addEventListener("ended", handlePlaybackEnded);

        return () => {
        	player.current.removeEventListener("ended", handlePlaybackEnded);
        };
	}, []);

	return <div id="player" className="border">
		<div id="player-meta">
			<img id="player-image" src="https://random.imagecdn.app/200/200"/>
			<div id="player-text">
				<div className="text-truncate">{song.title}</div>
				<div className="text-truncate">{song.user?.username}</div>
				<div className="text-truncate">♡ {song.likes}</div>
			</div>
		</div>

		<div id="player-controls">
			<div onClick={togglePlay}>{playing ? "pause" : "play"}</div>
			<div>{formatTime(duration)}</div>
		</div>

		<div id="player-tools">
			<span>+</span>
			<span>lyrics</span>
			<span>volume</span>
		</div>
	</div>
}