// React
import { useForm } from "react-hook-form";

// Packages
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const userSchema = z.object({
	firstName: z.string().min(1).max(50),
	lastName: z.string().min(1).max(50),
});

export function UserForm() {
	// 1. Define your form
	const form = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
		},
	});

	// 2. Define a submit handler
	function onSubmit(values: z.infer<typeof userSchema>) {
		console.log("Sending user:", values);

		// 3. Do something with the values
		fetch("http://localhost:8081/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((response) => response.json())
			.then((data) => console.log("User created:", data))
			.catch((error) => console.error("Error creating user:", error));
	}

	return (
		<div className="UserForm">
			<h1>Create A New User</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter first name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter last name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}

export default UserForm;
