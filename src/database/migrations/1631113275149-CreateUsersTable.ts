import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1631113275149 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "postgis"')
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: "username",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar"
                },
                {
                    name: "address",
                    type: "varchar"
                },
                {
                    name: "neighborhood",
                    type: "varchar"
                },
                {
                    name: "city",
                    type: "varchar"
                },
                {
                    name: "uf",
                    type: "varchar"
                },
                {
                    name: "phone_number",
                    type: "varchar"
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 9,
                    precision: 11
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 9,
                    precision: 11
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
        await queryRunner.query('DROP EXTENSION "postgis"');
    }

}
