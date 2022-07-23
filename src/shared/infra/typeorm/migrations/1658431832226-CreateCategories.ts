import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1658431832226 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "categories",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						isNullable: false,
					},
					{
						name: "name",
						type: "varchar",
						isNullable: false,
						isUnique: true
					},
					{
						name: "description",
						type: "varchar",
						isNullable: false,
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
						isNullable: false
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("categories");
	}

}
