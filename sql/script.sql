CREATE SCHEMA `4140A3` ;

CREATE TABLE `4140A3`.`XParts116` (
  `partNo116` INT NOT NULL AUTO_INCREMENT,
  `partName116` VARCHAR(45) NULL,
  `currentPrice116` INT NULL,
  `qoh116` INT NULL,
  PRIMARY KEY (`partNo116`));
  
  CREATE TABLE `4140A3`.`YParts116` (
  `partNo116` INT NOT NULL AUTO_INCREMENT,
  `partName116` VARCHAR(45) NULL,
  `currentPrice116` INT NULL,
  `qoh116` INT NULL,
  PRIMARY KEY (`partNo116`));
  
  CREATE TABLE `4140A3`.`ZParts116` (
  `partNo116` INT NOT NULL AUTO_INCREMENT,
  `partName116` VARCHAR(45) NULL,
  `currentPrice116` INT NULL,
  `qoh116` INT NULL,
  PRIMARY KEY (`partNo116`));
  
  CREATE TABLE `4140A3`.`XPOs116` (
  `poNo116` INT NOT NULL,
  `clientCompId116` INT NULL,
  `dateOfPO116` VARCHAR(45) NULL,
  `status116` VARCHAR(45) NULL,
  PRIMARY KEY (`poNo116`));


CREATE TABLE `4140A3`.`YPOs116` (
  `poNo116` INT NOT NULL,
  `clientCompId116` INT NULL,
  `dateOfPO116` VARCHAR(45) NULL,
  `status116` VARCHAR(45) NULL,
  PRIMARY KEY (`poNo116`));


CREATE TABLE `4140A3`.`ZPOs116` (
  `poNo116` INT NOT NULL,
  `clientCompId116` INT NULL,
  `dateOfPO116` VARCHAR(45) NULL,
  `status116` VARCHAR(45) NULL,
  PRIMARY KEY (`poNo116`));
  
  CREATE TABLE `4140A3`.`XLines116` (
  `poNo116` INT NOT NULL,
  `lineNo116` INT NULL,
  `partNo116` INT NOT NULL,
  `qty116` INT NULL,
  `priceOrdered116` INT NULL,
  PRIMARY KEY (`poNo116`, `partNo116`));


CREATE TABLE `4140A3`.`YLines116` (
  `poNo116` INT NOT NULL,
  `lineNo116` INT NULL,
  `partNo116` INT NOT NULL,
  `qty116` INT NULL,
  `priceOrdered116` INT NULL,
  PRIMARY KEY (`poNo116`, `partNo116`));


CREATE TABLE `4140A3`.`ZLines116` (
  `poNo116` INT NOT NULL,
  `lineNo116` INT NULL,
  `partNo116` INT NOT NULL,
  `qty116` INT NULL,
  `priceOrdered116` INT NULL,
  PRIMARY KEY (`poNo116`, `partNo116`));

INSERT INTO `4140A3`.`XLines116` (`poNo116`, `lineNo116`, `partNo116`, `qty116`, `priceOrdered116`) VALUES ('1', '1', '1', '5', '2');
INSERT INTO `4140A3`.`XLines116` (`poNo116`, `lineNo116`, `partNo116`, `qty116`, `priceOrdered116`) VALUES ('1', '2', '2', '1', '4');

INSERT INTO `4140A3`.`YLines116` (`poNo116`, `lineNo116`, `partNo116`, `qty116`, `priceOrdered116`) VALUES ('1', '1', '1', '3', '7');
INSERT INTO `4140A3`.`YLines116` (`poNo116`, `lineNo116`, `partNo116`, `qty116`, `priceOrdered116`) VALUES ('1', '2', '2', '2', '12');


INSERT INTO `4140A3`.`XParts116` (`partNo116`, `partName116`, `currentPrice116`, `Qoh116`) VALUES ('1', 'wrench', '5', '25');
INSERT INTO `4140A3`.`XParts116` (`partNo116`, `partName116`, `currentPrice116`, `Qoh116`) VALUES ('2', 'tier', '25', '12');

INSERT INTO `4140A3`.`YParts116` (`partNo116`, `partName116`, `currentPrice116`, `Qoh116`) VALUES ('1', 'nails', '15', '125');
INSERT INTO `4140A3`.`YParts116` (`partNo116`, `partName116`, `currentPrice116`, `Qoh116`) VALUES ('2', 'wood', '50', '10');

INSERT INTO `4140A3`.`YPOs116` (`poNo116`, `clientCompId116`, `dateOfPO116`, `status116`) VALUES ('1', '5', '12-10-2010', 'Order Completed');
INSERT INTO `4140A3`.`ZPOs116` (`poNo116`, `clientCompId116`, `dateOfPO116`, `status116`) VALUES ('1', '125', '12-10-2020', 'Order Completed');

CREATE TABLE `4140A3`.`ZCart116` (
  `partNo116` INT NOT NULL,
  `qoh116` INT NULL,
  `price116` INT NULL,
  `PartFrom` VARCHAR(45) NOT NULL,

