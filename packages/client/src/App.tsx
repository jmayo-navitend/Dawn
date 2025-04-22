import { useState, useEffect } from "react";
import { User } from "../../shared/types";

import "./App.css";

import UserForm from "./components/UserForm";

function App() {
	const [users, setUsers] = useState([]);
	const [check, setCheck] = useState(0);

	const updateCheck = () => {
		console.log("Updating...");
		setCheck(check + 1);
	};

	useEffect(() => {
		fetch("http://localhost:8081/api/users")
			.then((response) => response.json())
			.then((data) => setUsers(data))
			.catch((error) => console.error("Error fetching users:", error));

		console.log("Updated.");
	}, [check]);

	return (
		<>
			<h1>Users</h1>
			<button onClick={updateCheck}>Update</button>

			<ul>
				{users.map((user: User) => (
					<li key={user.id}>
						<h2
							onClick={() => {
								fetch("http://localhost:8081/api/user/" + user.id, {
									method: "DELETE",
								})
									.then((response) => response.json())
									.then((data) => console.log(data))
									.catch((error) => console.error("Error deleting user:", error));

								updateCheck();
							}}
						>
							{user.firstName} {user.lastName}
						</h2>
					</li>
				))}
			</ul>

			{users && users.length > 0 && <p>Click on a user's name to delete them.</p>}


			<br />

			<UserForm />
		</>
	);
}

export default App;
