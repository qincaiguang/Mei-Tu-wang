/*
SQLyog Ultimate v11.25 (64 bit)
MySQL - 10.1.28-MariaDB 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `login` (
	`id` int (16),
	`username` varchar (96),
	`password` varchar (192),
	`member_id` int (11)
); 
insert into `login` (`id`, `username`, `password`, `member_id`) values('1','666666','a666666','0');
insert into `login` (`id`, `username`, `password`, `member_id`) values('2','2333','25d55ad283aa400af464c76d713c07ad','0');
insert into `login` (`id`, `username`, `password`, `member_id`) values('3','23334','25d55ad283aa400af464c76d713c07ad','0');
insert into `login` (`id`, `username`, `password`, `member_id`) values('4','2334','25d55ad283aa400af464c76d713c07ad','0');
insert into `login` (`id`, `username`, `password`, `member_id`) values('5','123456','25d55ad283aa400af464c76d713c07ad','0');
insert into `login` (`id`, `username`, `password`, `member_id`) values('6','1234567','25d55ad283aa400af464c76d713c07ad','0');
insert into `login` (`id`, `username`, `password`, `member_id`) values('7','12345678','25d55ad283aa400af464c76d713c07ad','1');
insert into `login` (`id`, `username`, `password`, `member_id`) values('8','1234567890','e10adc3949ba59abbe56e057f20f883e','0');
insert into `login` (`id`, `username`, `password`, `member_id`) values('9','12345679','25d55ad283aa400af464c76d713c07ad','0');
insert into `login` (`id`, `username`, `password`, `member_id`) values('10','123321','25d55ad283aa400af464c76d713c07ad','1');
