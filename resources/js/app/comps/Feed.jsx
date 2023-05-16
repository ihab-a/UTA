import React, { useState, useEffect } from "react";
import { fetchSongAll } from "/resources/js/api/song";
import search from "/resources/js/api/search";
import Input from "./Input"
import Song from "./Song";

export default function Feed({ id, title, likes, user }){
	const [data, setData] = useState([]);
	const [searchTarget, setSearchTarget] = useState("");
	const [searchResult, setSearchResult] = useState([]);

	const handleInput = (e) => {
		setSearchTarget(e.target.value);
	}

	useEffect(() => {
		fetchSongAll().then(d => setData(d));
	}, []);

	useEffect(() => {
		if(searchTarget && searchTarget.length >= 3)
			search(searchTarget).then(d => {
				if(d.songs.length != 0)
					setSearchResult(d)
		});
	}, [searchTarget]);

	return <div>
		<Input type="text" value={searchTarget} onInput={handleInput} placeholder="search songs and playlists"/>
		<div className="border margin-h">
			{searchResult.songs?.length ? 
				`search search song results (${searchResult.songs?.length})` : null}
			<div className="flex-h">
				{
					searchResult.songs?.map((song) => {
						return <Song {...song} key={song.id}/>;
					})
				}
			</div>
		</div>
		<div className="border margin-h">
			{searchResult.playlists?.length ? 
				`search search playlist results (${searchResult.playlists?.length})` : null}
			<div className="flex-h">
				{
					searchResult.playlists?.map((playlist) => {
						return <Song {...playlist} key={playlist.id}/>;
					})
				}
			</div>
		</div>
		<div className="border margin-h">
			<div className="flex-h">
				{
					data.map((song) => {
						return <Song {...song} key={song.id}/>;
					})
				}
			</div>
		</div>
	</div>
}