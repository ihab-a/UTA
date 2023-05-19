import React, { useState, useEffect, useContext } from "react";
import { fetchSongAll } from "/resources/js/api/song";
import { getSuggestions } from "/resources/js/api/suggestion";
import search from "/resources/js/api/search";
import Input from "./Input"
import Song from "./Song";
import { store } from '../index';

export default function Feed({ id, title, likes, user }){
	const Store = useContext(store)
	const [randomSongs, setRandomSongs] = useState([]);
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
		{searchResult.songs?.length ?
		<div className="border margin-h">
			<h4>search song results ({searchResult.songs?.length})</h4>
			<div className="flex-h">
				{
					searchResult.songs?.map((song) => {
						return <Song {...song} key={song.id}/>;
					})
				}
			</div>
		</div>
		: null}
		{searchResult.playlists?.length ?
		<div className="border margin-h">
			<h4>search playlist results ({searchResult.songs?.length})</h4>
			<div className="flex-h">
				{
					searchResult.playlists?.map((playlist) => {
						return <Song {...playlist} key={playlist.id}/>;
					})
				}
			</div>
		</div>
		: null}
		{forYou.songs?.length ?
		<div className="border margin-h">
		<h4>songs suggested for you</h4>
			<div className="flex-h">
				{
					forYou.songs?.map((song) => {
						return <Song {...song} key={song.id}/>;
					})
				}
			</div>
		</div>
		: null}
		{forYou.playlists?.length ?
		<div className="border margin-h">
		<h4>songs suggested for you</h4>
			<div className="flex-h">
				{
					forYou.songs?.map((song) => {
						return <Song {...song} key={song.id}/>;
					})
				}
			</div>
		</div>
		: null}
		{randomSongs ?
		<div className="border margin-h">
		<h4>random songs</h4>
			<div className="flex-h">
				{
					randomSongs.map((song) => {
						return <Song {...song} key={song.id}/>;
					})
				}
			</div>
		</div>
		: null}
	</div>
}