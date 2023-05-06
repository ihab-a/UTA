async function fetchUser(){
	const response = await axios.get(`/api/auth`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

async function login(email, password){
	const response = await axios.post(`/api/auth`, {
		email,
		password
	});
	return response.data;
}

export { fetchUser, login };