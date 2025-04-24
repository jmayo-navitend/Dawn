import { Button } from "@/components/ui/button";

function Home() {
	return (
		<>
			<h1>Dawn</h1>
			<div className="flex gap-4">
				<a href="/user/form">
					<Button>User Form</Button>
				</a>
				<a href="/user/search">
					<Button>User Search</Button>
				</a>
				<a href="/user/table">
					<Button>User Table</Button>
				</a>
			</div>
		</>
	);
}

export default Home;
