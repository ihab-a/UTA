async function fetchSong(id){
	const response = await axios.get(`/api/song/${id}`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

async function fetchSongAll(){
	const response = await axios.get(`/api/song`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

async function likeSong(id){
	const response = await axios.post(`/api/song/${id}/like`, {}, {headers : {
		Authorization: localStorage.token ?? ""
	}});

	return response.data;
}

export { fetchSong, fetchSongAll, likeSong };