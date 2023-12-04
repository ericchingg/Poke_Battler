-- write your queries here
1. joins_exercise=# SELECT * FROM owners FULL JOIN vehicles ON owners.id = vehicles.owner_id;
  --Join the two tables so that every column and record appears, regardless of if there is not an owner_id . 
2. joins_exercise=# SELECT first_name, last_name, COUNT(*) FROM owners JOIN vehicles ON owners.id = vehicles.owner_id GROUP BY first_name, last_name ORDER BY COUNT(*) ASC;
  --Count the number of cars for each owner. Display the owners first_name , last_name and count of vehicles. The first_name should be ordered in ascending order. 
3. joins_exercise=# SELECT first_name, last_name, ROUND(AVG(price)) as average_price, COUNT(*) FROM owners JOIN vehicles ON owners.id = vehicles.owner_id GROUP BY first_name, last_name HAVING COUNT(*) > 1 AND ROUND(AVG(price)) > 10000 ORDER BY first_name DESC;
  --Count the number of cars for each owner and display the average price for each of the cars as integers. Display the owners first_name , last_name, average price and count of vehicles. The first_name should be ordered in descending order. Only display results with more than one vehicle and an average price greater than 10000.