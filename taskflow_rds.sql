-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: taskflow.ciwnljulowml.us-east-1.rds.amazonaws.com    Database: taskflow_rds
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `grouptask_id` int NOT NULL,
  `group_description` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  KEY `grouptask_id_idx` (`grouptask_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,1001,'Development Team'),(3,1003,'Updated group description'),(4,1004,'IIT TC07 CDAV');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_tasks`
--

DROP TABLE IF EXISTS `group_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_tasks` (
  `grouptask_id` int NOT NULL AUTO_INCREMENT,
  `gptask_description` varchar(225) DEFAULT NULL,
  `gptask_deadline` datetime DEFAULT NULL,
  `gptask_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`grouptask_id`),
  UNIQUE KEY `grouptask_id_UNIQUE` (`grouptask_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1023 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_tasks`
--

LOCK TABLES `group_tasks` WRITE;
/*!40000 ALTER TABLE `group_tasks` DISABLE KEYS */;
INSERT INTO `group_tasks` VALUES (1021,'Cloud Application Development Part 3a','2024-07-22 00:00:00','in-progress');
/*!40000 ALTER TABLE `group_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'Crystal Jane','mtnb2511'),(7,'Crystal Jane','mtnb2511'),(11,'CrystalJane','mtnb251122'),(12,'Jack','jack251122'),(14,'CrystalJane Bo','mtnb251122'),(92,'Tashi','jack281122'),(94,'Tashi1','jack281122'),(95,'Tashaa','tasha281122'),(96,'may','may281122'),(97,'BENNN','mtnbCJ@1234'),(98,'BENNN','mtnbCJ@1234'),(99,'BENNN','mtnbCJ@1234'),(100,'BENNN','mtnbCJ@1234'),(101,'BENNN','mtnbCJ@1234'),(102,'BENNN','mtnbCJ@1234'),(103,'BENNN','mtnbCJ@1234'),(104,'BENNN','mtnbCJ@1234'),(105,'BENNN','mtnbCJ@1234'),(106,'BENNN','mtnbCJ@1234'),(107,'mayThet','mtnb@1234'),(108,'mayThet','mtnb@1234'),(109,'BEN','1234'),(110,'BEN','1234'),(111,'BEN','1234'),(112,'BEN','1234'),(113,'BEN','1234'),(114,'BEN','1234'),(115,'BEN','1234'),(116,'BEN','1234'),(117,'BEN','mtnbCJ@1234'),(118,'BEN','mtnbCJ@1234'),(119,'BEN','mtnbCJ@1234'),(120,'BEN','mtnbCJ@1234'),(121,'BEN','1234'),(122,'BEN','1234'),(123,'jasper','myanmar'),(124,'jasper','myanmar'),(125,'Jas','mtnbCJ@1234'),(126,'Jas','mtnbCJ@1234'),(127,'Ben','mtnb@CJ2511'),(128,'Ben','mtnb@CJ2511'),(129,'Ben','mtnb@CJ2511'),(130,'Ben','mtnb@CJ2511'),(131,'Ben','mtnb@CJ2511'),(132,'Ben','mtnb@CJ2511'),(133,'BEN','mtnb@1234'),(134,'BEN','mtnb@1234'),(135,'BENNN','mtnbCJ@1234'),(136,'BENNN','mtnbCJ@1234'),(137,'BENNN','mtnbCJ@1234'),(138,'BENNN','mtnbCJ@1234'),(139,'BEN','mtnbCJ@1234'),(140,'BEN','mtnbCJ@1234'),(141,'BEN','mtnbCJ@1234'),(142,'BEN','mtnbCJ@1234'),(143,'May Thet Naing Bo','mtnb@CJ2511'),(144,'May Thet Naing Bo','mtnb@CJ2511');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_group` (
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `group_id_idx` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-22 10:10:40
