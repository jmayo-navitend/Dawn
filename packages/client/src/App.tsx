// React
import "./App.css";

// Custom Components
import UserForm from "@/components/forms/UserForm";
import UserTable from "@/components/tables/UserTable";

function App() {
	return (
		<>
			<h1>Dawn</h1>
			<div className="flex flex-col gap-8">
				<UserForm />
				<UserTable />
			</div>
		</>
	);
}

export default App;
