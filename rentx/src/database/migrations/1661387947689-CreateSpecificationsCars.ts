import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpecificationsCars1661387947689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "specifications_cars",
          columns: [
            {
              name: "car_id",
              type: "uuid"
            },
            {
              name: "specification_id",
              type: "uuid",
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()"
            },
          ],
          foreignKeys: [
            {
              name: `fk_specifications_cars_car_id`,
              referencedTableName: "cars",
              referencedColumnNames: ['id'],
              columnNames: ['car_id'],
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            },
            {
              name: `fk_specifications_cars_specification_id`,
              referencedTableName: "specifications",
              referencedColumnNames: ['id'],
              columnNames: ['specification_id'],
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("specifications_cars");
    }
}
