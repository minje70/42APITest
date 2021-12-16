import React from 'react';
import useAsync from './Async';
import axios from 'axios';

async function getUserData(id: number) {
	const userData = await axios.get(
		`https://jsonplaceholder.typicode.com/users/${id}`
	);
	console.log(userData);
	return userData.data;
}

export default function User({ id }: { id: number }): JSX.Element {
	const [state] = useAsync(() => getUserData(id), [id], true);

	if (state.loading) return <div>로딩중..</div>;
	if (state.error) return <div>에러가 발생했습니다</div>;
	if (!state.data || Array.isArray(state.data))
		return <div>유저 데이터가 없습니다</div>;
	return (
		<div>
			<h2>{state.data.name}</h2>
			<p>
				<b>email: </b>
				{state.data.email}
			</p>
		</div>
	);
}
