import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Error({ code }){
	const goto = useNavigate();
	const errors = {
		"404" : "page not found, redirecting to home in 5s..."
	}

	useEffect(() => {
		// if 404 redirect after 5s
		setTimeout(() => {
			goto("/");
		}, 5000)
	});

	return <section className="error">
		{errors[code]}
	</section>
}