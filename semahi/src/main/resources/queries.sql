ALTER TABLE `threefish`.`service`
  ADD COLUMN `active` BINARY(1) DEFAULT '1'   NULL
  AFTER `short_description`;

ALTER TABLE `threefish`.`service`
  ADD COLUMN `seen_count` INT NULL
  AFTER `active`;

ALTER TABLE `threefish`.`service`
  ADD COLUMN `order` INT NULL
  AFTER `seen_count`;

ALTER TABLE `threefish`.`service`
  CHANGE `logo_animated_out` `logo_animated_out_id` BIGINT(20) UNSIGNED NULL;

ALTER TABLE `threefish`.`service`
  CHANGE `seen_count` `seen_count` INT(11) DEFAULT 0  NULL;
