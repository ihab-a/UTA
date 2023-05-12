import React, { useContext, useRef } from 'react'
import { store } from '/resources/js/app/index';
import Signup from './Signup';
import { login } from '/resources/js/api/auth';
import "/resources/css/login.css";
import picture from "/resources/assets/login-splash.jpg";

export default function Login({ setTarget, triggerRefetch }){
	const Store = useContext(store);

	const email = useRef();
	const password = useRef();

	const swapToSignup = (e) => {
		e.preventDefault()
		setTarget(<Signup {...{setTarget, triggerRefetch}}/>);
	};

	const tryLogin = (e) => {
		e.preventDefault();
		login(email.current.value, password.current.value)
			.then((d) => {
				Store.notify(`login was successful`);
				localStorage.setItem("token", d.token);
				triggerRefetch();
			})
			.catch((err) => {
				Store.notify(`error occured : ${err.response?.data?.error ?? "unexpected error"}`);
			})
	};

	return <div className="form-holder">
		<div className="image-container">
		<img src={picture} alt="background" className="background-image" />
		</div>
		<form onSubmit={tryLogin} className="login-form">
		<h2 className="login-title">Login</h2>
		<div className="input-container">
			<input
				type="email"
				name="email"
				ref={email}
				className="login-input"
				placeholder="E-mail"
			/>
		</div>
		<div className="input-container">
			<input
				type="password"
				name="password"
				ref={password}
				className="login-input"
				placeholder="Password"
			/>
		</div>
		<div className="signup-container">
			<p>
			Don’t have an account? <span className="sip" onClick={swapToSignup}>Signup here</span>
			</p>
		</div>
		<button type="submit" className="login-button">
			Login
		</button>
		</form>
	</div>
}