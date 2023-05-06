import React, { useState, useContext } from 'react';
import Interface from './Interface';
import AuthProvider from './AuthProvider';
import NotificationHandler from './NotificationHandler';
import { store } from '/resources/js/app/index';

export default function Main(props){
	const [user, setUser] = useState({});
	return <store.Provider value={{
		user : {
			set : setUser,
			get : () => user,
		},
	}}>
		<NotificationHandler/>
		<AuthProvider/>
		<Interface/>
	</store.Provider>
}