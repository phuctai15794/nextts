import { SWRConfig } from 'swr';
import { EmptyLayout } from '@/components/layouts';
import { AppPropsWithLayout } from '@/models';
import axiosClient from 'api-client/axios-client';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const Layout = Component.Layout ?? EmptyLayout;
	return (
		<SWRConfig
			value={{
				fetcher: (url) => axiosClient.get(url),
				shouldRetryOnError: false
			}}
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SWRConfig>
	);
}

export default MyApp;
