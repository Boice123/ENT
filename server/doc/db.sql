#--数据库建表语句
CREATE DATABASE IF NOT EXISTS `ent` DEFAULT CHARACTER SET utf8;
use ent;
grant all PRIVILEGES on ent.* to 'ent'@'localhost' identified by '12345678';
flush privileges;
set names utf8;

DROP TABLE IF EXISTS `user`;
create table user(
  id int(11) AUTO_INCREMENT comment '自增id',
  tel varchar(14) not null comment '手机号',
  password varchar(60)  not null comment '密码',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '用户表';

INSERT INTO `user`  VALUES ( 1, '18816793978', 'www');
INSERT INTO `user`  VALUES ( 2, '18816799999', 'wxz');

DROP TABLE IF EXISTS `admins`;
create table admins(
  id int(11) AUTO_INCREMENT comment '自增id',
  adminname varchar(14) not null comment '管理员账号',
  password varchar(60)  not null comment '管理员密码',
  addtime datetime not null comment '添加时间',
  lasttime datetime not null comment '最后登录时间',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '管理员表';

INSERT INTO `admins`  VALUES ( 1, 'admin', 'admin');

DROP TABLE IF EXISTS `setting`;
create table setting(
  id int(11) AUTO_INCREMENT comment '自增id',
  type varchar(20) not null comment '类型,学科subject,年级grade,学期semester',
  value varchar(50) not null comment '值',
  label varchar(50) not null comment 'label',
  primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '设置表';

insert into setting values(1,'subject','数学','数学');
insert into setting values(2,'subject','语文','语文');
insert into setting values(3,'subject','英语','英语');
insert into setting values(4,'subject','化学','化学');
insert into setting values(5,'subject','物理','物理');

insert into setting values(6,'grade','大一','大一');
insert into setting values(7,'grade','大二','大二');
insert into setting values(8,'grade','大三','大三');
insert into setting values(9,'grade','大四','大四');

insert into setting values(10,'semester','春学期','春学期');
insert into setting values(11,'semester','夏学期','夏学期');
insert into setting values(12,'semester','秋学期','秋学期');
insert into setting values(13,'semester','冬学期','冬学期');

DROP TABLE IF EXISTS `video`;
create table video(
  id int(11) AUTO_INCREMENT comment '自增id',
  adminid int(11) not null comment '管理员id',
  title varchar(100) not null comment '视频标题',
  video varchar(100) not null comment '视频地址',
  intro TEXT not null comment '简介',
  type VARCHAR(20) not null comment '视频类型',
  subject VARCHAR(20) not null comment '学科',
  grade VARCHAR(20) not null comment '年级',
  semester VARCHAR(20) not null comment '学期',
  play_num INT(11) not null comment '播放数',
  status TINYINT(2) not null comment '视频状态:0:待审核 1:审核通过 2:审核不通过',
  create_time DATETIME not null comment '创建时间',
  primary key (`id`),
  KEY `idx_adminid` (`adminid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '视频表';