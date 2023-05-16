import React, { useRef, useState, useEffect, useContext } from 'react';
import '/resources/css/player.css';
import { fetchSong } from '/resources/js/api/song.js';
import { store } from '../index';

import playIcon from '/resources/assets/play.png';
import pauseIcon from '/resources/assets/pause.png';
import repeatIcon from '/resources/assets/repeat.png';
import noRepeatIcon from '/resources/assets/no-repeat.png';
import shuffleIcon from '/resources/assets/shuffle.png';
import noShuffleIcon from '/resources/assets/no-shuffle.png';
import lyricsIcon from '/resources/assets/lyrics.png';
import volumeIcon from '/resources/assets/volume.png';

export default function Player(){
	const [playOnSongChange, setPlayOnSongChange] = useState(true);
	const [target, setTarget] = useState(7);
	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(1);
	const [repeat, setRepeat] = useState(false);
	const [muted, setMuted] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const [volumeBar, setVolumeBar] = useState(false);
	const [song, setSong] = useState({});
	const [duration, setDuration] = useState(0);
	const Store = useContext(store);
	const player = useRef(new Audio());

	const hideVolumeBar = () => {
		setVolumeBar(true);
		clearTimeout(window.volumeBarHider);

		window.volumeBarHider = setTimeout(() => {
			setVolumeBar(false);
		}, 5000);
	};


	const togglePlay = () => {
		setPlaying(!playing);
	};
	const toggleRepeat = () => {
		player.current.loop = !repeat;
		setRepeat(!repeat);
	};
	const toggleShuffle = () => {
		setShuffle(!shuffle);
	};
	const toggleMuted = () => {
		player.current.muted = !muted;
		setMuted(!muted);
		hideVolumeBar();
	};
	const showVolumeBar = () => {
		if(volumeBar) return; 

		hideVolumeBar();
		setVolumeBar(true);
	};

	const formatTime = (timeInSeconds) => {
		if(isNaN(timeInSeconds))
        	return `--:--`;

        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleSeek = (e) => {
    	if(!player.current.duration) return;
    	setDuration((e.nativeEvent.offsetX / e.target.clientWidth) * player.current.duration);
    	player.current.currentTime = (e.nativeEvent.offsetX / e.target.clientWidth) * player.current.duration;
    };
    const handleVolumeBarClick = (e) => {
		hideVolumeBar();
		const newVolume = Math.min((e.target.clientHeight - e.nativeEvent.offsetY + 1) / e.target.clientHeight, 1);
    	setVolume(newVolume);
		player.current.volume = newVolume;
    }

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
		<div id="player-meta" className="border">
			<img id="player-image" src="https://random.imagecdn.app/200/200"/>
			<div id="player-text">
				<div className="text-truncate">{song.title}</div>
				<div className="text-truncate">{song.user?.username}</div>
				<div className="text-truncate">♡ {song.likes}</div>
			</div>
		</div>

		<div id="player-controls" className="border">
			<div id="player-buttons">
				<img className="icon" onClick={toggleRepeat} src={repeat ? repeatIcon : noRepeatIcon}/>
				<div>&lt;</div>
				<img className="icon-b" onClick={togglePlay} src={playing ? pauseIcon : playIcon}/>
				<div>&gt;</div>
				<img className="icon" onClick={toggleShuffle} src={shuffle ? shuffleIcon : noShuffleIcon}/>
			</div>
			<div className="flex-h" id="seekbar-group">
				<div>{formatTime(duration)}</div>
				<div id="seekbar" onMouseDown={handleSeek} style={{
					"--progress" : `${Math.min((duration / player.current.duration) * 100, 100)}%`,
				}}></div>
				<div>{formatTime(player.current.duration)}</div>
			</div>
		</div>

		<div id="player-tools" className="border">
			<span>+</span>
			<img className="icon-s" src={lyricsIcon}/>
			<div id="volume">
				{
					volumeBar ? <div id="volume-bar" onClick={handleVolumeBarClick} style={{
						"--volume" : `${volume * 100 - 6}%`,
					}}/> : null
				}
				<img className="icon-s" onClick={toggleMuted} onMouseEnter={showVolumeBar} src={volumeIcon}/>
			</div>
		</div>
	</div>
}