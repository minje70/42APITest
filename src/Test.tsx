import React, { useReducer } from 'react';
import { reducer } from './Counter';

export default function Test() {
	const [number, dispatch] = useReducer(reducer, 10);

	return (
		<h1>
			{number}
			<button
				onClick={() => {
					dispatch({ type: 'INCREMENT' });
				}}
			>
				+
			</button>
			<button
				onClick={() => {
					dispatch({ type: 'DECREMENT' });
				}}
			>
				-
			</button>
		</h1>
	);
}
