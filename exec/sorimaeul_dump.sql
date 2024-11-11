-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: j10e201.p.ssafy.io    Database: sorimaeul
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

--
-- Table structure for table `comment_tb`
--

DROP TABLE IF EXISTS `comment_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_tb` (
  `comment_code` int NOT NULL AUTO_INCREMENT,
  `user_code` bigint DEFAULT NULL,
  `cover_code` int DEFAULT NULL,
  `dub_code` int DEFAULT NULL,
  `content` text NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_code`),
  KEY `fk_comment_tb_dub_tb1_idx` (`dub_code`),
  KEY `fk_comment_tb_cover_tb1_idx` (`cover_code`),
  KEY `fk_comment_tb_user_tb1_idx` (`user_code`),
  CONSTRAINT `fk_comment_tb_cover_tb1` FOREIGN KEY (`cover_code`) REFERENCES `cover_tb` (`cover_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_tb_dub_tb1` FOREIGN KEY (`dub_code`) REFERENCES `dub_tb` (`dub_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_tb`
--

LOCK TABLES `comment_tb` WRITE;
/*!40000 ALTER TABLE `comment_tb` DISABLE KEYS */;
INSERT INTO `comment_tb` VALUES (1,3389895323,28,NULL,'이쥔~ 버틸수없다고~ 후히히!','2024-04-02 00:13:46'),(3,3418163560,34,NULL,'도라에몽 고음 잘 올라가네..','2024-04-02 03:00:09'),(4,414622963198404,49,NULL,'감미롭네요 ','2024-04-02 05:07:25'),(5,3394594533,63,NULL,'와... 너무 멋지다 ! ','2024-04-02 07:56:19'),(6,3409076082,63,NULL,'감미...롭....다랄까....','2024-04-02 10:28:56'),(7,3409076082,9,NULL,'뿔경엔 대체 가수가 몇 명...','2024-04-02 10:42:49'),(8,3033402678355548,NULL,43,'신이 내린 웃수저네요. 감동입니다???','2024-04-02 13:17:59'),(9,3033402678355548,NULL,46,'ㅋㅋㅋㅋ이게 머야','2024-04-02 14:02:47'),(10,3418163560,63,NULL,'오...?? 오호!','2024-04-02 23:54:11'),(11,3395046391,NULL,50,'과학적으로 비슷한 것 같네요.','2024-04-02 23:58:40'),(12,3409076082,97,NULL,'이름 남용 고소할게요','2024-04-03 01:33:18'),(13,3033402678355548,97,NULL,'?? 소정코치님 목소리가 너무 걸쭉하네요','2024-04-03 01:39:23'),(14,3419632897,99,NULL,'너무... 잘부르시네요..???','2024-04-03 01:43:21'),(15,3389895323,97,NULL,'경훈코치님 고문을 당하고 계시다면 댓글로 \'살려줘\'를 입력해주세요.','2024-04-03 03:08:43'),(17,2597823846497149,19,NULL,'유리창 박살나는 중','2024-04-03 05:03:51'),(18,2597823846497149,19,NULL,'칠판 좀 그만 긁어요','2024-04-03 05:04:00'),(19,2597823846497149,19,NULL,'손유정 국힙 원탑','2024-04-03 05:04:14'),(20,2597823846497149,63,NULL,'이 점도면 직접 녹음한거 아닌가요','2024-04-03 05:05:14'),(21,3389895323,108,NULL,'나의 도라에몽이 어쩌다 이렇게...','2024-04-03 07:12:58'),(23,3389895323,104,NULL,'난 모르겠다... 나갈란다','2024-04-03 07:14:34'),(24,3389895323,99,NULL,'❤❤❤','2024-04-03 07:15:03'),(25,3409076082,119,NULL,'가래 낀 것 같은데요','2024-04-03 07:36:30'),(26,3409076082,119,NULL,'경훈 IM 감성 모르면 나가라','2024-04-03 07:36:57'),(27,3418163560,119,NULL,'나 영어 잘하네..?','2024-04-03 07:37:01'),(28,3389895323,119,NULL,'귀에서 눈물이 나왔습니다..','2024-04-03 07:40:28'),(29,3033402678355548,119,NULL,'눈에서 콧물이 나왔습니다','2024-04-03 07:41:09'),(30,3033402678355548,97,NULL,'코로나 에디션','2024-04-03 07:41:58'),(31,3394594533,113,NULL,'아름다워요!!! ','2024-04-03 11:08:40'),(32,3394594533,104,NULL,'고수 빼주세요','2024-04-03 11:09:06'),(33,3033402678355548,127,NULL,'오 진짜 비슷한거같아요','2024-04-03 12:18:35'),(34,3033402678355548,NULL,45,'정말 재미있네요','2024-04-03 14:19:14'),(35,3033402678355548,123,NULL,'진짜 박효신같아요','2024-04-03 14:20:17'),(37,3394594533,NULL,56,'유정님 출석 체크하셨나요? 유정님 출석 체크하셨나요? 유정님 출석 체크하셨나요? 유정님 출석 체크하셨나요? 유정님 출석 체크하셨나요? 유정님 출석 체크하셨나요? ','2024-04-03 15:51:46'),(38,3394594533,NULL,68,'한 편의 뮤직 비디오같네요 ','2024-04-03 15:52:34');
/*!40000 ALTER TABLE `comment_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cover_source_tb`
--

DROP TABLE IF EXISTS `cover_source_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cover_source_tb` (
  `cover_source_code` int NOT NULL AUTO_INCREMENT,
  `singer` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `youtube_link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `thumbnail_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cover_source_code`),
  KEY `cover_source_tb_singer_IDX` (`singer`) USING BTREE,
  KEY `cover_source_tb_title_IDX` (`title`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cover_source_tb`
--

LOCK TABLES `cover_source_tb` WRITE;
/*!40000 ALTER TABLE `cover_source_tb` DISABLE KEYS */;
INSERT INTO `cover_source_tb` VALUES (1,'비비(BIBI)','밤양갱','https://youtu.be/ayREauImhZg',NULL,'2024-03-26 01:14:41'),(2,'박재정','헤어지자 말해요','https://youtu.be/SrQzxD8UFdM',NULL,'2024-03-26 01:15:44'),(3,'박효신','야생화','https://youtu.be/D1A7wLNSPhI',NULL,'2024-03-26 01:18:37'),(4,'엠씨더맥스(M.C the MAX)','잠시만 안녕(Original)','https://youtu.be/ikx0NPc4f5E',NULL,'2024-03-26 01:19:15'),(5,'아이유(IU)','밤편지','https://youtu.be/6744glqD6lk',NULL,'2024-03-26 01:20:00'),(7,'윤하','사건의 지평선','https://youtu.be/mnpQsM-tqQU',NULL,'2024-03-28 02:32:41'),(8,'아이유(IU)','Love Wins All','https://youtu.be/h-XrgiZiQgw',NULL,'2024-03-28 02:32:41'),(9,'엠씨더맥스(M.C the MAX)','One Love','https://youtu.be/q0Bc1lmn5fA',NULL,'2024-03-29 05:42:19'),(10,'태연','I (feat. 버벌진트)','https://youtu.be/oX_jWZ7wwEk',NULL,'2024-04-01 04:58:34'),(11,'김동률','기억의 습작','https://youtu.be/t_nRDuFdGMs',NULL,'2024-04-01 06:22:18'),(12,'정국(Jung Kook)','Seven (feat. Latto)','https://youtu.be/O4ZMjuPgM9U',NULL,'2024-04-02 06:30:55'),(13,'DK(디셈버)','심(心)','https://youtu.be/ZbWooNg4IMo',NULL,'2024-04-01 08:33:30'),(14,'웡카 OST','Oompa Loompa','https://youtu.be/-2h-OHvKEeI',NULL,'2024-04-03 05:02:22'),(15,'Men\'s Tear','AK47','https://youtu.be/O-waMIVqShg',NULL,'2024-04-03 05:03:10'),(16,'Elvis Presley','Can\'t Help Falling In Love','https://youtu.be/vGJTaP6anOU',NULL,'2024-04-03 05:04:01'),(17,'The Beatles','Let It Be','https://youtu.be/QDYfEBY9NM4',NULL,'2024-04-03 05:10:55'),(18,'Billy Joen','Piano Man','https://youtu.be/QwVjTlTdIDQ',NULL,'2024-04-03 05:10:55'),(19,'Sting','Englishman In New York','https://youtu.be/d27gTrPPAyk',NULL,'2024-04-03 05:10:55'),(20,'버즈(Buzz)','가시','https://youtu.be/1-Lm2LUR8Ss',NULL,'2024-04-03 05:11:35'),(21,'버즈(Buzz)','겁쟁이','https://youtu.be/G7eLG4Tnc9c',NULL,'2024-04-03 05:12:28'),(22,'야다(YADA)','이미 슬픈 사랑','https://youtu.be/3knRgHGj7ug',NULL,'2024-04-03 05:12:28');
/*!40000 ALTER TABLE `cover_source_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cover_tb`
--

DROP TABLE IF EXISTS `cover_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cover_tb` (
  `cover_code` int NOT NULL AUTO_INCREMENT,
  `user_code` bigint DEFAULT NULL,
  `cover_name` varchar(100) NOT NULL,
  `cover_singer` varchar(100) NOT NULL,
  `singer` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `cover_detail` text,
  `storage_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_time` timestamp NULL DEFAULT NULL,
  `post_time` timestamp NULL DEFAULT NULL,
  `thumbnail_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `like_count` int NOT NULL DEFAULT '0',
  `is_complete` tinyint NOT NULL DEFAULT '0',
  `is_public` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`cover_code`),
  KEY `fk_cover_tb_user_tb_idx` (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cover_tb`
--

LOCK TABLES `cover_tb` WRITE;
/*!40000 ALTER TABLE `cover_tb` DISABLE KEYS */;
INSERT INTO `cover_tb` VALUES (4,3394594533,'민이유','민호','아이유(IU)','밤편지','불꽃카리스마민이유','cover/cover_4.mp3','2024-04-01 06:02:21','2024-04-01 06:19:57','/image/240401377344dbc7761b7dbb490f74bae554476720.jpeg',1,1,1),(9,3394594533,'강재정','강주원(노래)','박재정','헤어지자 말해요','부울경 강재정 입니다 ','cover/cover_9.mp3','2024-04-01 06:04:48','2024-04-01 06:21:01','/image/2404014085673892.jpeg',2,1,1),(10,3394594533,'태양갱','기본 모델(태양)','비비(BIBI)','밤양갱','여러분~~ 너무 보고싶었어요 ','cover/cover_10.mp3','2024-04-01 06:05:36','2024-04-01 06:06:33','/image/240401The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA\'s_Solar_Dynamics_Observatory_-_201008194309.jpeg',3,1,1),(14,3386778658,'아이유 - 잠시만 안녕 (+6 key)','기본 모델(아이유)','엠씨더맥스(M.C the MAX)','잠시만 안녕(Original)','아이유가 부른 M.C the MAX의 잠시만 안녕입니다.','cover/cover_14.mp3','2024-04-01 06:12:01','2024-04-01 06:21:46','/image/240401222877507.jpeg',2,1,1),(15,3033402678355548,'왕갈비 통닭의 사건의 수평선','기본 모델(류승룡)','윤하','사건의 지평선','청량 버전 류승룡','cover/cover_15.mp3','2024-04-01 06:16:29','2024-04-01 06:19:07',NULL,0,1,1),(18,3389895323,'강주원 - 겨울소리','관리자(강주원(300 문장))','박효신','겨울소리',NULL,'cover/cover_18.mp3','2024-04-01 06:19:59',NULL,NULL,0,1,0),(19,3394594533,'유정아이','관리자(유정)','태연','I(feat. 버벌진트)','잊을 수 없는 스카이아이아이아이아이야','cover/cover_19.mp3','2024-04-01 06:22:27','2024-04-01 06:23:58','/image/240401pngtree-fantasy-color-gradient-print-ad-image_1628259655.jpeg',1,1,0),(21,3386778658,'아이유 - 심 (+5 key)','기본 모델(아이유)','DK(디셈버)','심(心)','아이유의 심입니다','cover/cover_21.mp3','2024-04-01 07:57:13','2024-04-01 08:28:50','/image/24040183556186_1676621348326_1_600x6003736.jpeg',1,1,1),(22,3386778658,'아이유 - 심 (+6 key)','기본 모델(아이유)','DK(디셈버)','심(心)','아이유의 심','cover/cover_22.mp3','2024-04-01 08:01:32','2024-04-01 08:29:07','/image/24040183556186_1676621348326_1_600x6006700.jpeg',0,1,0),(23,3386778658,'아이유 - 잠시만 안녕 (+5 key)','기본 모델(아이유)','엠씨더맥스(M.C the MAX)','잠시만 안녕(Original)','아이유의 잠시만 안녕','cover/cover_23.mp3','2024-04-01 08:25:13','2024-04-01 08:27:39','/image/240401222872653.jpeg',1,1,0),(24,3386778658,'태양 - 심','기본 모델(태양)','DK(디셈버)','심(心)','태양 심','cover/cover_24.mp3','2024-04-01 08:36:26','2024-04-02 00:12:26','/image/240402f9Nmer_Y7TDVnnepidW1TT9PTW5pdXB3j1SlgC5pVHpVqpnyQue39ftSkrgeeDyjYhbMywFoNdftAbQimkWX1w7631.jpeg',0,1,1),(25,3386778658,'아이유 - 기억의 습작 (+6 key)','기본 모델(아이유)','김동률','기억의 습작',NULL,'cover/cover_25.mp3','2024-04-01 14:50:30',NULL,NULL,0,1,0),(26,3386778658,'아이유 - 기억의 습작 (+9 key)','기본 모델(아이유)','김동률','기억의 습작',NULL,'cover/cover_26.mp3','2024-04-01 14:52:38',NULL,NULL,0,1,0),(27,3386778658,'아이유 - 기억의 습작 (+12 key)','기본 모델(아이유)','김동률','기억의 습작',NULL,'cover/cover_27.mp3','2024-04-01 14:54:25',NULL,NULL,0,1,0),(28,3386778658,'아이유 - 기억의 습작 (+11 key)','기본 모델(아이유)','김동률','기억의 습작','아이유 기억의 습작','cover/cover_28.mp3','2024-04-01 14:57:33','2024-04-02 00:12:39','/image/24040280254293457.jpeg',0,1,1),(29,3386778658,'아이유 - 밤양갱','기본 모델(아이유)','비비(BIBI)','밤양갱','아이유 밤양갱','cover/cover_29.mp3','2024-04-01 15:00:48','2024-04-02 00:12:46','/image/240402vhLGDDDc-Li_qN6coMRSYw8y9o6P35-LiCqqVD0cW6EtaDIkCv1qcRx0Pv7_B0y-Y3t2HOjhHXWgCkgvrBLgGg4958.jpeg',1,1,1),(30,3386778658,'아이유 - 사건의 지평선','기본 모델(아이유)','윤하','사건의 지평선','지평좌표계를 어떻게 고정시키셨죠?','cover/cover_30.mp3','2024-04-01 15:07:35','2024-04-02 05:41:41','/image/240402HfziTv1z0V_friYg4yQbVznxk2Pza8MC101Wbqw71XzaDsNPEz_gS1OuGxk3L2lU9q_2WkZ81E_LjBpbdXjKkg8607.jpeg',0,1,1),(34,3389895323,'도라에몽의 I +2 키','기본 모델(도라에몽)','태연','I (feat. 버벌진트)','도라에몽 I +2 키','cover/cover_34.mp3','2024-04-02 01:52:08','2024-04-02 01:53:04','/image/24040215ed2aa6b9149c14e6766.jpeg',3,1,1),(37,3389895323,'아이유 - 야생화 +6키','기본 모델(아이유)','박효신','야생화','아이유 야생화 +6키 입니다. 재밌네용 ㅎㅎ','cover/cover_37.mp3','2024-04-02 02:04:50','2024-04-02 02:08:50','/image/240402야생화5640.jpeg',2,1,1),(43,3386778658,'도라에몽 - 밤양갱','기본 모델(도라에몽)','비비(BIBI)','밤양갱','팥빵보단 밤양갱','cover/cover_43.mp3','2024-04-02 03:27:07','2024-04-02 03:29:41','/image/240402vhLGDDDc-Li_qN6coMRSYw8y9o6P35-LiCqqVD0cW6EtaDIkCv1qcRx0Pv7_B0y-Y3t2HOjhHXWgCkgvrBLgGg8408.jpeg',2,1,1),(44,3394594533,'준이유','관리자(준형)','비비(BIBI)','밤양갱','준이유','cover/cover_44.mp3','2024-04-02 03:29:24',NULL,NULL,0,1,0),(45,3386778658,'우영우 - 밤양갱','우영우','비비(BIBI)','밤양갱','우 to the 영 to the 우','cover/cover_45.mp3','2024-04-02 04:52:18','2024-04-02 05:42:11','/image/24040253_16587883726085_20220725503342853.jpeg',0,1,1),(49,3033402678355548,'접영환의 헤어지자말해요2','접영환','박재정','헤어지자 말해요','영환쓰 버전 헤어지자 말해요입니다.','cover/cover_49.mp3','2024-04-02 05:01:46','2024-04-02 05:03:46',NULL,1,1,1),(57,3394594533,'밤편지','관리자(윤희)','아이유(IU)','밤편지',NULL,'cover/cover_57.mp3','2024-04-02 06:13:54',NULL,NULL,0,1,0),(59,3386778658,'Benedict Cumberbatch - Can\'t Help Falling In Love','기본 모델(베네딕트 컴버배치)','Elvis Presley','Can\'t Help Falling In Love',NULL,'cover/cover_59.mp3','2024-04-02 06:23:54',NULL,NULL,0,1,0),(60,3394594533,'주원국','관리자(강주원(노래))','정국(Jung Kook)','Seven (feat. Latto)','정국 아니죠, 주원국입니다.','cover/cover_60.mp3','2024-04-02 06:36:31','2024-04-03 11:19:57','/image/240404images1224.jpeg',0,1,1),(61,3386778658,'황호선프로 - Love Wins All','기본 모델(황호선)','아이유(IU)','Love Wins All',NULL,'cover/cover_61.mp3','2024-04-02 07:39:12',NULL,NULL,0,1,0),(62,3386778658,'호선 - Love Wins All','기본 모델(황호선)','아이유(IU)','Love Wins All',NULL,'cover/cover_62.mp3','2024-04-02 07:41:26',NULL,NULL,0,1,0),(63,3386778658,'호선 - 곰팡이 핀 밤양갱','기본 모델(황호선)','비비(BIBI)','밤양갱','프로의 밤양갱은 맛이 다르다','cover/cover_63.mp3','2024-04-02 07:43:47','2024-04-02 07:49:19','/image/240402image1525.jpeg',8,1,1),(65,3386778658,'호선 - 심','기본 모델(황호선)','DK(디셈버)','심(心)',NULL,'cover/cover_65.mp3','2024-04-02 08:51:06',NULL,NULL,0,1,0),(67,3409076082,'다민님 기대할게요','박다민','윤하','사건의 지평선',NULL,'cover/cover_67.mp3','2024-04-02 10:41:21',NULL,NULL,0,1,0),(68,492104431787904,'태양 편지','기본 모델(태양)','아이유(IU)','밤편지','낮편지','cover/cover_68.mp3','2024-04-02 14:33:03','2024-04-02 14:34:03','/image/240403썸네일8929.jpeg',0,1,1),(69,492104431787904,'Mr.Tomorrow','기본 모델(태양)','에쉬그레이','Hello Mr. My Yesterday 10기 오프닝(OP)','Mr.Tomorrow','cover/cover_69.mp3','2024-04-02 14:39:44','2024-04-02 14:40:19','/image/240403썸네일9785.jpeg',1,1,1),(70,3395046391,'아이유 - 예뻤어','기본 모델(아이유)','데이식스','예뻤어',NULL,'cover/cover_70.mp3','2024-04-02 15:12:25',NULL,NULL,0,1,0),(75,3395046391,'아이유 - 예뻤어 (+4)','기본 모델(아이유)','데이식스','예뻤어','아이유 예뻤어','cover/cover_75.mp3','2024-04-02 15:17:33','2024-04-02 15:18:33','/image/240403예뻤어9438.jpeg',0,1,1),(77,3395046391,'준형 - 예뻤어 (-1)','관리자(준형)','데이식스','예뻤어',NULL,'cover/cover_77.mp3','2024-04-02 15:22:00',NULL,NULL,0,1,0),(81,3395046391,'준형 - 좋아합니다','관리자(준형)','데이식스','좋아합니다.',NULL,'cover/cover_81.mp3','2024-04-02 16:30:36',NULL,NULL,0,1,0),(87,3395046391,'도라에몽 - 힘 내!','기본 모델(도라에몽)','소녀시대','힘 내!',NULL,'cover/cover_87.mp3','2024-04-02 16:51:24',NULL,NULL,0,1,0),(95,3033402678355548,'호선아일랜드','기본 모델(황호선)','FTISLAND','지독하게','아무래도 호선 프로님 고음 데이터가 없어서 살짝 삑사리가 생기는 것 같습니다...ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ','cover/cover_95.mp3','2024-04-03 01:18:09','2024-04-03 01:21:14',NULL,0,1,1),(97,3418163560,'소정코치의 흔꽃샴느','소정코치 목소리','장범준','흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야','소정 코치의 감성이 담겨있는 곡입니다.','cover/cover_97.mp3','2024-04-03 01:27:12','2024-04-03 01:32:54','/image/240403내얼굴1562.jpeg',1,1,1),(98,3033402678355548,'접영환의 팥양갱','접영환','비비(BIBI)','밤양갱','접영환의 쓰디 쓴 팥양갱','cover/cover_98.mp3','2024-04-03 01:36:20','2024-04-03 01:38:50',NULL,1,1,1),(99,3418163560,'소코의 옛사랑','소정코치 목소리','이문세','옛사랑','이문세의 옛사랑을 불러보았습니다.','cover/cover_99.mp3','2024-04-03 01:37:03','2024-04-03 01:39:30','/image/240403물고기6948.jpeg',3,1,1),(100,3419632897,'흔꽃샴 - 호선프로님','기본 모델(황호선)','장범준','흔들리는 꽃들속에서 네 샴푸향이 느껴진거야',NULL,'cover/cover_100.mp3','2024-04-03 01:39:06',NULL,NULL,0,1,0),(104,3409076082,'소정 감성 모르면 나가라','소정','윤하','사건의 지평선','소정 최후의 만찬 감성 모르면 나가라','cover/cover_104.mp3','2024-04-03 03:39:04','2024-04-03 05:09:35','/image/24040314775217_1012887_2535_org9285.jpeg',1,1,1),(106,3386778658,'도라에몽 - AK47','기본 모델(도라에몽)','Men\'s Tear','AK47',NULL,'cover/cover_106.mp3','2024-04-03 04:44:49',NULL,NULL,0,1,0),(107,3395046391,'준형 - 좀비','관리자(준형)','데이식스','좀비',NULL,'cover/cover_107.mp3','2024-04-03 04:45:39',NULL,NULL,0,1,0),(108,3386778658,'도라에몽 - AK47','기본 모델(도라에몽)','Men\'s Tear','AK47','도라에몽~ AK47 꺼내줘~','cover/cover_108.mp3','2024-04-03 04:47:14','2024-04-03 04:51:07','/image/240403Ernn-c6UcAUB__W2473.jpeg',0,1,1),(109,3395046391,'준형 - Congratulations','관리자(준형)','데이식스','Congratulations',NULL,'cover/cover_109.mp3','2024-04-03 04:56:07',NULL,NULL,0,1,0),(113,3409076082,'바래? 다줄게','소정','아이유(IU)','밤편지','바래다줄게..?','cover/cover_113.mp3','2024-04-03 05:15:14','2024-04-03 06:43:48','/image/240403download8600.jpeg',2,1,1),(114,3395046391,'준형 - 잘지내자 우리','관리자(준형)','로이킴','잘지내자 우리',NULL,'cover/cover_114.mp3','2024-04-03 05:38:14',NULL,NULL,0,1,0),(118,3409076082,'산타 오기 전까지 울음 참는다','소정','멜로망스','선물','박진영..이라면... 오열할게요','cover/cover_118.mp3','2024-04-03 07:27:22','2024-04-03 07:28:39','/image/24040301.35306859.16157.jpeg',3,1,1),(119,3418163560,'여러분을 생각하며..','소정코치 목소리','Wiz Khalifa','see you again','다시 봐요.','cover/cover_119.mp3','2024-04-03 07:34:38','2024-04-03 07:35:57','/image/240403바다4987.jpeg',1,1,1),(120,3418163560,'감성','소정코치 목소리','장범준','여수밤바다','눙물','cover/cover_120.mp3','2024-04-03 07:38:42','2024-04-03 07:39:29','/image/240403바다8730.jpeg',1,1,1),(121,3394594533,'이거머임','관리자(민호)','Sting','Englishman In New York',NULL,'cover/cover_121.mp3','2024-04-03 08:26:28',NULL,NULL,0,1,0),(123,3389895323,'박효신 - 헤어지자 말해요','박효신','박재정','헤어지자 말해요','너무 재밌어요','cover/cover_123.mp3','2024-04-03 10:53:41','2024-04-03 10:54:55','/image/240403artworks-BG61VSxZ7Dyvkg8u-zAWyig-t500x50089.jpeg',2,1,1),(125,3386778658,'정민 - 가시','관리자(정민)','버즈(Buzz)','가시',NULL,'cover/cover_125.mp3','2024-04-03 11:03:40',NULL,NULL,0,1,0),(127,3389895323,'박효신 - Love Wins All(-6 key)','기본 모델(박효신)','아이유(IU)','Love Wins All','박효신 목소리 너무 좋아요','cover/cover_127.mp3','2024-04-03 11:07:58','2024-04-03 11:14:45','/image/240403201906285076872840.jpeg',5,1,1),(134,3386778658,'박효신 - 가시','기본 모델(박효신)','버즈(Buzz)','가시',NULL,'cover/cover_134.mp3','2024-04-03 12:04:00',NULL,NULL,0,1,0),(140,3386778658,'아이유 - Let It Be','기본 모델(아이유)','The Beatles','Let It Be',NULL,'cover/cover_140.mp3','2024-04-03 17:03:15',NULL,NULL,0,1,0),(141,3386778658,'아이유 - Let It Be','기본 모델(아이유)','The Beatles','Let It Be','벌을 먹어요','cover/cover_141.mp3','2024-04-03 17:05:24','2024-04-03 17:06:35','/image/240404let-eat-bee-funny-sarcastic960.jpeg',1,1,1),(142,3386778658,'우영우','기본 모델(우영우)','비비(BIBI)','밤양갱',NULL,'cover/cover_142.mp3','2024-04-03 17:20:44',NULL,NULL,0,1,0),(144,3389895323,'나얼 - 사건의 지평선','나얼','윤하','사건의 지평선',NULL,'cover/cover_144.mp3','2024-04-03 17:27:21',NULL,NULL,0,1,0),(145,3389895323,'나얼 - I','나얼','태연','I (feat. 버벌진트)',NULL,'cover/cover_145.mp3','2024-04-03 17:49:39',NULL,NULL,0,1,0),(148,3389895323,'나얼 - 밤편지','나얼','아이유(IU)','밤편지',NULL,'cover/cover_148.mp3','2024-04-03 17:53:33',NULL,NULL,0,1,0),(149,3389895323,'나얼 - 밤양갱','나얼','비비(BIBI)','밤양갱','나얼의 밤양갱','cover/cover_149.mp3','2024-04-03 17:54:10','2024-04-03 17:55:54','/image/240404104088_116679_31476933.jpeg',0,1,1),(150,3389895323,'나얼 - 그라데이션','나얼','10CM','그라데이션',NULL,'cover/cover_150.mp3','2024-04-03 17:55:32',NULL,NULL,0,1,0),(151,3389895323,'나얼의 가시','기본 모델(나얼)','버즈(Buzz)','가시',NULL,'cover/cover_151.mp3','2024-04-03 17:58:19',NULL,NULL,0,1,0),(157,3395046391,'이누야샤 - grip','기본 모델(이누야샤)','이누야샤','grip',NULL,'cover/cover_157.mp3','2024-04-03 22:29:04',NULL,NULL,0,1,0),(160,3389895323,'나얼 - Love Wins All(-5 key)','기본 모델(나얼)','아이유(IU)','Love Wins All','소울이 느껴지십니까','cover/cover_160.mp3','2024-04-03 23:58:40','2024-04-04 00:01:56','/image/240404202402130944389249_l865.jpeg',0,1,1),(163,492104431787904,'베네딕트 준형배치','기본 모델(베네딕트 컴버배치)','Elvis Presley','Can\'t Help Falling In Love',NULL,'cover/cover_163.mp3','2024-04-04 00:10:35',NULL,NULL,0,1,0),(164,492104431787904,'태양 love22','기본 모델(태양)','엠씨더맥스(M.C the MAX)','One Love',NULL,'cover/cover_164.mp3','2024-04-04 01:40:09',NULL,NULL,0,1,0);
/*!40000 ALTER TABLE `cover_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dub_tb`
--

DROP TABLE IF EXISTS `dub_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dub_tb` (
  `dub_code` int NOT NULL AUTO_INCREMENT,
  `user_code` bigint DEFAULT NULL,
  `video_source_code` int DEFAULT NULL,
  `dub_name` varchar(100) NOT NULL,
  `dub_detail` text,
  `storage_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `like_count` int NOT NULL DEFAULT '0',
  `is_complete` tinyint NOT NULL DEFAULT '0',
  `is_public` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`dub_code`),
  KEY `fk_dub_tb_user_tb1_idx` (`user_code`),
  KEY `fk_dub_tb_video_source_tb1_idx` (`video_source_code`),
  CONSTRAINT `fk_dub_tb_user_tb1` FOREIGN KEY (`user_code`) REFERENCES `user_tb` (`user_code`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_dub_tb_video_source_tb1` FOREIGN KEY (`video_source_code`) REFERENCES `video_source_tb` (`video_source_code`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dub_tb`
--

LOCK TABLES `dub_tb` WRITE;
/*!40000 ALTER TABLE `dub_tb` DISABLE KEYS */;
INSERT INTO `dub_tb` VALUES (40,3386778658,3,'가망이 없어 한글판','We\'re in the end game now...','/dub/source_3/dub_40/dub_40.mp4','2024-04-01 10:49:02','2024-04-01 10:50:37',1,1,1),(43,3394594533,14,'여러분 너무 집에 가고 싶어요','너무너무 집에 가고 싶어요. ','/dub/source_14/dub_43/dub_43.mp4','2024-04-02 12:38:13','2024-04-02 12:49:28',3,1,1),(44,3394594533,12,'나루토, 그걸 아나?','HTML은 최고의 프로그래밍 언어다.','/dub/source_12/dub_44/dub_44.mp4','2024-04-02 13:06:34','2024-04-02 13:09:42',3,1,1),(45,492104431787904,11,'가즈아','가자','/dub/source_11/dub_45/dub_45.mp4','2024-04-02 13:37:21','2024-04-02 13:43:33',3,1,1),(46,492104431787904,14,'여러분~',NULL,'/dub/source_14/dub_46/dub_46.mp4','2024-04-02 13:54:36','2024-04-02 13:55:29',2,1,1),(47,3395046391,7,'소년시대 따라해보기',NULL,'/dub/source_7/dub_47/dub_47.mp4','2024-04-02 14:06:57','2024-04-02 14:08:37',0,1,0),(48,3395046391,7,'소년시대 따라하기','사투리가 어렵네요잉','/dub/source_7/dub_48/dub_48.mp4','2024-04-02 14:36:26','2024-04-02 14:39:26',1,1,1),(49,3395046391,6,'범죄도시 따라하기','마이크입력이 너무 작은가','/dub/source_6/dub_49/dub_49.mp4','2024-04-02 14:47:30','2024-04-03 04:56:04',0,1,1),(50,3389895323,14,'태양호소인','두소절만 했어요','/dub/source_14/dub_50/dub_50.mp4','2024-04-02 22:27:29','2024-04-02 22:31:15',0,1,1),(55,492104431787904,14,'여러분 출석체크 하셨나요?','...','/dub/source_14/dub_55/dub_55.mp4','2024-04-03 11:04:34','2024-04-03 11:06:45',0,1,1),(56,3033402678355548,14,'호선 프로님으로 더빙을 해보았다...','내가하니까 그냥 변성기 같은디...','/dub/source_14/dub_56/dub_56.mp4','2024-04-03 11:10:39','2024-04-03 11:11:54',0,1,1),(62,3386778658,12,'나루토',NULL,'/dub/source_12/dub_62/dub_62.mp4','2024-04-03 11:55:03','2024-04-03 11:55:06',0,1,0),(64,492104431787904,11,'.........',NULL,'/dub/source_11/dub_64/dub_64.mp4','2024-04-03 12:12:49','2024-04-03 12:13:59',0,1,0),(66,3389895323,11,'최민식 모델 성능 훌륭하다','굿','/dub/source_11/dub_66/dub_66.mp4','2024-04-03 14:16:58','2024-04-03 14:58:54',1,1,1),(68,3389895323,9,'여기서 박효신 테스트 했어요 미안해요','박효신 테스트','/dub/source_9/dub_68/dub_68.mp4','2024-04-03 14:30:56','2024-04-03 14:34:49',0,1,1),(70,3389895323,5,'처음 5초','모델 누가 학습했냐 퀄리티 진짜 좋다','/dub/source_5/dub_70/dub_70.mp4','2024-04-03 15:14:41','2024-04-03 15:24:14',0,1,1),(71,3389895323,2,'5초만','지금까지 이런 맛은 없었다','/dub/source_2/dub_71/dub_71.mp4','2024-04-03 15:18:28','2024-04-03 15:23:53',0,1,1),(72,3389895323,8,'아 더러워','아 더러워!','/dub/source_8/dub_72/dub_72.mp4','2024-04-03 15:20:34','2024-04-03 15:23:38',0,1,1),(73,3389895323,16,'호이가 계속되면','둘리','/dub/source_16/dub_73/dub_73.mp4','2024-04-03 15:22:57','2024-04-03 15:23:14',0,1,1),(74,492104431787904,15,'찢어진 고구마 ','이게 뭐지..','/dub/source_15/dub_74/dub_74.mp4','2024-04-03 15:33:47','2024-04-03 15:37:07',0,1,1),(75,3389895323,13,'홍장미만','변태','/dub/source_13/dub_75/dub_75.mp4','2024-04-03 15:34:46','2024-04-03 15:38:02',0,1,1),(76,3389895323,10,'해군대장','보르살리노','/dub/source_10/dub_76/dub_76.mp4','2024-04-03 15:37:43','2024-04-03 15:38:23',0,1,1),(77,3389895323,4,'패드리퍼','너무하네요 증말','/dub/source_4/dub_77/dub_77.mp4','2024-04-03 15:43:49','2024-04-03 15:44:03',0,1,1),(78,3389895323,1,'잼민이가 되어버린','난 짱구를 못해','/dub/source_1/dub_78/dub_78.mp4','2024-04-03 15:47:02','2024-04-03 15:47:52',0,1,1),(79,3389895323,9,'도라에몽과 이누야샤','ㅎㅎ','/dub/source_9/dub_79/dub_79.mp4','2024-04-03 15:55:04','2024-04-03 15:55:45',1,1,1),(82,3395046391,14,'너희 서장','너희 서장 남천동 살제?','/dub/source_14/dub_82/dub_82.mp4','2024-04-03 21:14:14','2024-04-03 21:25:32',0,1,1),(83,3395046391,12,'최민식카시','니캉내캉 이제 동등하다고 볼 수 있제','/dub/source_12/dub_83/dub_83.mp4','2024-04-03 21:23:54','2024-04-03 21:25:15',0,1,1),(84,3395046391,2,'남천동 왕갈비 통닭','마! 치킨도 튀기고 다했어','/dub/source_2/dub_84/dub_84.mp4','2024-04-03 21:45:05','2024-04-03 21:46:06',0,1,1),(85,3395046391,3,'이누야샤 가망이없어','젠장!','/dub/source_3/dub_85/dub_85.mp4','2024-04-03 22:08:13','2024-04-03 22:15:57',0,1,1),(86,3395046391,10,'바람의 상처!!','...','/dub/source_10/dub_86/dub_86.mp4','2024-04-03 22:15:37','2024-04-03 22:15:48',0,1,1),(87,3386778658,15,'ㅇ',NULL,'/dub/source_15/dub_87/dub_87.mp4','2024-04-03 23:42:26','2024-04-03 23:44:15',0,1,0),(89,492104431787904,12,'ㅇㅇㅇ',NULL,'/dub/source_12/dub_89/dub_89.mp4','2024-04-04 01:35:55','2024-04-04 01:35:59',0,1,0);
/*!40000 ALTER TABLE `dub_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_tb`
--

DROP TABLE IF EXISTS `like_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_tb` (
  `like_code` int NOT NULL AUTO_INCREMENT,
  `cover_code` int DEFAULT NULL,
  `dub_code` int DEFAULT NULL,
  `user_code` bigint NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_code`),
  KEY `fk_like_tb_cover_tb1_idx` (`cover_code`),
  KEY `fk_like_tb_dub_tb1_idx` (`dub_code`),
  KEY `fk_like_tb_user_tb1_idx` (`user_code`),
  CONSTRAINT `fk_like_tb_cover_tb1` FOREIGN KEY (`cover_code`) REFERENCES `cover_tb` (`cover_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_like_tb_dub_tb1` FOREIGN KEY (`dub_code`) REFERENCES `dub_tb` (`dub_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_like_tb_user_tb1` FOREIGN KEY (`user_code`) REFERENCES `user_tb` (`user_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_tb`
--

LOCK TABLES `like_tb` WRITE;
/*!40000 ALTER TABLE `like_tb` DISABLE KEYS */;
INSERT INTO `like_tb` VALUES (1,14,NULL,3386778658,'2024-04-01 06:21:15'),(5,23,NULL,3386778658,'2024-04-01 08:27:40'),(12,10,NULL,3386778658,'2024-04-01 23:52:37'),(19,14,NULL,3394594533,'2024-04-02 01:04:23'),(23,34,NULL,3394594533,'2024-04-02 02:06:36'),(25,21,NULL,3394594533,'2024-04-02 02:15:13'),(26,19,NULL,3394594533,'2024-04-02 02:15:16'),(27,4,NULL,3394594533,'2024-04-02 02:15:23'),(28,10,NULL,3394594533,'2024-04-02 02:15:29'),(29,9,NULL,3394594533,'2024-04-02 02:15:46'),(30,37,NULL,3394594533,'2024-04-02 02:27:47'),(31,43,NULL,3386778658,'2024-04-02 03:29:43'),(41,34,NULL,3389895323,'2024-04-02 04:52:56'),(42,10,NULL,492104431787904,'2024-04-02 05:11:43'),(43,63,NULL,3386778658,'2024-04-02 07:49:42'),(44,63,NULL,3033402678355548,'2024-04-02 07:52:24'),(46,63,NULL,3394594533,'2024-04-02 07:56:21'),(48,37,NULL,3389895323,'2024-04-02 08:31:05'),(49,43,NULL,3389895323,'2024-04-02 08:33:38'),(50,63,NULL,3409076082,'2024-04-02 10:29:46'),(51,49,NULL,3409076082,'2024-04-02 10:41:29'),(52,9,NULL,3409076082,'2024-04-02 10:42:40'),(53,NULL,40,3394594533,'2024-04-02 12:26:49'),(54,NULL,43,3033402678355548,'2024-04-02 13:17:39'),(55,63,NULL,3395046391,'2024-04-02 13:32:41'),(56,NULL,45,3033402678355548,'2024-04-02 13:46:35'),(57,NULL,45,3386778658,'2024-04-02 14:08:05'),(58,NULL,43,3386778658,'2024-04-02 14:09:03'),(60,63,NULL,492104431787904,'2024-04-02 15:26:02'),(61,NULL,46,3033402678355548,'2024-04-02 17:42:09'),(62,NULL,44,3033402678355548,'2024-04-02 17:42:20'),(64,98,NULL,3033402678355548,'2024-04-03 01:38:53'),(65,97,NULL,3033402678355548,'2024-04-03 01:39:27'),(66,NULL,43,492104431787904,'2024-04-03 02:47:32'),(67,99,NULL,3389895323,'2024-04-03 03:10:05'),(68,63,NULL,3389895323,'2024-04-03 04:45:09'),(69,NULL,46,3389895323,'2024-04-03 04:45:23'),(70,NULL,45,3389895323,'2024-04-03 04:45:41'),(71,NULL,44,3389895323,'2024-04-03 04:45:44'),(72,NULL,48,3389895323,'2024-04-03 04:46:09'),(73,99,NULL,3386778658,'2024-04-03 04:53:21'),(75,63,NULL,2597823846497149,'2024-04-03 05:05:01'),(76,118,NULL,3033402678355548,'2024-04-03 07:38:12'),(77,118,NULL,3418163560,'2024-04-03 07:42:33'),(78,113,NULL,3418163560,'2024-04-03 07:42:42'),(79,104,NULL,3418163560,'2024-04-03 07:42:46'),(80,119,NULL,3409076082,'2024-04-03 07:42:54'),(81,120,NULL,3409076082,'2024-04-03 07:43:00'),(82,99,NULL,3409076082,'2024-04-03 07:43:05'),(83,113,NULL,3394594533,'2024-04-03 11:08:31'),(85,127,NULL,3033402678355548,'2024-04-03 12:18:29'),(86,127,NULL,3386778658,'2024-04-03 12:24:49'),(87,127,NULL,3389895323,'2024-04-03 14:17:12'),(88,123,NULL,3033402678355548,'2024-04-03 14:20:11'),(89,123,NULL,3389895323,'2024-04-03 14:57:40'),(92,127,NULL,3395046391,'2024-04-04 00:08:33'),(93,34,NULL,3395046391,'2024-04-04 00:13:08'),(94,NULL,44,492104431787904,'2024-04-04 00:13:48'),(95,118,NULL,492104431787904,'2024-04-04 00:14:00'),(96,127,NULL,492104431787904,'2024-04-04 00:14:04'),(97,141,NULL,492104431787904,'2024-04-04 00:14:14'),(98,29,NULL,492104431787904,'2024-04-04 00:14:23'),(99,NULL,66,492104431787904,'2024-04-04 00:14:42'),(100,NULL,79,492104431787904,'2024-04-04 00:14:59'),(101,69,NULL,492104431787904,'2024-04-04 00:42:07');
/*!40000 ALTER TABLE `like_tb` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `update_like_count_in_cover_after_insert` AFTER INSERT ON `like_tb` FOR EACH ROW BEGIN
    UPDATE cover_tb
    SET like_count = (SELECT COUNT(*) FROM like_tb WHERE cover_code = NEW.cover_code)
    WHERE cover_code = NEW.cover_code;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `update_like_count_in_dub_after_insert` AFTER INSERT ON `like_tb` FOR EACH ROW BEGIN
    UPDATE dub_tb
    SET like_count = (SELECT COUNT(*) FROM like_tb WHERE dub_code = NEW.dub_code)
    WHERE dub_code = NEW.dub_code;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `update_like_count_in_cover_after_delete` AFTER DELETE ON `like_tb` FOR EACH ROW BEGIN
    UPDATE cover_tb
    SET like_count = (SELECT COUNT(*) FROM like_tb WHERE cover_code = OLD.cover_code)
    WHERE cover_code = OLD.cover_code;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `update_like_count_in_dub_after_delete` AFTER DELETE ON `like_tb` FOR EACH ROW BEGIN
    UPDATE dub_tb
    SET like_count = (SELECT COUNT(*) FROM like_tb WHERE dub_code = OLD.dub_code)
    WHERE dub_code = OLD.dub_code;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `notify_tb`
--

DROP TABLE IF EXISTS `notify_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notify_tb` (
  `notify_code` int NOT NULL AUTO_INCREMENT,
  `user_code` bigint NOT NULL,
  `notify_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `notify_type` varchar(10) NOT NULL,
  `target_code` int NOT NULL,
  `is_checked` tinyint NOT NULL DEFAULT '0',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notify_code`),
  KEY `fk_alert_tb_user_tb1_idx` (`user_code`),
  CONSTRAINT `fk_alert_tb_user_tb1` FOREIGN KEY (`user_code`) REFERENCES `user_tb` (`user_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notify_tb`
--

LOCK TABLES `notify_tb` WRITE;
/*!40000 ALTER TABLE `notify_tb` DISABLE KEYS */;
INSERT INTO `notify_tb` VALUES (5,3389895323,'AI 커버 \"강주원 - 겨울소리\" 제작이 완료되었습니다.','cover',18,0,'2024-04-01 06:19:58'),(7,3389895323,'AI 커버 \"강주원 - 기억의 습작\" 제작이 완료되었습니다.','cover',20,0,'2024-04-01 06:23:44'),(8,3389895323,'더빙 영상 \"ㅁㄴㅇㅇㅁㅇ\" 생성이 완료되었습니다.','dubbing',31,0,'2024-04-01 06:41:04'),(31,3389895323,'AI 커버 \"도라에몽의 I\" 제작이 완료되었습니다.','cover',33,0,'2024-04-02 00:17:40'),(32,3389895323,'모델 \"우영우 생명과학 선생님\"의 학습이 완료되었습니다.','train',117,0,'2024-04-02 01:25:10'),(33,3389895323,'모델 \"주현영\"의 학습이 완료되었습니다.','train',115,0,'2024-04-02 01:31:51'),(34,3389895323,'AI 커버 \"도라에몽의 I +2 키\" 제작이 완료되었습니다.','cover',34,0,'2024-04-02 01:52:07'),(35,3389895323,'AI 커버 \"도라에몽의 I +4 키\" 제작이 완료되었습니다.','cover',35,0,'2024-04-02 01:54:29'),(36,3389895323,'AI 커버 \"아이유 - 야생화\" 제작이 완료되었습니다.','cover',36,1,'2024-04-02 01:57:56'),(37,3389895323,'AI 커버 \"아이유 - 야생화 +6키\" 제작이 완료되었습니다.','cover',37,1,'2024-04-02 02:04:50'),(45,3389895323,'모델 \"남도일\"의 학습이 완료되었습니다.','train',120,0,'2024-04-02 03:32:56'),(50,3389895323,'AI 커버 \"남도일의 야생화\" 제작에 실패했습니다.','cover',46,1,'2024-04-02 04:57:09'),(52,3389895323,'AI 커버 \"남도일의 야생화\" 제작이 완료되었습니다.','cover',48,1,'2024-04-02 04:59:05'),(61,9805341257352021,'모델 \"너의목소리가들려\"의 학습이 완료되었습니다.','train',124,0,'2024-04-02 06:06:12'),(72,3389895323,'AI 커버 \"황호선 - Love Wins All(-6key)\" 제작이 완료되었습니다.','cover',66,0,'2024-04-02 08:56:47'),(73,3389895323,'모델 \"이누야샤\"의 학습이 완료되었습니다.','train',131,0,'2024-04-02 09:08:37'),(106,3389895323,'더빙 영상 \"태양호소인\" 생성이 완료되었습니다.','dubbing',50,1,'2024-04-02 22:27:49'),(112,3418163560,'모델 \"소정코치 목소리\"의 학습이 완료되었습니다.','train',122,1,'2024-04-03 01:13:54'),(116,3418163560,'AI 커버 \"소정코치의 흔꽃샴느\" 제작이 완료되었습니다.','cover',97,1,'2024-04-03 01:27:11'),(118,3418163560,'AI 커버 \"소코의 옛사랑\" 제작이 완료되었습니다.','cover',99,1,'2024-04-03 01:37:02'),(119,3419632897,'AI 커버 \"흔꽃샴 - 호선프로님\" 제작이 완료되었습니다.','cover',100,1,'2024-04-03 01:39:21'),(127,3409076082,'모델 \"소정\"의 학습이 완료되었습니다.','train',119,1,'2024-04-03 03:24:41'),(129,3409076082,'AI 커버 \"소정 감성 모르면 나가라\" 제작이 완료되었습니다.','cover',104,1,'2024-04-03 03:39:04'),(135,3389895323,'AI 커버 \"도라에몽 - AK47(+7 key)\" 제작이 완료되었습니다.','cover',110,1,'2024-04-03 05:07:40'),(138,3409076082,'AI 커버 \"바래? 다줄게\" 제작이 완료되었습니다.','cover',113,1,'2024-04-03 05:15:13'),(142,3418163560,'AI 커버 \"여러분을 생각하며..\" 제작에 실패했습니다.','cover',117,1,'2024-04-03 07:26:11'),(143,3409076082,'AI 커버 \"산타 오기 전까지 울음 참는다\" 제작이 완료되었습니다.','cover',118,1,'2024-04-03 07:27:22'),(144,3418163560,'AI 커버 \"여러분을 생각하며..\" 제작이 완료되었습니다.','cover',119,1,'2024-04-03 07:34:38'),(145,3418163560,'AI 커버 \"감성\" 제작이 완료되었습니다.','cover',120,1,'2024-04-03 07:38:42'),(148,3389895323,'모델 \"박효신\"의 학습이 완료되었습니다.','train',160,0,'2024-04-03 09:48:39'),(149,3389895323,'AI 커버 \"박효신의 야생화\" 제작에 실패했습니다.','cover',122,0,'2024-04-03 10:53:07'),(150,3389895323,'AI 커버 \"박효신 - 헤어지자 말해요\" 제작이 완료되었습니다.','cover',123,1,'2024-04-03 10:53:41'),(151,3389895323,'AI 커버 \"박효신 - Love Wins All\" 제작이 완료되었습니다.','cover',124,1,'2024-04-03 11:01:07'),(154,3389895323,'AI 커버 \"박효신 - Love Wins All(-4 key)\" 제작이 완료되었습니다.','cover',126,0,'2024-04-03 11:05:16'),(155,3389895323,'AI 커버 \"박효신 - Love Wins All(-6 key)\" 제작이 완료되었습니다.','cover',127,0,'2024-04-03 11:07:58'),(197,3389895323,'모델 \"나얼\"의 학습이 완료되었습니다.','train',169,0,'2024-04-03 17:01:55'),(201,3389895323,'AI 커버 \"나얼 - 헤어지자 말해요\" 제작이 완료되었습니다.','cover',143,0,'2024-04-03 17:23:47'),(202,3389895323,'AI 커버 \"나얼 - 사건의 지평선\" 제작이 완료되었습니다.','cover',144,0,'2024-04-03 17:27:20'),(203,3389895323,'AI 커버 \"나얼 - I\" 제작이 완료되었습니다.','cover',145,0,'2024-04-03 17:49:38'),(204,3389895323,'AI 커버 \"나얼 - 밤양갱\" 제작에 실패했습니다.','cover',146,0,'2024-04-03 17:52:24'),(205,3389895323,'AI 커버 \"나얼 - I\" 제작에 실패했습니다.','cover',147,0,'2024-04-03 17:52:55'),(206,3389895323,'AI 커버 \"나얼 - 밤편지\" 제작이 완료되었습니다.','cover',148,1,'2024-04-03 17:53:32'),(207,3389895323,'AI 커버 \"나얼 - 밤양갱\" 제작이 완료되었습니다.','cover',149,1,'2024-04-03 17:54:10'),(208,3389895323,'AI 커버 \"나얼 - 그라데이션\" 제작이 완료되었습니다.','cover',150,1,'2024-04-03 17:55:32'),(209,3389895323,'AI 커버 \"나얼의 가시\" 제작이 완료되었습니다.','cover',151,1,'2024-04-03 17:58:18'),(210,3389895323,'AI 커버 \"나얼의 Love Wins All(-4 key)\" 제작이 완료되었습니다.','cover',152,1,'2024-04-03 17:59:28'),(212,3389895323,'AI 커버 \"나얼의 Love Wins All(-5 key)\" 제작에 실패했습니다.','cover',154,0,'2024-04-03 18:11:40'),(213,3389895323,'AI 커버 \"나얼 - I\" 제작에 실패했습니다.','cover',155,0,'2024-04-03 18:13:28'),(216,3420931799,'모델 \"푸루루푸루\"의 학습이 완료되었습니다.','train',172,0,'2024-04-03 19:44:59'),(217,3395046391,'더빙 영상 \"너희 서장\" 생성이 완료되었습니다.','dubbing',82,1,'2024-04-03 21:14:34'),(218,3395046391,'더빙 영상 \"최민식카시\" 생성이 완료되었습니다.','dubbing',83,1,'2024-04-03 21:23:56'),(219,3395046391,'더빙 영상 \"남천동 왕갈비 통닭\" 생성이 완료되었습니다.','dubbing',84,1,'2024-04-03 21:45:36'),(228,3389895323,'AI 커버 \"나얼 - Love Wins All(-5 key)\" 제작이 완료되었습니다.','cover',160,1,'2024-04-03 23:58:40'),(232,492104431787904,'더빙 영상 \"ㅇㅇㅇ\" 생성이 완료되었습니다.','dubbing',89,1,'2024-04-04 01:35:58'),(233,492104431787904,'AI 커버 \"태양 love22\" 제작이 완료되었습니다.','cover',164,1,'2024-04-04 01:40:09'),(234,492104431787904,'모델 \"따봉테스트\"의 학습이 완료되었습니다.','train',137,0,'2024-04-04 02:16:09');
/*!40000 ALTER TABLE `notify_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_cover_tb`
--

DROP TABLE IF EXISTS `playlist_cover_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_cover_tb` (
  `list_cover_code` int NOT NULL AUTO_INCREMENT,
  `playlist_code` int NOT NULL,
  `cover_code` int NOT NULL,
  `cover_index` int NOT NULL,
  PRIMARY KEY (`list_cover_code`),
  KEY `fk_playlist_cover_tb_playlist_tb1_idx` (`playlist_code`),
  KEY `fk_playlist_cover_tb_cover_tb1_idx` (`cover_code`),
  CONSTRAINT `fk_playlist_cover_tb_cover_tb1` FOREIGN KEY (`cover_code`) REFERENCES `cover_tb` (`cover_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_playlist_cover_tb_playlist_tb1` FOREIGN KEY (`playlist_code`) REFERENCES `playlist_tb` (`playlist_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_cover_tb`
--

LOCK TABLES `playlist_cover_tb` WRITE;
/*!40000 ALTER TABLE `playlist_cover_tb` DISABLE KEYS */;
INSERT INTO `playlist_cover_tb` VALUES (4,3,23,1),(5,3,21,2),(6,3,10,3),(22,7,63,1),(27,9,63,1),(28,9,75,2),(29,18,10,1),(46,19,127,1),(47,19,123,2),(51,20,24,1),(53,20,118,2),(54,20,141,3),(55,21,123,1),(56,19,160,3),(57,19,75,4),(58,8,69,1),(59,21,75,2),(60,8,75,2);
/*!40000 ALTER TABLE `playlist_cover_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_tb`
--

DROP TABLE IF EXISTS `playlist_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_tb` (
  `playlist_code` int NOT NULL AUTO_INCREMENT,
  `user_code` bigint NOT NULL,
  `playlist_name` varchar(40) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`playlist_code`),
  KEY `fk_playlist_tb_user_tb1_idx` (`user_code`),
  CONSTRAINT `fk_playlist_tb_user_tb1` FOREIGN KEY (`user_code`) REFERENCES `user_tb` (`user_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_tb`
--

LOCK TABLES `playlist_tb` WRITE;
/*!40000 ALTER TABLE `playlist_tb` DISABLE KEYS */;
INSERT INTO `playlist_tb` VALUES (3,3386778658,'정몬','2024-04-01 14:28:19'),(7,3409076082,'봄..일까..','2024-04-02 01:04:18'),(8,492104431787904,'최애곡','2024-04-02 14:08:25'),(9,3033402678355548,'첫번째 플레이리스트','2024-04-03 02:10:13'),(18,3389895323,'플리1','2024-04-03 03:29:53'),(19,3389895323,'플리2','2024-04-03 03:30:52'),(20,3394594533,'나의플리','2024-04-03 11:14:51'),(21,3395046391,'안녕','2024-04-04 00:06:43');
/*!40000 ALTER TABLE `playlist_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `req_board_tb`
--

DROP TABLE IF EXISTS `req_board_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `req_board_tb` (
  `board_code` int NOT NULL AUTO_INCREMENT,
  `user_code` bigint DEFAULT NULL,
  `type_code` tinyint NOT NULL,
  `title` varchar(40) NOT NULL,
  `content` text NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`board_code`),
  KEY `fk_req_board_tb_user_tb1_idx` (`user_code`),
  CONSTRAINT `fk_req_board_tb_user_tb1` FOREIGN KEY (`user_code`) REFERENCES `user_tb` (`user_code`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `req_board_tb`
--

LOCK TABLES `req_board_tb` WRITE;
/*!40000 ALTER TABLE `req_board_tb` DISABLE KEYS */;
INSERT INTO `req_board_tb` VALUES (1,NULL,1,'AI 커버 제작 관련 질문','1. 업로드시에 어떤 파일 확장자를 지원하나요?\r\n\r\nmp3, wav, m4a 세 가지를 지원합니다. 높은 품질의 원본 음원을 구하는 것이 중요하며, 파일을 변환할수록 음원에 손실을 일으키게 됩니다. m4a의 경우, 휴대폰 녹음기에 해당되는 확장자 입니다.\r\n\r\n2. 피치변환은 어떻게 활용해야 하나요?\r\n\r\n남성과 여성 보컬은 일반적으로 4-6키가 차이납니다. 예를 들어 남성 AI음성으로 여성곡을 커버하시려는 경우, 키조절 도구에서 -4 에서 -6사이를 시도해보시는 것을 추천드립니다. 다만 피치변환 자체가 음질을 하락시키는 효과가 있기 때문에, AI음성이나 커버 음원에 따라 다소 불안정한 변환이 있을 수 있습니다.\r\n\r\n3. AI 커버 제작에 실패했어요! 원인이 뭔가요?\r\n\r\n원인은 다양하지만, 주로 연령 제한이 걸린 Youtube 링크가 문제인 경우가 대부분입니다. 또 서버 통신 오류나 부적절한 요청 등이 원인이 될 수 있습니다.','2024-03-30 15:08:54'),(2,NULL,1,'AI 커버 제작 팁','1. 오토튠같은 음향효과가 많거나, 코러스(백보컬)가 너무 센 음원들은 음성을 깨끗하게 분리해서 학습시키는데 어려움이 있을 수 있으므로 피하시는 것을 추천드립니다.\r\n\r\n2. 같은 이유로 여러명이 가창을 하거나 화음이 많은 곡은 사용하시기 어렵습니다.','2024-03-30 15:03:28'),(3,3386778658,0,'강효신 저사람 댓글로 욕했어요. 밴해주세요.','밴 안하면 디도스 걸겠습니다.','2024-03-26 02:12:20'),(4,3386778658,0,'베네딕트 준형배치 저사람 노래 진짜 못하는데 차단기능 없나요??','차단 기능 안 만들어주면 결제 취소하겠습니다.','2024-03-26 02:13:41'),(5,3386778658,0,'제작자님 사랑합니다.','너무 재밌어요','2024-03-26 11:19:15'),(6,3386778658,0,'맨스티어 - AK47 추가해주세요','AK47 맞고 xx한 xxxx','2024-03-26 12:53:17'),(8,3386778658,0,'움파룸파 둠파디티도 올려주세요','움파룸파 둠파디티~~~!!!!','2024-03-29 17:33:44'),(9,3386778658,0,'짱구 목소리도 기본 모델에 추가해주세요','짱구 목소리로 밤양갱 부르게 하고 싶어요!!!','2024-03-29 17:36:11'),(16,NULL,1,'노래방에서 녹음한 파일로 학습을 해도 되나요?','노래방에서 녹음한 녹음 파일은 울림, 외부 소리의 영향을 많이 받기 때문에 학습에 좋지 않은 영향을 미칠 수 있습니다.\r\n\r\n조용한 환경에서 무반주로 녹음하시는 것을 권장합니다.','2024-03-26 02:07:42'),(17,NULL,1,'학습 기회를 모두 소진했어요! 추가로 학습하는 방법은 없나요?','저희 소리마을에서는 기본 3회의 학습 기회가 주어집니다.\r\n\r\n학습 기회를 모두 소진했다면 결제 페이지에서 학습 기회를 추가로 구매해보세요!','2024-03-30 14:57:56'),(18,NULL,1,'저작권 문제는 어떻게 처리하는 건가요?','저희 소리마을에서 창작된 산출물에 대한 저작권은 소리마을에서 책임지지 않습니다.\r\n\r\n피해 발생을 막기위해 산출물을 외부에 공유하는 행위를 금합니다.','2024-03-26 02:11:08');
/*!40000 ALTER TABLE `req_board_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `script_tb`
--

DROP TABLE IF EXISTS `script_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `script_tb` (
  `script_code` int NOT NULL AUTO_INCREMENT,
  `script` text NOT NULL,
  PRIMARY KEY (`script_code`)
) ENGINE=InnoDB AUTO_INCREMENT=1042 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `script_tb`
--

LOCK TABLES `script_tb` WRITE;
/*!40000 ALTER TABLE `script_tb` DISABLE KEYS */;
INSERT INTO `script_tb` VALUES (1,'그는 괜찮은 척하려고 애쓰는 것 같았다.'),(2,'그녀의 사랑을 얻기 위해 애썼지만 헛수고였다.'),(3,'용돈을 아껴 써라.'),(4,'그는 아내를 많이 아낀다.'),(5,'그 애 전화번호 알아?'),(6,'차에 대해 잘 아세요?'),(7,'거기 도착하면 나한테 알려 줘.'),(8,'그들은 내가 시험에 떨어졌다고 알려 왔다.'),(9,'나는 살아오면서 감기를 앓은 적이 한 번도 없다.'),(10,'사흘 동안 심하게 몸살을 앓았어요.'),(11,'요즘 공부가 안돼요.'),(12,'장사가 잘 안돼서 우울해.'),(13,'아무 것도 먹지 않으면 죽게 되어 있다.'),(14,'그녀는 이유를 묻지 않고 돈을 빌려 주었다.'),(15,'내가 아기를 안고 있을게.'),(16,'엄마는 말없이 나를 꼭 안아 주셨다.'),(17,'자리에 앉으세요.'),(18,'한 여자가 내 옆에 앉았다.'),(19,'일일사에 전화를 해서 번호를 알아보시지 그러세요?'),(20,'내가 누군지 알아보겠니?'),(21,'그는 절대 다른 사람의 의견을 받아들이지 않는다.'),(22,'아이들도 언젠가는 그녀를 엄마로 받아들일 거야.'),(23,'어디에서 영어를 배우셨어요?'),(24,'동료에게서 수화를 배우고 있습니다.'),(25,'이거 다른 걸로 바꿀 수 있을까요?'),(26,'색깔을 바꾸는 게 나을 거 같아.'),(27,'소영이 좀 바꿔 주세요.'),(28,'눈이 얼음으로 바뀌었어.'),(29,'핸드폰이 네 거랑 바뀐 거 같아.'),(30,'그 차는 들판에 버려진 채 발견됐다.'),(31,'이번 달 초에 상어떼가 해안가에서 발견됐다.'),(32,'오타를 발견하시는 분께 사례하겠습니다.'),(33,'결국 그의 개가 그의 시신을 발견했다.'),(34,'정신분석학은 이십 세기에 급격히 발전했다.'),(35,'한국어 실력이 날이 갈수록 발전하는 것을 보니 기쁩니다.'),(36,'죄송하지만 제 이름을 밝힐 수는 없어요.'),(37,'정전이 되어 촛불을 밝혔다.'),(38,'모두가 시험에 통과했음을 발표하게 되어 기쁘게 생각합니다.'),(39,'그 밴드는 첫 음반을 발표한 직후에 해체했다.'),(40,'화재가 발생하지 않도록 조심해라.'),(41,'어제 일본에서 태풍이 발생했다.'),(42,'돌고래는 지능이 발달했다.'),(43,'이 지역에는 농업이 발달했어요.'),(44,'그녀는 내 제안에 반대했다.'),(45,'저는 무력 사용을 반대합니다.'),(46,'밤늦게 남의 집을 방문하는 것은 실례다.'),(47,'저희 회사에 방문해 주셔서 감사드립니다.'),(48,'너는 브레이크를 너무 세게 밟아.'),(49,'어떤 남자가 지하철에서 내 발을 밟고 모른 척했다.'),(50,'그녀는 호기심으로 가득찬 눈으로 나를 바라보았다.'),(51,'이 문제는 제 삼 자의 시각에서 바라볼 필요가 있어.'),(52,'저한테 너무 많은 걸 바라지 마세요.'),(53,'빨리 나으시길 바랍니다.'),(54,'입술에 침이나 바르고 말해.'),(55,'선크림을 발랐어야지.'),(56,'나는 생일 선물로 책을 받았다.'),(57,'신용 카드를 받나요?'),(58,'스트레스 받는 일 있어?'),(59,'어떻게 그렇게 돈을 버셨어요?'),(60,'한 달에 삼백만 원을 법니다.'),(61,'입을 벌려 보세요.'),(62,'지하철에서 다리를 벌리고 앉지 마라.'),(63,'벽 사이에 벌어진 틈이 있어.'),(64,'그 법안을 놓고 말다툼이 벌어졌어.'),(65,'담배 꽁초를 여기에 버리지 마세요.'),(66,'돈을 다 써 버렸어요'),(67,'내년 아버지 환갑 때 잔치를 벌일 거야.'),(68,'오늘 아침 아내랑 말다툼을 벌였어.'),(69,'가난에서 벗어나려면 습관부터 바꿔라.'),(70,'복잡한 도시 지역을 벗어나니 참 좋군요.'),(71,'외투 벗으실래요?'),(72,'신발이 너무 꽉 껴서 벗을 수가 없어요.'),(73,'아침 햇빛이 비치는 걸 보니 상쾌하군.'),(74,'커튼 너머에 누군가의 그림자가 비쳤다.'),(75,'램프가 그의 작품을 비추게 배치되어 있었다.'),(76,'아침마다 내 얼굴을 거울에 비춰 봐요.'),(77,'금고는 이미 비어 있었다.'),(78,'이 자리는 비었습니까?'),(79,'우리는 서로 답을 비교해 보았다.'),(80,'부모가 저지르는 큰 실수 중 하나는 자기 아이를 다른 집 아이와 비교하는 것이다.'),(81,'이틀 동안 차를 빌리고 싶은데요.'),(82,'아내에게서 돈을 빌린다는 것은 좀 이상해요.'),(83,'다이아몬드가 눈부시게 빛나고 있었다.'),(84,'모든 창에서 촛불이 반짝반짝 빛나고 있었다.'),(85,'영화 보러 갈까?'),(86,'오늘 우연히 길에서 그 여자를 봤어요.'),(87,'제가 해 볼게요.'),(88,'어디선가 뵌 분 같아요.'),(89,'지난번에 뵌 후 오랜만에 뵙습니다.'),(90,'그거 맛있어 보이네.'),(91,'그는 나이에 비해 정말 젊어 보인다.'),(92,'그녀가 나에게 사진 몇 장을 보여 주었다.'),(93,'주민등록증을 보여 주시겠어요?'),(94,'김치가 맛이 없어서 볶았어.'),(95,'고기를 기름에 볶지 마라.'),(96,'이 소포를 뉴욕으로 보내고 싶은데요.'),(97,'선생님께 한 부 보내 드리겠습니다.'),(98,'휴가 잘 보내세요.'),(99,'그녀는 짐 하나하나에 이름표를 붙였다.'),(100,'침으로 편지 봉투에 우표를 붙이지 마세요.'),(101,'우리는 파티 준비를 위해 풍선을 불었다.'),(102,'바람이 많이 불어.'),(103,'경찰 좀 불러 주세요.'),(104,'사람들은 그를 게으른 천재라고 부른다.'),(105,'노래 한 곡 부르세요.'),(106,'여행사에 예약을 부탁하는 게 어때?'),(107,'엄마한테 도와달라고 부탁해 봐.'),(108,'냄비에 물을 부어라.'),(109,'우유를 좀 부어 봐.'),(110,'신발 밑창에 껌이 붙었다.'),(111,'저는 운전면허시험에 세 번 만에 붙었어요.'),(112,'밤이 되면 그녀는 괴물로 변한다.'),(113,'전혀 안 변하셨네요.'),(114,'그는 점차 냉혹한 지도자로 변화했다.'),(115,'지구가 빠르게 변화하고 있다.'),(116,'그는 공을 차는 척하면서 상대 선수를 찼다.'),(117,'그녀는 칠 년간 사귄 남자 친구를 차 버리고 딴 남자랑 결혼했다.'),(118,'소지품을 잘 챙기세요.'),(119,'엄마는 아빠를 엄청 챙기신다.'),(120,'빈칸을 채우시오.'),(121,'기름을 가득 채워 주세요.'),(122,'제 잔에는 물을 반만 채워 주세요.'),(123,'인터넷 찾아봤어?'),(124,'다 찾아봤지만 찾을 수가 없어요.'),(125,'내일 댁으로 찾아가겠습니다.'),(126,'내일까지 짐을 찾아가셔야 해요.'),(127,'도움이 필요하면 나를 찾아와.'),(128,'은행에서 돈 찾아와야 해.'),(129,'많은 배우들이 그 시상식에 참석하지 않았다.'),(130,'갑자기 시부모님이 오셔서 모임에 참석하지 못했어요.'),(131,'웃음을 참을 수가 없었어요.'),(132,'더 이상은 못 참아.'),(133,'엄마랑 아빠는 항상 같이 상을 차리세요.'),(134,'얼른 기운 차리셔야죠.'),(135,'교차로에서 저를 찾을 수 있을 거예요.'),(136,'이 책을 찾고 있어요.'),(137,'아기는 소리가 나는 쪽을 쳐다본다.'),(138,'그런 식으로 사람을 빤히 쳐다보지 마.'),(139,'나는 일 년에 한 번 우리 집 화장실을 청소한다.'),(140,'창문은 뭘로 청소하나요?'),(141,'그는 내 얼굴을 쳐서 자기 손목을 삐었다.'),(142,'테니스를 치다가 발목을 삐었어요.'),(143,'오늘 시험 잘 쳤어요?'),(144,'이번 주말 내 생일에 너를 초대하고 싶은데.'),(145,'그녀는 나를 자기 집으로 초대했다.'),(146,'낯선 사람들 앞에서 춤을 추는 건 나한테는 정말 어려운 일이야.'),(147,'그녀와 나는 음악에 맞추어 탱고를 췄다.'),(148,'결혼 축하해!'),(149,'할아버지의 회갑을 축하하는 잔치를 열었다.'),(150,'그 사람은 한 시간 전에 역으로 출발했어요.'),(151,'이 역에서 출발하는 사람 중에는 군인이 많아.'),(152,'이 기차는 부산을 세 시에 출발합니다.'),(153,'지금 춤출 기분이 아냐.'),(154,'오늘 밤에 춤추러 갈까요?'),(155,'소주 다섯 병에 결국 취하고 말았다.'),(156,'나 안 취했어.'),(157,'내가 한 말 취소하겠어요.'),(158,'죄송하지만 예약을 취소하고 싶어요.'),(159,'어제 농구를 하다 코를 다쳤어요.'),(160,'어쩌다 다친 거야?'),(161,'이 문은 잘 안 닫혀요.'),(162,'컴퓨터가 멈춰서 창이 닫히지 않아.'),(163,'카드를 단말기 위에 대세요.'),(164,'그렇게 먹어 대니까 살이 안 빠지지.'),(165,'질문에 대답하세요.'),(166,'어른들에게는 예나 아니요라고 대답해야 합니다.'),(167,'그녀는 나를 딸처럼 대한다.'),(168,'이 문제에 대해 말해 볼 사람?'),(169,'그 개는 낯선 사람이 다가가면 짖는다.'),(170,'내가 그녀에게 다가가자 그녀의 얼굴이 창백해졌다.'),(171,'폭풍이 다가오자 하늘이 어두워졌다.'),(172,'그녀가 내게 다가왔다.'),(173,'그는 힘이 다할 때까지 계속 소리쳤다.'),(174,'부모님을 실망시키지 않기 위해 최선을 다하겠다.'),(175,'자기 전에 이 닦는 거 잊지 마라.'),(176,'바닥을 닦아라.'),(177,'블라우스에 브로치를 달았다.'),(178,'태극기를 다세요.'),(179,'엄마가 돌아가신 후 모든 것이 달라졌어요.'),(180,'저는 아내 덕분에 많이 달라졌습니다.'),(181,'그는 결승점을 향해 전속력으로 달렸다.'),(182,'그 오토바이는 시속 육십 킬로로 달렸어요.'),(183,'포도가 나무에 달려 있었다.'),(184,'너한테 달렸어.'),(185,'아내를 업고 병원으로 달려갔다.'),(186,'딸아이는 저한테 혼나고 나면 엄마한테 달려가요.'),(187,'그릇에 물이 담겨 있어.'),(188,'부모님의 꾸중에는 사랑이 담겨 있다.'),(189,'너는 내가 아는 어떤 사람이랑 많이 닮았어.'),(190,'그들은 아주 친한 사이여서 서로를 닮아 가고 있다.'),(191,'방금 상자에 담아 둔 책이 없어졌어.'),(192,'고객이 감사의 마음을 담은 편지를 보내 왔어.'),(193,'밧줄을 너무 세게 당겨서 끊어졌어.'),(194,'문을 당겨서 여세요.'),(195,'내 동생이 어제 교통사고를 당했어.'),(196,'그는 자기 부하들 앞에서 창피를 당했다.'),(197,'어느 학교에 다녔어요?'),(198,'학생이세요? 아니면 직장을 다니세요?'),(199,'아버지는 일요일이면 사냥을 다니세요.'),(200,'학교 다녀왔어요.'),(201,'추석에는 많은 사람들이 고향을 다녀온다.'),(202,'용의자는 부산으로 달아났다.'),(203,'도둑은 개를 보고는 달아났습니다.'),(204,'신문 좀 내려주실래요? 선반에 손이 안 닿아서요.'),(205,'저희 집은 여기에서 엎어지면 코 닿을 데 있어요.'),(206,'창문을 좀 닫아도 될까요?'),(207,'저희 가게는 밤 열 시에 문을 닫습니다.'),(208,'마음 속으로 생각한 수에 이를 더하세요.'),(209,'삼 더하기 사는 칠'),(210,'연못에 돌을 던지지 마세요.'),(211,'투수는 타자가 아닌 포수에게 공을 던져야 한다.'),(212,'책을 덮으세요.'),(213,'컵을 종이로 덮어 두어라.'),(214,'일곱 시쯤에 너를 데리러 갈게.'),(215,'그는 딸을 데리고 회사에 왔다.'),(216,'이 남자 병원에 데려가야 해.'),(217,'오늘 여자 친구를 부모님께 데려갈 거야.'),(218,'집들이 때 회사 사람들 집에 데려와도 돼?'),(219,'그때 그녀가 의사를 데려오지 않았으면 나는 죽었을 거야.'),(220,'그녀를 잊는 데에 이 년이 들었어.'),(221,'비타민 씨가 많이 들어 있는 과일을 드세요.'),(222,'감기 든 거니?'),(223,'무거운 것을 들다 허리를 삐끗했다.'),(224,'왼손에 우산을 든 여자가 내 아내야.'),(225,'사무실에 잠깐 들러 주실 수 있으세요?'),(226,'어제 주유소를 들러서 기름을 가득 채웠습니다.'),(227,'제 말이 들리세요?'),(228,'당신 제안은 흥미롭게 들리네요.'),(229,'눈에 뭔가가 들어갔어요.'),(230,'열쇠를 잃어버려서 창문으로 집에 들어갔다.'),(231,'그들의 음모가 드러나고 있다.'),(232,'그것이 사실임이 드러났다.'),(233,'그녀가 새하얀 이를 드러내면서 웃었다.'),(234,'방금 네가 한 말은 너의 무지를 드러내는 거야.'),(235,'이곳에 들어오시면 안 됩니다.'),(236,'오늘은 집으로 일찍 들어와라.'),(237,'길을 잘못 들어선 것 같아요.'),(238,'이 지역에 새 아파트가 여기저기 들어서고 있다.'),(239,'제가 전에 명함을 드렸나요?'),(240,'읽어 드리겠습니다.'),(241,'나는 문을 열고 교회 안을 들여다봤다.'),(242,'그 사람은 하루 종일 현미경을 들여다봐.'),(243,'나는 음악을 듣다 잠이 들었다.'),(244,'제 말 듣고 계세요?'),(245,'몇 시에 인천에 도착하셨어요?'),(246,'도착하면 알려 줘.'),(247,'나는 십 년 뒤에는 부자가 될 거야.'),(248,'저는 친구를 사랑하게 되었어요.'),(249,'저는 애완견 돌보는 걸 좋아해요.'),(250,'우리 엄마는 우리를 돌보는 것 때문에 아침부터 밤까지 바빠요.'),(251,'곧장 가다가 왼쪽으로 도세요.'),(252,'지구는 태양을 돈다.'),(253,'채널 좀 그만 돌려라.'),(254,'그녀는 나를 보자마자 차의 방향을 돌렸다.'),(255,'여기에서 도망가자.'),(256,'그는 자기 아내를 죽이고 해외로 도망갔다.'),(257,'뭘 도와 드릴까요?'),(258,'하늘은 스스로 돕는 자를 돕는다.'),(259,'그 사람은 뒤를 돌아보지 않고 차에 올랐다.'),(260,'연말에는 한 해를 돌아볼 필요가 있다.'),(261,'제 꿈은 한국으로 돌아가는 거예요.'),(262,'좀전에 할머니가 돌아가셨다는 전화를 받았어.'),(263,'그는 열아홉 살에 한국으로 돌아왔다.'),(264,'환자의 의식이 돌아왔어요.'),(265,'제 숙제 좀 도와주세요.'),(266,'도와주셔서 고맙습니다.'),(267,'이 약은 아이들 손이 닿지 않는 곳에 두세요.'),(268,'수업 중에 휴대폰을 켜 두지 마세요.'),(269,'이 지역 주변을 둘러보고 싶어요.'),(270,'그냥 둘러보는 거예요.'),(271,'적군이 그를 둘러쌌다.'),(272,'이 문제를 둘러싸고 많은 논의가 있었다.'),(273,'이 얼룩을 없앨 수 있을까요?'),(274,'그렇다면 그 자를 없애!'),(275,'이웃집에서 망치를 하나 얻어 와라.'),(276,'서점에서 아이디어는 좀 얻었어?'),(277,'나쁜 친구와 어울려 다니지 마라.'),(278,'이 넥타이는 당신에게 어울리지 않아요.'),(279,'저는 일요일마다 교회에 갑니다.'),(280,'날이 건조해서 농작물이 죽어 가요.'),(281,'상상력을 개발하고 싶으면 시를 읽으세요.'),(282,'정부는 이 지역을 관광지로 개발할 계획이라고 발표했다.'),(283,'그 옷은 세탁소로 가져가세요.'),(284,'개인 물건들을 꼭 가져가십시오.'),(285,'펜 좀 이리로 가져와라.'),(286,'컴퓨터는 우리 생활에 엄청난 변화를 가져왔다.'),(287,'깜빡 잊고 펜을 안 가지고 왔어요.'),(288,'우리 부부는 아이를 갖지 않기로 결정했어.'),(289,'그 책 어디에 감춘 거야?'),(290,'왜 남자라는 사실을 감추려고 한 겁니까?'),(291,'이 자리에 와 주신 여러분께 감사드립니다.'),(292,'성원에 깊이 감사하고 있습니다.'),(293,'잠시만 눈 좀 감아 봐.'),(294,'저는 사진을 찍을 때 한쪽 눈을 감는 버릇이 있어요.'),(295,'박스를 끈으로 감아라.'),(296,'실수로 테이프를 너무 많이 감아 버렸다.'),(297,'선생님은 우리들에게 독서의 중요성을 늘 강조하셨어요.'),(298,'태권도는 신체뿐만 아니라 마음의 수련을 강조한다.'),(299,'옷을 좀 갈아입고 올게요.'),(300,'그녀는 수영복으로 갈아입은 다음 밖으로 나갔다.'),(301,'제 생각에는 버스를 갈아타는 게 나을 것 같아요.'),(302,'사당역에서 사 호선으로 갈아타세요.'),(303,'저는 학생들을 가르치는 일을 좋아합니다.'),(304,'외국인에게 태권도를 가르치고 있어요.'),(305,'화살표가 북쪽을 가리키고 있다.'),(306,'시계는 일곱 시를 가리키고 있어요.'),(307,'그 호텔은 호화로운 시설들을 갖추고 있다.'),(308,'저는 제 자신이 업무에 필요한 모든 자질을 갖추고 있다고 자신합니다.'),(309,'감독관이 시험지를 빨리 거둔 것 같아.'),(310,'시험에서 좋은 성적을 거두려면 최선을 다해야 해.'),(311,'그는 내게 자신이 그 회사의 사장이라고 거짓말했다.'),(312,'거짓말하지 마세요.'),(313,'저는 사소한 일은 걱정하지 않으려고 노력합니다.'),(314,'저는 걱정하지 마세요.'),(315,'옷걸이에 코트를 걸어라.'),(316,'그녀에게 다가가서 말을 걸었습니다.'),(317,'전화 잘못 거셨어요.'),(318,'벽에 많은 옷이 걸려 있다.'),(319,'감기에 걸렸어요.'),(320,'끝내려면 두 시간쯤 걸릴 거예요.'),(321,'집에서 회사까지 지하철로 얼마나 걸려요?'),(322,'길을 건너면 은행이 있어요.'),(323,'돌다리도 두드려 보고 건너라.'),(324,'보통은 회사에 그냥 걸어가요.'),(325,'저쪽으로 걸어가십시오.'),(326,'여기까지 걸어왔어요.'),(327,'우리가 얼마나 걸어온 거지?'),(328,'맨발로 걷지 마라.'),(329,'길을 걷다 좋은 생각이 떠올랐어요.'),(330,'나무 밑에서 비가 그치기를 기다렸다.'),(331,'나를 보자마자 아기는 울음을 그쳤어요.'),(332,'예전 일은 왜 그만두셨어요?'),(333,'저 그만두겠습니다.'),(334,'저는 방송국에서 근무하고 있습니다.'),(335,'보통 하루에 몇 시간 근무하세요?'),(336,'그러는 게 좋을 것 같아.'),(337,'그러지 않겠다고 약속했잖아.'),(338,'저는 그림을 잘 못 그리지만 그림 그리는 걸 좋아해요.'),(339,'누구를 그리고 계신 거예요?'),(340,'선생님을 만나 뵙기를 기대하고 있습니다.'),(341,'너무 기대하지 마.'),(342,'순서를 기다려 주세요.'),(343,'친구를 기다리는 중입니다.'),(344,'아빠가 결혼기념일을 기억하지 못해?'),(345,'저를 기억하시겠어요?'),(346,'그 여자 낯은 아주 익은데, 이름이 기억나지 않아요.'),(347,'저 기억나세요?'),(348,'어머님이 기뻐하시겠어요.'),(349,'아직 이긴 게 아니니까 기뻐하기에는 이릅니다.'),(350,'엄마, 고양이를 기르게 해 주세요.'),(351,'턱수염을 기른 적이 있어요.'),(352,'집중력을 기르는 것이 공부를 잘하는 비결입니다.'),(353,'저는 일기장에 하루 동안 있었던 일을 모두 기록합니다.'),(354,'한국의 자동차 산업은 세계 삼 위를 기록하고 있습니다.'),(355,'몸을 옆으로 기울여 보세요.'),(356,'나는 대체로 선생님의 말씀에 주의를 기울이지 않았다.'),(357,'이 라디오 고치는 데 얼마나 걸릴까요?'),(358,'다음 문장에서 틀린 부분을 고치세요.'),(359,'밑줄 친 부분을 모두 이탤릭으로 고쳐라.'),(360,'저는 대학에서 국문학을 공부할 거예요.'),(361,'가을은 일 년 중 공부하기에 제일 좋은 계절이다.'),(362,'이 중에서 하나를 고르세요.'),(363,'제일 좋은 걸 고르셨어요.'),(364,'제 나이를 좀 고려해 주셨으면 좋겠어요.'),(365,'모든 점을 고려했을 때 가지 않는 게 낫다.'),(366,'왜 사서 고생해?'),(367,'여기에 오시느라 고생하지 않으셨어요?'),(368,'부산은 구경할 곳이 많아요.'),(369,'어디를 구경하고 싶으세요?'),(370,'일자리를 구하고 있습니다.'),(371,'직장은 구하셨어요?'),(372,'그 개는 주인을 구하기 위해 강으로 뛰어들었다.'),(373,'그 의사가 그녀의 목숨을 구해 냈다.'),(374,'엄마는 빵을 굽고 계세요.'),(375,'나는 소시지를 기름에 튀기는 것보다 석쇠에 굽는 걸 좋아해.'),(376,'축구는 열한 명으로 구성돼 있습니다.'),(377,'이 문제 때문에 위원회가 구성됐습니다.'),(378,'이번 사건은 마약과 관련되어 있다.'),(379,'그 일은 내 동생과 관련돼 있어.'),(380,'내 취미는 길거리의 사람들을 관찰하는 거야.'),(381,'그 이상한 남자는 개미에 대해 관찰하면서 즐거움을 찾았다.'),(382,'저는 그 사고에 관해 아는 것이 없습니다.'),(383,'한국에 관한 책들은 어디에 있나요?'),(384,'저는 어렸을 때 많은 어려움을 겪었어요.'),(385,'저희 부부는 결혼한 직후에 한 차례 위기를 겪었습니다.'),(386,'그와 결혼하기로 마음먹었다.'),(387,'저희 막 결혼했어요.'),(388,'아무 것도 결정된 건 없어요.'),(389,'학교 이사회에서 그를 해고하기로 결정됐다.'),(390,'어디로 피서를 갈 지 아직 결정하지 못했어요.'),(391,'심사위원들이 그를 우승자로 결정했어요.'),(392,'이혼을 결심했다.'),(393,'좀 더 다이어트를 엄격하게 하기로 결심했어요.'),(394,'이민자들은 육체적, 정신적 고통을 견뎌 왔다.'),(395,'더 이상 못 견디겠어.'),(396,'저는 한국에 오자마자 문화적 충격을 경험했어요.'),(397,'그는 한국의 여러 다른 생활방식을 경험할 수 있었다.'),(398,'제가 잘못 계산했나 봐요.'),(399,'카드로 계산하겠습니다.'),(400,'지금 여기에 안 계세요.'),(401,'사장님이 기다리고 계십니다.'),(402,'엄마는 병원에 누워 계세요.'),(403,'우리는 밤새도록 얘기를 계속했습니다.'),(404,'그는 계속해서 새로운 변명거리를 만들어 냈다.'),(405,'이렇게 무더운 날씨가 오래 계속되지는 않을 거예요.'),(406,'회의가 밤늦도록 계속됐다.'),(407,'지금 당장은 할 일이 없어요.'),(408,'숙제는 언제 할 거니?'),(409,'이 문제를 해결하기 전에는 집에 못 가.'),(410,'직장 상사와의 갈등은 어떻게 해결하세요?'),(411,'아내는 나를 보고 기쁨의 눈물을 흘렸다.'),(412,'열쇠를 어디에 흘린 거야?'),(413,'우리는 탬버린을 흔들면서 같이 노래를 불렀다.'),(414,'그녀는 아니라고 말하는 대신 고개를 흔들었다.'),(415,'물은 높은 곳에서 낮은 곳으로 흐른다.'),(416,'시간이 흐르면 괜찮아질 거야.'),(417,'이 가방 산 걸 후회하고 있어요'),(418,'그때 그녀를 차 버린 걸 지금은 후회해요.'),(419,'그들은 영수증을 확인하고 돈을 환불해 주었다.'),(420,'예약을 확인하고 싶은데요.'),(421,'빈 방을 창고로 활용하고 있어요.'),(422,'성공은 시간을 어떻게 활용하는가에 달려 있다.'),(423,'아빠가 화나신 것 같아.'),(424,'나한테 화났어?'),(425,'이 배는 일본을 향하고 있습니다.'),(426,'창문을 향해 앉아 주세요.'),(427,'이번에는 너에게 꼭 이기고 싶어.'),(428,'어려움을 이겨 내지 못하면 성공할 수 없어.'),(429,'그 연극은 이해하기가 어려웠다.'),(430,'교사는 학생들을 이해할 필요가 있습니다.'),(431,'실은 나 한 달 전에 이혼했어.'),(432,'부모님이 이혼하신 이후로 엄마랑 살고 있어요.'),(433,'야, 오랜만이야. 얼굴 잊어버리겠어!'),(434,'우산 가져오는 걸 잊어버렸어.'),(435,'만화책 읽는 거 좋아하세요?'),(436,'저는 글을 읽을 줄은 알지만 쓸 줄은 몰라요.'),(437,'편의점에서 일하고 있습니다.'),(438,'하루에 몇 시간 일해?'),(439,'한국에 처음 왔을 때 서울에서 길을 잃었습니다.'),(440,'많은 사람들이 태풍으로 전 재산을 잃었어요.'),(441,'이모한테 인사해라.'),(442,'우리 신랑이랑 인사한 적 있어?'),(443,'어떤 옷을 입어야 해요?'),(444,'교통사고로 가슴에 상처를 입었어요.'),(445,'길을 잃어버렸어요.'),(446,'여권을 잃어버렸어요.'),(447,'자리에서 일어나 대통령을 맞아 주십시오.'),(448,'무슨 일이 일어난 거야?'),(449,'일어서서 말씀해 주세요.'),(450,'그는 바닥을 짚고 간신히 일어섰다.'),(451,'천천히 몸을 일으켜 보세요.'),(452,'너는 왜 늘상 말썽을 일으키니?'),(453,'수소와 산소가 결합해서 물을 이룬다.'),(454,'저는 작가라는 내 어릴 적 꿈을 이뤘어요.'),(455,'축구에서 한 팀은 열한 명으로 이루어진다.'),(456,'꿈은 이루어진다.'),(457,'사실은 시골로 이사하는 게 싫어.'),(458,'내일 이사하신다고 들었어요.'),(459,'짧은 끈을 이어서 사용합시다.'),(460,'필기시험에 이어 면접이 있겠습니다.'),(461,'리모컨은 침대 위에 있어.'),(462,'음악을 듣고 있습니다.'),(463,'왜 아직 안 자고 깨어 있니?'),(464,'아침에 너무 바빠서 렌즈 끼는 걸 잊었어.'),(465,'저를 잊지 마세요.'),(466,'당신과 더 이상 이야기하고 싶지 않아요.'),(467,'아무한테도 이야기하지 마, 알았지?'),(468,'그 영화는 특수효과를 많이 이용해 만들어졌다.'),(469,'너는 책을 베개로 이용하는구나.'),(470,'왜 늦게까지 안 자고 있니?'),(471,'저는 보통 이십 분 정도 낮잠을 잡니다.'),(472,'모든 일이 잘되기를 빈다.'),(473,'공부 잘되고 있어?'),(474,'그 사람 요리를 잘하는 것 같아.'),(475,'노래를 정말 잘하시네요.'),(476,'네가 뭘 잘못했는지 몰라?'),(477,'저는 잘못한 게 없어요.'),(478,'계산이 잘못된 것 같은데요.'),(479,'만일 일이 잘못되면, 다 네 탓이야.'),(480,'잠들었으면 깨우지 마세요.'),(481,'요즘 잠들기가 힘들어.'),(482,'잠자는 척하는 게 쉬운 일이 아니야.'),(483,'잠잘 시간이야.'),(484,'범인이 누구한테 잡혔어요?'),(485,'경찰에게 잡힌 용의자는 혐의를 부인했다.'),(486,'내 손 잡아.'),(487,'그는 자신이 거의 도둑을 잡을 뻔했다고 말했다.'),(488,'머리가 너무 귀찮아. 너무 빨리 자라.'),(489,'저는 부산에서 자랐어요.'),(490,'그 여자 자기 딸 자랑하는 데에 질렸어.'),(491,'우리 엄마는 내가 네 살 때 한글을 깨쳤다고 자랑했다.'),(492,'머리 잘랐어?'),(493,'다이아몬드가 단단한 물질을 자르는 데 사용된다는 거 알아?'),(494,'그 사람은 집이 없는 사람들에게 먹을 것을 무료로 제공하고 있다.'),(495,'그 후보자는 많은 사람들에게 일자리를 제공하겠다고 약속했다.'),(496,'나는 주로 학교 생활에 관한 것들을 일기에 적는다.'),(497,'성함을 영어로 적어 주세요.'),(498,'누가 낼 건지 가위바위보로 정하자.'),(499,'약속 장소는 어디로 정했어?'),(500,'이 서류들을 알파벳 순으로 정리하세요.'),(501,'방을 정리하는 데 여러 시간이 걸렸습니다.'),(502,'부모님께 안부 전해 주세요.'),(503,'이 책을 그 사람에게 꼭 몰래 전해야 합니다.'),(504,'회사에는 전화했어?'),(505,'나중에 제가 다시 전화할게요.'),(506,'비에 옷이 다 젖으셨네요.'),(507,'젖은 옷을 말리지 않으면 감기에 걸릴지도 몰라.'),(508,'아버지는 내게 인생을 즐기라고 말씀하시곤 했어.'),(509,'저는 맥주를 즐겨 마십니다.'),(510,'올해 들어 범죄가 눈에 띄게 증가했어요.'),(511,'이 제품에 대한 수요가 증가하고 있다.'),(512,'벌써 지친 거야?'),(513,'당신한테 잔소리하는 것도 지쳤어요.'),(514,'그는 여자에게 지는 걸 굉장히 싫어한다.'),(515,'내가 게임에서 지다니 믿을 수가 없어.'),(516,'그는 약속을 잘 지키는 사람이다.'),(517,'많은 청년들이 나라를 지키기 위해 자원입대했다.'),(518,'어머니는 내가 먹는 것을 말없이 지켜보셨다.'),(519,'형사는 용의자를 주의 깊게 지켜보았다.'),(520,'주저하지 말고 모르는 건 선생님께 질문해라.'),(521,'질문하실 분 계신가요?'),(522,'마지막으로 사람을 본 지 삼 년이 지났다.'),(523,'자리에서 졸다가 한 정거장을 지났어요.'),(524,'어떻게 지내니?'),(525,'아내와 저는 행복하게 잘 지내고 있습니다.'),(526,'여름 방학이 눈 깜짝할 사이에 지나갔어.'),(527,'이 버스가 종로를 지나갑니까?'),(528,'모든 것이 잘 진행되고 있어요.'),(529,'그 일은 계획한 대로 진행되고 있습니다.'),(530,'젓가락으로 콩 한 조각 집을 수 있니?'),(531,'제 노트 좀 집어 주시겠어요?'),(532,'사람들은 뱀을 보고는 비명을 지르기 시작했습니다.'),(533,'집에 불이 나지 않는 이상은 고함 지르지 마라.'),(534,'교회를 어디에 지을지는 아직 결정되지 않았습니다.'),(535,'따님 이름은 뭐라고 지었어요?'),(536,'그녀는 억지로 미소를 짓고 있었다.'),(537,'화장은 하는 것보다 지우는 게 훨씬 더 중요하다.'),(538,'누군가가 제 전화기의 메시지를 자꾸 지우는 것 같아요.'),(539,'아버지는 포크로 음식을 찍어 먹는 것을 좋아하지 않으세요.'),(540,'그 나라에 가려면 지문을 찍어야 한다.'),(541,'여기서 사진 찍어도 됩니까?'),(542,'나는 여름을 별로 좋아하지 않아.'),(543,'어느 가수를 제일 좋아하니?'),(544,'자리에 앉아 졸다가 한 정거장을 지나쳤다.'),(545,'실은 줄곧 졸았어요.'),(546,'저는 서울대학교를 졸업했습니다.'),(547,'졸업하고 나서 뭘 하고 싶어?'),(548,'경찰이 사건 현장을 조사하고 있어요.'),(549,'오늘의 과제는 환경오염에 대해 조사하는 겁니다.'),(550,'자동차 조심해.'),(551,'감기 조심하세요.'),(552,'제게 기회를 주셔서 감사합니다.'),(553,'저 대신 운전 좀 해 주세요.'),(554,'그 사람을 왜 죽인 거야?'),(555,'시간 죽이려고 영화 보고 있어요.'),(556,'일본은 독도를 자기 땅이라고 주장하고 있다.'),(557,'그녀는 자신이 죄가 없다고 주장했다.'),(558,'아내가 죽은 지 십 년이 됐어요.'),(559,'왜 이렇게 풀이 죽었어?'),(560,'당신을 위해 뭔가를 준비했어요.'),(561,'저는 매일 엄마가 저녁 준비하시는 걸 도와드려요.'),(562,'스웨터가 줄어들었어.'),(563,'한국의 농촌 인구가 줄어들고 있다.'),(564,'소리 좀 줄여 주실래요?'),(565,'운동은 질병의 위험을 줄이기 위해 필요하다.'),(566,'밧줄을 꽉 쥐어라.'),(567,'그는 흥분하여 두 주먹을 불끈 쥐었다.'),(568,'요즘에는 아이들의 키도 커지고 덩치도 커졌다.'),(569,'홈쇼핑 사업은 점점 커지고 있다.'),(570,'너 이 다음에 커서 뭐가 되고 싶니?'),(571,'저는 시골에서 컸어요.'),(572,'저는 고양이를 열두 마리 키워요.'),(573,'아버지는 혼자서 나와 형을 키우셨다.'),(574,'어제 한밤중에 갑자기 잠에서 깼습니다.'),(575,'술이 깬 다음 얘기하자.'),(576,'실수로 접시를 깼어요.'),(577,'걔는 늘 분위기를 깨.'),(578,'이제서야 제 실수를 깨달았어요.'),(579,'나는 내가 그녀를 많이 사랑한다는 걸 깨달았다.'),(580,'사과 깎을 줄 알아?'),(581,'어제 머리를 깎았어요.'),(582,'조금만 깎아 주세요.'),(583,'그 사람은 자기 지갑을 꺼내려고 차에 갔어요.'),(584,'그는 호주머니에서 반지를 꺼내 내게 청혼했다.'),(585,'담배 껐는지 확인해라.'),(586,'방을 나갈 때에는 불을 꺼라.'),(587,'그는 고개를 끄덕이면서 말했다.'),(588,'어떤 나라에서는 고개를 끄덕이는 것이 부정을 의미합니다.'),(589,'아이가 엄마 소매를 끌었다.'),(590,'그 여배우는 늘 사람들의 시선을 끈다.'),(591,'연설이 시간을 오래 끄니까 사람들이 자리를 뜨기 시작했어요.'),(592,'갑자기 실이 끊어졌다.'),(593,'전화가 끊어졌어요.'),(594,'우리 사이는 끝났어.'),(595,'영화가 끝나 갈 즈음에 잠이 들었다.'),(596,'오늘 일은 다 끝냈어?'),(597,'오늘 안으로 과제를 끝내야 해.'),(598,'수리공이 실수로 선을 끊어 버린 것 같아.'),(599,'술 끊었어요.'),(600,'전화 끊었다 다시 걸게.'),(601,'물을 끓인 후에 라면을 넣으세요.'),(602,'내가 당신을 위해 커피 끓여 놓았어.'),(603,'저는 집 꾸미는 걸 좋아해요.'),(604,'그거 전부 내가 꾸며 낸 거야.'),(605,'사람들은 모두 행복해지기를 꿈꾼다.'),(606,'저는 늘 한국에 다시 오는 걸 꿈꿔 왔어요.'),(607,'너무 더워서 에어컨을 켰어.'),(608,'가스 레인지 좀 켜 봐.'),(609,'소영이는 벌써 일을 마치고 집에 돌아갔어요.'),(610,'일이 마치면 좀 쉬어.'),(611,'겨우 세 개 맞혔어.'),(612,'내가 그 문제 맞히면 뭐 줄 거야?'),(613,'안전벨트를 매세요.'),(614,'우리 회사에서는 넥타이를 매지 않아도 됩니다.'),(615,'싱크대가 막혔어.'),(616,'코가 막혀요.'),(617,'차가 막혀서 늦었습니다.'),(618,'쥐가 들어오지 못하게 구멍을 막아라.'),(619,'우리 가족 누구도 우리 아버지를 막을 수 없다.'),(620,'들어가지 마십시오.'),(621,'회사가 결국 망하고 말았다.'),(622,'나한테 네가 원하는 걸 말해 봐.'),(623,'나는 아내에게 바가지 좀 그만 긁으라고 말했다.'),(624,'원하는 게 뭔지 말씀해 보세요.'),(625,'어머니는 늘 내게 재혼하지 않겠다고 말씀하셨다.'),(626,'어떻게 이렇게 큰 눈사람을 만들었어?'),(627,'그는 늘 여자 친구를 질리게 만든다.'),(628,'머리 좀 그만 만져.'),(629,'만지지 마시오.'),(630,'이 계약에 만족하실 거라고 확신합니다.'),(631,'저는 새 멤버들에게 만족합니다.'),(632,'아내와 영화관 앞에서 만나기로 했습니다.'),(633,'너를 여기서 만나다니 정말 세상 좁구나!'),(634,'그 접착제는 아주 빨리 마르고 한 시간만 지나면 굳는다.'),(635,'그 사람 정말 말랐어.'),(636,'살 집은 마련했어?'),(637,'편하신 때로 자리를 마련하겠습니다.'),(638,'커피를 마시다 입이 헐었다.'),(639,'술을 전혀 못 마셔서 걱정입니다.'),(640,'시험이 끝난 후 친구와 답을 맞춰 보았다.'),(641,'자기 전에 알람 시계를 여섯 시에 맞춰라.'),(642,'귀중품은 카운터에 맡기세요.'),(643,'그 일은 저한테 맡겨 주세요.'),(644,'이거 정말 맞아요?'),(645,'이 옷 너한테 잘 맞을 것 같은데.'),(646,'어렸을 때, 가끔 아버지한테 매를 맞았어요.'),(647,'몇 점 맞았어?'),(648,'휴일을 맞아 대청소를 했어요.'),(649,'손님을 늘 따뜻하게 맞으세요.'),(650,'그녀는 그 일을 맡기를 꺼려했다.'),(651,'일곱 시까지 가방을 맡아 주실 수 있나요?'),(652,'꽃 향기를 맡아 봐.'),(653,'저는 축농증이 있어서 냄새를 잘 못 맡아요.'),(654,'아이들에게 너무 많이 먹이지 마십시오.'),(655,'나는 보통 새벽 세 시에 아기에게 젖을 먹이려고 일어난다.'),(656,'중국 음식을 먹고 싶은데, 넌 어때?'),(657,'약속을 잊어 먹었어요.'),(658,'버스가 횡단보도 앞에서 멈췄다.'),(659,'나는 웃음을 멈출 수가 없었어.'),(660,'어디에 머무르실 건가요?'),(661,'하룻밤 더 머무를 수 있나요?'),(662,'너 미쳤어?'),(663,'너 때문에 미치겠어.'),(664,'책상을 밀고 있는 중이다.'),(665,'뒤에서 밀지 마세요.'),(666,'오늘 할 수 있는 일을 내일로 미루지 마라.'),(667,'책임을 다른 사람에게 미루지 마세요.'),(668,'제 말을 믿으셔도 됩니다.'),(669,'그 녀석을 믿다니 어리석었구나.'),(670,'왜 내가 널 미워하겠니?'),(671,'남편과 저는 서로를 미워해요.'),(672,'그들은 불을 피우기 위해 나무를 모으고 있었다.'),(673,'올해에는 돈을 모으고 싶어요.'),(674,'우리 클럽은 일주일에 두 번 정기적으로 모입니다.'),(675,'시위대가 시청 앞 광장에 모였다.'),(676,'비타민이 모자라면 병에 걸리기 쉽다.'),(677,'거스름돈이 모자란 거 같아요.'),(678,'차를 몰고 오실 건가요?'),(679,'아버지는 스무 살 때부터 버스를 모셨다.'),(680,'저녁마다 아들 녀석이 자기 방에서 뭘 하는지 모르겠어.'),(681,'이 문제에 관해서는 나는 아무것도 몰라.'),(682,'시부모님을 모시고 사세요?'),(683,'손님들을 전철 역까지 모셔 드리세요.'),(684,'저는 노래를 잘 못해요.'),(685,'지금은 배가 아파서 아무것도 먹지 못합니다.'),(686,'내 여자 친구는 아침에 머리를 안 감으면 머리를 묶고 다닌다.'),(687,'테러리스트들은 인질들의 손과 발을 밧줄로 묶었다.'),(688,'어떤 개가 내 다리를 물었어.'),(689,'그는 늘 입에 담배를 물고 일을 합니다.'),(690,'테러로 다리가 무너졌다.'),(691,'하늘이 무너져도 솟아날 구멍이 있다.'),(692,'다음 토요일에 우리 집에 올 수 있나 너한테 물어보려고 전화했어.'),(693,'뭐 하나 물어봐도 돼?'),(694,'내 직장 상사는 내 요구를 무시했다.'),(695,'사람들은 다른 사람이 자신을 무시할 때 화가 나는 법이다.'),(696,'너한테 묻고 싶은 게 있어.'),(697,'그걸 왜 물어?'),(698,'나무에 새싹이 났어요.'),(699,'어제 인도네시아에서 지진이 났다.'),(700,'숙제부터 하고 나서 놀아라.'),(701,'그는 신문에 광고를 냈다.'),(702,'답안지를 내세요.'),(703,'배송료는 누가 낼 겁니까?'),(704,'골키퍼가 슛을 막아 냈어요.'),(705,'그녀가 손을 내밀어 악수를 청했다.'),(706,'창 밖으로 고개를 내밀지 마세요.'),(707,'음식물 쓰레기를 바깥에 내놓아라.'),(708,'이 의자 팔려고 내놓은 건가요?'),(709,'비가 내리기 시작했다.'),(710,'엘리베이터를 타고 오 층에서 내리세요.'),(711,'총을 내려 놓아!'),(712,'이번 주말에 집에 내려갈 거야.'),(713,'최근 물가가 내려갔어요.'),(714,'산을 올라가는 것보다 산을 내려가는 게 더 힘들어요.'),(715,'요즘 고향으로 내려오는 젊은 사람들이 많다.'),(716,'계단을 내려올 때 발 조심하세요.'),(717,'밖에 나가 놀자.'),(718,'왜 어제 모임을 안 나간 거야?'),(719,'잘린 게 아냐. 내가 내 발로 회사에서 나간 거지.'),(720,'새 한 마리가 사무실 건물 위로 날고 있어요.'),(721,'누구나 하늘을 날고 싶은 소망이 있지요.'),(722,'메시지를 남기시겠어요?'),(723,'아내를 미국에 남겨 두고 혼자 한국에 왔습니다.'),(724,'흉터가 남지 않을 거라니 다행이야.'),(725,'바구니 속에 샌드위치가 남아 있다.'),(726,'우리 그 돈을 반으로 나누자.'),(727,'친구와 먹을 것을 나눠 먹어라.'),(728,'주말에는 보통 집 밖으로 나오지 않아요.'),(729,'어느 대학 나오셨어요?'),(730,'공부를 계속하려고 직장을 나왔습니다.'),(731,'어머니의 건강이 점점 나빠지고 있어요.'),(732,'시력이 많이 나빠졌어요.'),(733,'제비들은 여름이 되면 북쪽으로 날아간다.'),(734,'나는 그 파일이 날아가 버렸음을 알았다.'),(735,'회사에 가려고 집을 나섰다.'),(736,'남의 일에 나서지 마라.'),(737,'아내는 어젯밤 사내 아이를 낳았다.'),(738,'우리 농장의 암탉은 매일 알을 두 개씩 낳는다.'),(739,'폭력은 폭력을 낳는 법입니다.'),(740,'그가 파티에 나타나서 깜짝 놀랐다.'),(741,'고양이는 언제나 밥 시간에 딱 맞춰서 나타난다.'),(742,'그는 법정에 모습을 나타내지 않았다.'),(743,'에이치 투 오는 물을 나타내는 기호이다.'),(744,'맥주가 넘쳐요.'),(745,'그들은 자신감이 넘쳤다.'),(746,'이 고개만 넘어가자.'),(747,'다음 장으로 넘어갑시다.'),(748,'내 생각에는 네가 정도를 넘어선 것 같아.'),(749,'참을 수 있는 한계를 넘어섰어요.'),(750,'그녀는 셔틀콕을 네트 위로 넘기는 데 실패했다.'),(751,'페이지를 한 장 넘겨라.'),(752,'벌써 다섯 시가 넘었어.'),(753,'우리는 벌써 예산을 넘었어.'),(754,'강도는 담을 넘어 들어온 게 분명합니다.'),(755,'이 옷은 세탁기에 넣지 마세요.'),(756,'가득 넣어 주십시오.'),(757,'그녀는 팔에 심한 통증을 느꼈다.'),(758,'테니스를 시작하고 나서 건강이 훨씬 좋아지는 것을 느끼고 있습니다.'),(759,'어머니는 나이에 비해 늙어 보이세요.'),(760,'할아버지는 그런 일을 하시기에는 너무 늙으셨어.'),(761,'몸무게가 약간 늘었어요.'),(762,'아내의 요리 솜씨가 점점 늘고 있어요.'),(763,'치마 길이를 조금만 늘리고 싶어요.'),(764,'미국이 수출을 늘리기 위해 많은 압력을 가하고 있어요.'),(765,'새 셔츠가 늘어나서 속상해요.'),(766,'이혼율이 늘어나고 있다.'),(767,'그 녀석은 수업 시간에 늘상 늦는다.'),(768,'왜 이렇게 늦었어?'),(769,'책상 위에 놓여 있던 연필 어디 갔어?'),(770,'그녀의 소식을 들으니 마음이 놓였다.'),(771,'아들 녀석은 인형을 가지고 노는 걸 좋아해요.'),(772,'나는 여자 아이들과 놀 때 마음이 편하다.'),(773,'그의 갑작스러운 청혼에 나는 깜짝 놀랐다.'),(774,'그 소식은 우리를 깜짝 놀라게 했다.'),(775,'도둑을 막으려면 담을 높여야 해.'),(776,'야간에 운전자들은 속도를 높이면 안 된다.'),(777,'나는 춤추는 것보다 노래하는 게 더 좋다.'),(778,'그녀는 밤새 춤추고 노래해도 지치는 법이 없어.'),(779,'정부는 경제 활성화에 노력하고 있습니다.'),(780,'합격을 위해 정말 열심히 노력했어.'),(781,'접시를 식탁 위에 놓아라.'),(782,'손 놓아!'),(783,'창문을 열어 놓으세요.'),(784,'제일 좋아하는 연속극을 놓치고 싶지 않아요.'),(785,'좋은 기회를 놓치지 마라.'),(786,'비행기를 놓칠 뻔했어요.'),(787,'엄마는 침대에 누워 계신다.'),(788,'오른쪽으로 누우세요.'),(789,'외부 전화는 구 번을 누르세요.'),(790,'나는 더 이상 화를 누를 수 없었다.'),(791,'시간 있으면 제 전시회에 오세요.'),(792,'그 사람은 이십 년간 한 회사에서 일해 왔어요.'),(793,'엄마가 내게 돌아오라고 외쳤다.'),(794,'누군가 도와 달라고 외치는 것을 들었다.'),(795,'삼 층까지 계단을 걸어 올라가세요.'),(796,'오늘은 기온이 많이 올라갔다.'),(797,'언제 서울에 올라오셨어요?'),(798,'옥상으로 올라오세요.'),(799,'바지 지퍼를 올리세요.'),(800,'시험 점수를 빨리 올릴 방법이 없을까?'),(801,'게시판에 글 좀 올려.'),(802,'제 짐 좀 방으로 옮겨 주세요.'),(803,'아버지께서 저더러 이 캐비닛을 밖으로 옮기라고 하셨어요.'),(804,'이 산을 오르는 건 결코 쉽지 않아.'),(805,'딸 아이가 이번 시험에서 성적이 많이 올랐어요.'),(806,'빚을 갚으려고 친구한테 오토바이를 팔았다.'),(807,'저희는 물건을 다발로 팔아요.'),(808,'코스모스는 가을에 펴요.'),(809,'벚꽃이 활짝 폈다.'),(810,'격렬한 운동은 피하셔야 합니다.'),(811,'왜 요즘 저를 자꾸 피해요?'),(812,'그가 난로에 불을 피웠다.'),(813,'여기서 담배 피워도 되나요?'),(814,'저는 제게 주어진 일을 절대 쉽게 포기하지 않습니다.'),(815,'포기하기에는 일러.'),(816,'그 요금에 아침 식사가 포함되어 있습니까?'),(817,'통근 수당은 봉급에 포함되어 있습니다.'),(818,'세금을 포함하는 건가요?'),(819,'우리 가족은 저를 포함해서 모두 여섯 명입니다.'),(820,'초대장에서 그 사람 이름을 빼라.'),(821,'십 빼기 팔은 이'),(822,'살을 빼는 제일 좋은 방법이 뭘까요?'),(823,'어떻게 그렇게 혼잡한 곳에서 빠져나갔니?'),(824,'아무도 여기를 빠져나갈 수는 없어.'),(825,'어렸을 때 바다에 빠져 죽을 뻔한 적이 있어요.'),(826,'나 사랑에 빠진 것 같아.'),(827,'요즘 매일 머리가 한 움큼씩 빠져.'),(828,'내 이름이 합격자 명단에서 빠져 있어.'),(829,'내 아들 녀석은 학교를 자주 빠져요.'),(830,'오늘 치과에서 이를 뽑아서 씹을 수가 없어.'),(831,'이 사람들 중에서 다섯 명만 뽑을 거야.'),(832,'음식에 후추 좀 그만 뿌려라.'),(833,'향수만 뿌리면 돼.'),(834,'좌석벨트를 풀어 주십시오'),(835,'이 문제를 못 풀겠어.'),(836,'왼쪽 신발 끈이 풀렸어요.'),(837,'그 문제는 의외로 쉽게 풀렸어.'),(838,'할아버지 이불 펴 드려라.'),(839,'십 쪽을 펴세요.'),(840,'나는 그 애의 책이 책상 위에 펼쳐져 있는 걸 본 적이 없어.'),(841,'부산국제영화제가 시월 이 일부터 시월 팔 일까지 펼쳐질 예정입니다.'),(842,'지하철에서는 신문을 펼치고 봐서는 안 된다.'),(843,'두 팀은 막상막하의 경기를 펼쳤습니다.'),(844,'경상도 남자들은 애정을 잘 표현하지 않아요'),(845,'한국어로 제 생각을 표현하는 게 쉽지 않아요.'),(846,'어디에서 우표를 살 수 있습니까?'),(847,'그는 하루 종일 뭘 먹을지 생각한다.'),(848,'아무리 그 질문에 대해 생각해 봐도 모르겠어요.'),(849,'많은 사람들이 그 아이를 천재라고 생각합니다.'),(850,'그 남자가 범인으로 생각됩니다.'),(851,'아프다고 생각되면 빨리 병원에 가라.'),(852,'좋은 의견이 생각나면 말해 줘.'),(853,'나는 비만 보면 예전 여자 친구가 생각나.'),(854,'회사 건너편에 새로 생긴 커피숍 가 봤니?'),(855,'이 아기는 바비 인형처럼 생겼어요.'),(856,'이 지역에 새 아파트가 생겨나고 있다.'),(857,'이 곰팡이는 어디에서 생겨난 거야?'),(858,'그녀는 길 건너편에 산다.'),(859,'기숙사에서 사는 게 지겨워.'),(860,'누가 절 살려 주셨어요?'),(861,'다음 대통령이 가장 먼저 해야 할 일은 경제를 살리는 것이다.'),(862,'다른 서랍을 살펴봤어?'),(863,'비용 문제를 자세히 살펴봐야 한다.'),(864,'그녀가 다른 남자와 같이 있는 걸 상상할 수가 없어요.'),(865,'가격은 선생님이 상상하시는 것보다 저렴합니다.'),(866,'하루에 수십 개의 언어가 이 땅에서 사라지고 있다.'),(867,'달이 구름 속으로 사라졌다.'),(868,'저는 자유보다 복종을 더 사랑해요.'),(869,'당신을 더 이상 사랑하지 않아.'),(870,'이것은 무언가를 자르는 데 사용된다.'),(871,'이 방은 응접실로 사용될 겁니다.'),(872,'산 지렁이를 미끼로 사용해 봐.'),(873,'쿠폰을 사용해서 돈을 조금 절약할 수 있었다.'),(874,'구석에 서 있지 마세요.'),(875,'서울역 가는 버스가 여기 서요?'),(876,'서두르지 않아도 돼.'),(877,'떠날 채비를 서둘러라.'),(878,'우유랑 버터를 밀가루에 섞으세요.'),(879,'제가 카드 섞어요?'),(880,'나는 의사에게 내 증상을 자세히 설명했다.'),(881,'좀 더 자세히 설명해 주시겠어요?'),(882,'사업에 성공하려면 우선 자신을 돌봐야 한다.'),(883,'그 영화는 상업적으로 크게 성공했다.'),(884,'나는 그녀에게 꽃 한 다발을 선물했다.'),(885,'어머니 생신에 뭐 선물할 거니?'),(886,'직업을 잘 선택하는 것은 중요한 일이다.'),(887,'누구를 선택하시겠어요?'),(888,'사람들을 일렬로 세우는 게 네가 할 일이야.'),(889,'내 꿈은 언젠가 학교를 세우는 거야.'),(890,'차를 세우고 물어봐야겠는걸.'),(891,'요즘 너무 많은 스트레스에 시달리고 있어요.'),(892,'오늘 조카들한테 시달려서 몹시 피곤해.'),(893,'의사 선생님이 운동을 시작하라고 하셨다.'),(894,'영화가 막 시작하려고 합니다.'),(895,'회의가 곧 시작돼요.'),(896,'보통 장마가 언제 시작됩니까?'),(897,'시키는 대로 하는 게 좋을 텐데.'),(898,'오늘 점심은 시켜 먹읍시다.'),(899,'저녁 식사하셨어요?'),(900,'점심 식사하러 나가죠.'),(901,'실례합니다.'),(902,'실례합니다만 먼저 가 봐야 해서요.'),(903,'이 영화는 상을 받았지만, 흥행에는 실패했어.'),(904,'내가 실패할 줄은 몰랐어.'),(905,'누구나 실수할 수 있다.'),(906,'이메일을 보내다가 실수하신 적이 있습니까?'),(907,'나는 아버지를 도와 옥수수를 심겠다고 약속했다.'),(908,'심은 대로 거둔다.'),(909,'스타킹 위에 양말을 신지 그래?'),(910,'신발 신는 것 좀 도와 줘.'),(911,'저는 여자 친구와 쇼핑하는 걸 굉장히 싫어해요.'),(912,'그녀가 나를 싫어하기 때문에 나도 그녀를 싫어한다.'),(913,'그 사람들 지금 트럭에 상자를 싣는 중이라 바빠요.'),(914,'차에 짐 다 실었어?'),(915,'여러분께 제 어머니를 소개합니다.'),(916,'저를 소개하겠습니다.'),(917,'저는 어느 동아리에도 속해 있지 않아요.'),(918,'그녀는 상당한 미인에 속한다.'),(919,'나한테 소리치지 마.'),(920,'우리는 도와 달라고 소리쳤다.'),(921,'포장지에 싸 드릴까요?'),(922,'남은 음식 좀 싸 주시겠어요?'),(923,'모니터 위에 먼지가 잔뜩 쌓였어요.'),(924,'오늘은 정말 스트레스 쌓여.'),(925,'최대한 빨리 여기에 통나무를 쌓아라.'),(926,'좋은 작가가 되려면 폭넓은 경험을 쌓는 것이 중요하다.'),(927,'엄마는 나한테 제발 동생과 그만 싸우라고 소리쳤다.'),(928,'뭐 때문에 싸웠어?'),(929,'파를 썰어서 접시 위에 두어라.'),(930,'치즈 좀 썰어 줄래?'),(931,'첫 장에 이름 쓰는 거 잊지 마세요.'),(932,'저는 이메일보다 편지를 쓰는 걸 더 좋아해요.'),(933,'저는 외출을 할 때 꼭 모자를 씁니다.'),(934,'군인은 비가 와도 우산을 쓸 수 없어요.'),(935,'얼마 동안 쓰실 건가요?'),(936,'돈을 어디에 다 쓴 거야?'),(937,'이 돈은 가난한 사람들을 돕는 데 쓰일 거야.'),(938,'국제회의에서는 흔히 영어가 쓰인다.'),(939,'껌 좀 조용히 씹어.'),(940,'음식을 씹은 다음 삼켜라.'),(941,'손 먼저 씻어라.'),(942,'차가운 물로 발을 씻으면 기분이 상쾌해질 거야.'),(943,'비가 억수같이 쏟아지고 있어요.'),(944,'아내가 이혼을 원한다는 말을 듣자 눈물이 쏟아졌다.'),(945,'내 뒤에 얼른 숨어.'),(946,'그는 산속으로 숨어 버렸다.'),(947,'그녀가 좀 쉬어야 한다고 생각합니다.'),(948,'오늘은 쉬는 날이야.'),(949,'우리는 비행기에 타려고 줄을 섰다.'),(950,'저는 운전할 줄은 아는데 자전거를 탈 줄은 몰라요.'),(951,'뭔가 타고 있는 것 같아요.'),(952,'고기가 다 타서 먹을 수가 없었죠.'),(953,'한국에서는 태어나면 곧바로 한 살이에요.'),(954,'저는 미국에서 태어났지만 한국에서 자랐어요.'),(955,'버스는 이미 승객들을 가득 태우고 있었다.'),(956,'나 좀 태워 줘요.'),(957,'산에서 쓰레기를 태우는 건 아주 위험해요.'),(958,'너는 늘 밥을 태우는구나.'),(959,'여기저기서 폭탄이 터졌다.'),(960,'사람들이 전쟁이 터질 때를 대비해서 물건을 사재기하고 있습니다.'),(961,'개를 보자마자 핸들을 왼쪽으로 틀려고 했지만 이미 늦었다.'),(962,'선풍기 틀어도 괜찮으시겠어요?'),(963,'내 생각엔, 네 답이 틀린 것 같은데.'),(964,'한국어 시험에서 두 문제를 틀렸어.'),(965,'나무는 전기가 안 통해요.'),(966,'시행착오를 통해 배우는 것도 나쁘지 않아.'),(967,'이 부분은 뜻이 안 통하는 것 같은데.'),(968,'엄마는 포도를 따고 계세요.'),(969,'이 캔 좀 따 줘.'),(970,'그 남자는 자기 아이를 때렸다는 이유로 고소를 당했다.'),(971,'선생님이 회초리로 손바닥을 때리셨어.'),(972,'이 길을 따라가세요.'),(973,'토론에서는 그 여자를 따라갈 사람이 없어.'),(974,'저를 따라오십시오.'),(975,'수학이라면 저를 따라올 사람이 없어요.'),(976,'총에서 손을 떼라.'),(977,'나는 그 아름다운 여인에게서 눈을 뗄 수가 없었다.'),(978,'왜 떨고 있어?'),(979,'다리 좀 떨지 마.'),(980,'놀라서 목소리가 떨리기 시작했다.'),(981,'시험 보기 전이면 항상 이렇게 떨려.'),(982,'그 사람 어디로 떠난 거야?'),(983,'좋은 추억을 많이 가지고 한국을 떠나셨으면 좋겠네요.'),(984,'해외여행을 떠나려면 준비할 게 많아.'),(985,'행복했던 시절을 떠올리면 미소가 지어진다.'),(986,'그 사람을 볼 때마다 내 예전 남자 친구를 떠올리게 돼.'),(987,'해는 동쪽에서 떠오른다.'),(988,'좋은 생각이 떠올랐다.'),(989,'말에서 떨어져서 왼팔이 부러졌어요.'),(990,'딸아이가 입학시험에 떨어졌어요.'),(991,'연료가 다 떨어져 가.'),(992,'무언가가 표면에 떠 다닌다.'),(993,'태양은 동쪽에서 떠서 서쪽으로 진다.'),(994,'눈을 뜨고 나를 봐요.'),(995,'아침 일곱 시에 눈을 떴어요.'),(996,'아줌마는 결혼한 여자를 뜻한다.'),(997,'이 문장은 무엇을 뜻합니까?'),(998,'걷지 말고 뛰어!'),(999,'모든 사람들이 출구를 향해 뛰기 시작했다.'),(1000,'그녀는 육상 선수였기 때문에 굉장히 높이 뛸 수 있다.'),(1001,'그의 맥박은 여전히 뛰고 있다.'),(1002,'한글은 십오 세기에 세종대왕에 의해 만들어졌어.'),(1003,'그가 회복된 건 순전히 그 여자의 간호에 의한 거야.'),(1004,'일기예보에 의하면 날씨가 좋을 거래요.'),(1005,'아이엠에프는 뭘 의미합니까?'),(1006,'빨간 불은 위험을 의미해요.'),(1007,'여름철에는 매미가 우는 걸 쉽게 볼 수 있어요.'),(1008,'그는 기뻐서 울고 있다.'),(1009,'우리 형은 어릴 때 걸핏하면 저를 울렸어요.'),(1010,'전화 받아! 전화벨 울리잖아!'),(1011,'고개를 움직여 봐.'),(1012,'팔이 안 움직여.'),(1013,'오늘은 운동하기에 아주 좋은 날씨였다.'),(1014,'저는 매일 운동하러 헬스 클럽에 다녀요.'),(1015,'버스를 운전할 수 있으세요?'),(1016,'비 오는 날 빨리 운전하면 매우 위험하다.'),(1017,'그는 엉뚱한 질문으로 사람들을 곧잘 웃겼다.'),(1018,'그 사람 정말 웃겨.'),(1019,'그는 머리를 뒤로 젖히고 웃었다.'),(1020,'아기가 나를 보고 웃었어.'),(1021,'그들은 도시 전체를 보기 위해 산꼭대기로 올라갔다.'),(1022,'그 사람은 자기 부모를 끔찍이 위해요.'),(1023,'누구나 오래 살길 원한다.'),(1024,'뭘 원해?'),(1025,'나는 새해에는 담배를 끊겠다고 아들 녀석과 약속했다.'),(1026,'시험을 잘 보면 아빠가 새 컴퓨터를 사 주시겠다고 나한테 약속하셨어요.'),(1027,'그는 전국 방방곡곡을 여행했다.'),(1028,'기차를 타고 유럽 전역을 여행했어요.'),(1029,'창문 열어도 될까요?'),(1030,'첨부하신 파일을 못 열겠어요.'),(1031,'두드려라, 그러면 열릴 것이다.'),(1032,'이천이 년 월드컵이 한국과 일본에서 열렸다.'),(1033,'아버지는 한국어를 연구하는 데 평생을 바치셨다.'),(1034,'제 일은 고대 문자에 대해 연구하는 거예요.'),(1035,'내일은 제일 중요한 장면을 연습할 거야.'),(1036,'그 선수가 연습하는 걸 보려고 사람들이 모여 들었어요.'),(1037,'우리 부모님은 저한테 너무 많은 것을 요구하세요.'),(1038,'내가 환불을 요구하자 그들은 영수증을 보여 달라고 했다.'),(1039,'김치찌개 요리하다 손가락을 베었어.'),(1040,'제 아내는 요리하는 걸 좋아해요.'),(1041,'여기에서 가까운 곳에 서점이 있나요?');
/*!40000 ALTER TABLE `script_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tb`
--

DROP TABLE IF EXISTS `user_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tb` (
  `user_code` bigint NOT NULL,
  `nickname` varchar(10) NOT NULL,
  `profile_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `join_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `learn_count` tinyint NOT NULL DEFAULT '3',
  `cover_count` int NOT NULL DEFAULT '10',
  `dub_count` int NOT NULL DEFAULT '10',
  PRIMARY KEY (`user_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tb`
--

LOCK TABLES `user_tb` WRITE;
/*!40000 ALTER TABLE `user_tb` DISABLE KEYS */;
INSERT INTO `user_tb` VALUES (3386778658,'파댕이','/image/24040117097107926619.jpeg','2024-04-01 05:56:58',126,9999,9999),(3389895323,'우사기','/image/240401icon_185400.jpeg','2024-04-01 05:56:48',120,9999,9999),(3394594533,'싸범','/image/240402싸범6533.jpeg','2024-04-01 05:09:46',127,9999,9999),(3395046391,'어떻게지평좌표계로','/image/240402images7800.jpeg','2024-04-01 07:04:34',122,9999,9999),(3409076082,'소정코치','/image/240402c504ce97f611b279f88b30858e19dd0a3185.jpeg','2024-04-02 01:00:53',2,10,10),(3418163560,'경코','/image/240402내얼굴9462.jpeg','2024-04-02 02:59:11',2,10,10),(3419632897,'영코','/image/240403img6994.jpeg','2024-04-03 01:34:58',3,10,10),(3420710971,'따봉카카오','','2024-04-03 13:23:19',3,10,10),(3420931799,'푸 푸루루 푸 푸루','/image/240404푸린6088.jpeg','2024-04-03 17:23:32',2,10,10),(3421381681,'금쪽이_대장','/image/240404adaptive-icon1241.jpeg','2024-04-04 03:34:11',3,30,30),(414622963198404,'손절유정','/image/240402modelImg717.jpeg','2024-04-02 05:07:19',3,10,10),(492104431787904,'따봉민호','/image/240404image566.jpeg','2024-04-01 05:21:48',126,9999,9999),(2597823846497149,'1q2w3e','','2024-04-03 04:51:38',3,10,10),(3033402678355548,'치이카와','/image/240402KakaoTalk_20240402_2223184544670.jpeg','2024-04-01 05:06:30',120,9999,9999),(5323851694825005,'파댕2','/image/240404kcheong321-picture-17045307046239252.jpeg','2024-04-04 03:31:36',3,30,30),(9805341257352021,'황호선 교육프로','/image/240402차은우2963.jpeg','2024-04-02 02:03:31',2,10,10);
/*!40000 ALTER TABLE `user_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_source_tb`
--

DROP TABLE IF EXISTS `video_source_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_source_tb` (
  `video_source_code` int NOT NULL AUTO_INCREMENT,
  `storage_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `source_name` varchar(100) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `thumbnail_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `video_playtime` varchar(200) NOT NULL COMMENT '"O분 O초" 형식으로 저장',
  `source_detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '원본 영상 설명',
  PRIMARY KEY (`video_source_code`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_source_tb`
--

LOCK TABLES `video_source_tb` WRITE;
/*!40000 ALTER TABLE `video_source_tb` DISABLE KEYS */;
INSERT INTO `video_source_tb` VALUES (1,'/dub/source_1/origin/video/video.mp4','짱구와 가족들','2024-03-14 16:59:49','/dub/source_1/origin/thumbnail.jpeg','01:15','짱구 가족 대화 영상'),(2,'/dub/source_2/origin/video/video.mp4','수원 왕갈비 통닭','2024-03-14 16:59:49','/dub/source_2/origin/thumbnail.jpeg','00:42','지금까지 이런 맛은 없었다'),(3,'/dub/source_3/origin/video/video.mp4','어벤져스 인피니티워','2024-03-14 16:59:50','/dub/source_3/origin/thumbnail.jpeg','00:21','어벤져스 가망이 없어'),(4,'/dub/source_4/origin/video/video.mp4','이게 아부지도 없는게 까불어','2024-04-01 02:15:54','/dub/source_4/origin/thumbnail.jpeg','01:02','뭐? 미국이 아니라 하늘나라겠지'),(5,'/dub/source_5/origin/video/video.mp4','느그 서장 남천동 살제?','2024-04-01 02:58:27','/dub/source_5/origin/thumbnail.jpeg','01:02','밥도 묵고, 사우나도 같이 가고, 다 했어!'),(6,'/dub/source_6/origin/video/video.mp4','범죄도시','2024-04-01 03:01:43','/dub/source_6/origin/thumbnail.jpeg','01:17','미치것다'),(7,'/dub/source_7/origin/video/video.mp4','소년시대','2024-04-01 03:03:52','/dub/source_7/origin/thumbnail.jpg','01:46','소년시대 - 임시완, 이선빈 대화'),(8,'/dub/source_8/origin/video/video.mp4','아 더러워','2024-04-01 03:19:42','/dub/source_8/origin/thumbnail.jpeg','00:20','아 더러워'),(9,'/dub/source_9/origin/video/video.mp4','우영우','2024-04-01 03:19:42','/dub/source_9/origin/thumbnail.jpeg','00:38','우 투더 영 투더 우'),(10,'/dub/source_10/origin/video/video.mp4','짱구와 원장선생님','2024-04-01 03:19:43','/dub/source_10/origin/thumbnail.jpeg','00:29','혹시 사람을 한강에 빠트려 보신 적 있어요?'),(11,'/dub/source_11/origin/video/video.mp4','범죄와의 전쟁','2024-04-01 08:02:20','/dub/source_11/origin/thumbnail.jpeg','02:19','최민식과 조진웅의 대화'),(12,'/dub/source_12/origin/video/video.mp4','카카시','2024-04-01 08:02:20','/dub/source_12/origin/thumbnail.jpeg','00:18','나와 비슷하거나, 그 이상이다'),(13,'/dub/source_13/origin/video/video.mp4','명탐정 코난','2024-04-01 08:02:20','/dub/source_13/origin/thumbnail.jpeg','00:26','변태 코난'),(14,'/dub/source_14/origin/video/video.mp4','여러분','2024-04-01 08:02:20','/dub/source_14/origin/thumbnail.jpeg','01:00','너무 보고 싶었어요'),(15,'/dub/source_15/origin/video/video.mp4','호박고구마','2024-04-01 08:02:20','/dub/source_15/origin/thumbnail.jpeg','01:26','호구마'),(16,'/dub/source_16/origin/video/video.mp4','호의가 계속되면은','2024-04-01 08:02:20','/dub/source_16/origin/thumbnail.jpeg','00:12','그게 둘리인 줄 알아요');
/*!40000 ALTER TABLE `video_source_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voice_model_tb`
--

DROP TABLE IF EXISTS `voice_model_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voice_model_tb` (
  `model_code` int NOT NULL AUTO_INCREMENT,
  `user_code` bigint DEFAULT NULL,
  `video_source_code` int DEFAULT NULL,
  `model_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `state` tinyint DEFAULT '0',
  `record_count` int NOT NULL DEFAULT '0',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`model_code`),
  KEY `fk_voice_model_tb_user_tb1_idx` (`user_code`),
  KEY `fk_voice_model_tb_video_source_tb1_idx` (`video_source_code`),
  KEY `voice_model_tb_model_name_IDX` (`model_name`) USING BTREE,
  CONSTRAINT `fk_voice_model_tb_user_tb1` FOREIGN KEY (`user_code`) REFERENCES `user_tb` (`user_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_voice_model_tb_video_source_tb1` FOREIGN KEY (`video_source_code`) REFERENCES `video_source_tb` (`video_source_code`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voice_model_tb`
--

LOCK TABLES `voice_model_tb` WRITE;
/*!40000 ALTER TABLE `voice_model_tb` DISABLE KEYS */;
INSERT INTO `voice_model_tb` VALUES (1,NULL,NULL,'관리자(정민)',NULL,3,0,'2024-04-01 05:03:35'),(2,NULL,5,'최민식',NULL,3,0,'2024-04-01 08:25:01'),(4,NULL,NULL,'기본 모델(고세구)','',3,0,'2024-03-14 17:04:22'),(5,3389895323,NULL,'기본 모델(스폰지밥)','',0,0,'2024-03-14 17:04:40'),(6,3389895323,NULL,'기본 모델(징징이)','',0,0,'2024-03-14 17:11:36'),(7,NULL,NULL,'기본 모델(베네딕트 컴버배치)',NULL,3,0,'2024-04-02 05:01:07'),(8,NULL,NULL,'기본 모델(태양)',NULL,3,0,'2024-04-01 08:29:37'),(9,NULL,NULL,'기본 모델(우영우)','/image/24040253_16587883726085_202207255033422982.jpeg',3,0,'2024-04-02 05:00:43'),(10,NULL,NULL,'기본 모델(짱구)',NULL,3,0,'2024-04-01 07:27:43'),(16,NULL,10,'짱구',NULL,3,0,'2024-04-01 07:22:02'),(19,NULL,NULL,'관리자(윤희)',NULL,3,0,'2024-03-29 06:07:24'),(21,NULL,NULL,'관리자(유정)',NULL,3,0,'2024-03-28 02:18:02'),(22,NULL,NULL,'관리자(민호)',NULL,3,0,'2024-03-28 02:18:02'),(48,NULL,11,'최민식',NULL,3,0,'2024-03-29 03:18:03'),(49,NULL,NULL,'기본 모델(도라에몽)',NULL,3,0,'2024-03-29 03:19:33'),(50,NULL,8,'비실이',NULL,3,0,'2024-03-29 03:19:33'),(51,NULL,1,'짱구',NULL,3,0,'2024-03-29 03:19:33'),(53,NULL,16,'류승범',NULL,3,0,'2024-03-29 03:44:23'),(54,NULL,NULL,'관리자(강주원(노래))',NULL,3,0,'2024-03-29 04:53:40'),(56,NULL,NULL,'관리자(박민호)',NULL,3,0,'2024-03-29 05:23:59'),(57,NULL,1,'신형만',NULL,3,0,'2024-03-29 05:47:28'),(60,NULL,2,'류승룡',NULL,3,0,'2024-03-29 07:25:01'),(61,NULL,1,'봉미선',NULL,3,0,'2024-03-29 07:25:01'),(62,NULL,10,'원장선생님',NULL,3,0,'2024-03-29 07:58:34'),(63,NULL,10,'훈이',NULL,3,0,'2024-03-29 08:25:28'),(64,NULL,11,'조진웅',NULL,3,0,'2024-03-29 08:53:04'),(90,NULL,NULL,'관리자(강주원(300 문장))',NULL,3,0,'2024-04-01 05:05:54'),(96,492104431787904,NULL,'박다민',NULL,3,0,'2024-04-01 05:19:07'),(97,NULL,3,'로버트 다우니 주니어',NULL,3,0,'2024-04-01 05:19:07'),(98,NULL,3,'베네딕트 컴버배치',NULL,3,0,'2024-04-01 05:19:07'),(99,NULL,4,'희선이',NULL,3,0,'2024-04-01 05:19:07'),(100,NULL,4,'기철이',NULL,3,0,'2024-04-01 05:19:07'),(101,NULL,2,'이하늬',NULL,3,0,'2024-04-01 05:19:07'),(102,NULL,2,'진선규',NULL,3,0,'2024-04-01 05:19:07'),(103,NULL,12,'카카시',NULL,3,0,'2024-04-01 05:19:07'),(104,NULL,8,'노진구',NULL,3,0,'2024-04-01 05:19:07'),(105,NULL,8,'퉁퉁이',NULL,3,0,'2024-04-01 05:19:07'),(106,NULL,8,'이슬이',NULL,3,0,'2024-04-01 05:19:07'),(107,NULL,6,'장이수',NULL,3,0,'2024-04-01 05:19:07'),(108,NULL,14,'태양',NULL,3,0,'2024-04-01 05:19:07'),(109,NULL,NULL,'기본 모델(아이유)',NULL,3,0,'2024-04-01 05:19:07'),(110,NULL,NULL,'관리자(준형)',NULL,3,0,'2024-04-01 06:32:16'),(115,NULL,9,'동그라미','/image/news-p.v1.20230103.57e4a47aa3c0466683b8c154d39e7c81.jpg',3,0,'2024-04-02 01:16:00'),(117,NULL,9,'생명과학 선생님','/image/240402화면 캡처 2024-04-02 1018135999.jpeg',3,0,'2024-04-02 01:18:28'),(118,3033402678355548,NULL,'접영환','',3,0,'2024-04-02 02:28:49'),(119,3409076082,NULL,'소정','/image/240402c504ce97f611b279f88b30858e19dd0a358.jpeg',3,200,'2024-04-02 02:58:42'),(120,NULL,13,'남도일','/image/240402남도일147.jpeg',3,0,'2024-04-02 02:59:02'),(122,3418163560,NULL,'소정코치 목소리','/image/240402물고기38475.jpeg',3,200,'2024-04-02 03:03:01'),(123,NULL,9,'우영우','/image/24040253_16587883726085_202207255033422982.jpeg',3,0,'2024-04-02 03:41:42'),(124,NULL,NULL,'기본 모델(황호선)','',3,200,'2024-04-02 04:06:51'),(125,NULL,13,'홍장미',NULL,3,0,'2024-04-02 04:56:25'),(126,NULL,7,'임시완','',3,0,'2024-04-02 05:39:00'),(127,3395046391,NULL,'배준형','',3,1,'2024-04-02 05:52:53'),(131,NULL,NULL,'기본 모델(이누야샤)','',3,0,'2024-04-02 08:18:36'),(135,NULL,7,'이선빈','',3,0,'2024-04-02 13:04:14'),(137,492104431787904,NULL,'따봉테스트','/image/240402썸네일164.jpeg',3,200,'2024-04-02 13:39:11'),(138,NULL,6,'마동석',NULL,3,0,'2024-04-02 14:10:19'),(139,NULL,13,'코난',NULL,3,0,'2024-04-02 14:12:17'),(140,3386778658,NULL,'정몬','/image/240402384085599_155740090938237_1954698368243646494_n5316.jpeg',0,0,'2024-04-02 14:31:30'),(141,3395046391,NULL,'준형(200문장)','',3,200,'2024-04-02 14:48:21'),(159,NULL,15,'나문희','',3,0,'2024-04-03 08:06:28'),(160,NULL,NULL,'기본 모델(박효신)','/image/240403박효신 프사5245.jpeg',3,0,'2024-04-03 08:11:54'),(164,NULL,NULL,'기본 모델(최민식)',NULL,3,0,'2024-04-03 08:20:22'),(165,NULL,15,'박해미','',3,0,'2024-04-03 12:50:47'),(169,NULL,NULL,'기본 모델(나얼)','/image/240403나얼7715.jpeg',3,0,'2024-04-03 14:54:03'),(171,NULL,NULL,'기본 모델(인간극장 성우)','',3,0,'2024-04-03 15:30:56'),(172,3420931799,NULL,'푸루루푸루','/image/240404푸린1681.jpeg',3,200,'2024-04-03 17:25:19'),(173,492104431787904,NULL,'테스트11','',0,0,'2024-04-04 01:30:24'),(175,3421381681,NULL,'최고도훈','/image/240404adaptive-icon302.jpeg',0,10,'2024-04-04 03:34:59'),(176,3421381681,NULL,'최도훈','/image/240404adaptive-icon1252.jpeg',0,47,'2024-04-04 03:39:46');
/*!40000 ALTER TABLE `voice_model_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voice_source_tb`
--

DROP TABLE IF EXISTS `voice_source_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voice_source_tb` (
  `voice_source_code` int NOT NULL AUTO_INCREMENT,
  `video_source_code` int NOT NULL,
  `model_code` int NOT NULL,
  `voice_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `voice_index` int DEFAULT NULL,
  PRIMARY KEY (`voice_source_code`),
  KEY `fk_voice_source_tb_video_source_tb1_idx` (`video_source_code`),
  KEY `fk_voice_source_tb_voice_model_tb1_idx` (`model_code`),
  CONSTRAINT `fk_voice_source_tb_video_source_tb1` FOREIGN KEY (`video_source_code`) REFERENCES `video_source_tb` (`video_source_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_voice_source_tb_voice_model_tb1` FOREIGN KEY (`model_code`) REFERENCES `voice_model_tb` (`model_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voice_source_tb`
--

LOCK TABLES `voice_source_tb` WRITE;
/*!40000 ALTER TABLE `voice_source_tb` DISABLE KEYS */;
INSERT INTO `voice_source_tb` VALUES (17,1,10,'/dub/source_1/origin/audio/1.wav',1),(18,1,61,'/dub/source_1/origin/audio/2.wav',2),(19,1,57,'/dub/source_1/origin/audio/3.wav',3),(20,2,102,'/dub/source_2/origin/audio/1.wav',1),(21,2,101,'/dub/source_2/origin/audio/2.wav',2),(22,2,60,'/dub/source_2/origin/audio/3.wav',3),(23,3,97,'/dub/source_3/origin/audio/1.wav',1),(24,3,7,'/dub/source_3/origin/audio/2.wav',2),(25,4,100,'/dub/source_4/origin/audio/1.wav',1),(26,5,2,'/dub/source_5/origin/audio/1.wav',1),(28,6,138,'/dub/source_6/origin/audio/1.wav',1),(29,6,107,'/dub/source_6/origin/audio/2.wav',2),(30,7,126,'/dub/source_7/origin/audio/1.wav',1),(31,7,135,'/dub/source_7/origin/audio/2.wav',2),(32,8,106,'/dub/source_8/origin/audio/1.wav',1),(33,4,99,'/dub/source_4/origin/audio/2.wav',2),(34,8,104,'/dub/source_8/origin/audio/2.wav',2),(35,8,105,'/dub/source_8/origin/audio/3.wav',3),(36,8,50,'/dub/source_8/origin/audio/4.wav',4),(37,9,115,'/dub/source_9/origin/audio/1.wav',1),(38,9,123,'/dub/source_9/origin/audio/2.wav',2),(39,9,117,'/dub/source_9/origin/audio/3.wav',3),(40,10,62,'/dub/source_10/origin/audio/1.wav',1),(41,10,16,'/dub/source_10/origin/audio/2.wav',2),(42,10,63,'/dub/source_10/origin/audio/3.wav',3),(43,11,48,'/dub/source_11/origin/audio/1.wav',1),(44,11,64,'/dub/source_11/origin/audio/2.wav',2),(45,12,103,'/dub/source_12/origin/audio/1.wav',1),(46,13,120,'/dub/source_13/origin/audio/1.wav',1),(47,13,125,'/dub/source_13/origin/audio/2.wav',2),(48,13,139,'/dub/source_13/origin/audio/3.wav',3),(49,14,8,'/dub/source_14/origin/audio/1.wav',1),(59,15,159,'/dub/source_15/origin/audio/1.wav',1),(60,15,165,'/dub/source_15/origin/audio/2.wav',2),(62,16,53,'/dub/source_16/origin/audio/1.wav',1);
/*!40000 ALTER TABLE `voice_source_tb` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04 13:55:57
