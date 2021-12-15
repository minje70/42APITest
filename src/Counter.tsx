import React, { useReducer } from 'react';

interface Action {
	type: string;
}
export const reducer = (state: number, action: Action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

export default function Counter(): JSX.Element {
	const [number, dispatch] = useReducer(reducer, 0);
	const onIncreaseClick = () => {
		dispatch({ type: 'INCREMENT' });
	};
	const onDecreaseClick = () => {
		dispatch({ type: 'DECREMENT' });
	};
	return (
		<>
			<h1>{number}</h1>
			<button onClick={onIncreaseClick}>+</button>
			<button onClick={onDecreaseClick}>-</button>
		</>
	);
}
