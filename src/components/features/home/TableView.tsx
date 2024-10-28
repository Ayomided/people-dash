import {
	Table,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { People } from "@/types";

export default function TableView({ data }: { data: People[] | undefined }) {
	return (
		<Table>
			<TableCaption>A list of new people that signed up.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">First Name</TableHead>
					<TableHead>Last Name</TableHead>
					<TableHead>Age</TableHead>
					<TableHead>Country</TableHead>
					<TableHead className="text-right">Profession</TableHead>
				</TableRow>
			</TableHeader>
			{data?.map((people) => (
				<TableRow key={people.name.firstName}>
					<TableCell className="font-medium">{people.name.firstName}</TableCell>
					<TableCell>{people.name.lastName}</TableCell>
					<TableCell>{people.age}</TableCell>
					<TableCell>{people.country}</TableCell>
					<TableCell className="text-right">{people.profession}</TableCell>
				</TableRow>
			))}
		</Table>
	);
}
