// React
import React from "react";
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
			.catch((error) => console.error("Error creating user:", error))
			.then(() => {
				form.reset();
			});
	}

	React.useEffect(() => {
		const savedForm = localStorage.getItem("userForm");
		if (savedForm) {
			console.log("Local storage data found", savedForm);

			form.setValue("firstName", JSON.parse(savedForm).firstName);
			form.setValue("lastName", JSON.parse(savedForm).lastName);
		}
	}, []);

	// Save user form data to localStorage every 100 milliseconds after the form values change
	React.useEffect(() => {
		const timer = setTimeout(() => {
			console.log("Saving user form data to localStorage", form.getValues());
			localStorage.setItem("userForm", JSON.stringify(form.getValues()));
		}, 300);

		// Clear the timer when the component unmounts
		return () => clearTimeout(timer);
	}, [form.watch()]);

	return (
		<div className="UserForm">
			<h2>Create A New User</h2>
			<br />
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
