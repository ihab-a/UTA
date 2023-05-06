import React, { useContext, useRef } from 'react'
import { store } from '/resources/js/app/index';
import Input from './Input';
import Login from './Login'
import { signup } from '/resources/js/api/auth';

export default function Signup({ setTarget, triggerRefetch }){
	const Store = useContext(store);

	const username = useRef();
	const email = useRef();
	const password = useRef();

	const swapToLogin = (e) => {
		e.preventDefault()
		setTarget(<Login {...{setTarget}}/>);
	};

	const trySignup = (e) => {
		e.preventDefault();
		signup(username.current.value, email.current.value, password.current.value)
			.then((d) => {
				Store.notify(`user ${username.current.value} created successfully`);
				localStorage.setItem("token", d.token);
				triggerRefetch();
			})
			.catch((err) => {
				Store.notify(`error occured : ${err.response?.data?.error ?? "unexpected error"}`);
			})
	};

	return <form className="overlay border">
		<h3>signup form</h3>
		<Input _ref={username} label="username" placeholder="choose a username"/>
		<Input _ref={email} label="email" placeholder="enter your email"/>
		<Input _ref={password} type="password" label="password" placeholder="enter your password"/>
		<a onClick={swapToLogin}>
			click here if you don't have an account
		</a>
		<Input type="submit" onClick={trySignup}/> 
	</form>
}