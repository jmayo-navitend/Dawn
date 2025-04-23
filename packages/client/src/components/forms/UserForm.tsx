// React
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// Packages
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const userSchema = z.object({
	firstName: z
		.string()
		.min(2 ** 0)
		.max(2 ** 4),
	lastName: z
		.string()
		.min(2 ** 0)
		.max(2 ** 4),
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

	useEffect(() => {
		const savedForm = localStorage.getItem("userForm");

		if (savedForm) {
			console.log("Local storage data found", savedForm);

			// For each form field, set its value to the corresponding value from localStorage
			form.setValue("firstName", JSON.parse(savedForm).firstName);
			form.setValue("lastName", JSON.parse(savedForm).lastName);
		}
	}, []);

	// Save user form data to localStorage every 100 milliseconds after the form values change
	useEffect(() => {
		const timer = setTimeout(() => {
			// if every value in the form is "" then don't save it
			if (Object.values(form.getValues()).every((value) => value == "")) {
				// Remove the empty user form data from localStorage if it exists (this happens when the cancel button is clicked or the fields are empty)
				if (localStorage.getItem("userForm")) {
					console.log("Removing user form data from localStorage");
					localStorage.removeItem("userForm");
				}
			} else {
				console.log("Saving user form data to localStorage", form.getValues());

				// Convert the form values to a JSON string and save it to localStorage
				localStorage.setItem("userForm", JSON.stringify(form.getValues()));
			}
		}, 200);

		// Clear the timer when the component unmounts
		return () => clearTimeout(timer);
	}, [form.watch()]);

	return (
		<div className="flex flex-col gap-4">
			<h2>Create A New User</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					{/* First Name */}
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

					{/* Last Name */}
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

					<div className="flex gap-8">
						{/* Submit */}
						<Button type="submit">Submit</Button>

						{/* Cancel Button (clears form) */}
						<Button
							onClick={(e) => {
								e.preventDefault();
								form.reset();
							}}
						>
							Cancel
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

export default UserForm;
