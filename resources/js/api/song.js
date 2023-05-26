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

async function getLiked(){
	const response = await axios.get(`/api/song/liked`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

async function createSong(title, description, songFile) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('file', songFile);

  const response = await axios.post('/api/song', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.token ?? '',
    },
  });

  return response.data;
}


export { fetchSong, fetchSongAll, likeSong, getLiked, createSong };