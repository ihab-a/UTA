import React, { useState, useEffect } from 'react'
import Split from './split/split'
export default function Main(props){
	// const [audio, setAudio] = useState("")
	// useEffect(() => {
	// 	const src = new MediaSource();
	// 	setAudio(new Audio(URL.createObjectURL(src)));
	// 	let buffer
	// 	src.onsourceopen = () => {
	// 		src.duration = 51 * 60 + 25
	// 		buffer = src.addSourceBuffer("audio/mpeg");
	// 	}
	// 	let i = 0;
	// 	const interval = setInterval(() => {
	// 		if (buffer.updating){
	// 			console.log(buffer)
	// 			return
	// 		}
	// 		if (i == 617) return clearInterval(interval)
	// 		fetch("segment_000000".slice(0, -`${i}`.length) + i + ".mp3")
	// 		.then(response => response.arrayBuffer())
	// 		.then(data => {
	// 			// Append the new video segment to the source buffer
	// 			buffer.appendBuffer(data);
	// 			console.log(buffer.timestampOffset)
	// 			i++;
	// 		});
	// 	}, 2000)
	// }, [])
	// useEffect(() => {
	// 	if (audio == "") return
	// 	audio.controls = 1
	// 	document.documentElement.appendChild(audio)
	// }, [audio])
	// return <>
	// 	<button onClick={() => {
	// 		audio.play()
	// 	}}>play</button>
	// 	<button onClick={() => {
	// 		audio.pause()
	// 	}}>pause</button>
	// 	<input id="p"/>
	// 	<button onClick={() => {
	// 		const val = document.getElementById("p").value
	// 		if (isNaN(val)) return alert("NAN")
	// 		audio.currentTime = val
	// 		console.log(audio)
	// 	}}>seek</button>

	// </>
	// var player = dashjs.MediaPlayer().create();
	// player.initialize(document.querySelector("#audioPlayer"), "audio.mpd", true);
	return <>
			<Split dir="v" sections={[
				`Lorem ipsum dolor sit amet,
					consectetur adipiscing elit.
					Donec auctor ante in ante commodo pellentesque.
					Fusce condimentum pharetra velit non commodo.
					Mauris vel tincidunt enim. Aliquam suscipit laoreet libero,
					ut commodo elit volutpat sit amet. In hac habitasse platea dictumst.
					Praesent vel velit ut risus dignissim pharetra.
					Curabitur vel lectus sed lectus vulputate tincidunt quis sit amet neque.
					Integer quis laoreet justo, at posuere tellus. Integer vitae blandit arcu.
					Aenean nec magna sed nulla volutpat ultrices. Sed in tincidunt tellus.
					Fusce eu turpis libero. Quisque interdum magna sed enim placerat viverra.
				`,
				`Lorem ipsum dolor sit amet,
					consectetur adipiscing elit.
					Donec auctor ante in ante commodo pellentesque.
					Fusce condimentum pharetra velit non commodo.
					Mauris vel tincidunt enim. Aliquam suscipit laoreet libero,
					ut commodo elit volutpat sit amet. In hac habitasse platea dictumst.
					Praesent vel velit ut risus dignissim pharetra.
					Curabitur vel lectus sed lectus vulputate tincidunt quis sit amet neque.
					Integer quis laoreet justo, at posuere tellus. Integer vitae blandit arcu.
					Aenean nec magna sed nulla volutpat ultrices. Sed in tincidunt tellus.
					Fusce eu turpis libero. Quisque interdum magna sed enim placerat viverra.
				`,
				`Lorem ipsum dolor sit amet,
					consectetur adipiscing elit.
					Donec auctor ante in ante commodo pellentesque.
					Fusce condimentum pharetra velit non commodo.
					Mauris vel tincidunt enim. Aliquam suscipit laoreet libero,
					ut commodo elit volutpat sit amet. In hac habitasse platea dictumst.
					Praesent vel velit ut risus dignissim pharetra.
					Curabitur vel lectus sed lectus vulputate tincidunt quis sit amet neque.
					Integer quis laoreet justo, at posuere tellus. Integer vitae blandit arcu.
					Aenean nec magna sed nulla volutpat ultrices. Sed in tincidunt tellus.
					Fusce eu turpis libero. Quisque interdum magna sed enim placerat viverra.
				`,
			]}/>
	</>
}