// React
import { useEffect, useState } from "react";

// Shared
import { User } from "../../../../shared/types";

// Components
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function UserTable() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8081/api/users")
			.then((response) => response.json())
			.then((data) => setUsers(data))
			.then(() => console.log("Users fetched"))
			.catch((error) => console.error("Error fetching users:", error));
	}, []);

	return (
		<div className="UserTable">
			<h2>Users</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Id</TableHead>
						<TableHead>First Name</TableHead>
						<TableHead>Last Name</TableHead>
						<TableHead>Delete</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user: User) => (
						<TableRow
							key={user.id}
							className="h-14"
						>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.firstName}</TableCell>
							<TableCell>{user.lastName}</TableCell>
							<TableCell>
								{user.id !== 1 && (
									<Button
										onClick={() => {
											fetch("http://localhost:8081/api/user/" + user.id, {
												method: "DELETE",
											});
										}}
									>
										Delete
									</Button>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default UserTable;
