import { useRouter } from 'next/router';
import React from 'react';

export interface PostDetailByParamsProps {}

export default function PostDetailByParams(props: PostDetailByParamsProps) {
	const router = useRouter();

	return (
		<div>
			<h1>Post detail by params page</h1>
			<p>Query: {JSON.stringify(router.query)}</p>
		</div>
	);
}
