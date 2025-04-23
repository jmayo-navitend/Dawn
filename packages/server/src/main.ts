import express from "express";
import cors from "cors";

import routes from "./routes";

export default function create(app: express.Application): express.Application {
	app.use(express.json());
	app.use(cors());

	app.use("/api", routes);

	return app;
}
