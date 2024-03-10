import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1704280992119 implements MigrationInterface {
    name = 'Migrations1704280992119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying NOT NULL,
                "lastName" character varying,
                "email" character varying NOT NULL,
                "username" character varying,
                "phone" character varying,
                "phoneVerified" boolean NOT NULL DEFAULT false,
                "emailVerified" boolean NOT NULL DEFAULT false,
                "profilePhoto" character varying NOT NULL DEFAULT 'users/default.png',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a000cca60bcf04454e72769949" ON "users" ("phone")
        `);
        await queryRunner.query(`
            CREATE TABLE "blogCommentLikes" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "blogId" uuid,
                "commentId" uuid,
                "userId" uuid,
                CONSTRAINT "PK_68ee5416bde6bfb6ebdaf19e790" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "blogComments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "text" character varying NOT NULL,
                "images" jsonb DEFAULT '[]',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "blogId" uuid,
                "userId" uuid,
                "parentId" uuid,
                CONSTRAINT "PK_3859b106d2a124b2370fb5f9462" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "blogs" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "image" character varying,
                "tags" jsonb DEFAULT '[]',
                "internalTags" jsonb DEFAULT '[]',
                "htmlContent" character varying,
                "content" character varying,
                "shortDescription" character varying,
                "credits" jsonb DEFAULT '[]',
                "publish" boolean NOT NULL DEFAULT true,
                "status" boolean NOT NULL DEFAULT true,
                "featured" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7b18faaddd461656ff66f32e2d" ON "blogs" ("slug")
        `);
        await queryRunner.query(`
            CREATE TABLE "places" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "username" character varying,
                "tagline" character varying,
                "description" character varying,
                "logo" character varying,
                "banner" character varying,
                "images" jsonb DEFAULT '[]',
                "videos" jsonb DEFAULT '[]',
                "email" character varying,
                "contacts" jsonb DEFAULT '[]',
                "urls" jsonb DEFAULT '[{"key":"facebook","value":""},{"key":"instagram","value":""},{"key":"twitter","value":""},{"key":"youtube","value":""},{"key":"website","value":""}]',
                "address" character varying,
                "coordinates" geography(Point, 4326),
                "partner" boolean NOT NULL DEFAULT false,
                "workingDays" jsonb NOT NULL DEFAULT '{"Saturday":{"status":true,"times":{"open":"8:00 am","close":"8:00 pm","allDay":false}},"Sunday":{"status":true,"times":{"open":"8:00 am","close":"8:00 pm","allDay":false}},"Monday":{"status":true,"times":{"open":"8:00 am","close":"8:00 pm","allDay":false}},"Tuesday":{"status":true,"times":{"open":"8:00 am","close":"8:00 pm","allDay":false}},"Wednesday":{"status":true,"times":{"open":"8:00 am","close":"8:00 pm","allDay":false}},"Thursday":{"status":true,"times":{"open":"8:00 am","close":"8:00 pm","allDay":false}},"Friday":{"status":true,"times":{"open":"8:00 am","close":"8:00 pm","allDay":false}}}',
                "tag" jsonb DEFAULT '[]',
                "internalTag" jsonb DEFAULT '[]',
                "type" character varying DEFAULT 'Restaurant',
                "payments" jsonb DEFAULT '[]',
                "amenities" jsonb DEFAULT '[]',
                "accessibility" jsonb DEFAULT '[]',
                "hasRestaurant" boolean DEFAULT true,
                "restaurantDetails" jsonb DEFAULT '[]',
                "open" boolean NOT NULL DEFAULT true,
                "publish" boolean NOT NULL DEFAULT true,
                "status" boolean NOT NULL DEFAULT true,
                "featured" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "cityId" uuid,
                "placeId" uuid,
                CONSTRAINT "UQ_484c715223286a735f982a68e0d" UNIQUE ("slug"),
                CONSTRAINT "UQ_621fa5ee58c813fa72e404e5abf" UNIQUE ("username"),
                CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_484c715223286a735f982a68e0" ON "places" ("slug")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_621fa5ee58c813fa72e404e5ab" ON "places" ("username")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_12be2440230b7359445479819b" ON "places" USING GiST ("coordinates")
        `);
        await queryRunner.query(`
            CREATE TABLE "cities" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "description" character varying NOT NULL,
                "timezone" character varying NOT NULL,
                "languages" jsonb DEFAULT '[]',
                "images" jsonb DEFAULT '[]',
                "code" character varying,
                "population" character varying,
                "areaSquareKm" character varying,
                "healthInfo" character varying,
                "safetyInfo" character varying,
                "bestTimeToVisit" character varying,
                "localCustoms" character varying,
                "localTransportation" character varying,
                "emergencyNumbers" jsonb DEFAULT '[]',
                "faq" jsonb DEFAULT '[]',
                "status" boolean NOT NULL DEFAULT true,
                "publish" boolean NOT NULL DEFAULT true,
                "featured" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "stateId" uuid,
                CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8ef722e770798e37b3205370bf" ON "cities" ("slug")
        `);
        await queryRunner.query(`
            CREATE TABLE "states" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "code" character varying,
                "description" character varying NOT NULL,
                "timezone" character varying NOT NULL,
                "languages" jsonb DEFAULT '[]',
                "images" jsonb DEFAULT '[]',
                "status" boolean NOT NULL DEFAULT true,
                "population" character varying,
                "areaSquareKm" character varying,
                "healthInfo" character varying,
                "safetyInfo" character varying,
                "bestTimeToVisit" character varying,
                "emergencyNumbers" jsonb DEFAULT '[]',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "countryId" uuid,
                "capitalCityId" uuid,
                CONSTRAINT "REL_5dde183b2a0bde7012d109b2da" UNIQUE ("capitalCityId"),
                CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ed5d099d54bc95666881823582" ON "states" ("slug")
        `);
        await queryRunner.query(`
            CREATE TABLE "destinations" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "image" character varying,
                "description" character varying,
                "status" boolean DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_69c5e8db964dcb83d3a0640f3c7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "countries" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "slug" character varying NOT NULL,
                "code" character varying NOT NULL,
                "currency" character varying NOT NULL,
                "description" character varying NOT NULL,
                "timezone" character varying NOT NULL,
                "languages" jsonb DEFAULT '[]',
                "images" jsonb DEFAULT '[]',
                "flag" character varying NOT NULL,
                "callingCode" character varying NOT NULL,
                "status" boolean NOT NULL DEFAULT true,
                "population" character varying,
                "areaSquareKm" character varying,
                "government" character varying,
                "electricity" character varying,
                "drivingSide" character varying,
                "visaInfo" character varying,
                "healthInfo" character varying,
                "safetyInfo" character varying,
                "bestTimeToVisit" character varying,
                "emergencyNumbers" jsonb DEFAULT '[]',
                "faq" jsonb DEFAULT '[]',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "destinationId" uuid,
                "capitalCityId" uuid,
                CONSTRAINT "REL_e662f41f51876115e3f7b3d81d" UNIQUE ("capitalCityId"),
                CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7b46da5e1b89d03da927ee59e0" ON "countries" ("slug")
        `);
        await queryRunner.query(`
            ALTER TABLE "blogCommentLikes"
            ADD CONSTRAINT "FK_a5c39858c99f2074f7043b68e48" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "blogCommentLikes"
            ADD CONSTRAINT "FK_86307538c5a54c4b7d2bc57a33d" FOREIGN KEY ("commentId") REFERENCES "blogComments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "blogCommentLikes"
            ADD CONSTRAINT "FK_3c463c33c6b4077ffe7f4975673" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "blogComments"
            ADD CONSTRAINT "FK_0f75ce1bd7874c02fe11f1d960d" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "blogComments"
            ADD CONSTRAINT "FK_42dc8bfcdd81301522f4f89a645" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "blogComments"
            ADD CONSTRAINT "FK_29775e0bd051582fd42d5a27e1a" FOREIGN KEY ("parentId") REFERENCES "blogComments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ADD CONSTRAINT "FK_f548129f350a5ed88401d583c8b" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "places"
            ADD CONSTRAINT "FK_05843de20a07282660584a26d86" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cities"
            ADD CONSTRAINT "FK_ded8a17cd090922d5bac8a2361f" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "states"
            ADD CONSTRAINT "FK_76ac7edf8f44e80dff569db7321" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "states"
            ADD CONSTRAINT "FK_5dde183b2a0bde7012d109b2da2" FOREIGN KEY ("capitalCityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "countries"
            ADD CONSTRAINT "FK_f83e5e22ed784b8a3911132f678" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "countries"
            ADD CONSTRAINT "FK_e662f41f51876115e3f7b3d81de" FOREIGN KEY ("capitalCityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "countries" DROP CONSTRAINT "FK_e662f41f51876115e3f7b3d81de"
        `);
        await queryRunner.query(`
            ALTER TABLE "countries" DROP CONSTRAINT "FK_f83e5e22ed784b8a3911132f678"
        `);
        await queryRunner.query(`
            ALTER TABLE "states" DROP CONSTRAINT "FK_5dde183b2a0bde7012d109b2da2"
        `);
        await queryRunner.query(`
            ALTER TABLE "states" DROP CONSTRAINT "FK_76ac7edf8f44e80dff569db7321"
        `);
        await queryRunner.query(`
            ALTER TABLE "cities" DROP CONSTRAINT "FK_ded8a17cd090922d5bac8a2361f"
        `);
        await queryRunner.query(`
            ALTER TABLE "places" DROP CONSTRAINT "FK_05843de20a07282660584a26d86"
        `);
        await queryRunner.query(`
            ALTER TABLE "places" DROP CONSTRAINT "FK_f548129f350a5ed88401d583c8b"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogComments" DROP CONSTRAINT "FK_29775e0bd051582fd42d5a27e1a"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogComments" DROP CONSTRAINT "FK_42dc8bfcdd81301522f4f89a645"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogComments" DROP CONSTRAINT "FK_0f75ce1bd7874c02fe11f1d960d"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogCommentLikes" DROP CONSTRAINT "FK_3c463c33c6b4077ffe7f4975673"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogCommentLikes" DROP CONSTRAINT "FK_86307538c5a54c4b7d2bc57a33d"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogCommentLikes" DROP CONSTRAINT "FK_a5c39858c99f2074f7043b68e48"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7b46da5e1b89d03da927ee59e0"
        `);
        await queryRunner.query(`
            DROP TABLE "countries"
        `);
        await queryRunner.query(`
            DROP TABLE "destinations"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ed5d099d54bc95666881823582"
        `);
        await queryRunner.query(`
            DROP TABLE "states"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_8ef722e770798e37b3205370bf"
        `);
        await queryRunner.query(`
            DROP TABLE "cities"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_12be2440230b7359445479819b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_621fa5ee58c813fa72e404e5ab"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_484c715223286a735f982a68e0"
        `);
        await queryRunner.query(`
            DROP TABLE "places"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7b18faaddd461656ff66f32e2d"
        `);
        await queryRunner.query(`
            DROP TABLE "blogs"
        `);
        await queryRunner.query(`
            DROP TABLE "blogComments"
        `);
        await queryRunner.query(`
            DROP TABLE "blogCommentLikes"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a000cca60bcf04454e72769949"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
