import { useEffect, useState } from 'react'
import { socketTestProcess } from '../api/test-process.socket';
import { formatTime } from '../../../helpers/time';

interface Props {
	endedAt: Date;
	testId: string;
}

export default function Timer({ endedAt, testId }: Props) {
	const timeLeftUpdate = (new Date(endedAt).getTime() - new Date().getTime()) / 1000;

	const [timeLeft, setTimeLeft] = useState(timeLeftUpdate);

	useEffect(() => {
		socketTestProcess.onSync((data: number) => {
			setTimeLeft(data);
		});
		socketTestProcess.onTimeout(() => {
			setTimeLeft(0);
		});
	}, []);

	useEffect(() => {
		setTimeLeft(timeLeftUpdate);
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
		}, 50);
		return () => clearInterval(timer);
	}, [timeLeftUpdate]);

	return (
		<div className={`text-primary`}>
			{formatTime(timeLeft)}
		</div>
	)
}