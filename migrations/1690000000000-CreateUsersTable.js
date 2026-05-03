const { MigrationInterface, QueryRunner, Table } = require('typeorm');

class CreateUsersTable1690000000000 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
        ],
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }
}

module.exports = CreateUsersTable1690000000000;