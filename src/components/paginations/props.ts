export interface MyPaginationProps {
	totalPage: number;
	initialPage?: number;
	onPageChange?: (page: number) => void;
}