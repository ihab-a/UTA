async function getQueue(){
	const response = await axios.get(`/api/queue`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

async function saveQueue(queue, offset){
	queue = queue.map(q => ({song : q.id}));

	const response = await axios.post(`/api/queue`, {queue, offset}, {headers : {
		Authorization: localStorage.token ?? ""
	}});

	return response.data;
}

export { getQueue, saveQueue };