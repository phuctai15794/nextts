import { GetStaticProps, GetStaticPropsContext } from 'next';
import { Post } from '../../interfaces';

interface PostListProps {
	posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
	return (
		<>
			<h1>Post list page</h1>
			{posts && (
				<ul>
					{Array.isArray(posts) &&
						posts.map((post: Post) => (
							<li key={post.id}>
								<h4 style={{ textTransform: 'uppercase', marginBottom: '0.25rem' }}>{post.title}</h4>
								<p style={{ margin: '0px' }}>{post.body}</p>
							</li>
						))}
				</ul>
			)}
		</>
	);
}

export const getStaticProps: GetStaticProps<PostListProps> = async (context: GetStaticPropsContext) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = await response.json();

	return {
		props: {
			posts: data.map(
				(item: Post): Post => ({
					id: item.id,
					title: item.title,
					body: item.body,
				}),
			),
		},
	};
};
