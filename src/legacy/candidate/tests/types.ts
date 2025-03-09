import { GetTestsApiResponse } from "../../../features/Test/api/test-v2.api";

export type TestProps = GetTestsApiResponse["data"][0] & {
	company: string;
};