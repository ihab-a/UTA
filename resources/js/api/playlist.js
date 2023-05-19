async function myPlaylists(){
	const response = await axios.get(`/api/playlist`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

async function fetchPlaylist(id){
	const response = await axios.get(`/api/playlist/${id}`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

async function fetchPlaylistImage(id){
	const response = await axios.get(`/api/playlist/${id}/image`, {
		responseType: "blob",
		headers : {
			Authorization: localStorage.token ?? ""
		}
	});

	const blob = new Blob([response.data], {
		type: response.headers['content-type']
	});
    const imageUrl = URL.createObjectURL(blob);

	return imageUrl;
}

async function createPlaylist(title, description = null, file = null){
	const response = await axios.post(`/api/playlist`, {
		title,
		description,
		file,
	}, {
		headers : {
			Authorization: localStorage.token ?? ""
		}
	});

	return response.data;
}

async function editPlaylist(title, description = null, file = null){
	const data = {
		title
	};

	if(description !== null)
		data.description = description

	if(file !== null)
		data.file = file

	const response = await axios.put(`/api/playlist`, data, {
		headers : {
			Authorization: localStorage.token ?? ""
		}
	});

	return response.data;
}

async function deletePlaylist(id){
	const response = await axios.delete(`/api/playlist`, {id}, {
		headers : {
			Authorization: localStorage.token ?? ""
		}
	});

	return response.data;
}

export {
	myPlaylists,
	fetchPlaylist,
	fetchPlaylistImage,
	createPlaylist,
	editPlaylist,
	deletePlaylist,
};