export const sum = (...params: number[]): number => {
	return params.reduce((accumulation, val) => accumulation + val, 0)
}
