import React from 'react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import Link from 'next/link';
import { Post } from '../../interfaces';
import styles from '../../styles/Home.module.css';

interface Props {
	post: {
		title: string;
		description: string;
	};
}

export default function PostDetail({ post }: Props) {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>Post Detail</h1>

				{post ? (
					<>
						<h2>Title: {post?.title}</h2>
						<p style={{ marginTop: '0px' }}>Description: {post?.description}</p>
						<Link href={`/posts`}>
							<a>
								<button style={{ cursor: 'pointer' }}>Back</button>
							</a>
						</Link>
					</>
				) : (
					<div>No result found</div>
				)}
			</main>
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const posts = await response.json();

	return {
		paths: posts
			? posts.map((post: Post) => ({
					params: {
						postId: post.id.toString()
					}
			  }))
			: [],
		fallback: false
	};
};

export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext) => {
	const postId = context.params?.postId;
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId ?? 0}`);
	const detail = await response.json();

	if (detail) {
		return {
			props: {
				post: {
					title: detail.title,
					description: detail.body
				}
			}
		};
	} else {
		return {
			notFound: true
		};
	}
};
