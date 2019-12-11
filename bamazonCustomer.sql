DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;
 CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price decimal (10, 2),
  stock_quantity decimal(10, 2),
  PRIMARY KEY (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values 
('lipBalm', 'Beauty', '7.69', '3000'),
('Headphone', 'Electronics', '26.99', '1256'),
('Glasses', 'Kitchen', '12.99', '5600'),
('Tv', 'Electronics', '1550', '856'),
('Speaker', 'Electonics', '102.99', '155'),
('Sweater', 'Clothing', '25.80', '200'),
('GrillPan', 'Kitchen', '33.90', '1'),
('Sofa', 'Home', '479.99', '58'),
('Dress', 'Clothing', '59', '23'),
('Coat', 'Clothing', '7.69', '3000');
