import React, { useState } from 'react';
import useAsync from './Async';
import User from './User';
import axios from 'axios';

async function getUsersData() {
	const result = await axios.get(
		`https://jsonplaceholder.typicode.com/users`
	);
	return result.data;
}

export default function Users(): JSX.Element {
	const [userId, setUserId] = useState(0);
	const [state, refetch] = useAsync(getUsersData, [], true);
	const { loading, data, error } = state;

	if (loading) return <h1>loading</h1>;
	if (error) return <h1>error</h1>;
	if (!data || !Array.isArray(data))
		return <button onClick={refetch}>유저 데이터 다시 불러오기</button>;
	return (
		<>
			<ul>
				{data.map((user) => (
					<li
						key={user.id}
						onClick={() => setUserId(user.id)}
						style={{ cursor: 'pointer' }}
					>
						{user.username} ({user.name})
					</li>
				))}
			</ul>
			<button onClick={refetch}>다시 불러오기</button>
			{userId && <User id={userId} />}
		</>
	);
}
