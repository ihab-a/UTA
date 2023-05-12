import React, { useContext, useRef } from 'react'
import { store } from '/resources/js/app/index';
import Login from './Login'
import { signup } from '/resources/js/api/auth';
import "/resources/css/login.css";
import picture from "/resources/assets/signup-splash.jpg";

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

	return <div className="form-holder">
		<div className="image-container">
		<img src={picture} alt="background" className="background-image" />
		</div>
		<form onSubmit={trySignup} className="login-form">
		<h2 className="login-title">Signup</h2>
		<div className="input-container">
			<input
				type="text"
				name="username"
				ref={username}
				className="login-input"
				placeholder="username"
			/>
		</div>
		
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
			you already have an account ?<span className="sip" onClick={swapToLogin }>Login here</span>
			</p>
		</div>
		<button type="submit" className="login-button">
			Signup
		</button>
		</form>
	</div>
}