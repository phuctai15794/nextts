import useSWR from 'swr';

export interface StudentDetailProps {
	studentId: string;
}

export function StudentDetail({ studentId }: StudentDetailProps) {
	const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`);
	// eslint-disable-next-line react/no-unescaped-entities
	return <div>Student's info: {data?.name || 'No result'}</div>;
}
