-- MySQL dump 10.13  Distrib 5.7.30, for Win32 (AMD64)
--
-- Host: localhost    Database: db_newsite
-- ------------------------------------------------------
-- Server version	5.7.30-log

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cliente`
--

LOCK TABLES `tbl_cliente` WRITE;
/*!40000 ALTER TABLE `tbl_cliente` DISABLE KEYS */;
INSERT INTO `tbl_cliente` VALUES (1,'Rubens','rubens@gmail.com','(11)95880-8525','Rua Presidente Nilo Peçanha','294','Parque Viana','Barueri','SP',NULL,'M'),(2,'Karine','karine@gmail.com','(11)95880-8525','Rua Presidente Nilo Peçanha','294','Jardim Itaquiti','Barueri','SP',NULL,'F');
/*!40000 ALTER TABLE `tbl_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_clientes`
--

DROP TABLE IF EXISTS `tbl_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_clientes`
--

LOCK TABLES `tbl_clientes` WRITE;
/*!40000 ALTER TABLE `tbl_clientes` DISABLE KEYS */;
INSERT INTO `tbl_clientes` VALUES (1,'Rubens','rubens@gmail.com','(11) 95880-8525',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Vinicus','qwe@qwe.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(3,'Rubens','rubens@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(4,'Rubens','rubens@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(5,'Rubens','qwe@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(6,'Rubens','rubens@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(7,'Rubens','qwe@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(8,'wqeqw','qwe@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(9,'Rubens','qwe@gmail.com','(11) 95880-8525','Rua Castanheira','12','Parque Viana','Barueri','SP','06449302',NULL),(10,'wqeqw','qwe@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(11,'wqeqw','rubens@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','MG','06449302',NULL),(12,'Rubens','rubens@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(13,'Rubens','qwe@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(14,'Rubens','rubens@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','SP','06449302',NULL),(15,'Rubens','rubens@gmail.com','(11) 95880-8525','Rua Castanheira','46','Parque Viana','Barueri','MG','06449302',NULL);
/*!40000 ALTER TABLE `tbl_clientes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_login_cliente`
--

LOCK TABLES `tbl_login_cliente` WRITE;
/*!40000 ALTER TABLE `tbl_login_cliente` DISABLE KEYS */;
INSERT INTO `tbl_login_cliente` VALUES (1,'rubens@gmail.com','12345678');
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
  PRIMARY KEY (`id_login_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_login_funcionario`
--

LOCK TABLES `tbl_login_funcionario` WRITE;
/*!40000 ALTER TABLE `tbl_login_funcionario` DISABLE KEYS */;
INSERT INTO `tbl_login_funcionario` VALUES (1,'Rubens Victor','12345678'),(3,'Rubens Victor','12345678');
/*!40000 ALTER TABLE `tbl_login_funcionario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-19 17:41:32
