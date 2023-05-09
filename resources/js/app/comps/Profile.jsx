import React, { useContext } from 'react';
import Input from './Input';
import { store } from '../index';


export default function Profile(){
	const Store = useContext(store);
	const user = Store.user.get();

	return <>
		<section className="Profile">
			// profile pic here
		</section>

		<section className="personal-info">
			<Input label="username" defaultValue={user.username}/>
			<Input label="email" defaultValue={user.email}/>
		</section>
	</>
}