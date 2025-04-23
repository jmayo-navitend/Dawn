import { DB as Database } from "../../prisma/generated/types";
import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";

const dialect = new MysqlDialect({
	pool: createPool({
		database: "data",
		host: "localhost",
		user: "root",
		password: "",
		port: 3306,
		connectionLimit: 10,
	}),
});

const database = new Kysely<Database>({
	dialect,
});

export default database;