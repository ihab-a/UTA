import React, { useContext } from "react";
import { store } from '../index';
import '/resources/css/song.css';

export default function Song({ id, title, likes, user }){
	const Store = useContext(store);

	const handleClick = () => {
		Store.player.setTarget(id);
	}
	return <div className="song" onClick={handleClick}>
		<img src="https://random.imagecdn.app/200/200" className="song-image"/>
		<div className="text-truncate">{title}</div>
		<div className="text-center">❤️ {likes}</div>
		<div className="text-center">by {user.username}</div>
	</div>
}