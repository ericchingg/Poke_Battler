import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import RoutesList from './routes/Routes.jsx';
import PokeApi from './api/api.jsx';
import userContext from './userContext.js';

function PokeBattlerApp() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);


  PokeApi.token = token;

  async function handleLogin({ username, password }) {
    console.log("Attempting login with:", { username, password });
    try {
      const apiToken = await PokeApi.logInUser({ username, password });
      console.log("API Token received:", apiToken); // Check the response
  
      if (apiToken) {
        setToken(apiToken);
        localStorage.setItem('token', apiToken);

      } else {
        console.error("No token received during login");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

 useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log("Decoded token:", decodedToken);
          const username = decodedToken.username;
          const userData = await PokeApi.getUserDetails(username);
          console.log("User data fetched:", userData);

          if (userData) {
            setCurrUser({
              username: username,
              email: userData.email,
            });

          } else {
            console.error("No user data found for the username:", username);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [token]);


  function handleLogout() {
    setCurrUser(null);
    setToken("");
    localStorage.removeItem('token');
  }

  async function handleSignup({ username, password, email }) {
    const userData = { username, password, email };
    try {
      const apiToken = await PokeApi.registerUser(userData);
      console.log('User registered. Token:', apiToken);

      const loginToken = await PokeApi.logInUser({ username, password });
      console.log('Logged in user. Token:', loginToken);
  
      if (loginToken) {
        setToken(loginToken);
        localStorage.setItem('token', loginToken);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  }

  if (loading) {
    return <p>Loading...</p>; // Show loading message
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
