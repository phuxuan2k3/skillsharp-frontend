
export const formatTime = (seconds: number) => {
	if (seconds < 0) return "Time's up!";
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds) % 60;
	return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};