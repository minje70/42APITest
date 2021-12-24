import { Cookies } from 'react-cookie';

const cookie = new Cookies();

export function setCookie(name: string, value: string, options?: any) {
	console.log('실행되나?');
	cookie.set(name, value, { ...options });
}

export function getCookie(name: string) {
	cookie.get(name);
}
