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
## 3. 데이터 삭제하기
~~~sql
DELETE FROM users WHERE id=2;	/* id=2 삭제*/
DELETE FROM users WHERE id>2000;	/* id > 2000 삭제*/
/* id > 2000 이고 username에서 (%는 와일드카드), username like '%길동%' => 길동 앞에 무엇이든 와도 되고, 길동 뒤에 무엇이든 와도 됨. */
DELETE FROM users WHERE id>2000 AND username like '%길동%';
DELETE FROM users WHERE username='홍길동';
~~~