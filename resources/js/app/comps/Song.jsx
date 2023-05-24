import React, { useContext } from "react";
import { store } from '../index';
import heartIcon from '/resources/assets/heart.png';
import heartLikedIcon from '/resources/assets/heart-liked.png';

import '/resources/css/song.css';

export default function Song({ id, title, likes, user }){
	const Store = useContext(store);

	const handleClick = () => {
		Store.player.setTarget(id);
	}
	return <div className="song" onClick={handleClick} title={title}>
		<img src="https://random.imagecdn.app/200/200" className="song-image"/>
		<div className="text-truncate">{title}</div>
		<div className="flex-h">
			<img src={heartIcon} className="icon-s"/>
			<span className="margin-v">{likes}</span>
		</div>
		<div className="text-truncate">@ {user.username}</div>
	</div>
}