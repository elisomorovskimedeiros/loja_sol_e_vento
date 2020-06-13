-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: mysql.solevento.net.br    Database: solevento03
-- ------------------------------------------------------
-- Server version	5.6.36-log

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
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produto` (
  `id_produto` int(11) NOT NULL AUTO_INCREMENT,
  `nome_produto` varchar(45) DEFAULT NULL,
  `ns_produto` varchar(45) DEFAULT NULL,
  `pn_produto` varchar(45) DEFAULT NULL,
  `imagem_produto` varchar(100) DEFAULT NULL,
  `preco_produto` float DEFAULT NULL,
  `qtd_produto` int(11) DEFAULT NULL,
  `descricao_produto` varchar(100) DEFAULT NULL,
  `imagem_produto_2` varchar(100) DEFAULT NULL,
  `imagem_produto_3` varchar(45) DEFAULT NULL,
  `descricao_longa` varchar(600) DEFAULT NULL,
  PRIMARY KEY (`id_produto`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (1,'Refletor led 10W Branco Frio',NULL,'R-10WBF','refletor_10W_sem_fundo.png',27,13,'Refletor com led marca XL Power 10W                           ',NULL,NULL,NULL),(2,'Refletor 10W Led Verde',NULL,'RSPM-10WVE','refletor_verde_10W.png',30,2,'Refletor da marca Opala Br IP66    ',NULL,NULL,NULL),(3,'Refletor Led 10W RGB',NULL,'RSPM-10WRGB','refletor_10W_rgb.png',39,2,'Refletor 10W rgb com controle remoto     ',NULL,NULL,NULL),(4,'Refletor 10W Led Branco Quente',NULL,'RSPM-10WBQ','refletor_10W_branco_quente.png',34,2,'Refletor 10W branco quente LLC  ',NULL,NULL,NULL),(5,'Refletor 10W Led com Sensor de Presença',NULL,'RSSOP-10WBF','20190722_113349.jpg',60,0,'10W, com sensor de presença e luminosidade.     ',NULL,NULL,NULL),(6,'Refletor 30W Led',NULL,'RSPM-30WVE','refletor_30w.png',55,3,'30W XL Power Branco Frio         ',NULL,NULL,NULL),(7,'Refletor 30W com Sensor de Presença',NULL,'RSSOC-30WBF','refletor_30W_com_sensor_de_presenca.png',90,1,'30W XL Power com sensor de presença ',NULL,NULL,NULL),(8,'Refletor 50W Led ',NULL,'RSPM-50WBF','refletor_50W.png',60,2,'Refletor 50W Floot Light branco frio      ',NULL,NULL,NULL),(9,'Refletor 100W Led',NULL,'RSPM-100WBF','refletor_100W.png',75,6,'Refletor Flood Light luz branca  ',NULL,NULL,NULL),(10,'Luminária Tubular Led 60cm',NULL,'OQ-GCZJ2001','miniaturatubular_60cm.png',25,4,'Luminária tubular 20W 60cm, luz branca fria        ',NULL,NULL,NULL),(11,'Luminária Tubular Led 120cm',NULL,'TSM-36-BF','miniaturatubular_60cm.png',40,7,'Luminária tubular 36W 120cm, luz branca fria         ',NULL,NULL,NULL),(12,'Luminária Tubular Led 240cm',NULL,'LUM-240-BF','tubular_60cm.png',75,8,'Luminária tubular 80W 240cm, luz branca fria ',NULL,NULL,NULL),(13,'Painel Plafon 18W Quadrado Sobrepor',NULL,'PG-Q18WBF','paflon_18W_sobrepor.png',35,5,'18W - Quadrado -  210x210mm       ',NULL,NULL,NULL),(14,'Painel Plafon 18W Quadrado Embutir',NULL,'PS-Q18WBF','paflon_18W_embutir.png',30,11,'18W - Quadrado -  225x225mm Abertura necessária: 205x205mm  ',NULL,NULL,NULL),(15,'Painel Plafon 18W Redondo Sobrepor',NULL,'PG-R18WBF','Paflon_18W_redondo.png',35,0,'18W - Quadrado -  diâmetro: 220mm   ',NULL,NULL,NULL),(16,'Painel Plafon 25W Quadrado Sobrepor',NULL,'PG-Q25WBF','paflon_18W_sobrepor.png',48,8,'25W - Quadrado -  284x284mm   ',NULL,NULL,NULL),(17,'Painel Plafon 25W Quadrado Embutir',NULL,'PS-Q25WBF','paflon_18W_embutir.png',42,7,'25W - Quadrado -  300x300mm - abertura: 285x285mm  ',NULL,NULL,NULL),(18,'Lâmpada Pera 4W Vintage Carbon Branco Quente',NULL,'ST64-4W','miniaturalampada_pera_vintage_carbom_st64-4w.png',23,9,'Lãmpada com filamento led em formato de pera, 4W com vidro em cor ambar   ',NULL,NULL,NULL),(19,'Lâmpada Pera 4W Vintage Cristal Branco Quente',NULL,'LP34836','miniaturalampada_pera_vintage_cristal_st64-4w.png',27,1,'Lãmpada com filamento led em formato de pera, 4W com vidro cristal   ',NULL,NULL,NULL),(20,'Lâmpada Bulbo 4W Vintage Carbon Branco Quente',NULL,'LP-33365','lampada_bulbo_vintage_carbom_a60-4w.png.png',26,2,'Lãmpada com filamento led em formato de bulbo, 4W com vidro em cor ambar  ',NULL,NULL,NULL),(21,'Lâmpada Vela 2W Vintage Cristal Branco Quente',NULL,'LP-31842','lampada_vela_vintage_cristal_4W.png',17,1,'Lâmpada Vela Opus Cristal 2W, luz branca quente, filamento em led, encaixe rosca pequena (E14)   ',NULL,NULL,NULL),(22,'Lâmpada Vela 4W Vintage Cristal Branco Frio C',NULL,'VLC-4WBF-SB','lampada_vela_vintage_cristal_4W.png',20,1,'Lâmpada Vela Cristal 4W, luz branca fria, filamento em led, encaixe rosca pequena (E14)        ',NULL,NULL,NULL),(23,'Lâmpada Globo 4W Vintage Carbon Branco Quente',NULL,'G125-4W','lampada_globo_vintage_carbom_g125-4w.png',55,2,'Lãmpada com filamento led em formato de globo, 4W com vidro em cor ambar   ',NULL,NULL,NULL),(24,'Espeto de Jardim Led Solar 10W Branco Quente',NULL,'S-DC0B10WBQ','espeto_jardim_led_solar_10W.png.png',70,0,'Espeto de jardim solar led, cor branco quente, 10W   ',NULL,NULL,NULL),(25,'Espeto de Jardim Led Solar 10W Branco Frio',NULL,'S-DC0B10WBF','espeto_jardim_led_solar_10W.png',70,0,'Espeto de jardim solar led, cor branco frio, 10W  ',NULL,NULL,NULL),(26,'Espeto de Jardim Led Solar 10W Verde',NULL,'S-DC0B10WBVE','espeto_jardim_led_solar_10W.png.png',70,0,'Espeto de jardim solar led, cor verde, 10W   ',NULL,NULL,NULL),(27,'Espeto de Jardim Led Solar 10W RGB',NULL,'S-DC0B10WBRGB','espeto_jardim_led_solar_10W.png',70,1,'Espeto de jardim solar led, cores variando entre vermelho, azul e verde, 10W  ',NULL,NULL,NULL),(28,'Mini Espeto de Jardim Led Solar',NULL,'D-COB006WBF','espeto_jardim_led_solar_mini.png.png',20,4,'Mini espeto para jardim solar com 1 led de luz branca.  ',NULL,NULL,NULL),(29,'Luninária Solar Led com Sensor de Movimento 6',NULL,'SOBD-6W','luminaria_solar_6_leds.png',33,1,'Luminária solar com sensor de movimento para ambientes externos.    ',NULL,NULL,NULL),(30,'Luminária Solar Pública Led 10W com Sensor de',NULL,'SOPT-07','luminaria_solar_publica_sensor_de_movimento_10W.png',65,0,'Luminária pública solar com sensor de movimento, 10W, cor branco frio  ',NULL,NULL,NULL),(31,'Refletor Led Solar 20W Portatil para Camping',NULL,'SOLA-QMBF','refletor_solar_20W_camping.png',40,2,'Refletor portátil solar para camping, luz branca fria.  ',NULL,NULL,NULL),(32,'Pendente Cone Preto em Alumínio',NULL,'CN-01040PT','pendente_aluminio_cone_preto.png',41,2,'Pendente especial para lâmpadas led com rosca E27, cor preto e em alumínio    ',NULL,NULL,NULL),(33,'Spot Led 5W Redondo de Embutir',NULL,'SMD-R5WF','spot_redondo_5w_embutir.png',14,2,'Spot tipo dicróica, com lâmpada led 5W, luz cor branca fria, para embutir   ',NULL,NULL,NULL),(34,'Spot Led 5W Quadrado de Embutir',NULL,'MNI-COB-Q5WF','spot_quadrado_5w_embutir.png.png',14,5,'Spot tipo dicróica, com lâmpada led 5W, luz cor branca fria, para embutir           ',NULL,NULL,NULL),(38,'Refletor MicroLED Ultra Thin 50W Branco Frio ',NULL,'R-50WBF','refletor_50W_mini.png',50,8,'Refletor de 50W muito, com luminosidade muito forte e tamanho redizido. 10x13cm      ',NULL,NULL,NULL),(39,'DRIVER para PLAFON 12-18W',NULL,'DP-12-18W','driver_plafon_12_18W.png',12,2,'Driver para plafons de 12 e 18W.  ',NULL,NULL,NULL),(40,'Driver para Plafon 25w',NULL,'DP-25W','driver_plafon_12_18W.png',14,2,'Driver para plafons de 25W.  ',NULL,NULL,NULL),(41,'Módulo Solar 150W UPSolar 36 células',NULL,'UP-M155P','painel-solar-fotovoltaico-155-watts-upsolar-D_NQ_NP_857715-MLB25305746627_012017-F.jpg',420,1,'Vmppt: 18,06V - Imppt: 8,49A - Tamanho: 1,48m x 0,67m -  Peso: 10Kg ',NULL,NULL,NULL),(42,'Bomba Solar Singflo ',NULL,'FL-40','folder_bomba_solar_abr_2019_ML.jpg',420,1,'12V / 9,2A / 17l/min - altura de recalque: 28m máx ',NULL,NULL,NULL),(43,'Plafon 18W quadrado sobrepor branco quente',NULL,'PG-Q18WBQ','paflon_18W_sobrepor.png',28,3,'18W Quadrado 160x160mm bivolt ',NULL,NULL,NULL),(44,'Plafon 25W quadrado sobrepor branco quente',NULL,'PG-Q25WBQ','paflon_18W_sobrepor.png',42,3,'25W - Quadrado -  200x200mm bivolt ',NULL,NULL,NULL),(45,'Barra de sindal - fios até 4mm',NULL,'1159','sindal_25mm.png',6,10,'Para fios até 4mm, 12 posições, poliester translúcido ',NULL,NULL,NULL),(46,'Dispositivo Residual - DR - 25A',NULL,'1566','dr_steck.png',90,4,'DR para trilho DIN, 25A 300mA de sensibilidade - 230V máx.  ',NULL,NULL,NULL),(47,'Suporte para lâmpadas E14 (rosca pequena) cer',NULL,'5497','suporte_e14.png',3,10,'Suporte de porcelana, com a base reta para lâmpadas de rosca pequena E14. ',NULL,NULL,NULL),(48,'Régua de 3 tomadas Ilumi para extensão',NULL,'7980','regua_3_tomadas_ilumi.png',15,4,'Régua para extensões de energia com 3 pinos, 10A, cor cinza  ',NULL,NULL,NULL),(49,'Fotocélula (Relé fotoelétrico) com base integ',NULL,'38835','foto_celula_ilumi.png',30,3,'Relé fotoelétrico para o acionamento de lâmpadas a noite. 127V - até 500W | 220V -  até 1000W  ',NULL,NULL,NULL),(50,'Testador de tensão 127V ou 220V',NULL,'35560','teste_de_tensao_ilumi.png',10,5,'Plug para teste da tensão da tomada, evita a queima acidental de aparelhos ',NULL,NULL,NULL),(51,'Fita Isolante 3m Scotch 33+ 19mm X 20m',NULL,'','fita_isolante_scotch_33_20m.jpeg',15,9,'Fita isolante 3M de alta qualidade com 20m de comprimento x 19mm de espessura. ',NULL,NULL,NULL),(52,'Fita Auto Fusão 3M Scotch 23 com 10m',NULL,'','fita_autofusao_3m_23.png',22,8,'Fita auto fusão para isolamento elétrico em locais úmidos e pode ser utilizado em alta tensão ',NULL,NULL,NULL),(53,'Refletor 20W Branco Frio',NULL,'R-20WBF','refletor_20W_perfil_sem_fundo.jpg',36,2,'Refletor ultra thin (totalmente selado) 20W Ip66  ',NULL,NULL,NULL),(54,'Espeto de Jardim 5W Verde',NULL,'D-COB5WVE','espeto_jardim_led_verde_5W.png.png',30,3,'Espeto de jardim led verde bivolt, 80lm/W, proteção grau IP65 ',NULL,NULL,NULL),(55,'Spot Dicróica LED 5W Branco Quente',NULL,'D-AB5WBQ','spot_dicroica_5W_br_quente.png',17,3,'Spot Dicróica 5W Branco Quente 3000K, bivolt 350lm 108x108x40mm ',NULL,NULL,NULL),(56,'Plafon led 12W quadrado de embutir branco neu',NULL,'PS-Q12WBN','plafon_12W_embutir.png',27,3,'Plafon de embutir LED com 12W, cor branca quente, medidas 170x20mm ',NULL,NULL,NULL),(57,'Pendente de corda',NULL,'BP-C1-E27-CORDA','pendente_de_corda_40cm.jpg',50,4,'Luninária pendente todo em corda de sisal, 1m de comprimento, suporte para lâmpadas rosca E27 até  ',NULL,NULL,NULL),(58,'Arendela Solar com Sensor 2W',NULL,'BSSA-003-2SL-PT/BF','arendela_solar_com_sensor.png',80,1,'Arendela feita para iluminar áreas externas. Ela é solar, sem fios externos. ',NULL,NULL,NULL);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-08 11:59:09
