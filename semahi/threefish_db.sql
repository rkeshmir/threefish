/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.7.10-log : Database - threefish
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `authorities` */

DROP TABLE IF EXISTS `authorities`;

CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(45) NOT NULL,
  PRIMARY KEY (`username`,`authority`),
  KEY `fk_authoroties_1_idx` (`username`),
  CONSTRAINT `fk_authoroties_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `authorities` */

insert  into `authorities`(`username`,`authority`) values ('ali','user'),('asghar','user'),('reza','admin'),('reza','supervisior'),('saeid','supervisior');

/*Table structure for table `blog` */

DROP TABLE IF EXISTS `blog`;

CREATE TABLE `blog` (
  `id` bigint(20) unsigned NOT NULL,
  `body` text,
  `main_picture_id` bigint(20) unsigned DEFAULT NULL,
  `date` datetime NOT NULL,
  `writer` varchar(60) DEFAULT NULL,
  `lead` varchar(300) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_blog_picture_main_pic_id` (`main_picture_id`),
  CONSTRAINT `fk_blog_picture_main_pic_id` FOREIGN KEY (`main_picture_id`) REFERENCES `picture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `blog` */

/*Table structure for table `contact` */

DROP TABLE IF EXISTS `contact`;

CREATE TABLE `contact` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `address` text,
  `email` varchar(50) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `about` text,
  `aparat` varchar(50) DEFAULT NULL,
  `telegram` varchar(50) DEFAULT NULL,
  `instagram` varchar(50) DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL,
  `twitter` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `contact` */

/*Table structure for table `content` */

DROP TABLE IF EXISTS `content`;

CREATE TABLE `content` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `description` text,
  `seen_count` int(11) unsigned NOT NULL DEFAULT '0',
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `DTYPE` varchar(45) DEFAULT NULL,
  `rating` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

/*Data for the table `content` */

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `logo_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `fk_customer_picture_logoId` (`logo_id`),
  CONSTRAINT `fk_customer_picture_logoId` FOREIGN KEY (`logo_id`) REFERENCES `picture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `customer` */

/*Table structure for table `file` */

DROP TABLE IF EXISTS `file`;

CREATE TABLE `file` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `application_id` bigint(20) DEFAULT NULL,
  `data` longblob,
  `description` text,
  `name` varchar(255) DEFAULT NULL,
  `registration_date` datetime DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `minimum_android_version` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `file` */

/*Table structure for table `phone` */

DROP TABLE IF EXISTS `phone`;

CREATE TABLE `phone` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `phone` */

/*Table structure for table `picture` */

DROP TABLE IF EXISTS `picture`;

CREATE TABLE `picture` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `content_id` bigint(20) unsigned DEFAULT NULL,
  `data` longblob,
  `label` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `format` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `foreign_key_picture_content` (`content_id`),
  CONSTRAINT `foreign_key_picture_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

/*Data for the table `picture` */

/*Table structure for table `project` */

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `project` */

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `authority` varchar(50) NOT NULL,
  `caption` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`authority`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `role` */

insert  into `role`(`authority`,`caption`) values ('admin','مدیر'),('supervisior','ناظر'),('user','کاربر');

/*Table structure for table `service` */

DROP TABLE IF EXISTS `service`;

CREATE TABLE `service` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` text,
  `logo_out_id` bigint(20) unsigned DEFAULT NULL,
  `logo_animated_in_id` bigint(20) unsigned DEFAULT NULL,
  `logo_in_id` bigint(20) unsigned DEFAULT NULL,
  `logo_animated_out` bigint(20) unsigned DEFAULT NULL,
  `main_pic_id` bigint(20) unsigned DEFAULT NULL,
  `short_description` text,
  PRIMARY KEY (`id`),
  KEY `fk_service_picture_logoIn` (`logo_in_id`),
  CONSTRAINT `fk_service_picture_logoIn` FOREIGN KEY (`logo_in_id`) REFERENCES `picture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `service` */

/*Table structure for table `staff` */

DROP TABLE IF EXISTS `staff`;

CREATE TABLE `staff` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `instagram` varchar(50) DEFAULT NULL,
  `linkedin` varchar(50) DEFAULT NULL,
  `twitter` varchar(50) DEFAULT NULL,
  `qoute` varchar(200) DEFAULT NULL,
  `picture` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_staff_picture_picterId` (`picture`),
  CONSTRAINT `fk_staff_picture_picterId` FOREIGN KEY (`picture`) REFERENCES `picture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `staff` */

/*Table structure for table `statement` */

DROP TABLE IF EXISTS `statement`;

CREATE TABLE `statement` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `context` text NOT NULL,
  `type` varchar(50) NOT NULL,
  `modification_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `statement` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `enabled` tinyint(4) DEFAULT '1',
  `name` varchar(45) DEFAULT NULL,
  `family` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `mobile_phone` varchar(13) DEFAULT NULL,
  `mobile_phone_two` varchar(13) DEFAULT NULL,
  `mobile_phone_three` varchar(13) DEFAULT NULL,
  `phone` varchar(14) DEFAULT NULL,
  `postal_code` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `profile_id` bigint(20) unsigned DEFAULT NULL,
  `credit` int(11) DEFAULT '0',
  `score` int(11) DEFAULT '0',
  `imei` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`username`),
  KEY `user_fk1_profile_pic` (`profile_id`),
  CONSTRAINT `user_fk1_profile_pic` FOREIGN KEY (`profile_id`) REFERENCES `picture` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`username`,`password`,`enabled`,`name`,`family`,`address`,`mobile_phone`,`mobile_phone_two`,`mobile_phone_three`,`phone`,`postal_code`,`email`,`profile_id`,`credit`,`score`,`imei`) values ('ali','$2a$10$0IGNngkmz19I1Gn68BJwheCQuj1qrWevXM8v7hqWQl6bgsXTrdX2q',1,'علی','دایی','تهران قیطریه','09121156384',NULL,NULL,'02122336598','15486632475','ali@gmail.omc',NULL,38000,0,NULL),('asghar','$2a$10$lFNmWmTGovkVDar4OkPRH.AqHeQYCtrAN3dgaBEpYD0ouXzbYa2ay',0,'اصغر','چامسکی',NULL,'09123457895',NULL,NULL,NULL,NULL,'asghar@gmail.com',NULL,99000,NULL,NULL),('reza','$2a$10$dK2RFmH.JYBzjChtKF6iberczBmCfchHadKw0FDHtOIB4kcT7HT0a',1,'رضا','کشمیر','کرج هفت تیر','09126542136',NULL,NULL,NULL,NULL,'rkeshmir@yahoo.com',NULL,0,0,NULL),('saeid','$2a$10$LaNTXEzjB8EF3guAohmzaOZ08sV4G/EsvVcy1Hb1vHGnNWEgOxwEG',1,'سعید','جاجی‌زاده',NULL,'0912765438910',NULL,NULL,NULL,NULL,'s.hajizadeh@gmail.com',NULL,0,0,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
