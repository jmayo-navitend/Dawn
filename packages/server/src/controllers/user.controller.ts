import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";

export const findUserById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userService.findUserById(Number(req.params.id));
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userService.getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	console.log("Creating user:", req.body);

	try {
		const user = await userService.createUser(req.body);
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await userService.deleteUser(parseInt(req.params.id));
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
