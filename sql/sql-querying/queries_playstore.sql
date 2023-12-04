-- Comments in SQL Start with dash-dash --
1. playstore=# SELECT app_name FROM analytics WHERE id = 1880;
  --Find the app with an ID of 1880
2. playstore=# SELECT id, app_name FROM analytics WHERE last_updated =  '2018-08-01'
  --Find the ID and app name for all apps that were last updated on August 01, 2018.
3. playstore=# SELECT category, count(category) as count FROM analytics  GROUP BY category ORDER BY count DESC;
  --Count the number of apps in each category, e.g. “Family | 1972”.
4. playstore=# SELECT app_name, reviews FROM analytics ORDER BY reviews DESC LIMIT 5;
  --Find the top 5 most-reviewed apps and the number of reviews for each.
5. playstore=# SELECT app_name, reviews, rating FROM analytics WHERE rating >= 4.8 ORDER BY reviews DESC LIMIT 1;
  --Find the app that has the most reviews with a rating greater than equal to 4.8.
6. playstore=# SELECT category, avg(rating) as avg_rating FROM analytics GROUP BY category ORDER BY avg_rating DESC;
  --Find the average rating for each category ordered by the highest rated to lowest rated.
7. playstore=# SELECT app_name, price, rating FROM analytics WHERE rating< 3 ORDER BY price DESC LIMIT 1;
  --Find the name, price, and rating of the most expensive app with a rating that’s less than 3.
8. playstore=# SELECT app_name, min_installs, rating FROM analytics WHERE min_installs <= 50 AND rating IS NOT NULL ORDER BY rating DESC;
  --Find all apps with a min install not exceeding 50, that have a rating. Order your results by highest rated first.
9. playstore=# SELECT app_name, rating, reviews FROM analytics WHERE rati
ng < 3 AND reviews > 10000;
  --Find the names of all apps that are rated less than 3 with at least 10000 reviews.
10. playstore=# SELECT app_name, reviews, price FROM analytics WHERE price BETWEEN .10 AND 1 ORDER BY reviews DESC LIMIT 10;
  --Find the top 10 most-reviewed apps that cost between 10 cents and a dollar.
11. playstore=# SELECT * FROM analytics WHERE last_updated = (SELECT MIN(last_updated) FROM analytics);
  --Find the most out of date app. Hint: You don’t need to do it this way, but it’s possible to do with a subquery: http://www.postgresqltutorial.com/postgresql-max-function/
12. playstore=# SELECT * FROM analytics WHERE price = (SELECT MAX(price) FROM analytics);
  --Find the most expensive app (the query is very similar to #11).
13. playstore=# SELECT SUM(reviews) as total_reviews FROM analytics;
  --Count all the reviews in the Google Play Store.
14. playstore=# SELECT category, COUNT(app_name) FROM analytics GROUP BY category HAVING COUNT(app_name) > 300;
  --Find all the categories that have more than 300 apps in them.
15. playstore=# SELECT app_name, reviews, min_installs, min_installs/reviews as proportion FROM analytics GROUP BY app_name, reviews, min_installs HAVING min_installs > 100000 ORDER BY proportion DESC LIMIT 1;
  --Find the app that has the highest proportion of min_installs to reviews, among apps that have been installed at least 100,000 times. Display the name of the app along with the number of reviews, the min_installs, and the proportion.