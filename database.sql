DROP DATABASE IF EXISTS `dhaunters`;
CREATE DATABASE IF NOT EXISTS `dhaunters`;
USE `dhaunters`;

SET time_zone = "+00:00";

CREATE TABLE `banners` (
	`banner_id`SMALLINT(6) AUTO_INCREMENT PRIMARY KEY,
	`title` VARCHAR(100) NOT NULL,
	`image` VARCHAR(255) NOT NULL,
	`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	`deleted` TINYINT(1) DEFAULT 0 NOT NULL
) ENGINE=INNODB;

CREATE TABLE `universes`(
	`universe_id` SMALLINT(6) AUTO_INCREMENT PRIMARY KEY,
	`universe` VARCHAR(100) UNIQUE NOT NULL
) ENGINE=INNODB;

CREATE TABLE `tiers`(
	`tier_id` SMALLINT(6) AUTO_INCREMENT PRIMARY KEY,
	`value` VARCHAR(20) UNIQUE NOT NULL
) ENGINE=INNODB;

CREATE TABLE `products`(
	`product_id` SMALLINT(10) AUTO_INCREMENT PRIMARY KEY,
	`universe_id` SMALLINT(10) NOT NULL,
	`tier_id` SMALLINT(6) NOT NULL,
	`name` VARCHAR(100) NOT NULL,
	`short_desc` VARCHAR(255) NOT NULL,
	`long_desc` TEXT NOT NULL,
	`price` FLOAT NOT NULL,
	`image` VARCHAR(400) NOT NULL,
	`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	`deleted` TINYINT(1) DEFAULT 0 NOT NULL,
	FOREIGN KEY (`universe_id`) REFERENCES universes(`universe_id`),
	FOREIGN KEY (`tier_id`) REFERENCES tiers(`tier_id`)
) ENGINE=INNODB;

CREATE TABLE `users`(
	`user_id` SMALLINT(10) AUTO_INCREMENT PRIMARY KEY,
	`admin` TINYINT(1) DEFAULT 0 NOT NULL,
	`first_name` VARCHAR(100) NOT NULL,
	`last_name` VARCHAR(100) NOT NULL,
	`user_name` VARCHAR(100) UNIQUE NOT NULL,
	`email` VARCHAR(255) UNIQUE NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`image` VARCHAR(400) DEFAULT '/img/avatars/default.jpg' NOT NULL,
	`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	`terms_conditions` TINYINT(1) DEFAULT 1 NOT NULL,
	`email_send` TINYINT(1) DEFAULT 0 NOT NULL,
	`deleted` TINYINT(1) DEFAULT 0 NOT NULL
) ENGINE=INNODB;

CREATE TABLE `addresses`(
	`address_id` SMALLINT(12) AUTO_INCREMENT PRIMARY KEY,
	`country` VARCHAR(100) NOT NULL,
	`state` VARCHAR(100) NOT NULL,
	`city` VARCHAR(100) NOT NULL,
	`address` VARCHAR(100) NOT NULL,
	`address_number` SMALLINT(12) NOT NULL,
	`floor` SMALLINT(10) DEFAULT 0,
	`apartment` SMALLINT(10) DEFAULT 0,
	`postal_code` SMALLINT(10) NOT NULL
) ENGINE=INNODB;

CREATE TABLE `users_addresses` (
	`user_address_id` SMALLINT(12) AUTO_INCREMENT PRIMARY KEY,
	`user_id` SMALLINT(10) NOT NULL,
	`address_id` SMALLINT(12) NOT NULL,
	`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
	`deleted` SMALLINT(1) DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES users(`user_id`),
	FOREIGN KEY (`address_id`) REFERENCES addresses(`address_id`)
) ENGINE=INNODB;

CREATE TABLE `orders`(
	`order_id` SMALLINT(12) AUTO_INCREMENT PRIMARY KEY,
	`user_address_id` SMALLINT(10) NOT NULL,
	`amount_total` FLOAT NOT NULL,
	`order_date` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_address_id`) REFERENCES users_addresses(`user_address_id`)
) ENGINE=INNODB;

CREATE TABLE `order_details`(
	`order_id` SMALLINT(12) NOT NULL,
	`order_detail_id` SMALLINT(14) NOT NULL,
	`product_id` SMALLINT(12) NOT NULL,
	`quantity` SMALLINT(8) NOT NULL DEFAULT 1,
	`amount` FLOAT NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES orders(`order_id`),
	FOREIGN KEY (`product_id`) REFERENCES products(`product_id`)
) ENGINE=INNODB;

CREATE TABLE `user_favourites`(
	`user_favourite_id` SMALLINT(12) AUTO_INCREMENT PRIMARY KEY,
	`user_id` SMALLINT(10) NOT NULL,
	`product_id` SMALLINT(10) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES users(`user_id`),
	FOREIGN KEY (`product_id`) REFERENCES products(`product_id`)
)	ENGINE=INNODB;

CREATE TABLE `belongings`(
	`belonging_id` SMALLINT(12) AUTO_INCREMENT PRIMARY KEY,
	`user_id` SMALLINT(10) NOT NULL,
	`product_id` SMALLINT(10) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES users(`user_id`),
	FOREIGN KEY (`product_id`) REFERENCES products(`product_id`)
) ENGINE=INNODB;

INSERT INTO `banners` (`title`, `image`) VALUES ('Grand Openning', 'grand-openning-banner-1.jpg'), ('Pokemon', 'pokemon-banner-3.jpg'), ('Dragon Ball Z', 'dragon-ball-banner-1.jpg'), ('One Piece', 'one-piece-banner-1.jpg'), ('Marvel Avengers', 'avengers-banner-1.jpg'),('Yu-Gi-Oh!','yu-gi-oh-banner-1.jpg');

INSERT INTO `universes` (`universe`) VALUES ('Pokemon'),('Dragon Ball'),('Marvel'),('Yu-Gi-Oh'),('One Piece'),('Digimon'),('DC'),('Sonic');

INSERT INTO `tiers` (`value`) VALUES ('Common'),('Uncommon'),('Rare'),('Epic'),('Legendary');

INSERT INTO `products`(`universe_id`, `tier_id`,`name`,`short_desc`,`long_desc`,`price`,`image`,`created_at`,`updated_at`) 
VALUES ('1','5','Pikachu Gorra','Un fiel compañero Pokemon de tipo eléctrico.', 'Un fiel compañero Pokemon de tipo eléctrico, el cuál es el compañero del protagonista del anime, Ash Ketchup, y lo podemos ver con la gorra del mismo en la imágen de esta edición especial de lanzamiento la tarjeta.','99.99','5/pikachugorra.png','2022/05/10 15:57:30','2022/05/10 15:57:30'),
-- ('2', '2', 'Goku Super Saiyajin', 'Goku en fase Super Saiyajin', 'Goku es el legendario Super Saiyajin, desbloqueó este potencial tras presenciar la terrible muerte de Krilin a manos de Freezer', '20', '2/gokussj.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('1', '4', 'MewTwo', 'Un pokemon capaz de hablar', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, voluptatem. Deserunt atque corporis itaque laborum, impedit molestias numquam. Neque maxime reiciendis expedita nostrum id nobis deserunt laborum beatae at suscipit.', '80', '4/mewtwo.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('4', '4', 'Kuriboh', 'Una de las cartas más poderosas de Yugi', 'Magnam minima aperiam ipsum neque nihil eaque nulla mollitia, facilis, incidunt molestias, consectetur perferendis voluptates! Ipsum natus eaque obcaecati nemo. Enim nisi itaque ex voluptatum deleniti, deserunt optio. Harum, tempore!', '69.99', '4/kuriboh.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('1', '3', 'Haunter', 'Haunter', 'Voluptatum aperiam tenetur necessitatibus eveniet et cum doloremque quam sed quis accusantium! Accusantium illum modi aut inventore repellat! Deserunt tempora ipsum molestias ipsam dignissimos. Quaerat commodi id eum? Voluptatibus, officiis?', '22', '2/haunter.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('4', '5', 'Blue Eyes White Dragon', 'El Dragon Blanco de Ojos Azules, ¿Necesita más introducción?', 'Ipsa ullam facere nihil commodi molestias alias sit labore accusamus odit nesciunt, laudantium ea a animi esse dolores eaque. Qui vel, culpa corporis quod earum at natus perspiciatis quam molestiae!', '94.99', '5/blue-eyes-white-dragon.jpeg', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('2', '2', 'Majin-Buu', 'Majin-Buu es el enemigo durante un corto lapso de tiempo en la última saga de Dragon Ball Z', 'Labore iure, tempore reiciendis numquam, adipisci velit a id voluptates maiores ut et harum quas, consequatur dolorum quo minima fugiat inventore! Mollitia ullam, ipsum molestias nihil repellat architecto numquam optio!', '19.99', '2/majin-buu.jpeg', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('5', '3', 'Ace', 'El hermano de Luffy', 'Adipisci quis, vitae pariatur quam incidunt nesciunt sit iure nisi. Tenetur molestiae repellendus sequi mollitia deserunt quam sunt adipisci omnis eveniet quaerat, facere soluta facilis quas amet ipsam consectetur minus!', '34.99', '3/ace.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('6', '1', 'Agumon', 'Agumon', 'Sint laborum voluptatem nesciunt ab deserunt sapiente, maiores nisi corrupti quaerat aspernatur saepe quasi repellat tempore quisquam ut magni neque dolorem consequuntur asperiores corporis obcaecati necessitatibus iusto libero atque? Eveniet.', '9.99', '1/agumon.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('1', '1', 'Arcanine', 'Pokemon de tipo fuego.', 'Sed corrupti fugit iure autem veniam repellat deleniti ipsa, quis dolor dolorum aliquid accusantium cumque consectetur. Dignissimos iste atque ducimus enim dolore maiores odio! Aliquid recusandae totam aut. Facere, nihil.', '9.99', '1/arcanine.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('3', '4', 'Avengers', 'El grupo de los vengadores.', 'Tenetur dolorem voluptatum optio ut illo quia, non impedit fugit vitae eos. Veniam dignissimos harum vitae ut distinctio magnam nisi. Repudiandae corporis tenetur sunt molestiae magni dolorem inventore iusto architecto.', '79.99', '4/avengers.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('5', '1', 'Sanji', 'Un buen nakama y un gran chef.', 'Culpa in nobis animi delectus commodi, perferendis voluptatem odit deserunt, tempore libero, ullam labore totam ex non dolorem voluptas incidunt ipsa ad aspernatur unde? Ipsam eligendi beatae error autem explicabo.', '9.99', '1/sanji.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('4', '4', 'Dark Magician', 'La carta más poderosa de Yugi', 'Recusandae asperiores porro magni, expedita, consequuntur suscipit temporibus voluptatum architecto ullam assumenda distinctio quo facere perferendis maiores nihil esse? Repellendus necessitatibus quaerat laborum inventore provident illum ullam dolor ea qui.', '69.99', '4/dark-magician.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('5', '3', 'Monkey D. Luffy', 'Luffy, el pirata favorito de la mayoría.', 'Cuando era pequeño, Luffy le llevó la contra a Shanks y se comió la fruta Gomu-gomu, convirtiéndose en un hombre de goma incapaz de nadar, algo que podría convertirse en un grave problema en su aventura de marinero.', '34.99', '3/luffy.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('7', '2', 'Flash', 'Un velocista del bando de La Liga de la Justicia', 'Barry Allen long description', '19.99', '2/flash.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('8', '1', 'Sonic', 'El erizo azul más rápido que vas a ver.', 'No sé qué descripción ponerle, es Sonic, ya deberías conocerlo.', '9.99', '1/sonic.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('8', '1', 'Knuckles', 'El edquina rojo más agresivo', 'Seguro entraste para ver qué es un edquina, pero sólo sé que es algo parecido a un erizo.', '14.99', '1/knuckles.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('3', '2', 'Thor', 'El Dios nórdico de la guerra y la lucha salvaje', 'El portador del Mjolnir y mayor hater de noobmaster69', '24.99', '2/thor.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('7', '1', 'Superman', 'Un kriptoniano que se crió en la tierra, con padres humanos.', 'Superman es el alien más poderoso en fuerza bruta entre los héroes de la Liga de la Justicia', '9.99', '1/superman.png', '2022/05/10 15:57:30','2022/05/10 15:57:30'),
('3', '3','Spider-man Peter Parker', 'El hombre araña en su versión animada', 'Peter Parker, en este momento estudiante de secundaria, es un héroe que posee poderes que obtuvo de la mordedura de una araña radioactiva, ganando la habilidad de utilizar algunas de las características de las arañas.', '34.99', '3/spiderman.png', '2022/05/10 15:57:30','2022/05/10 15:57:30');

INSERT INTO `users` ( `admin`, `first_name`, `last_name`, `user_name`, `email`, `password`, `image`, `terms_conditions`, `email_send`, `deleted`) 
VALUES ( '1', 'Admin', 'Istrator', 'Administrator', 'administrator@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.jpg', '1', '0', '0'),
 ('1', 'Nicolás', 'Barragán', 'NicoB', 'nicobarragan@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.jpg', '1', '0', '0'),
('1', 'Diego', 'Giraldo', 'DiegoG', 'diegogiraldo@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.jpg', '1', '0', '0'), 
('1', 'Matias', 'Torres Contreras', 'MatiTC', 'matiastc@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.jpg', '1', '0', '0'), 
('0', 'Jose', 'Alvarado', 'JoseAl', 'josealva@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.jpg', '1', '0', '0'),
('0', 'Julio', 'Roca', 'Argentino', 'julioaroca@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.jpg', '1', '0', '0'),
('0', 'Martin', 'Palermo', 'optimista', 'mpalermo@dhaunters.com', '$2a$10$3pAuaxxTA3YwBFlXQbY2wu/AipIDN5u7u9nr2p0gnBzJEIe2rXw6i', 'default.jpg', '1', '0', '0');
-- La contraseña de los usuarios por defecto es hola1234
