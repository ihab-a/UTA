async function fetchUser(){
	const response = await axios.get(`/api/auth`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

async function login(email, password){
	const response = await axios.post(`/api/auth/login`, {
		email,
		password
	});
	return response.data;
}

async function signup(username, email, password){
	const response = await axios.post(`/api/auth/signup`, {
		username,
		email,
		password
	});
	return response.data;
}

export { fetchUser, login, signup };