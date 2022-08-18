import { StudentDetail } from '@/components/swr';
import * as React from 'react';

export interface SWRPageProps {}

export default function SWRPage(props: SWRPageProps) {
	return (
		<>
			<div>SWR Playground</div>
			<ul>
				<li>
					<StudentDetail studentId={'sktwi1cgkkuif36f3'} />
				</li>
				<li>
					<StudentDetail studentId={'sktwi1cgkkuif36f3'} />
				</li>
				<li>
					<StudentDetail studentId={'sktwi1cgkkuif36f3'} />
				</li>
				<li>
					<StudentDetail studentId={'sktwi1cgkkuif36f3'} />
				</li>
			</ul>
		</>
	);
}
