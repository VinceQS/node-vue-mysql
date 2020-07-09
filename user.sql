/*
Navicat MySQL Data Transfer

Source Server         : node
Source Server Version : 80016
Source Host           : localhost:3306
Source Database       : user

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2020-07-09 17:48:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `id` int(12) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `manager` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES ('1', '硕丰控股', '广东省广州市白云区', '张三丰', '13366668888');
INSERT INTO `company` VALUES ('2', '星星科技', '山东省临沂市普陀区', '王老五', '15088886668');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `age` int(3) NOT NULL,
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '张三', 'zhangsan', '123456', '男', '25', '土库曼斯坦', '2020-07-07 13:37:32', '东大街23号');
INSERT INTO `user` VALUES ('2', '李四', 'lisi', '123456', '', '31', '尼泊尔', '2020-07-09 15:48:38', '西大街12号a');
INSERT INTO `user` VALUES ('6', '阿三', '', '', '', '23', '印度', '2019-08-29 14:37:39', '南大街9号');
INSERT INTO `user` VALUES ('7', '23ds', '', '', '男', '2', '瑞士', '2019-08-29 14:37:45', '北大街12号');
INSERT INTO `user` VALUES ('8', 'fdg', '', '', '', '34', '芬兰', '2019-08-29 14:38:10', '胡桃里2巷');
INSERT INTO `user` VALUES ('9', '舟舟', '', '', '女', '233', '澳大利亚', '2019-08-29 14:38:18', '胡桃外3号');
INSERT INTO `user` VALUES ('10', '丽芝士', '', '', '女', '3', '印度尼西亚', '2019-08-29 10:38:48', null);
INSERT INTO `user` VALUES ('11', '第三方', '', '', '', '3', '阿联酋', '2019-08-29 10:39:38', null);
INSERT INTO `user` VALUES ('12', '的算法䦹', '', '', '', '3', '土耳其', '2019-08-29 10:39:44', null);
INSERT INTO `user` VALUES ('14', '张画画', '', '', '', '45', '厄尔瓜斯', '2019-08-29 10:39:04', null);
INSERT INTO `user` VALUES ('15', '张秋丘', '', '', '', '34', '津巴布韦', '2019-08-29 10:39:12', null);
INSERT INTO `user` VALUES ('16', '李丽丽', '', '', '女', '34', '匈牙利', '2019-08-29 10:39:23', null);
INSERT INTO `user` VALUES ('17', '李丽珍', '', '', '', '34', '冰岛', '2019-08-29 10:39:33', null);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(12) NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `country` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', '13325646632', 'American', 'jiujinshan');
INSERT INTO `user_info` VALUES ('2', '15525657788', 'China', 'shenzhen');
