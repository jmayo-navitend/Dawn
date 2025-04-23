import express from "express";
import cors from "cors";

import routes from "./routes";

type Express = express.Application;

export default function create(app: Express): Express {
	app.use(express.json());
	app.use(cors());

	app.use("/api", routes);

	return app;
}
