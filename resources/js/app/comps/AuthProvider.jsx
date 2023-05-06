import React, { useEffect, useContext, useState, useRef } from 'react';
import { store } from '/resources/js/app/index';
import { fetchUser, login } from '/resources/js/api/auth';
import Login from './Login'
import Signup from './Signup'

export default function AuthProvider(){
	const [refetch, setRefetch] = useState(false);
	const [target, setTarget] = useState(null);
	const Store = useContext(store);
	const first = useRef(true);
	const triggerRefetch = () => setRefetch(r => !r);

	useEffect(() => {
		fetchUser()
			.then((d) => {
				Store.user.set(d);

				first.current && Store.notify("logged in using saved session", "info", 1500);

				setTarget(null)
			})
			.catch((err) => {
				Store.notify(`error occured : ${err.response?.data?.error ?? "unexpected error"}`);
				setTarget(<Login {...{setTarget, triggerRefetch}}/>);
			})
			.finally(() => {
				// set first to false if it is true to only show this message once
				if(first.current)
					first.current = !first.current;
			})
	}, [refetch]);
	
	return target;
}