# food_shop_BE

Query sql


=====================================================


USE food_shop;

CREATE TABLE sub_food(
	sub_id INT PRIMARY KEY auto_increment,
	sub_name VARCHAR(20) NOT NULL,
	sub_price FLOAT NOT NULL
);

CREATE TABLE food(
	food_id INT PRIMARY KEY auto_increment,
	food_name VARCHAR(20) NOT NULL,
	price FLOAT NOT NULL,
	image VARCHAR(150) NOT NULL,
	descb VARCHAR(100) NOT NULL
);

ALTER TABLE sub_food
MODIFY COLUMN food_id INT NOT NULL;

ALTER TABLE sub_food
ADD FOREIGN KEY (food_id) REFERENCES food(food_id);

CREATE TABLE food_type(
	type_id INT PRIMARY KEY auto_increment,
	type_name VARCHAR(20) NOT NULL
);

ALTER TABLE food
ADD COLUMN type_id INT NOT NULL,
ADD FOREIGN KEY (type_id) REFERENCES food_type(type_id);

CREATE TABLE users(
	user_id INT PRIMARY KEY auto_increment,
	full_name VARCHAR(20) NOT NULL,
	email VARCHAR(20) NOT NULL,
	password VARCHAR(20) NOT NULL
);

CREATE TABLE orders(
	user_id INT NOT NULL,
	food_id INT NOT NULL,
	amount INT NOT NULL,
	code VARCHAR(20) NOT NULL,
	arr_sub_id VARCHAR(20) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (food_id) REFERENCES food(food_id)
);

CREATE TABLE restaurants(
	res_id INT PRIMARY KEY auto_increment,
	res_name VARCHAR(20) NOT NULL,
	image VARCHAR(150) NOT NULL,
	descb VARCHAR(100) NOT NULL
);

CREATE TABLE like_res(
	res_id INT NOT NULL,
	user_id INT NOT NULL,
	date_like DATETIME NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (res_id) REFERENCES restaurants(res_id)
);

CREATE TABLE rate_res(
	res_id INT NOT NULL,
	user_id INT NOT NULL,
	amount INT NOT NULL,
	date_rate DATETIME NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (res_id) REFERENCES restaurants(res_id)
);

--add data-----------------------------------------------------------
INSERT INTO users(full_name,email,password ) 
VALUES 
	('ngo duc','ngoduc202@gmail.com','123456'),
	('ngo phuc','ngophuccc2@gmail.com','12345678'),
	('ngo tam thu','tytytc202@gmail.com','12366');
INSERT INTO users(full_name,email,password ) 
VALUES 
	('thanh duc','thanhgg4@gmail.com','123456'),
	('tien thu','thu44@gmail.com','167822'),
	('nguyen tran','trt67c202@gmail.com','23451111'),
	('tran quang','quang23@gmail.com','123456'),
	('dang khanh','khanh34@gmail.com','167822'),
	('lien quan','lien4rt@gmail.com','23451111'),
	('lien doi tam','tam56y@gmail.com','4756785436');

INSERT INTO food_type(type_name)
VALUES 
	('trang mieng'),
	('thuc an nhanh'),
	('do uong'),
	('an tai quan');
	
ALTER TABLE food
modify COLUMN food_name VARCHAR(50) NOT NULL;

INSERT INTO food(food_name,price,image,descb,type_id)
VALUES
	('Thach rau cau long hai',2.5,'https://tse3.mm.bing.net/th?id=OIP.qX1LPx8oPB5FKkxD4I17bQHaE8&pid=Api&P=0&h=180','Good for kids',1),
	('Trai cay theo mua',3.5,'https://tse2.mm.bing.net/th?id=OIP.3mFRvisQhFclVOlU08JxQgHaEo&pid=Api&P=0&h=180','Good for health',1),
	('Hamburger',8.8,'https://tse3.mm.bing.net/th?id=OIP.W5A88VvmwibfNW2EqDynwwHaE0&pid=Api&P=0&h=180','Bad for weight',2),
	('Chicken fried',8.5,'https://tse1.mm.bing.net/th?id=OIP.QLfc9a8KTkUujA7-1bku0AHaFj&pid=Api&P=0&h=180','Bad for health',2),
	('Coca-cola',3.8,'https://tse1.mm.bing.net/th?id=OIP.wN9vH342re1u9ahAMLE5IQHaE8&pid=Api&P=0&h=180','Light up your energy',3),
	('Pepsi',3.8,'https://content.etilize.com/Original/1029886380.jpg','Light up your Coca',3),
	('Pho bo',10.2,'https://tse2.mm.bing.net/th?id=OIP.T8LUh8uZocIeIdu76agVpQHaFj&pid=Api&P=0&h=180','Pho bo is good',4),
	('Com tam',10.1,'https://tse4.mm.bing.net/th?id=OIP.tesz2qv1uy0dD_M4dbBFAwHaFj&pid=Api&P=0&h=180','Com tam is delicious',4);

INSERT INTO sub_food(sub_name,sub_price,food_id)
VALUES 
	('Quay an kem',1.2,7),
	('Nuoc mam chua ngot',1.5,8),
	('Muoi tieu',1.2,3),
	('Tuong ca, tuong ot',2.4,4),
	('duong hoa hoc',1,1),
	('Muoi tay ninh',1.2,2),
	('Nuoc suoi',4.8,5),
	('Nuoc suoi',4.8,6),
	('Nuoc suoi',4.8,8);
	
INSERT INTO orders(user_id,food_id,amount,code,arr_sub_id)
VALUES 
	(1,6,5,'ABC','unknoW'),
	(2,5,2,'XYZ','unknoW'),
	(2,8,3,'AGC','unknoW'),
	(3,3,1,'PBC','unknoW'),
	(3,5,1,'OBC','unknoW'),
	(4,7,2,'PPC','unknoW'),
	(5,4,1,'KBC','unknoW'),
	(5,2,5,'ABT','unknoW'),
	(6,4,5,'IIC','unknoW'),
	(7,2,5,'OOP','unknoW'),
	(7,8,2,'KKJ','unknoW'),
	(8,4,2,'CSS','unknoW');

INSERT INTO restaurants(res_name,image,descb)
VALUES 
	('ICON restaurant','https://tse3.mm.bing.net/th?id=OIP.QH8mRr_-imPb_TnN7g-MvgHaFW&pid=Api&P=0&h=180','Winebar and restaurant'),
	('Luisville restaurant','https://www.bizquartz.com/public/images/inventory/well-known-profitable-restaurant-for-sale.png','Restaurant and louge'),
	('i dont know','https://tse2.mm.bing.net/th?id=OIP.sJrwCQgJoDslzDADi2kZOwHaDR&pid=Api&P=0&h=180','Chinese restaurant'),
	('Stanislaw','https://thumbs.dreamstime.com/b/poland-krakow-january-szeroka-street-night-kazimierz-prewar-views-now-well-known-restaurant-polakowski-82862692.jpg','Sklep spozywczy');
	
INSERT INTO like_res(res_id,user_id,date_like)
VALUES
	(2,2,'2022-05-02 01:01:01'),
	(1,3,'2022-04-12 01:01:01'),
	(2,5,'2022-03-16 01:01:01'),
	(2,6,'2022-04-02 01:01:01'),
	(4,7,'2022-05-17 01:01:01'),
	(3,8,'2022-02-02 01:01:01'),
	(4,1,'2022-05-12 01:01:01');

INSERT INTO rate_res(res_id,user_id,date_rate,amount)
VALUES
	(2,2,'2022-05-02 01:01:01',2),
	(1,3,'2022-04-12 01:01:01',3),
	(2,5,'2022-03-16 01:01:01',4),
	(2,6,'2022-04-02 01:01:01',1),
	(4,7,'2022-05-17 01:01:01',2),
	(3,8,'2022-02-02 01:01:01',6),
	(4,1,'2022-05-12 01:01:01',2);

INSERT INTO users(full_name,email,password ) 
VALUES 
	('vo danh','danh554@gmail.com','232345');
	
INSERT INTO like_res(res_id,user_id,date_like)
VALUES
	(3,2,'2022-04-02 01:01:01'),
	(3,5,'2022-02-02 01:01:01'),
	(4,5,'2022-09-02 01:01:01');
	
UPDATE like_res
SET res_id = 4
WHERE res_id = 3 && user_id = 2;
--query------------------------------------------------

--Tìm 2 nhà hàng có lượt like nhiều nhất.--
SELECT restaurants.res_name, count(like_res.res_id) as count_like FROM like_res
LEFT JOIN restaurants 
ON like_res.res_id = restaurants.res_id
GROUP BY like_res.res_id
ORDER BY count_like DESC
LIMIT 2;

--Tìm người đã đặt hàng nhiều nhất.--
SELECT users.full_name, sum(amount) as total_order FROM orders
LEFT JOIN users
on orders.user_id = users.user_id
GROUP BY orders.user_id
ORDER BY total_order DESC
limit 1;

--Tìm người dùng không hoạt động trong hệ thống.--
SELECT full_name as unactive FROM users
LEFT JOIN orders
on users.user_id = orders.user_id
LEFT JOIN rate_res
on users.user_id = rate_res.user_id
LEFT JOIN like_res
on users.user_id = like_res.user_id
WHERE orders.code is null && like_res.date_like is null && rate_res.date_rate is null;

--Tính trung bình sub_food của một food.--
SELECT count(DISTINCT(food.food_name))/count(DISTINCT(sub_food.sub_name)) as Avg FROM sub_food
LEFT JOIN food 
ON sub_food.food_id = food.food_id;


--Tìm 5 người đã like nhà hàng nhiều nhất--
SELECT users.full_name as top5, COUNT(users.user_id) as count FROM like_res
LEFT JOIN users
on users.user_id = like_res.user_id
GROUP BY like_res.user_id
ORDER BY count DESC
LIMIT 5;




