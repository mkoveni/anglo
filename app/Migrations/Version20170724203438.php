<?php

namespace Anglo\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20170724203438 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs

        $table = $schema->createTable('User');
        $table->addColumn('id','integer',['unsigned'=>true, 'autoincrement'=>true]);
        $table->addColumn('name','string');
        $table->addColumn('email','string');
        $table->addColumn('password','string');
        $table->addColumn('role_id','integer',['unsigned'=>true]);
        $table->addForeignKeyConstraint('Roles',['role_id'],['id']);
        $table->setPrimaryKey(['id']);

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
