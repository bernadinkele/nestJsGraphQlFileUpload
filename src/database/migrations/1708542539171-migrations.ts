import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708542539171 implements MigrationInterface {
    name = 'Migrations1708542539171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "blogs_continents_continents" (
                "blogsId" uuid NOT NULL,
                "continentsId" uuid NOT NULL,
                CONSTRAINT "PK_30ea249ef114b63fa1b6131818c" PRIMARY KEY ("blogsId", "continentsId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3b4887511746945a991548f884" ON "blogs_continents_continents" ("blogsId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0d49bb45bd2315bb05b6e87eed" ON "blogs_continents_continents" ("continentsId")
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_continents_continents"
            ADD CONSTRAINT "FK_3b4887511746945a991548f8843" FOREIGN KEY ("blogsId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_continents_continents"
            ADD CONSTRAINT "FK_0d49bb45bd2315bb05b6e87eed5" FOREIGN KEY ("continentsId") REFERENCES "continents"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "blogs_continents_continents" DROP CONSTRAINT "FK_0d49bb45bd2315bb05b6e87eed5"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_continents_continents" DROP CONSTRAINT "FK_3b4887511746945a991548f8843"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0d49bb45bd2315bb05b6e87eed"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_3b4887511746945a991548f884"
        `);
        await queryRunner.query(`
            DROP TABLE "blogs_continents_continents"
        `);
    }

}
