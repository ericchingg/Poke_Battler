import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import RoutesList from './routes/Routes.jsx';
import PokeApi from './api/api.jsx';
import userContext from './userContext.js';

/** Component for entire page.
 *
 * Props: none
 * State:
 *        currUser => {
 *                      username,
 *                      email
 *                    }
 *        token (string)
 *
 * Effect: fetches user data upon successful login
 *
 * App -> RoutesList
*/

function PokeBattlerApp() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("* PBApp");

  PokeApi.token = token;

  /** Logs in a user with a valid username/password.
   *
   * Updates state with token.
   * If login fails to authenticate, renders error message.
  */
  async function handleLogin({ username, password }) {
    const apiToken = await PokeApi.logInUser({ username, password });
  
    console.log("Received API Token:", apiToken); // Log the received token

    if (apiToken) {
      localStorage.setItem('token', apiToken);
      setToken(apiToken);

      await fetchUserData(apiToken); // Call fetchUserData to get user data
      
      if (currUser) { // Check if currUser was successfully set
        setRedirect(true);
      }
    } else {
      console.error("Login failed: No token received."); // Handle case where no token is received
    }
  }

  async function fetchUserData(newToken) {
    setLoading(true);

    if (!newToken) {
      console.error("No token available for decoding.");
      setLoading(false);
      return; // Early exit
    }

    try {
      const decodedToken = jwtDecode(newToken);
      const username = decodedToken.username;
      const userData = await PokeApi.getUserDetails(username);

      if (userData) {
        setCurrUser({
          username: username,
          email: userData.email,
        });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  }

  /** Logs out current user by resetting states*/
  function handleLogout() {
    setCurrUser(null);
    setToken("");
    localStorage.clear();
  }

  /** Signs up a user when given valid input data
   *
   * Calls login function upon successful signup
   */
  async function handleSignup({ username, password, email }) {
    try {
      const userData = {
        username,
        password,
        email,
      };
      const apiToken = await PokeApi.registerUser(userData);
      setToken(apiToken);
      localStorage.setItem('token', apiToken);
      await fetchUserData(apiToken); // Fetch user data upon signup
      setRedirect(true);
    } catch (error) {
      console.error("Signup error:", error);
      // Handle signup errors (optional)
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (redirect) {  // Check for redirect state
    return <Navigate to="/" />;
  }

  return (
    <div className="PokeBattlerApp">
      <userContext.Provider value={{ user: currUser }}>
        <RoutesList
          currUser={currUser}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleSignup={handleSignup}
        />
      </userContext.Provider>
    </div>
  );
}

export default PokeBattlerApp;