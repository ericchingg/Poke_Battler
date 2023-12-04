-- Comments in SQL Start with dash-dash --

1. products_db=# INSERT INTO products (name, price, can_be_returned)
  VALUES ('chair', 44.00, false);
  --Add a product to the table with the name of “chair”, price of 44.00, and can_be_returned of false.--

2. products_db=# INSERT INTO products (name, price, can_be_returned)
  VALUES ('stool', 25.99, true);
  --Add a product to the table with the name of “stool”, price of 25.99, and can_be_returned of true.

3. products_db=# INSERT INTO products (name, price, can_be_returned)
  VALUES ('table', 124.00, false);
  --Add a product to the table with the name of “table”, price of 124.00, and can_be_returned of false.

4. products_db=# SELECT * FROM products;
  --Display all of the rows and columns in the table.

5. products_db=# SELECT name FROM products;
  --Display all of the names of the products.

6. products_db=# SELECT name, price FROM products;
  --Display all of the names and prices of the products.

7. products_db=# INSERT INTO products (name, price, can_be_returned)
  VALUES ('sneakers', 200.00, false);
  --Add a new product - make up whatever you would like!

8. products_db=# SELECT can_be_returned FROM products;
  --Display only the products that can_be_returned

9. products_db=# SELECT price FROM products WHERE price < 44.00;
  --Display only the products that have a price less than 44.00.

10. products_db=# SELECT price FROM products WHERE price > 22.50 AND price< 99.99;
  --Display only the products that have a price in between 22.50 and 99.99.

11. products_db=# UPDATE products SET price = price - 20;
  --There’s a sale going on: Everything is $20 off! Update the database accordingly.

12. products_db=# DELETE FROM products WHERE price < 25;
  --Because of the sale, everything that costs less than $25 has sold out. Remove all products whose price meets this criteria.
  
13. products_db=# UPDATE products SET price = price + 20;
  --And now the sale is over. For the remaining products, increase their price by $20.

14. products_db=# UPDATE products SET can_be_returned = true;
  --There is a new company policy: everything is returnable. Update the database accordingly.

