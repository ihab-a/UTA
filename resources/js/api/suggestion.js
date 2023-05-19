async function getSuggestions(){
	const response = await axios.get(`/api/for-you`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

async function addPreference(id){
	const response = await axios.post(`/api/for-you`, {
		"song": id
	},{headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

export {
	getSuggestions,
	addPreference,
};