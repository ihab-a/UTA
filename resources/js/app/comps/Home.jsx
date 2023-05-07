import React, { useContext } from 'react';
import { store } from '../index';

export default function Home(){
	const Store = useContext(store);
	const user = Store.user.get();

	return <section>
		<h3> welcome {user.username}</h3>
	</section>
}