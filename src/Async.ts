import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

interface userData {
	id: number;
	name: string;
	username: string;
}

interface ReducerState {
	users: userData[] | null;
	loading: boolean;
	error: any;
}

interface Action {
	type: string;
	error?: any;
	data?: userData[] | null;
}

function reducer(state: ReducerState, action: Action): ReducerState {
	if (!action.data) action.data = null;
	switch (action.type) {
		case 'LOADING': {
			return {
				users: null,
				loading: true,
				error: null,
			};
		}
		case 'ERROR': {
			return {
				users: null,
				loading: false,
				error: action.error,
			};
		}
		case 'SUCCESS': {
			return {
				users: action.data,
				loading: false,
				error: null,
			};
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

export default function useAsync(callback: () => any, deps: [] = []) {
	const [state, dispatch] = useReducer(reducer, {
		users: null,
		loading: false,
		error: null,
	});

	const fetchData = async () => {
		try {
			dispatch({ type: 'LOADING' });

			const response = await callback();
			dispatch({ type: 'SUCCESS', data: response.data });
		} catch (e) {
			dispatch({ type: 'ERROR' });
		}
	};

	useEffect(() => {
		fetchData();
	}, deps);

	return [state, fetchData];
}
