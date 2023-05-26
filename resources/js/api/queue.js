import { CancelToken } from 'axios';

async function getQueue(){
	const response = await axios.get(`/api/queue`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

function saveQueue(queue, offset){
	const controller = new window.AbortController();

	queue = queue.map(q => ({song : q.id}));

	axios.post(`/api/queue`, {queue, offset}, {
		signal : controller.signal,
		headers : {
			Authorization: localStorage.token ?? ""
		},
	});

	return () => {
		controller.abort();
	};
}

export { getQueue, saveQueue };