import type { CsvColumn } from "@/csv";

export type Name = {
	firstName: string;
	lastName: string;
};

export type People = {
	name: { firstName: string; lastName: string };
	age: number;
	country: string;
	profession: string;
};

export const columns: CsvColumn<People>[] = [
	{
		key: "name",
		title: "First Name",
		formatValue: (value) => value.firstName,
	},
	{
		key: "name",
		title: "Last Name",
		formatValue: (value) => value.lastName,
	},
	{
		key: "age",
		title: "Age",
	},
	{
		key: "country",
		title: "Country",
	},
	{
		key: "profession",
		title: "Profession",
	},
];
