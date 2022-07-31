import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
// import dynamic from 'next/dynamic';
import Header from '@/components/common/header';
import styles from '@/styles/Home.module.css';

// const Header = dynamic(() => import('@/components/common/header'), {
// 	ssr: false
// });

export interface AboutProps {}

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
}

export default function About(props: AboutProps) {
	const router = useRouter();
	const [product, setProduct] = useState([]);
	const limitPage = router.query.limit || 4;

	useEffect(() => {
		(async () => {
			const response = await fetch(`https://fakestoreapi.com/products?limit=${limitPage}`);
			const result = await response.json();
			setProduct(result);
		})();
	}, [limitPage]);

	const handleLoadMore = () => {
		router.push(
			{
				pathname: '/about',
				query: {
					limit: (Number(limitPage) || 4) + 4
				}
			},
			undefined,
			{
				shallow: true
			}
		);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>About</title>
				<meta name="description" content="Generated by About" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>About Page</h1>
				<Header />
				<p className={styles.description}>
					Et et officia velit officia. Cupidatat veniam cupidatat est ea id velit mollit id anim ut aute.
					Mollit ex commodo esse laborum occaecat amet ad. Irure nostrud tempor dolor elit pariatur et nostrud
					reprehenderit ea id consequat.
				</p>
				<Link href={`/`}>
					<a style={{ marginBottom: '30px' }}>
						<button style={{ cursor: 'pointer' }}>Back</button>
					</a>
				</Link>
				<ul
					style={{
						listStyle: 'none',
						padding: '0px',
						display: 'flex',
						flexWrap: 'wrap',
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						margin: '0px -15px'
					}}
				>
					{product.length > 0 &&
						product.map((item: Product) => (
							<li key={item.id} style={{ width: '25%', padding: '0px 15px', marginBottom: '1.5rem' }}>
								<div>
									<Image
										src={item.image}
										width={365}
										height={365}
										layout={'responsive'}
										alt={item.title}
										style={{ marginBottom: '10px', maxHeight: '365px' }}
									/>
									<h3 style={{ marginBottom: '10px' }}>{item.title}</h3>
									<p style={{ marginTop: '5px' }}>
										<strong>Price: {item.price}</strong>
									</p>
									<p style={{ marginTop: '0px' }}>{item.description}</p>
								</div>
							</li>
						))}
				</ul>
				<button onClick={handleLoadMore}>Load more</button>
			</main>
		</div>
	);
}

export const getStaticProps = async () => {
	console.log(123);
	return {
		props: {}
	};
};
