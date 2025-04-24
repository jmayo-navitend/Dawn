import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";

export default function Dashboard() {
	return (
		<>
			<div className="absolute top-0 left-0 w-full bg-primary-foreground flex gap-12 place-content-center items-center">
				<h1>NavBar</h1>
				<a href="/">
					<Button>Home</Button>
				</a>
			</div>
			<div className="mt-24">
				<Outlet />
			</div>
		</>
	);
}
