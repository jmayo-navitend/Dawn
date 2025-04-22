import { useState, useEffect } from "react";
import { User } from "../../shared/types";

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8081/api/users")
			.then((response) => response.json())
			.then((data) => setUsers(data))
			.catch((error) => console.error("Error fetching users:", error));
	}, []);

	return (
		<div>
			<h1>users</h1>
			<ul>
				{users.map((user: User) => (
					<li key={user.id}>
						<h2>{user.firstName} {user.lastName}</h2>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
