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
			.catch((error) => console.error("Error fetching users:", error));

		console.log("Users fetched");
	}, []);

	return (
		<div className="UserTable">
			<h1>Users</h1>
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
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.firstName}</TableCell>
							<TableCell>{user.lastName}</TableCell>
							<TableCell>
								<Button
									onClick={() => {
										fetch("http://localhost:8081/api/user/" + user.id, {
											method: "DELETE",
										});
									}}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default UserTable;
