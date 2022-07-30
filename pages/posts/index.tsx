import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { Post } from '../../interfaces';
import styles from '../../styles/Home.module.css';

interface Props {
	posts: Post[];
}

export default function PostList({ posts }: Props) {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>Post List</h1>

				{posts && (
					<ul>
						{Array.isArray(posts) &&
							posts.map((post: Post) => (
								<li key={post.id}>
									<h4 style={{ textTransform: 'uppercase', marginBottom: '0.25rem' }}>
										{post.title}
									</h4>
									<p style={{ margin: '0px 0px 10px 0px' }}>{post.body}</p>
									<Link href={`/posts/${post.id}`}>
										<a>
											<button style={{ cursor: 'pointer' }}>View more</button>
										</a>
									</Link>
								</li>
							))}
					</ul>
				)}
			</main>
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async (context: GetStaticPropsContext) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const posts = await response.json();

	return {
		props: {
			posts: posts
				? posts.map(
						(post: Post): Post => ({
							id: post.id,
							title: post.title,
							body: post.body
						})
				  )
				: []
		}
	};
};
