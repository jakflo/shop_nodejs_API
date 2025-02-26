-- Adminer 4.8.1 MySQL 8.0.31 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE TABLE `currency` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_6956883F5E237E06` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `currency` (`id`, `name`) VALUES
(1,	'CZ'),
(2,	'EUR'),
(3,	'USD');

CREATE TABLE `item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currency_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_1F1B251E38248176` (`currency_id`),
  CONSTRAINT `FK_1F1B251E38248176` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `item` (`id`, `currency_id`, `name`, `price`) VALUES
(1,	1,	'Asan Pet Silver 42 l',	529),
(2,	1,	'Darwin\'s Morče a králík Special 2,7 kg',	209),
(3,	1,	'Nutrin Nature Teeth & Hair 50 g',	67),
(4,	1,	'PanMalina Seno luční classic 4,5 kg',	299);

CREATE TABLE `order_state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_200DA6065E237E06` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `order_state` (`id`, `name`) VALUES
(4,	'canceled'),
(3,	'finished'),
(1,	'new'),
(2,	'paid');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDENTIFIER_USER_NAME` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `user` (`id`, `user_name`, `roles`, `password`, `fullname`, `email`) VALUES
(1,	'userraz',	'[]',	'ggggeds',	'Člověk Jedna',	'cj@ddds.ds'),
(2,	'userdva',	'[]',	'dasffdsf',	'Člověk dva',	'cd@fdsf.ds'),
(3,	'usertri',	'[]',	'fdsfdsfds',	'Člověk tři',	'cds@dsfwef.cs');


CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date_created` datetime NOT NULL,
  `last_changed` datetime DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `currency_id` int NOT NULL,
  `order_state_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `IDX_F529939838248176` (`currency_id`),
  KEY `IDX_F5299398E420DE70` (`order_state_id`),
  CONSTRAINT `FK_F529939838248176` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`),
  CONSTRAINT `FK_F5299398A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_F5299398E420DE70` FOREIGN KEY (`order_state_id`) REFERENCES `order_state` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `order` (`id`, `user_id`, `date_created`, `last_changed`, `name`, `price`, `currency_id`, `order_state_id`) VALUES
(1,	1,	'2025-02-07 23:00:00',	NULL,	'obj. raz',	529,	1,	1),
(2,	2,	'2025-02-07 23:00:05',	NULL,	'obj. dva',	433,	1,	2),
(3,	3,	'2025-02-07 23:00:20',	NULL,	'obj. tri',	41.38,	2,	3);

CREATE TABLE `order_has_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `item_id` int NOT NULL,
  `item_amount` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_A3BF1CF08D9F6D38` (`order_id`),
  KEY `IDX_A3BF1CF0126F525E` (`item_id`),
  CONSTRAINT `FK_A3BF1CF0126F525E` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `FK_A3BF1CF08D9F6D38` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `order_has_item` (`id`, `order_id`, `item_id`, `item_amount`) VALUES
(1,	1,	1,	1),
(2,	2,	4,	1),
(3,	2,	3,	2),
(4,	3,	1,	1),
(5,	3,	2,	1),
(6,	3,	4,	1);

