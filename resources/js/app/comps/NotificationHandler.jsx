import React, { useState, useRef, useContext } from 'react';
import { store } from '/resources/js/app/index';
import '/resources/css/notification.css';

export default function NotificationHandler(){
	const [hidden, setHidden] = useState(true);
	const [content, setContent] = useState("");
	const [type, setType] = useState("");
	const Store = useContext(store);
	
	const notify = useRef((content, type="info", duration=5000) => {
		setContent(content);
		setType(type);
		setHidden(false);
		// delete the notification after the duration
		setTimeout(() => setHidden(true), duration);
	});

	// expose notify to store
	Store.notify = notify.current;

	return content ? <div className={`notif notif-${type} ${hidden ? "notif-hidden" : ""}`}>
		{content}
	</div> : null;
}