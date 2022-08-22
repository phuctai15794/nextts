// import { authApi } from 'api-client/auth-api';
import { useAuth } from '@/hooks';

export default function LoginPage() {
	const { profile, login, logout, error } = useAuth({
		revalidateOnMount: false
	});

	const handleLogin = async () => {
		try {
			// await authApi.login({
			// 	username: 'john',
			// 	password: '123456'
			// });
			await login();
			console.log('Redirect to dashboard');
		} catch (error) {
			console.log('Failed to login', error);
		}
	};
	// const handleGetProfile = async () => {
	// 	try {
	// 		const profile = await authApi.getProfile();
	// 		console.log(profile);
	// 	} catch (error) {
	// 		console.log('Failed to get profile', error);
	// 	}
	// };
	const handleLogout = async () => {
		try {
			// await authApi.logout();
			await logout();
			console.log('Redirect to login page');
		} catch (error) {
			console.log('Failed to logout', error);
		}
	};

	return (
		<div>
			<h1>Login Page</h1>
			<div>Profile: {JSON.stringify(profile || {})}</div>
			<button onClick={handleLogin}>Login</button>
			{/* <button onClick={handleGetProfile}>Get profile</button> */}
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}
