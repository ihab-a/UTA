import React from 'react';
import "/resources/css/nav.css";
import { useNavigate } from 'react-router-dom';
import home from "/resources/assets/home.png";
import uploadSong from "/resources/assets/favourite.png";
import addPlaylist from "/resources/assets/playlist.png";
import settings from "/resources/assets/settings.png";

export default function Nav(){
	const goto = useNavigate();
	return <div className="borderr" id='nav'>
		<div className="sidebar">
			<div className="side-menu">
				<div className="icon-container" onClick={() => goto("/")}>
					<img src={home} alt="background" className="background-image" />
				</div>
				<div className="icon-container" onClick={() => goto("/profile")}>
					<img src={uploadSong} alt="background" className="background-image" />
				</div>
				<div className="icon-container">
					<img src={addPlaylist} alt="background" className="background-image" />
				</div>
				<div className="icon-container">
					<img src={settings} alt="background" className="background-image" />
				</div>
		   </div>
	   </div>
	</div>
}