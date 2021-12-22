import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface UserType {
	fullname: string;
}

export default function RecieveCode() {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState<UserType[]>();
	const location = useLocation();

	// backEnd에서 처리해야할 부분
	const getToken = async (code: string): Promise<string> => {
		return axios
			.post('https://api.intra.42.fr/oauth/token', {
				grant_type: 'authorization_code',
				client_id:
					'474cf772258dc9c00fb0984f0208b425b752f05208e9d150882f645b0437e2cf',
				client_secret:
					'3bde8675437e3de94cd7445c5a021dd6484d7ad0a45b954a5f38e309e56ba585',
				code: code,
				redirect_uri: window.location.origin + window.location.pathname,
			})
			.then((res) => {
				return res.data.access_token;
			})
			.catch((reason) => {
				console.error(reason);
			});
	};

	// backEnd API 부분
	const getCursusUsers = async (code: string) => {
		const token = await getToken(code);
		axios
			.get('https://api.intra.42.fr/v2/cursus_users', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setIsLoading(false);
				console.log(res.data);
				const users: UserType[] = [];
				for (let i = 0; i < res.data.length; ++i) {
					users.push({ fullname: res.data[i].user.usual_full_name });
				}
				setUsers(users);
				console.log('users : ', users);
				return res.data;
			})
			.catch((res) => {
				console.error(res);
			});
	};

	useEffect(() => {
		const code = location.search.split('=')[1];
		getCursusUsers(code);
	}, [location]);

	const onClick = () => {
		setIsLoading(!isLoading);
	};
	return (
		<div>
			{isLoading || !users
				? 'Loading....'
				: users.map((user) => {
						return <div>{user.fullname}</div>;
				  })}
			<button onClick={onClick}>test</button>
		</div>
	);
}
