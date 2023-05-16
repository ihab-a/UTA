
import React, { useContext } from 'react';
import { store } from '../index';
import '/resources/css/side-panel.css';
import panelprofilee from "/resources/assets/panelprofile.jpg";
import logout from "/resources/assets/icon _logout_.png";
import edite from "/resources/assets/icon _user edit_.png";
import logo from "/resources/assets/logo.svg";
import panelprofile from "/resources/assets/icon _profile circle_.png";
export default function Player(){
	const Store = useContext(store);
	const user = Store.user.get();
	return <div id="side-panel" className="border">
		<div className='panel-header'>
			<div className='logo-icon'>
				<img src={logo} alt="background" className="background-image" />
			</div>
			<div className='options'>
				<div className="edit">
				<img src={edite} alt="background" className="background-image" />
				</div>
				
				<div className="user-img">
					<img src={panelprofile} alt="background" className="background-image" />
				</div>
				
				<div className="logout">
				<img src={logout} alt="background" className="background-image" />
				</div>
				
			</div>
			<div className='user-name'>{user.username}</div>
			
		</div>	
		<div className='panel-playList'>
			 <p className='title-playlist'> My playlists</p>
			 <div>
			 <div className="playlist-item border">
				<img src={panelprofile} alt="background" className="avatar" />
				<p className="playlist-title">my playlist 1</p>
			</div>
			<div className="playlist-item border">
				<img src={panelprofile} alt="background" className="avatar" />
				<p className="playlist-title">my playlist 2</p>
			</div>
			<div className="playlist-item border">
				<img src={panelprofile} alt="background" className="avatar" />
				<p className="playlist-title">my playlist 3</p>
			</div>
			<div className="playlist-item border">
				<img src={panelprofile} alt="background" className="avatar" />
				<p className="playlist-title">my playlist 4</p>
			</div>
			 </div>
	  	</div>
	 	
</div>
}