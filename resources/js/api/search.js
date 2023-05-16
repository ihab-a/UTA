async function search(query){
	const response = await axios.post(`/api/search`, {
			q : query,
		},
		{
			headers : {
					Authorization : localStorage.getItem("token"),
			}
		});
	return response.data;
}

export default search;