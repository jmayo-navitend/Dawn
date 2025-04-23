// React
import "./App.css";

// Custom Components
import UserForm from "@/components/forms/UserForm";
import UserSearch from "@/components/forms/UserSearch";
import UserTable from "@/components/tables/UserTable";

function App() {
	return (
		<>
			<h1>Dawn</h1>
			<div className="flex flex-col gap-16">
				<UserForm />
				<UserSearch />
				<UserTable />
			</div>
		</>
	);
}

export default App;
