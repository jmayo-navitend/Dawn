import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { ThemeProvider } from "@/components/utilities/ThemeProvider.tsx";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<ThemeProvider
		defaultTheme="system"
		storageKey="ui-theme"
	>
		<StrictMode>
			<App />
		</StrictMode>
	</ThemeProvider>
);
