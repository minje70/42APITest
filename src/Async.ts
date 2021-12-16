import React, { useEffect, useReducer } from 'react';

export interface UserData {
	id: number;
	name: string;
	username: string;
	email: string;
}

interface ReducerState {
	data: UserData[] | UserData | null;
	loading: boolean;
	error: any;
}

interface Action {
	type: string;
	error?: any;
	data?: UserData[] | UserData | null;
}

function reducer(state: ReducerState, action: Action): ReducerState {
	if (!action.data) action.data = null;
	switch (action.type) {
		case 'LOADING': {
			return {
				data: null,
				loading: true,
				error: null,
			};
		}
		case 'ERROR': {
			return {
				data: null,
				loading: false,
				error: action.error,
			};
		}
		case 'SUCCESS': {
			return {
				data: action.data,
				loading: false,
				error: null,
			};
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

export default function useAsync(
	callback: () => any,
	deps: any = [],
	skip: boolean = false
): [ReducerState, () => Promise<void>] {
	const [state, dispatch] = useReducer(reducer, {
		data: null,
		loading: false,
		error: null,
	});

	const fetchData = async () => {
		try {
			dispatch({ type: 'LOADING' });
			const data = await callback();
			dispatch({ type: 'SUCCESS', data: data });
		} catch (e) {
			dispatch({ type: 'ERROR' });
		}
	};

	useEffect(() => {
		if (!skip) return;
		fetchData();
	}, deps);
	return [state, fetchData];
}
