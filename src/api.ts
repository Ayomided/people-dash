import { people } from "@/people";
import type { People } from "@/types";

export type FilterParams = {
	minAge?: number;
	maxAge?: number;
	countries?: string[];
	professions?: string[];
	searchQuery?: string;
};

export const fetchUsers = async (): Promise<People[]> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return people;
};

export const fetchUsersByAge = async (age: number): Promise<People[]> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return people.filter((person) => person.age >= age);
};

export const fetchFilteredUsers = async (
	filters: FilterParams,
): Promise<People[]> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	let filteredPeople = [...people];

	if (filters.minAge !== undefined) {
		filteredPeople = filteredPeople.filter(
			(person) => person.age >= filters.minAge!,
		);
	}

	if (filters.maxAge !== undefined) {
		filteredPeople = filteredPeople.filter(
			(person) => person.age <= filters.maxAge!,
		);
	}

	if (filters.countries?.length) {
		filteredPeople = filteredPeople.filter((person) =>
			filters.countries?.includes(person.country),
		);
	}

	if (filters.professions?.length) {
		filteredPeople = filteredPeople.filter((person) =>
			filters.professions?.includes(person.profession),
		);
	}

	if (filters.searchQuery) {
		const query = filters.searchQuery.toLowerCase();
		filteredPeople = filteredPeople.filter(
			(person) =>
				person.name.firstName.toLowerCase().includes(query) ||
				person.name.lastName.toLowerCase().includes(query) ||
				person.country.toLowerCase().includes(query) ||
				person.profession.toLowerCase().includes(query),
		);
	}

	return filteredPeople;
};
