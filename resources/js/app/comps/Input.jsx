import React, { useRef } from 'react';
import '/resources/css/input.css';

export default function Input({ type, label, placeholder, defaultValue, onClick, onInput, _ref }){
	const main = _ref ?? useRef();

	return <div className="label-input">
		<label htmlFor={main}>{label}</label>
		<input ref={main} {...{type, placeholder, defaultValue, onClick, onInput}} className="border"/>
	</div>
}