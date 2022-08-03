import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

// type Data =
// 	| {
// 			data: [];
// 			pagination: [];
// 	  }
// 	| { name: string };

const proxy = httpProxy.createProxyServer();

export const config = {
	api: {
		bodyParser: false
	}
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	// Delete cookie
	req.headers.cookie = '';

	// Proxy
	proxy.web(req, res, {
		target: process.env.API_URL,
		changeOrigin: true,
		selfHandleResponse: false
	});
}
