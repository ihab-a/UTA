import { CancelToken } from 'axios';

async function getQueue(){
	const response = await axios.get(`/api/queue`, {headers : {
		Authorization: localStorage.token ?? ""
	}});
	return response.data;
}

function saveQueue(offset=0, queue=undefined){
	const controller = new window.AbortController();


	const data = {
		offset
	};

	if(queue)
		data.queue = queue?.map(q => ({song : q.id}));

	axios.post(`/api/queue`, data, {
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