import React, { useContext, useRef } from 'react'
import { store } from '/resources/js/app/index';
import Input from './Input';
import Signup from './Signup'
import { login } from '/resources/js/api/auth';

export default function Login({ setTarget, triggerRefetch }){
	const Store = useContext(store);

	const email = useRef();
	const password = useRef();

	const swapToLogin = (e) => {
		e.preventDefault()
		setTarget(<Signup {...{setTarget}}/>);
	};

	const tryLogin = (e) => {
		e.preventDefault();
		login(email.current.value, password.current.value)
			.then((d) => {
				localStorage.setItem("token", d.token);
				triggerRefetch();
				setTarget(null);
			})
			.catch((err) => {
				Store.notify(`error occured : ${err.response?.data?.error ?? "unexpected error"}`);
			})
	};

	return <form className="overlay border">
		<h3>login form</h3>
		<Input _ref={email} label="email" placeholder="enter your email"/>
		<Input _ref={password} type="password" label="password" placeholder="enter your password"/>
		<a onClick={swapToLogin}>
			click here if you don't have an account
		</a>
		<Input type="submit" onClick={tryLogin}/> 
	</form>
}