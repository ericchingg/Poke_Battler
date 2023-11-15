### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?  
  Python is a programming language for back-end development, on the server side using database and systems. Javascript is for front-end development on the client side, and focuses more on interface and user interaction.

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.  
    * The first way is using a get() method. If key is not found, a default value can be set in it's place.
    * The second way is using a condition statement to check if key is present, else return a no keys found statement.

- What is a unit test?  
  A unit test is a testing component for a specific function or piece in a given app.

- What is an integration test?  
  An integration test are test that check whether different functions are able to work synchronously. 

- What is the role of web application framework, like Flask?  
  Web app frameworks allow the user to easily develop and build web applications such as app routing.

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?  
  Both produce the same results, but the difference lies with the method to achieving the results. Route URLS are more specfic and would have a direct path within the URL. While URL query params are passed in through forms or filtering.

- How do you collect data from a URL placeholder parameter using Flask?  
  Using request.args we can get the information that is passed in by the user.

- How do you collect data from the query string using Flask?  
  Using request.query_string can provide the user with all parameters in query string.

- How do you collect data from the body of the request using Flask?  
  Using response.get_data() will receive a response body and return content regarding the request.

- What is a cookie and what kinds of things are they commonly used for?  
  Cookies are stored on the users browser that contains information based on the users usage. Things like username, or items in shopping cart are examples of what cookies can be.

- What is the session object in Flask?  
  Sessions are a secure storage of user data that is only valid for the duration of a browsers session. It is encoded for security purposes.

- What does Flask's `jsonify()` do?  
  jsonify takes an input and converts it into JSON data, which can then be sent across the web.
