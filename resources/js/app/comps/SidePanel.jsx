
import React, { useContext, useState, useEffect } from 'react';
import { store } from '../index';
import { useNavigate } from 'react-router-dom';
import '/resources/css/side-panel.css';
import panelProfileIcon from "/resources/assets/panelprofile.jpg";
import logoutIcon from "/resources/assets/icon _logout_.png";
import editIcon from "/resources/assets/icon _user edit_.png";
import logo from "/resources/assets/logo.svg";
import { logout } from '/resources/js/api/auth';
import { myPlaylists, fetchPlaylistImage } from '/resources/js/api/playlist';

export default function Player(){
	const Store = useContext(store);
	const user = Store.user.get();
	const [playlists, setPlaylists] = useState([]);
	const allowFetch = Store.allowFetch;
	const goto = useNavigate();

	useEffect(() => {
		(async () => {
			try{
				const data = await myPlaylists()
				for (let playlist of data){
					playlist.img = await fetchPlaylistImage(playlist.id);
				}
				setPlaylists(data);
			}catch(err){
				console.log(err)
				Store.notify(`error occured : ${err.response?.data?.error ?? "unexpected error"}`);
			}
		})();
	}, [allowFetch]);

	return <div id="side-panel" className="border">
		<div className='panel-header'>
			<div className='logo-icon'>
				<img src={logo} alt="background" className="background-image" />
			</div>
			<div className='options'>
				<div className="edit" onClick={() => goto("/profile")}>
				<img src={editIcon} alt="background" className="background-image" />
				</div>
				
				<div className="user-img">
					<img src={panelProfileIcon} alt="background" className="background-image" />
				</div>
				
				<div className="logout">
				<img src={logoutIcon} alt="background" className="background-image" onClick={() => {
					logout()
						.then(() => window.location.reload())
						.catch(() => Store.notify("unexpected error"))
				}}/>
				</div>
				
			</div>
			<div className='user-name'>{user.username}</div>
			
		</div>	
		<p className='title-playlist'> My playlists</p>
		<div className='panel-playList'>
			{
				playlists.map(playlist => {
					return <div className="border playlist-item" key={playlist.id}>
						<img src={playlist.img} alt="background" className="avatar" />
						<p className="playlist-title">{playlist.title}</p>
					</div>
				})
			}
	  	</div>
	 	
</div>
}