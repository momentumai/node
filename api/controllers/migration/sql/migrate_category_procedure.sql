CREATE DEFINER=`root`@`%` PROCEDURE `migrateCategory`(table_name VARCHAR(255))
BEGIN
  SET @table_name = table_name;

  SET @sql_alter1 = concat('ALTER TABLE ', @table_name, ' MODIFY cat1 VARCHAR(128);');
  SET @sql_alter2 = concat('ALTER TABLE ', @table_name, ' MODIFY cat2 VARCHAR(128);');
  SET @sql_alter3 = concat('ALTER TABLE ', @table_name, ' MODIFY cat3 VARCHAR(128);');

  SET @sql_update1 = concat('UPDATE ', @table_name, ' INNER JOIN category ON ', @table_name, '.cat1 = category.id SET ', @table_name, '.cat1 = category.name;');
  SET @sql_update2 = concat('UPDATE ', @table_name, ' INNER JOIN category ON ', @table_name, '.cat2 = category.id SET ', @table_name, '.cat2 = category.name;');
  SET @sql_update3 = concat('UPDATE ', @table_name, ' INNER JOIN category ON ', @table_name, '.cat3 = category.id SET ', @table_name, '.cat3 = category.name;');

  PREPARE alter_1 FROM @sql_alter1;
  EXECUTE alter_1;
  DEALLOCATE PREPARE alter_1;

  PREPARE alter_2 FROM @sql_alter2;
  EXECUTE alter_2;
  DEALLOCATE PREPARE alter_2;

  PREPARE alter_3 FROM @sql_alter3;
  EXECUTE alter_3;
  DEALLOCATE PREPARE alter_3;

  PREPARE update_1 FROM @sql_update1;
  EXECUTE update_1;
  DEALLOCATE PREPARE update_1;

  PREPARE update_2 FROM @sql_update2;
  EXECUTE update_2;
  DEALLOCATE PREPARE update_2;

  PREPARE update_3 FROM @sql_update3;
  EXECUTE update_3;
  DEALLOCATE PREPARE update_3;

END