import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708282497687 implements MigrationInterface {
    name = 'Migrations1708282497687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "places"
            ADD "packages" jsonb
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ALTER COLUMN "urls"
            SET DEFAULT '[{"key":"website","value":""},{"key":"facebook","value":""},{"key":"instagram","value":""},{"key":"twitter","value":""},{"key":"youtube","value":""},{"key":"tiktok","value":""},{"key":"pinterest","value":""},{"key":"linkedin","value":""}]'
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ALTER COLUMN "type"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ALTER COLUMN "hasRestaurant"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ALTER COLUMN "hasRestaurant"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ALTER COLUMN "restaurantDetails" DROP DEFAULT
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0227a4580ca54aa5555d96ee44" ON "places" ("tag")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8ca50127d98995cdd8fa4ba440" ON "places" ("internalTag")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_265d4a940f43010b982d4e8665" ON "places" ("type")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_265d4a940f43010b982d4e8665"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_8ca50127d98995cdd8fa4ba440"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0227a4580ca54aa5555d96ee44"
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ALTER COLUMN "restaurantDetails"
            SET DEFAULT '[]'
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ALTER COLUMN "hasRestaurant"
            SET DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ALTER COLUMN "hasRestaurant" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ALTER COLUMN "type" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ALTER COLUMN "urls"
            SET DEFAULT '[{"key": "facebook", "value": ""}, {"key": "instagram", "value": ""}, {"key": "twitter", "value": ""}, {"key": "youtube", "value": ""}, {"key": "website", "value": ""}]'
        `);
        await queryRunner.query(`
            ALTER TABLE "places" DROP COLUMN "packages"
        `);
    }

}
