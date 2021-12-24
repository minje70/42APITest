import React, { useEffect, useState } from 'react';
import Counter from './Counter';
import axios from 'axios';
import { Cookies } from 'react-cookie';

interface LoginProps {
	isLogIn: boolean;
}

interface UserDto {
	fullname: string;
}
function LogInOut(props: LoginProps) {
	return <div>{props.isLogIn ? <LogIn /> : <LogOut />}</div>;
}

function LogOut() {
	return (
		<div>
			<button>로그아웃</button>
		</div>
	);
}

function getCodeAndReq() {
	window.open(
		'https://api.intra.42.fr/oauth/authorize?client_id=474cf772258dc9c00fb0984f0208b425b752f05208e9d150882f645b0437e2cf&redirect_uri=http://localhost:3000/return/&response_type=code'
	);
}

function LogIn() {
	const onClick = () => {
		getCodeAndReq();
	};
	const onClick2 = () => {
		axios
			.get('http://192.168.219.105:30000/auth/fortytwo')
			.then((res) => {
				console.log(res.data);
				return res.data;
			})
			.catch((res) => {
				console.error(res);
			});
		// window.location.href = 'http://192.168.219.105:30000/auth/fortytwo';)
		// const child = window.open('http://192.168.219.105:30000/auth/fortytwo');
		// console.log(child?.document.body);
	};
	const onClick3 = () => {
		axios.get('http://192.168.219.105:30000/auth/profile');
		// window.open('http://192.168.219.105:30000/auth/profile');
	};
	const onClick4 = () => {};
	return (
		<div>
			<button onClick={onClick}>로그인</button>
			<button onClick={onClick2}>기후니형 로그인</button>
			<button onClick={onClick3}>기후니형 프로파일</button>
		</div>
	);
}

function App() {
	// 토큰 관리 어디서 하지
	const [isLogIn, setIsLogIn] = useState(false);
	const [users, setUsers] = useState<any[]>();
	const [userOn, setUserOn] = useState(false);

	useEffect(() => {
		// 초기에 쿠키 확인 하고 토큰 보내기

		console.log('test');
		setIsLogIn(true);
	}, []);

	const onClick = () => {
		userReq();
	};

	const userReq = (): any => {
		const cookies = new Cookies();
		return axios
			.post('http://localhost:30000/login/user', {
				token: cookies.get('42accessToken'),
			})
			.then((res) => {
				setUsers(res.data);
			})
			.catch((res) => {
				console.log(res.data);
			});
	};

	return (
		<>
			<LogInOut isLogIn={isLogIn} />
			<button onClick={onClick}>user 내놔</button>
			{users
				? users.map((user: UserDto) => {
						return <div>{user.fullname}</div>;
				  })
				: 'no users'}
			<Counter />
		</>
	);
}

export default App;
