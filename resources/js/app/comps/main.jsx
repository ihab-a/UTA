import React, { useState, useContext, useEffect } from 'react';
import Interface from './Interface';
import AuthProvider from './AuthProvider';
import NotificationHandler from './NotificationHandler';
import { store } from '/resources/js/app/index';

export default function Main(props){
	const [user, setUser] = useState({});
	const [allowFetch, setAllowFetch] = useState(false)

	useEffect(() => {
		if(user.id && localStorage.getItem("token")) setAllowFetch(true)
		else setAllowFetch(false);
	}, [user]);
	
	return <store.Provider value={{
		user : {
			set : setUser,
			get : () => user,
		},
		allowFetch,
	}}>
		<NotificationHandler/>
		<AuthProvider/>
		<Interface/>
	</store.Provider>
}