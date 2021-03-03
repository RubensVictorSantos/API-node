-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: db_api
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
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cliente`
--

LOCK TABLES `tbl_cliente` WRITE;
/*!40000 ALTER TABLE `tbl_cliente` DISABLE KEYS */;
INSERT INTO `tbl_cliente` VALUES (1,'cliente1','cliente1@gmail.com','(11)95555-5555','Rua Castanheira','9','Parque Viana','Barueri','São Paulo','06422030','M','$2a$10$Tyu/aehvBtgOxksihFOWHOpwgkia00QWXLXrVP27pVCLX8lKiHDVC'),(2,'cliente2','cliente2@gmail.com','(11)90000-0000','Rua Zika vai la','5','Parque viana','Barueri','São Paulo','06422030','M','$2a$10$2SidQQ/qcVG4hoJS9pHGIuTe7w7TyR1w2GUOqx1DLuiuJ/.fXmyFi'),(3,'cliente3','cliente3@gmail.com','(11)90000-0000','Rua Zika vai la','10','Parque viana','Barueri','São Paulo','06422030','M','$2a$10$WjME1xpaQx7xzj8V/5.okOI8MLHfUxSBPLn8GPwa5IWrvLZhQKM/q'),(5,'cliente5','cliente5@gmail.com','(11)95555-5555','Rua Castanheira','6','Parque Viana','Barueri','São Paulo','12345678','M','$2a$10$dBQtOFVHC7UT0Cmwu5JG3e.b3Y5s63zmmQfXZg0TahE5XXUbJ2Mkm'),(6,'cliente6','cliente6@gmail.com','(11)95555-5555','Rua Castanheira','5','Parque Viana','Barueri','São Paulo','06422030','M','$2a$10$IqYiYdvAChyR5bxsrp5pnunPF2VP1YXaILE3wKm8i.sHLXyIieT5a'),(8,'cliente8','cliente8@gmail.com','(11)95555-5555','Rua Castanheira','6','Parque Viana','Barueri','São Paulo','06422030','M','$2a$10$IqYiYdvAChyR5bxsrp5pnunPF2VP1YXaILE3wKm8i.sHLXyIieT5a'),(9,'cliente9','cliente9@gmail.com','(11)95555-5555','Rua Castanheira','5','Parque Viana','Barueri','São Paulo','06422030','M','$2a$10$IqYiYdvAChyR5bxsrp5pnunPF2VP1YXaILE3wKm8i.sHLXyIieT5a'),(10,'cliente10','cliente10@gmail.com','(11)95555-5555','Rua Castanheira','8','Parque Viana','Barueri','São Paulo','06422030','M','$2a$10$IqYiYdvAChyR5bxsrp5pnunPF2VP1YXaILE3wKm8i.sHLXyIieT5a'),(12,'cliente12','cliente12@gmail.com','(11)95555-5555','Rua Castanheira','9','Parque Viana','Barueri','São Paulo','06422030','M','$2a$10$IqYiYdvAChyR5bxsrp5pnunPF2VP1YXaILE3wKm8i.sHLXyIieT5a'),(13,'cliente13','cliente13@gmail.com','(11)95555-5555','Rua Castanheira','9','Parque Viana','Barueri','São Paulo','06422030','M','$2a$10$IqYiYdvAChyR5bxsrp5pnunPF2VP1YXaILE3wKm8i.sHLXyIieT5a'),(14,'cliente14','cliente14@gmail.com','(11)95555-5555','Rua Castanheira','9','Parque Viana','Barueri','São Paulo','06422030','M','$2a$10$IqYiYdvAChyR5bxsrp5pnunPF2VP1YXaILE3wKm8i.sHLXyIieT5a'),(15,'cliente15','cliente15@gmail.com','(11)95555-5555','Rua Castanheira','6','Parque Viana','Barueri','São Paulo','06422030','M','$2a$10$IqYiYdvAChyR5bxsrp5pnunPF2VP1YXaILE3wKm8i.sHLXyIieT5a');
/*!40000 ALTER TABLE `tbl_cliente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-02 14:16:41
