import { useState } from "react";

export default function UserForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const res = await fetch("http://localhost:8081/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ firstName, lastName }),
		});

		const data = await res.json();
		if (!res.ok) {
			console.error(data.error || "Something went wrong");
		} else {
			console.log(data.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>First Name</label>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
			</div>
			<br />
			<div>
				<label>Last Name</label>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
			</div>
			<br />
			<div>
				<button type="submit">Submit</button>
			</div>
		</form>
	);
}
