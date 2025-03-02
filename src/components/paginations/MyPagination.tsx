import { MyPaginationProps } from './props'
import MyPagination_basic from './variants/MyPagination_basic'
import MyPagination_modern from './variants/MyPagination_modern'

export default function MyPagination(props: MyPaginationProps, variants: "Basic" | "Modern" = "Basic") {
	switch (variants) {
		case "Basic":
			return <MyPagination_basic {...props} />
		case "Modern":
			return <MyPagination_modern {...props} />
	}
}
