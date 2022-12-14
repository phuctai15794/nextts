import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

type Data =
	| {
			data: [];
			pagination: [];
	  }
	| { message?: string; name?: string };

const proxy = httpProxy.createProxyServer();

export const config = {
	api: {
		bodyParser: false
	}
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		res.status(404).json({ message: 'Method is not supported' });
	}

	return new Promise((resolve) => {
		// Delete cookie
		req.headers.cookie = '';

		// Proxy handle response
		const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
			let body = '';
			proxyRes.on('data', function (chunk) {
				body += chunk;
			});
			proxyRes.on('end', function () {
				try {
					const { accessToken, expiredAt } = JSON.parse(body);
					const cookies = new Cookies(req, res, {
						secure: process.env.NODE_ENV !== 'development'
					});
					cookies.set('access_token', accessToken, {
						httpOnly: true,
						sameSite: 'lax',
						expires: new Date(expiredAt)
					});
					(res as NextApiResponse).status(200).json({ message: 'Login successfully' });
				} catch (error) {
					(res as NextApiResponse).status(500).json({ message: 'Something went gone' });
				}

				resolve(true);
			});
		};

		// Proxy response
		proxy.once('proxyRes', handleLoginResponse);

		// Proxy web
		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: true
		});
	});
}
