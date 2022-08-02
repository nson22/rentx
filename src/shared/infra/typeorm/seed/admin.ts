import createConnection from "../index"
import { v4 as uuidv4 } from "uuid"
import { hash } from "bcryptjs"

async function create() {
	const connection = await createConnection("localhost");

	const id = uuidv4();
	const password = await hash("admin", 8);

	await connection.query(
		`
			INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license) 
			VALUES ('${id}', 'admin', 'admin@rentx.com', '${password}', 'true', 'now()', 'driver_license')
		`
	)

	await connection.close();
}

create().then(() => console.log("User admin created!"));