/*
SQLyog Ultimate v9.10 
MySQL - 5.1.48-community : Database - contoh
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`contoh` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `contoh`;

/*Table structure for table `barang` */

DROP TABLE IF EXISTS `barang`;

CREATE TABLE `barang` (
  `idbarang` int(10) NOT NULL AUTO_INCREMENT,
  `kdbarang` varchar(10) NOT NULL,
  `nmbarang` varchar(100) NOT NULL,
  `stok` int(5) NOT NULL,
  PRIMARY KEY (`idbarang`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `barang` */

insert  into `barang`(`idbarang`,`kdbarang`,`nmbarang`,`stok`) values (1,'001','Buku',2),(2,'002','Pena',4),(3,'003','Pensil',3),(4,'004','Tas',0),(5,'005','Sepatu',2),(6,'006','Kaos Kaki',4);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
