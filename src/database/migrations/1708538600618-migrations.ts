import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1708538600618 implements MigrationInterface {
    name = 'Migrations1708538600618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "blogs_cities_cities" (
                "blogsId" uuid NOT NULL,
                "citiesId" uuid NOT NULL,
                CONSTRAINT "PK_813adc3ce83eae784d526d420f1" PRIMARY KEY ("blogsId", "citiesId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6b2be116e82afa3ba5522290dc" ON "blogs_cities_cities" ("blogsId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_95e83e4e691f833a4a3126a1ea" ON "blogs_cities_cities" ("citiesId")
        `);
        await queryRunner.query(`
            CREATE TABLE "blogs_countries_countries" (
                "blogsId" uuid NOT NULL,
                "countriesId" uuid NOT NULL,
                CONSTRAINT "PK_9b9775a2b60c55e2f9aff943482" PRIMARY KEY ("blogsId", "countriesId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_cc2015b6e9b480edd9f190ac97" ON "blogs_countries_countries" ("blogsId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9304780febac03c8958d1357f9" ON "blogs_countries_countries" ("countriesId")
        `);
        await queryRunner.query(`
            CREATE TABLE "blogs_places_places" (
                "blogsId" uuid NOT NULL,
                "placesId" uuid NOT NULL,
                CONSTRAINT "PK_2ae3ac84e2e99b5ff5d75345bcd" PRIMARY KEY ("blogsId", "placesId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7d8d40fd370e606edba1fccd41" ON "blogs_places_places" ("blogsId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_35a523b383e69c2643314b3b23" ON "blogs_places_places" ("placesId")
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs"
            ADD "timeToRead" integer NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs"
            ADD "userId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs"
            ALTER COLUMN "htmlContent"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs"
            ALTER COLUMN "content"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs"
            ALTER COLUMN "shortDescription"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs"
            ADD CONSTRAINT "FK_50205032574e0b039d655f6cfd3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_cities_cities"
            ADD CONSTRAINT "FK_6b2be116e82afa3ba5522290dc4" FOREIGN KEY ("blogsId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_cities_cities"
            ADD CONSTRAINT "FK_95e83e4e691f833a4a3126a1ea3" FOREIGN KEY ("citiesId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_countries_countries"
            ADD CONSTRAINT "FK_cc2015b6e9b480edd9f190ac97f" FOREIGN KEY ("blogsId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_countries_countries"
            ADD CONSTRAINT "FK_9304780febac03c8958d1357f99" FOREIGN KEY ("countriesId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_places_places"
            ADD CONSTRAINT "FK_7d8d40fd370e606edba1fccd414" FOREIGN KEY ("blogsId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_places_places"
            ADD CONSTRAINT "FK_35a523b383e69c2643314b3b23f" FOREIGN KEY ("placesId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "blogs_places_places" DROP CONSTRAINT "FK_35a523b383e69c2643314b3b23f"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_places_places" DROP CONSTRAINT "FK_7d8d40fd370e606edba1fccd414"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_countries_countries" DROP CONSTRAINT "FK_9304780febac03c8958d1357f99"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_countries_countries" DROP CONSTRAINT "FK_cc2015b6e9b480edd9f190ac97f"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_cities_cities" DROP CONSTRAINT "FK_95e83e4e691f833a4a3126a1ea3"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs_cities_cities" DROP CONSTRAINT "FK_6b2be116e82afa3ba5522290dc4"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs" DROP CONSTRAINT "FK_50205032574e0b039d655f6cfd3"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs"
            ALTER COLUMN "shortDescription" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs"
            ALTER COLUMN "content" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs"
            ALTER COLUMN "htmlContent" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "blogs" DROP COLUMN "timeToRead"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_35a523b383e69c2643314b3b23"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7d8d40fd370e606edba1fccd41"
        `);
        await queryRunner.query(`
            DROP TABLE "blogs_places_places"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_9304780febac03c8958d1357f9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_cc2015b6e9b480edd9f190ac97"
        `);
        await queryRunner.query(`
            DROP TABLE "blogs_countries_countries"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_95e83e4e691f833a4a3126a1ea"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_6b2be116e82afa3ba5522290dc"
        `);
        await queryRunner.query(`
            DROP TABLE "blogs_cities_cities"
        `);
    }

}
