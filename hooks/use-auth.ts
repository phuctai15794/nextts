import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import { authApi } from 'api-client/auth-api';

export function useAuth(options?: Partial<PublicConfiguration>) {
	const {
		data: profile,
		error,
		mutate,
		isValidating
	} = useSWR('/profile', {
		dedupingInterval: 60 * 60 * 1000,
		revalidateOnFocus: false,
		...options
	});

	async function login() {
		await authApi.login({
			username: 'john',
			password: '123456'
		});
		await mutate();
	}
	async function logout() {
		await authApi.logout();
		mutate({}, false);
	}

	return {
		profile,
		error,
		login,
		logout
	};
}
