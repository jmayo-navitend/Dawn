// React
import { useState } from "react";
import { useForm } from "react-hook-form";

// Packages
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const userSearchSchema = z.object({
	userId: z.string().min(2 ** 0),
});

export function UserSearch() {
	const [user, setUser] = useState({
		id: "",
		firstName: "",
		lastName: "",
	});

	// 1. Define your form
	const form = useForm<z.infer<typeof userSearchSchema>>({
		resolver: zodResolver(userSearchSchema),
		defaultValues: {
			userId: "",
		},
	});

	// 2. Define a submit handler
	function onSubmit(values: z.infer<typeof userSearchSchema>) {
		console.log("Searching for User with Id: ", values.userId);

		// 3. Do something with the values
		fetch("http://localhost:8081/api/user/" + values.userId, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => setUser(data))
			.then(() => console.log("Users fetched"))
			.catch((error) => console.error("Error fetching users:", error));
	}

	return (
		<div className="flex flex-col gap-4">
			<h2>Search for a User {user.firstName !== "" ? `- Found: ${user.firstName} ${user.lastName}` : ""}</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					{/* Id */}
					<FormField
						control={form.control}
						name="userId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Id</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter User Id"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex gap-8">
						{/* Submit */}
						<Button type="submit">Search</Button>

						{/* Cancel Button (clears form) */}
						<Button
							onClick={(e) => {
								e.preventDefault();
								form.reset();
							}}
						>
							Cancel
						</Button>

						{/* Clear Button (clears found User) */}
						{user.id !== "" && (
							<Button
								onClick={() => {
									setUser({
										id: "",
										firstName: "",
										lastName: "",
									});
									form.reset();
								}}
							>
								Clear
							</Button>
						)}
					</div>
				</form>
			</Form>
		</div>
	);
}

export default UserSearch;
