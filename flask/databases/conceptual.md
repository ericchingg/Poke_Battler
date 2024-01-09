### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?

  Postgresql is a object relational database management system, these databases are used for web applications. 

- What is the difference between SQL and PostgreSQL?

  SQL is relational database, while Psql is an Object relational database. Object realtional database supports object oriented concepts such as classes.

- In `psql`, how do you connect to a database?

  You can connect to a database with the command psql database_name or command \c database_name after starting psql.

- What is the difference between `HAVING` and `WHERE`?

  Both are used to filter data, but Having is used for filtering grouped data. Where is used for filtering rows.

- What is the difference between an `INNER` and `OUTER` join?

  Inner Join will keep all data related between tables. Outer Join will keep all not related data. 

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?

  Both joins will display the entire table based on whether it's a left or right join. Data does not need to have any relation to be displayed.

- What is an ORM? What do they do?

  Object Relational Mapping lets developers interact with databases through a programming language.

- What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`?

  HTTP request are made on the client side, where as reuqest libary is used on the server side. They both differ in the programming languages that utilize each side.

- What is CSRF? What is the purpose of the CSRF token?

  Cross site request forgery is an action that causes a user to submit an malicious request. Csrf tokens authenticate a user prevents an unwanted attack.

- What is the purpose of `form.hidden_tag()`?

  The purpose is in hide and include your csrf token and prevent a csrf attack.
