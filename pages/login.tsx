import { authApi } from 'api-client/auth-api';
import * as React from 'react';

export default function LoginPage() {
	const handleLogin = async () => {
		try {
			await authApi.login({
				username: 'john',
				password: '123456'
			});
		} catch (error) {
			console.log('Failed to login', error);
		}
	};
	const handleGetProfile = async () => {
		try {
			const profile = await authApi.getProfile();
			console.log(profile);
		} catch (error) {
			console.log('Failed to get profile', error);
		}
	};
	const handleLogout = async () => {
		try {
			await authApi.logout();
		} catch (error) {
			console.log('Failed to logout', error);
		}
	};

	return (
		<div>
			<h1>Login Page</h1>
			<button onClick={handleLogin}>Login</button>
			<button onClick={handleGetProfile}>Get profile</button>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}
