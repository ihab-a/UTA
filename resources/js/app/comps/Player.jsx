import React, { useRef, useState, useEffect, useContext } from 'react';
import '/resources/css/player.css';
import { fetchSong, likeSong } from '/resources/js/api/song.js';
import { getQueue, saveQueue } from '/resources/js/api/queue.js';
import { store } from '../index';

import playIcon from '/resources/assets/play.png';
import pauseIcon from '/resources/assets/pause.png';
import repeatIcon from '/resources/assets/repeat.png';
import noRepeatIcon from '/resources/assets/no-repeat.png';
import shuffleIcon from '/resources/assets/shuffle.png';
import noShuffleIcon from '/resources/assets/no-shuffle.png';
import lyricsIcon from '/resources/assets/lyrics.png';
import volumeIcon from '/resources/assets/volume.png';
import mutedIcon from '/resources/assets/muted.png';
import playlistIcon from '/resources/assets/add-to-playlist.png';
import nextIcon from '/resources/assets/next.png';
import previousIcon from '/resources/assets/previous.png';
import heartIcon from '/resources/assets/heart.png';
import heartLikedIcon from '/resources/assets/heart-liked.png';

export default function Player(){
	const [playOnSongChange, setPlayOnSongChange] = useState(false);
	const [firstRender, setFirstRender] = useState(true);
	const [ready, setReady] = useState(null);
	const [queue, setQueue] = useState([]);
	const [offset, setOffset] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(1);
	const [repeat, setRepeat] = useState(false);
	const [muted, setMuted] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const [volumeBar, setVolumeBar] = useState(false);
	const [song, setSong] = useState({});
	const [duration, setDuration] = useState(0);
	const [buffered, setBuffered] = useState(0);
	const [maxDuration, setMaxDuration] = useState(0);
	const Store = useContext(store);
	const player = useRef(new Audio());
	const allowFetch = Store.allowFetch;

	const hideVolumeBar = () => {
		setVolumeBar(true);
		clearTimeout(window.volumeBarHider);

		window.volumeBarHider = setTimeout(() => {
			setVolumeBar(false);
		}, 5000);
	};


	const togglePlay = () => {
		if(ready)
			setPlaying(playing => !playing);
	};
	const toggleRepeat = () => {
		player.current.loop = !repeat;
		setRepeat(repeat => !repeat);
	};
	const toggleShuffle = () => {
		setShuffle(shuffle => !shuffle);
	};
	const toggleMuted = () => {
		player.current.muted = !muted;
		setMuted(muted => !muted);
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

    const nextSong = () => {
    	setOffset(offset => (offset + 1) % queue.length);
    }
    const previousSong = () => {
    	setOffset(offset => {
    		if(offset - 1 > 0)
    			return offset - 1;
    		else
    			return (queue.length + offset - 1) % queue.length;
    	});
    }
    const randomSong = () => {
    	setOffset(Math.trunc(Math.random() * queue.length));
    }

    const handleLike = (e) => {
    	// to fallback in case of error
    	const oldSong = {...song};
    	const sign = [-1, 1];
    	setPlayOnSongChange(false);
    	setSong(s => {return {...s, liked: !s.liked, likes: song.likes + 1 * sign[+!song.liked]}});

    	likeSong(song.id)
    		.catch(d => setSong(oldSong));
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

	Store.player = {
		queue,
		setQueue,
		offset,
		setOffset,
		play : (queue, offset) => {
			setQueue(queue);
			setOffset(offset);
		}
	};

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
		setPlaying(false);
		if(allowFetch && queue.length){
			setReady(false);
			player.current.src = `/api/song/${queue[offset].id}/listen`;
			setSong(queue[offset]);
		}
	}, [queue, offset, allowFetch]);

	useEffect(() => {
		if(!firstRender && queue.length)
			return saveQueue(queue, offset);
	}, [queue, offset])

	useEffect(() => {
		allowFetch && getQueue().then(d => {
			setQueue(d.queue);
			setOffset(d.offset);
		});
	}, [allowFetch]);

	useEffect(() => {
		const pause = () => setPlaying(false);
		const play = () => setPlaying(true);

		player.current.addEventListener("play", play);
		player.current.addEventListener("pause", pause);

		return () => {
			player.current.addEventListener("play", play);
			player.current.addEventListener("pause", pause);
		};
	}, []);

	useEffect(() => {
		const handleKeyPress = (e) => {
			if(e.target.tagName === "INPUT") return;
			if(e.code === "Space"){
				e.preventDefault();
				togglePlay();
			}
		};
		const handleKeyDown = (e) => {
			if(e.target.tagName === "INPUT") return;
			if(e.code === "ArrowRight"){
				e.preventDefault();
				const targetTime = Math.min(player.current.currentTime + 10, player.current.duration);
				setDuration(targetTime)
				player.current.currentTime = targetTime;
			}
			if(e.code === "ArrowLeft"){
				e.preventDefault();
				const targetTime = Math.max(player.current.currentTime - 10, 0);
				setDuration(targetTime)
				player.current.currentTime = targetTime;
			}
			if(e.code === "KeyN"){
				e.preventDefault();
				Store.notify("next song >>");
				nextSong();
			}
			if(e.code === "KeyP"){
				e.preventDefault();
				Store.notify("<< previous song");
				previousSong();
			}
		};

		if(ready){
			document.addEventListener("keypress", handleKeyPress);
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("keypress", handleKeyPress);
			document.removeEventListener("keydown", handleKeyDown);
		}
	}, [ready])
	useEffect(() => {
		const handlePlaybackEnded = () => {
			// let media player handle song repeat
			if(repeat) return;

			if(shuffle) return randomSong()
			nextSong();
		};
		const handleSongReady = () => {
			setPlaying(!firstRender || playOnSongChange)
			if(!playOnSongChange)
				setPlayOnSongChange(true);
			if(firstRender)
				setFirstRender(false);
			setDuration(0);
			setMaxDuration(player.current.duration);
			setReady(true);
		};
		const handleSongBuffer = () => {
			if(player.current.buffered.length)
				setBuffered((player.current.buffered.end(0) / player.current.duration) * 100);
		};

		player.current.addEventListener("ended", handlePlaybackEnded);
		player.current.addEventListener("loadedmetadata", handleSongReady);
		player.current.addEventListener("progress", handleSongBuffer);

        return () => {
        	player.current.removeEventListener("ended", handlePlaybackEnded);
			player.current.removeEventListener("loadedmetadata", handleSongReady);
			player.current.removeEventListener("progress", handleSongBuffer);
        };
	}, [song]);

	return <div id="player" className="border">
		{song.id ?
		<div id="player-meta" className="border">
			<img id="player-image" src="https://random.imagecdn.app/200/200"/>
			<div id="player-text">
				<div className="text-truncate" title={`song name: ${song.title}`}>{song.title}</div>
				<div className="text-truncate" title={`author: ${song.user?.username}`}>@ {song.user?.username}</div>
				<div className="text-truncate flex-h">
					<img src={song.liked ? heartLikedIcon : heartIcon} onClick={handleLike} className="icon"/>
					<div style={{margin: "0 var(--size-s)"}}>{song.likes}</div>
				</div>
			</div>
		</div>
		: null}

		<div id="player-controls" className="border">
			<div id="player-buttons">
				<img className="icon-s" onClick={toggleRepeat} src={repeat ? repeatIcon : noRepeatIcon}/>
				<img className="icon" src={previousIcon} onClick={() => previousSong()}/>
				<img className="icon-b" onClick={togglePlay} src={playing ? pauseIcon : playIcon}/>
				<img className="icon" src={nextIcon} onClick={() => nextSong()}/>
				<img className="icon-s" onClick={toggleShuffle} src={shuffle ? shuffleIcon : noShuffleIcon}/>
			</div>
			<div className="flex-h" id="seekbar-group">
				<div>{formatTime(duration)}</div>
				<div id="seekbar" onMouseDown={handleSeek} style={{
					"--progress" : `${Math.min((duration / player.current.duration) * 100, 100)}%`,
					"--buffered" : `${buffered}%`,
				}}></div>
				<div>{formatTime(maxDuration)}</div>
			</div>
		</div>

		<div id="player-tools" className="border">
			<img className="icon-s" src={playlistIcon}/>
			<img className="icon-s" src={lyricsIcon}/>
			<div id="volume">
				{
					volumeBar ? <div id="volume-bar" onClick={handleVolumeBarClick} style={{
						"--volume" : `${volume * 100 - 6}%`,
					}}/> : null
				}
				<img className="icon-s" onClick={toggleMuted} onMouseEnter={showVolumeBar} src={muted ? mutedIcon : volumeIcon}/>
			</div>
		</div>
	</div>
}