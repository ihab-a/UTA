import React, { useRef, useEffect, useContext } from 'react';
import { createSong } from '/resources/js/api/song';
import { store } from '../index';
import Input from './Input';

export default function CreateSong(){
	const name = useRef();
	const description = useRef();
	const file = useRef();
	const Store = useContext(store);

	const handleSubmit = async () => {
		const title = name.current.value;
		const desc = description.current.value;
		const songFile = file.current.files[0];

		if (!title || !desc || !songFile) {
	    	return Store.notify("everything must be choosen");
		}

		try {
			const response = await createSong(title, desc, songFile);
			Store.notify('Song created');
		} catch (error) {
			Store.notify('Error creating song');
		}
	};

	return <div className="flex-v">
		<h4>Create a new song</h4>
		<Input label="name" _ref={name} placeholder="enter the song's name"/>
		<Input label="description" _ref={description} placeholder="enter the song's description"/>
		<Input label="upload song file" type="file" _ref={file}/>
		<Input type="submit" defaultValue="done" onClick={handleSubmit}/>
	</div>
};