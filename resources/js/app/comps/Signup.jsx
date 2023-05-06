import React, { useContext, useRef } from 'react';
import Login from './Login';

export default function Signup({ setTarget }){
	return <form className="overlay border">
		<h3>signup form</h3>
		<Input label="email" placeholder="enter your email"/>
		<Input type="password" label="password" placeholder="enter your password"/>
		<Input type="submit"/> 
		<a onClick={(e) => {
			e.preventDefault()
			setTarget(<Login {...{setTarget}}/>);
		}}>
			click here if already have an account
		</a>
	</form>
}