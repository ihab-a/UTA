import React, { useState, useEffect, useContext } from "react";
import { fetchSongAll, getLiked } from "/resources/js/api/song";
import { getSuggestions } from "/resources/js/api/suggestion";
import search from "/resources/js/api/search";
import Input from "./Input"
import Song from "./Song";
import { store } from '../index';
import SongContainer from './SongContainer';

export default function Feed({ id, title, likes, user }){
	const Store = useContext(store)
	const [randomSongs, setRandomSongs] = useState([]);
	const [likedSongs, setLikedSongs] = useState([]);
	const [forYou, setForYou] = useState([]);
	const [searchTarget, setSearchTarget] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const allowFetch = Store.allowFetch;

	const handleInput = (e) => {
		setSearchTarget(e.target.value);
	}

	useEffect(() => {
		if(allowFetch){
			fetchSongAll().then(d => setRandomSongs(d));
			getSuggestions().then(d => setForYou(d));
			getLiked().then(d => setLikedSongs(d));
		}
	}, [allowFetch]);

	useEffect(() => {
		if(searchTarget && searchTarget.length >= 3)
			search(searchTarget).then(d => {
				if(d.songs.length != 0)
					setSearchResult(d)
		});
	}, [searchTarget]);

	return <div>
		<Input type="text" value={searchTarget} onInput={handleInput} placeholder="search songs and playlists"/>
		<SongContainer
			title={`search song results (${searchResult.songs?.length})`} 
			data={searchResult.songs}/>
		<SongContainer
			title={`search playlist results (${searchResult.playlists?.length})`} 
			data={searchResult.playlists}/>
		<SongContainer title="Songs for you" data={forYou.songs}/>
		<SongContainer title="Songs you liked" data={forYou.songs}/>
		<SongContainer title="Random songs" data={forYou.songs}/>
	</div>
}