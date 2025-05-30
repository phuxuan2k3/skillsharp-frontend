import { ExamCore } from "../../../../../features/tests/model/test.model";

export const mockExams: ExamCore[] = [
	{
		id: "exam1",
		authorId: "author1",
		title: "Advanced JavaScript Concepts",
		description: "Test your knowledge of advanced JavaScript topics including closures, promises, and async/await.",
		minutesToAnswer: 60,
		language: "JavaScript",
		mode: "exam",
		createdAt: "2024-05-15T10:00:00Z",
		roomId: "room101",
		hasPassword: true,
		numberOfAttemptsAllowed: 1,
		isAnswerVisible: false,
		isAllowedToSeeOtherResults: false,
		openDate: "2025-06-01T09:00:00Z",
		closeDate: "2025-06-05T17:00:00Z",
	},
	{
		id: "exam2",
		authorId: "author2",
		title: "Python for Data Science",
		description: "An exam covering fundamental Python libraries for data science such as NumPy, Pandas, and Matplotlib.",
		minutesToAnswer: 90,
		language: "Python",
		mode: "exam",
		createdAt: "2024-05-10T14:30:00Z",
		roomId: "room102",
		hasPassword: false,
		numberOfAttemptsAllowed: 3,
		isAnswerVisible: true,
		isAllowedToSeeOtherResults: true,
		openDate: "2025-05-25T00:00:00Z",
		closeDate: "2025-06-10T23:59:59Z",
	},
	{
		id: "exam3",
		authorId: "author1",
		title: "React Native Development",
		description: "Assess your skills in building cross-platform mobile applications using React Native.",
		minutesToAnswer: 75,
		language: "JavaScript",
		mode: "exam",
		createdAt: "2024-05-01T08:00:00Z",
		roomId: "room201",
		hasPassword: true,
		numberOfAttemptsAllowed: 2,
		isAnswerVisible: false,
		isAllowedToSeeOtherResults: false,
		openDate: "2025-07-01T09:00:00Z",
		closeDate: "2025-07-07T17:00:00Z",
	},
	{
		id: "exam4",
		authorId: "author3",
		title: "Java Spring Boot Fundamentals",
		description: "Covers the basics of Spring Boot, including dependency injection, REST APIs, and data persistence.",
		minutesToAnswer: 120,
		language: "Java",
		mode: "exam",
		createdAt: "2024-04-20T11:00:00Z",
		roomId: "room301",
		hasPassword: false,
		numberOfAttemptsAllowed: 1,
		isAnswerVisible: true,
		isAllowedToSeeOtherResults: false,
		openDate: "2025-06-15T09:00:00Z",
		closeDate: "2025-06-20T17:00:00Z",
	},
];
