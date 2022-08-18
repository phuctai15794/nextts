import useSWR from 'swr';

export interface StudentDetailProps {
	studentId: string;
}

export function StudentDetail({ studentId }: StudentDetailProps) {
	const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`);
	return <div>Student's' info: {data?.name || 'No result'}</div>;
}
