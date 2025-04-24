// React
import { RouterProvider } from "react-router";

// App
import "./App.css";

// Utilities
import router from "@/routes";
import { ThemeProvider } from "@/components/utilities/ThemeProvider.tsx";

function App() {
	return (
		<ThemeProvider
			defaultTheme="system"
			storageKey="ui-theme"
		>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
