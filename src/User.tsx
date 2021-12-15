import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

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

export default function User(): JSX.Element {
	const [state, dispatch] = useReducer(reducer, {
		users: null,
		loading: false,
		error: null,
	});
	console.log('User 시작부');

	const onClick = () => {
		fetchUser();
	};

	const fetchUser = async () => {
		try {
			console.log('before LOADING');
			dispatch({ type: 'LOADING' });
			console.log('after LOADING');

			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/users'
			);
			console.log('before SUCCESS');
			dispatch({ type: 'SUCCESS', data: response.data });
			console.log('after SUCCESS');
		} catch (e) {
			console.log('before ERROR');
			dispatch({ type: 'ERROR' });
		}
	};

	useEffect(() => {
		console.log('useEffect');
		fetchUser();
	}, []);
	console.log('last render');
	if (state.loading) return <h1>loading</h1>;
	if (state.error) return <h1>error</h1>;
	if (!state.users) return <div>user 데이터가 없습니다.</div>;
	return (
		<ul>
			{state.users.map((user) => {
				return (
					<li key={user.id}>
						{user.username} {user.name}
					</li>
				);
			})}
			<button onClick={onClick}>button</button>
		</ul>
	);
}
