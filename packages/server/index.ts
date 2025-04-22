import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "./prisma/generated/client";

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());

app.get('/api/users', async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
