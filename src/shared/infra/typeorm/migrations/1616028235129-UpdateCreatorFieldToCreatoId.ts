import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class UpdateCreatorFieldToCreatoId1616028235129
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('projects', 'creator');
    await queryRunner.addColumn(
      'projects',
      new TableColumn({
        name: 'creator_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'projects',
      new TableForeignKey({
        name: 'ProjectCreator',
        columnNames: ['creator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('projects', 'ProjectCreator');

    await queryRunner.dropColumn('projects', 'creator_id');

    await queryRunner.addColumn(
      'projects',
      new TableColumn({
        name: 'creator',
        type: 'varchar',
      }),
    );
  }
}
