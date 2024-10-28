import { type FilterParams, fetchFilteredUsers } from "@/api";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { downloadCsv } from "@/csv";
import { people } from "@/people";
import { columns } from "@/types";
import { getUniqueValues } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TableView from "./TableView";
import { Filters } from "./filters";

export default function Dashboard() {
	const initialFilters: FilterParams = {
		minAge: 0,
		maxAge: 84,
		countries: [],
		professions: [],
		searchQuery: "",
	};
	const [filters, setFilters] = useState<FilterParams>(initialFilters);
	const [isProcessing, setIsProcessing] = useState(false);
	const { data: users, isLoading } = useQuery({
		queryKey: ["people", filters],
		queryFn: () => fetchFilteredUsers(filters),
		staleTime: 1000 * 60 * 5,
	});

	const onClickDownload = () => {
		setIsProcessing(true);
		downloadCsv(users, columns, "FIlteredData");
		setIsProcessing(false);
	};

	const availableCountries = getUniqueValues(people, "country");
	const availableProfessions = getUniqueValues(people, "profession");

	return (
		<div className="p-16 bg-gray-50 m-5">
			<div className="grid grid-flow-row gap-6">
				<div>
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
						XX Company Dashboard
					</h1>
				</div>
				<div className="grid grid-flow-row grid-cols-4">
					<Card className="max-w-xl w-64">
						<CardHeader className="h-12 p-3 px-5 border-b-2">
							<h3 className="text-muted-foreground">Sign Ups</h3>
						</CardHeader>
						<CardContent className="">
							<div className="flex flex-row gap-16 pt-4 w-full">
								<div className="flex flex-col justify-start place-items-center">
									<h3 className="text-5xl font-semibold">{users?.length}</h3>
									<span className="text-sm text-muted-foreground">Total</span>
								</div>
								<div className="flex flex-col place-items-center">
									<h3 className="text-5xl font-semibold">0</h3>
									<span className="text-sm text-muted-foreground">New</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="">
					<Filters
						filters={filters}
						onFilterChange={setFilters}
						availableCountries={availableCountries}
						availableProfessions={availableProfessions}
						isLoading={isLoading}
					/>
				</div>

				<div className="gap-3 flex">
					<Button
						className="max-w-xs w-36"
						type="button"
						onClick={() => setFilters(initialFilters)}
					>
						Clear filters
					</Button>

					<Button
						className="max-w-xs w-36"
						type="button"
						onClick={onClickDownload}
						disabled={isProcessing}
					>
						Save to CSV
					</Button>
				</div>

				<div className="p">
					<TableView data={users} />
				</div>
			</div>
		</div>
	);
}
