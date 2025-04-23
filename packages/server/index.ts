import express from "express";

import create from "./src/main";

const app = create(express());

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
