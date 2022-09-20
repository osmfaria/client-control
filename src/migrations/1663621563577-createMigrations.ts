import { MigrationInterface, QueryRunner } from "typeorm";

export class createMigrations1663621563577 implements MigrationInterface {
    name = 'createMigrations1663621563577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "name" character varying(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "email" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "phone" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_84cae51c485079bdd8cdf1d828f" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "name" character varying(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "email" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "phone" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_aa22377d7d3e794ae4cd39cd9e5" UNIQUE ("phone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_aa22377d7d3e794ae4cd39cd9e5"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_b48860677afe62cd96e12659482"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_84cae51c485079bdd8cdf1d828f"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_752866c5247ddd34fd05559537d"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "name" character varying NOT NULL`);
    }

}
