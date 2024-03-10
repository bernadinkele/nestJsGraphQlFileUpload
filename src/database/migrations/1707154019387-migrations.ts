import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1707154019387 implements MigrationInterface {
    name = 'Migrations1707154019387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "destinations"
            ADD "slug" character varying NOT NULL
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_30864aeaf404f4a6d3f816bd8c" ON "destinations" ("slug")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_30864aeaf404f4a6d3f816bd8c"
        `);
        await queryRunner.query(`
            ALTER TABLE "destinations" DROP COLUMN "slug"
        `);
    }

}
