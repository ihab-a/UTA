import React, { useState, useEffect } from "react";
import { fetchSongAll } from "/resources/js/api/song";
import Song from "./Song";

export default function Feed({ id, title, likes, user }){
	const [data, setData] = useState([]);

	useEffect(() => {
		fetchSongAll().then(d => setData(d));
	}, []);

	return <div className="grid">{
		data.map((song) => {
			return <Song {...song} key={song.id}/>;
		})
	}</div>
}