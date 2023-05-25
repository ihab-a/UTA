import React, { useState, useRef, useEffect } from 'react';
import Song from './Song';

export default function SongContainer({ data, title }){
	const [expanded, setExpanded] = useState(false);
	const [showExpand, setShowExpand] = useState(false);
	const content = useRef();
	const toggleExpanded = () => setExpanded(v => !v);

	useEffect(() => {
		if(content?.current?.clientWidth < content?.current?.scrollWidth)
			setShowExpand(true)
		else
			setShowExpand(false)
	}, [content.current])

	return data?.length ? <div className="border margin-h flex-v">
		<h4 style={{
			alignSelf: "flex-start",
			padding: "var(--size-s)",
		}}>
			{title}
			{
			showExpand ? 
			<span onClick={toggleExpanded} className="margin-v" style={{alignSelf: "flex-end"}}>
				{
					expanded ? 
					<>&#9650;</>
					: <>&#9660;</> 
				}
			</span> : null
			}
		</h4>
		<div className={`${expanded ? "grid" : "flex-h"}`} ref={content}>
			{
				data?.map((song, i) => {
					return <Song {...song} queue={data} offset={i} key={song.id}/>;
				})
			}
		</div>
	</div> : null
}