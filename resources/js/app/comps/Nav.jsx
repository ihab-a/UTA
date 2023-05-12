import React from 'react';
import "/resources/css/nav.css";
import { useNavigate } from 'react-router-dom';
import picture from "/resources/assets/home.png";
import picture2 from "/resources/assets/favourite.png";
import picture3 from "/resources/assets/playlist.png";
import picture4 from "/resources/assets/settings.png";



export default function Nav(){
	const goto = useNavigate();
	return <div class="borderr" id='nav'>
		<div class="sidebar">
		<div class="side-menu">
		<div className="icon-container" onClick={() => goto("/")}>
		<img src={picture} alt="background" className="background-image" />
		</div>
		<div className="icon-container">
		<img src={picture2} alt="background" className="background-image" />
		</div>
		<div className="icon-container">
		<img src={picture3} alt="background" className="background-image" />
		</div>
		<div className="icon-container">
		<img src={picture4} alt="background" className="background-image" />
		</div>
		
			
	   </div>
	   </div>
	</div>
}