import database from "../utils/database";

const findUserById = async (id: number) => {
	return await database.selectFrom("User").where("id", "=", id).selectAll().executeTakeFirst();
};

const getAllUsers = async () => {
	return await database.selectFrom("User").selectAll().execute();
};

const createUser = async (data: { firstName: string; lastName: string }) => {
	const { insertId } = await database.insertInto("User").values(data).executeTakeFirstOrThrow();

	return findUserById(Number(insertId!));
};

const deleteUser = async (id: number) => {
	const user = await findUserById(id);

	if (user) {
		await database.deleteFrom("User").where("id", "=", id).executeTakeFirst();
	}

	return user;
};

export default {
	findUserById,
	getAllUsers,
	createUser,
	deleteUser,
};
