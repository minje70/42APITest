import useAsync from 'react-async';
import axios from 'axios';

async function getUserData({ id }: any) {
	const userData = await axios.get(
		`https://jsonplaceholder.typicode.com/users/${id}`
	);
	return userData.data;
}

export default function User({ id }: { id: number }): JSX.Element {
	const { state } = new useAsync({
		promiseFn: getUserData,
		id: id,
		watch: id,
	});
	const { isLoading, error, data } = state;
	if (isLoading) return <div>로딩중..</div>;
	if (error) return <div>에러가 발생했습니다</div>;
	if (!data || Array.isArray(data)) return <div>유저 데이터가 없습니다</div>;
	return (
		<div>
			<h2>{data.name}</h2>
			<p>
				<b>email: </b>
				{data.email}
			</p>
		</div>
	);
}
