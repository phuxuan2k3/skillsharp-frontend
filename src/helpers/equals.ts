export function orderedArrayEqual<T1, T2>(a: Array<T1>, b: Array<T2>, equal: (a: T1, b: T2) => boolean) {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		if (!equal(a[i], b[i])) return false;
	}
	return true;
}

export function unorderedArrayEqual<T1, T2>(a: Array<T1>, b: Array<T2>, equal: (a: T1, b: T2) => boolean) {
	if (a.length !== b.length) return false;
	const bCopy = b.slice();
	for (let i = 0; i < a.length; i++) {
		const index = bCopy.findIndex((x) => equal(a[i], x));
		if (index === -1) return false;
		bCopy.splice(index, 1);
	}
	return true;
}
