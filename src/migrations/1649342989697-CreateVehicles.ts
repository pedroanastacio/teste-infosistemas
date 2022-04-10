import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateVehicles1649342989697 implements MigrationInterface {
    name = 'CreateVehicles1649342989697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" varchar PRIMARY KEY NOT NULL, "placa" varchar(7) NOT NULL, "chassi" varchar(17) NOT NULL, "renavam" varchar(11) NOT NULL, "modelo" varchar NOT NULL, "marca" varchar NOT NULL, "ano" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_d96b6b6013877780c7c35b27877" UNIQUE ("placa"), CONSTRAINT "UQ_838772fd45ebb945e7d991d2f92" UNIQUE ("chassi"), CONSTRAINT "UQ_7dd648989a9dc304f56a66a201c" UNIQUE ("renavam"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicle"`);
    }

}
