import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Cookies, useCookies } from 'react-cookie';
// import { setCookie, getCookie } from './Cookie';
import { useLocation } from 'react-router-dom';

interface UserType {
	fullname: string;
}
//
const get42Token = (code: string) => {
	// back으로 인가코드 보내기.
	axios
		.post('http://localhost:30000/login/code', { code: code })
		.then((res) => {
			console.log(res.data);
			const cookies = new Cookies();
			// cookie setting
			cookies.set('42accessToken', res.data, {
				path: '/',
			});
			window.close();
			return res;
		})
		.catch((res) => {
			console.error(res);
		});
};

export default function RecieveCode() {
	const location = useLocation();

	// backEnd API 부분

	useEffect(() => {
		const code = location.search.split('=')[1];
		get42Token(code);
	}, [location]);
	return <div>시발!!</div>;
}
