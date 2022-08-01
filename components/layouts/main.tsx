import React from 'react';
import { LayoutProps } from '@/models';
import Link from 'next/link';

export function MainLayout({ children }: LayoutProps) {
	return (
		<div>
			<h1>Main layout</h1>
			<Link href="/">
				<a>Home</a>
			</Link>
			<Link href="/about">
				<a>About</a>
			</Link>
			<div>{children}</div>
		</div>
	);
}
