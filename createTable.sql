show databases;

create table if not exists users (
  nickname varchar(100),
  gender int(1)
)

insert into users (nickname, gender) values ('zhangsan', 1), ('lisi', 2)

SELECT * FROM `myWeb`.`users` LIMIT 1000;
