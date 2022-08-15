import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

type Data =
	| {
			data: [];
			pagination: [];
	  }
	| { name: string };

const proxy = httpProxy.createProxyServer();

export const config = {
	api: {
		bodyParser: false
	}
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	return new Promise((resolve) => {
		// Convert cookies to headers authorization
		const cookies = new Cookies(req, res);
		const accessToken = cookies.get('access_token');

		if (accessToken) {
			req.headers.authorization = `Bearer ${accessToken}`;
		}

		// Delete cookie
		req.headers.cookie = '';

		// Proxy web
		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: false
		});

		// Proxy response
		proxy.once('proxyRes', () => {
			resolve(true);
		});
	});
}
