import React, { useContext } from 'react';
import { store } from '../index';
import Feed from "./Feed";

export default function Home(){
	const Store = useContext(store);
	const user = Store.user.get();

	return <section>
		<h3> welcome {user.username} enjoy your stay</h3>
		<Feed/>
	</section>
}