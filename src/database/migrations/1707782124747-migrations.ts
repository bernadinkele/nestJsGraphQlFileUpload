import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1707782124747 implements MigrationInterface {
    name = 'Migrations1707782124747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "countries" DROP CONSTRAINT "FK_f83e5e22ed784b8a3911132f678"
        `);
        await queryRunner.query(`
            CREATE TABLE "continents" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "image" character varying,
                "description" character varying,
                "status" boolean DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_d90f11072cee5e072115358a4b6" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_597124199e2a79d4b3ab1f1f0c" ON "continents" ("slug")
        `);
        await queryRunner.query(`
            ALTER TABLE "cities" DROP COLUMN "publish"
        `);
        await queryRunner.query(`
            ALTER TABLE "countries" DROP COLUMN "destinationId"
        `);
        await queryRunner.query(`
            ALTER TABLE "countries"
            ADD "continentId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "countries" DROP COLUMN "currency"
        `);
        await queryRunner.query(`
            ALTER TABLE "countries"
            ADD "currency" jsonb NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "countries"
            ADD CONSTRAINT "FK_131233e3d3e729fa6e0f05cf966" FOREIGN KEY ("continentId") REFERENCES "continents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "countries" DROP CONSTRAINT "FK_131233e3d3e729fa6e0f05cf966"
        `);
        await queryRunner.query(`
            ALTER TABLE "countries" DROP COLUMN "currency"
        `);
        await queryRunner.query(`
            ALTER TABLE "countries"
            ADD "currency" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "countries" DROP COLUMN "continentId"
        `);
        await queryRunner.query(`
            ALTER TABLE "countries"
            ADD "destinationId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "cities"
            ADD "publish" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_597124199e2a79d4b3ab1f1f0c"
        `);
        await queryRunner.query(`
            DROP TABLE "continents"
        `);
        await queryRunner.query(`
            ALTER TABLE "countries"
            ADD CONSTRAINT "FK_f83e5e22ed784b8a3911132f678" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
