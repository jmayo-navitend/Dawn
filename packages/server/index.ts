import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "./prisma/generated/client";

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());

app.get("/api/users", async (req: Request, res: Response) => {
	console.log("Fetching all users...");

	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.delete("/api/user/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const numericId = Number(id);

	console.log("Deleting user with ID:", numericId);

	try {
		await prisma.user.delete({
			where: { id: numericId },
		});
		res.json({ message: "User deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.post("/api/user", async (req: Request, res: Response) => {
	const { firstName, lastName } = req.body;

	console.log("Creating new user with first name:", firstName, "and last name:", lastName);

	try {
		const newUser = await prisma.user.create({
			data: { firstName, lastName },
		});
		res.json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
