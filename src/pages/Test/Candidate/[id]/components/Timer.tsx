import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { paths } from '../../../../../router/path';
import { socketTestProcess } from '../../../../../features/Test/test-process.socket';

interface Props {
	endedAt: Date;
}

export default function Timer({ endedAt }: Props) {
	const navigate = useNavigate();
	const [timeLeft, setTimeLeft] = useState(0);
	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error("Test ID is undefined");

	const timeLeftUpdate = (endedAt.getTime() - new Date().getTime()) / 1000;
	if (timeLeftUpdate < 0) {
		navigate(paths.TEST.attempts(testId));
	}

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
		}, 1000);
		return () => clearInterval(timer);
	}, [timeLeftUpdate]);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	return (
		<div className={`text-${timeLeft <= 60 ? 'primary' : 'secondary'}-500`}>
			{formatTime(timeLeft)}
		</div>
	)
}