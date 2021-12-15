import React from 'react';
import useAsync from './Async';
import axios from 'axios';

export default function User(): JSX.Element {
	const [state] = useAsync(
		axios.get('https://jsonplaceholder.typicode.com/users')
	);
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
		</ul>
	);
}
