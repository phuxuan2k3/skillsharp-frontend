import * as React from 'react';
import { useState } from "react";
import { MyPaginationProps } from "../props";
import { Pagination, ThemeProvider, createTheme } from "@mui/material";

declare module '@mui/material/styles' {
	interface Palette {
		bluechill: Palette['primary'];
	}

	interface PaletteOptions {
		bluechill?: PaletteOptions['primary'];
	}
}

declare module "@mui/material/Pagination" {
	interface PaginationPropsColorOverrides {
		bluechill: true;
	}
}

let theme = createTheme({});
theme = createTheme({
	palette: {
		bluechill: theme.palette.augmentColor({
			color: {
				main: '#0C8990'
			},
			name: 'bluechill'
		}),
	}
});

export default function MyPagination_var1({
	totalPage,
	initialPage,
	onPageChange
}: MyPaginationProps) {
	const [page, setPage] = useState(initialPage ?? 1);
	const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
		if (onPageChange != null) {
			onPageChange(value);
		}
	};
	return (
		<ThemeProvider theme={theme}>
			<Pagination
				count={totalPage}
				page={page}
				variant='outlined'
				color="bluechill"
				onChange={handleChange} />
		</ThemeProvider>
	);
}