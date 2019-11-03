# SQL(Structure Query Language) 문
## 1. 데이터 삽입
~~~sql
INSERT INTO users (username, age, wdate) VALUES ("홍길동", 28, "2019-11-03 10:20:25");
INSERT INTO users SET username="홍길만", age=25, wdate="2019-11-03 10:24:25";
~~~
## 2. 데이터 가져오기
~~~sql
/* SELECT (필드명, 필드명) FROM (테이블명); */
SELECT id, username, age, wdate FROM users; 
SELECT username, age FROM users; 
SELECT * FROM users; 
SELECT * FROM users ORDER BY id ASC; 
SELECT * FROM users ORDER BY id DESC; 
~~~