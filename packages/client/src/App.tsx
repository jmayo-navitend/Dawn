// React
import "./App.css";

// Custom Components
import UserForm from "@/components/forms/UserForm";
import UserTable from "@/components/tables/UserTable";

function App() {
	return (
		<>
			<div className="flex flex-col gap-8">
				<UserTable />
				<UserForm />
			</div>
		</>
	);
}

export default App;
