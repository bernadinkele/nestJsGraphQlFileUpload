import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1704377365477 implements MigrationInterface {
    name = 'Migrations1704377365477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "phoneCode" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "bio" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "gender" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "dob" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "role" character varying NOT NULL DEFAULT 'User'
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "fcm" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "socials" jsonb DEFAULT '{"facebook":{"token":null,"photo":null,"refreshToken":null,"username":null},"goggle":{"token":null,"photo":null,"refreshToken":null,"username":null},"twitter":{"token":null,"photo":null,"refreshToken":null,"username":null},"apple":{"token":null,"photo":null,"refreshToken":null,"username":null}}'
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "status" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "reset_code" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "settings" jsonb DEFAULT '{"theme":"light","currency":"GHS","language":"en","timeZone":"Africa/Accra"}'
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "country" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "city" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "address" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "coordinates" geography(Point, 4326)
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "referredId" uuid
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d48caab03bfb286194e6c16bd4" ON "users" USING GiST ("coordinates")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_d37373e294f1cbae244e61547a1" FOREIGN KEY ("referredId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_d37373e294f1cbae244e61547a1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d48caab03bfb286194e6c16bd4"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "referredId"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "coordinates"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "address"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "city"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "country"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "settings"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "reset_code"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "socials"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "fcm"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "role"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "dob"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "gender"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "bio"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "phoneCode"
        `);
    }

}
