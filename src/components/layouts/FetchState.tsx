import { ReactNode } from "react"
import { toErrorMessage } from "../errors/fetchBaseQuery.error";
import Alert from '@mui/material/Alert';
import SpinnerLoading from "../ui/loading/SpinnerLoading";
import React from "react";

// Type for components that can receive an error message
type ErrorComponent = React.ComponentType<{ message: string }>;

type Props = {
	children: ReactNode;
	isLoading: boolean;
	data: any | null;
	error?: unknown;
	loadingNode?: ReactNode;
	errorNode?: ErrorComponent | ReactNode;
	notFoundNode?: ReactNode;
}

export default function FetchState({ data, notFoundNode, isLoading, error, children, loadingNode, errorNode }: Props,) {
	const errorMessage = toErrorMessage(error);
	if (isLoading) {
		return <>
			{loadingNode || (
				<SpinnerLoading />
			)}
		</>
	}
	if (errorMessage) {
		return <>
			{errorNode == null ?
				<Alert severity="error">{errorMessage}</Alert> :
				typeof errorNode === 'function' ?
					<>
						{React.createElement(errorNode, { message: errorMessage })}
					</> :
					errorNode
			}
		</>;
	}
	if (data == null || (Array.isArray(data) && data.length === 0)) {
		return <>
			{notFoundNode || <Alert severity="info">No data found</Alert>}
		</>
	}
	return children;
}