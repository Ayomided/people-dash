import type { People } from "./types";

export const getUniqueValues = (data: People[], key: keyof People) => {
	const values = new Set(data.map((item) => item[key]));
	return Array.from(values).sort();
};
