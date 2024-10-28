import type { FilterParams } from "@/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import type { Name } from "@/types";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";

interface FiltersProps {
	filters: FilterParams;
	onFilterChange: (newFilters: FilterParams) => void;
	availableCountries: (string | number | Name)[];
	availableProfessions: (string | number | Name)[];
	isLoading: boolean;
}

const LoadingSkeleton = () => (
	<div className="space-y-2">
		<Skeleton className="h-4 w-20" />
		<Skeleton className="h-10 w-full" />
	</div>
);

export const Filters = ({
	filters,
	onFilterChange,
	availableCountries,
	availableProfessions,
	isLoading,
}: FiltersProps) => {
	const [mounted, setMounted] = useState(false);
	const [searchValue, setSearchValue] = useState(filters.searchQuery);

	const debouncedSearch = useMemo(
		() =>
			_.debounce((value: string) => {
				onFilterChange({ ...filters, searchQuery: value });
			}, 300),
		[filters, onFilterChange],
	);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchValue(value);
		debouncedSearch(value);
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		setSearchValue(filters.searchQuery);
	}, [filters.searchQuery]);

	if (!mounted) {
		return (
			<div className="space-y-6 p-4">
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
				<LoadingSkeleton />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Search Input */}
			{isLoading ? (
				<LoadingSkeleton />
			) : (
				<div className="space-y-2">
					<Label htmlFor="search">Search</Label>
					<Input
						id="search"
						value={searchValue}
						onChange={handleSearchChange}
						placeholder="Search by name, country, or profession..."
						className="w-full"
					/>
				</div>
			)}

			{/* Age Range Slider */}
			{isLoading ? (
				<LoadingSkeleton />
			) : (
				<div className="space-y-2">
					<Label>
						Age Range: {filters.minAge} - {filters.maxAge}
					</Label>
					<Slider
						defaultValue={[filters.minAge, filters.maxAge]}
						min={0}
						max={100}
						step={1}
						onValueChange={_.debounce(
							([min, max]) =>
								onFilterChange({ ...filters, minAge: min, maxAge: max }),
							300,
						)}
						className="w-full"
					/>
				</div>
			)}

			{/* Country Select */}
			<div className="space-y-2">
				<Label>Countries</Label>
				<Select
					value={filters?.countries[0]}
					onValueChange={(value) =>
						onFilterChange({ ...filters, countries: value ? [value] : [] })
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select country" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All Countries">All Countries</SelectItem>
						{availableCountries.map((country, index) => (
							<SelectItem key={index + 19} value={country as unknown as string}>
								{country as unknown as string}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Profession Select */}
			<div className="space-y-2">
				<Label>Profession</Label>
				<Select
					value={filters?.professions[0]}
					onValueChange={(value) =>
						onFilterChange({ ...filters, professions: value ? [value] : [] })
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select profession" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={"All Professional"}>All Professions</SelectItem>
						{availableProfessions.map((profession, index) => (
							<SelectItem
								key={index + 19}
								value={profession as unknown as string}
							>
								{profession as unknown as string}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default Filters;
