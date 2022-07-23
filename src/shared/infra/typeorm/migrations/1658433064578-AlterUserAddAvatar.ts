import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserAddAvatar1658433064578 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		3
		await queryRunner.addColumn("users", new TableColumn({
			name: "avatar",
			type: "varchar",
			isNullable: true
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("users", "avatar")
	}

}
