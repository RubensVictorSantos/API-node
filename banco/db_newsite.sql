-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: db_newsite
-- ------------------------------------------------------
-- Server version	5.7.28-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_cliente`
--

DROP TABLE IF EXISTS `tbl_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `endereco` varchar(150) DEFAULT NULL,
  `numero` varchar(5) DEFAULT NULL,
  `bairro` varchar(150) DEFAULT NULL,
  `cidade` varchar(150) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `cep` varchar(8) DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cliente`
--

LOCK TABLES `tbl_cliente` WRITE;
/*!40000 ALTER TABLE `tbl_cliente` DISABLE KEYS */;
INSERT INTO `tbl_cliente` VALUES (1,'Rick Sanchez','rick@gmail.com','(11)95880-8525','Rua Zika vai la','249','Parque viana','Barueri','São Paulo',NULL,'M'),(2,'Morty Smith','morty@gmail.com','(11)96523-7825','Rua Salvador Daqui','249','Jardim Libano','Barueri','São Paulo',NULL,'M'),(3,'Jerry Smith','jerry@gmail.com','(11)99999-7878','Av. Smith','249','São diego','Barueri','São Paulo',NULL,'M'),(4,'Beth Smith','beth@gmail.com','(11)92356-5656','Av. Pitanguinha','249','Gabriela','Barueri','São Paulo',NULL,'F');
/*!40000 ALTER TABLE `tbl_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_login_cliente`
--

DROP TABLE IF EXISTS `tbl_login_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_login_cliente` (
  `id_login_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `senha` varchar(60) NOT NULL,
  PRIMARY KEY (`id_login_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_login_cliente`
--

LOCK TABLES `tbl_login_cliente` WRITE;
/*!40000 ALTER TABLE `tbl_login_cliente` DISABLE KEYS */;
INSERT INTO `tbl_login_cliente` VALUES (1,'rubens@gmail.com','12345678'),(2,'rubens@gmail.com','12345678'),(3,'sabio@gmail.com','undefined');
/*!40000 ALTER TABLE `tbl_login_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_login_funcionario`
--

DROP TABLE IF EXISTS `tbl_login_funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_login_funcionario` (
  `id_login_funcionario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `senha` varchar(8) NOT NULL,
  `nivel` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_login_funcionario`),
  KEY `fk_nivel` (`nivel`),
  CONSTRAINT `fk_nivel` FOREIGN KEY (`nivel`) REFERENCES `tbl_nivel` (`id_nivel`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_login_funcionario`
--

LOCK TABLES `tbl_login_funcionario` WRITE;
/*!40000 ALTER TABLE `tbl_login_funcionario` DISABLE KEYS */;
INSERT INTO `tbl_login_funcionario` VALUES (1,'Rubens Victor','12345678',1,1),(2,'Niquel Náusea','12345678',2,1),(3,'Fliti','12345678',2,1),(4,'Rato Ruter','12345678',3,1),(5,'Gatinha','12345678',3,1),(6,'Sábio do Buraco','12345678',3,1),(7,'Sábio do Buraco','12345678',3,1);
/*!40000 ALTER TABLE `tbl_login_funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_nivel`
--

DROP TABLE IF EXISTS `tbl_nivel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_nivel` (
  `id_nivel` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `usuario` tinyint(1) NOT NULL DEFAULT '0',
  `produto` tinyint(1) NOT NULL DEFAULT '0',
  `cliente` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_nivel`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_nivel`
--

LOCK TABLES `tbl_nivel` WRITE;
/*!40000 ALTER TABLE `tbl_nivel` DISABLE KEYS */;
INSERT INTO `tbl_nivel` VALUES (1,'administrador',1,1,1,1),(2,'cataloguista',0,1,0,1),(3,'operador básico',0,0,0,1);
/*!40000 ALTER TABLE `tbl_nivel` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-19  8:57:22
