import prisma from "../utils/database";

const getAllUsers = async () => {
	return prisma.user.findMany();
};

const createUser = async (data: { firstName: string; lastName: string }) => {
	return prisma.user.create({ data });
};

const deleteUser = async (id: number) => {
	return prisma.user.delete({ where: { id } });
};

export default {
	getAllUsers,
	createUser,
	deleteUser,
};
