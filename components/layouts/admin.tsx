import React from 'react';
import { LayoutProps } from '@/models';
import Link from 'next/link';

export function AdminLayout({ children }: LayoutProps) {
	return (
		<div>
			<h1>Admin layout</h1>
			<h2>Sidebar</h2>
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
