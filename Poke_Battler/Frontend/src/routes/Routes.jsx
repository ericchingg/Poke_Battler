import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../nav/Navigation.jsx";
import Homepage from "../home/Homepage.jsx";
import TeamList from "../teams/TeamList.jsx";
import TeamDetails from "../teams/TeamDetails.jsx";
import PokemonList from "../pokemon/PokemonList.jsx";
import LoginForm from "../user/LoginForm.jsx";
import SignupForm from "../user/SignupForm.jsx";
import ProfileForm from "../user/ProfileForm.jsx";
import Battle from "../battle/Battle.jsx";

/** Routes for PB
 *
 * Props: currUser => {
 *                      username,
 *                      email
 *                    }
 *        handleLogin function
 *        handleLogout function
 *        handleSignup function
 *
 * State: None
 *
 * PBApp -> RoutesList -> {Navigation, LoginForm, SignupForm, Logout, Homepage, Battle, TeamList, PokemonList}
 */

function RoutesList({ currUser, handleLogin, handleLogout, handleSignup }) {
  console.log("* RoutesList");

  /** Protected Route component to restrict access based on authentication status */
  function ProtectedRoute({ children }) {
    return currUser ? children : <Navigate to="/login" />;
  }

  /** Redirect authenticated users away from login/signup */
  function RedirectIfLoggedIn({ children }) {
    return currUser ? <Navigate to="/" /> : children;
  }

  return (
    <div>
        <Navigation currUser={currUser} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          
          {/* Routes for non-logged-in users */}
          <Route path="/login" element={
            <RedirectIfLoggedIn>
              <LoginForm handleLogin={handleLogin} />
            </RedirectIfLoggedIn>
          } />
          <Route path="/signup" element={
            <RedirectIfLoggedIn>
              <SignupForm handleSignup={handleSignup} />
            </RedirectIfLoggedIn>
          } />

          {/* Routes for logged-in users */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileForm />
            </ProtectedRoute>
          } />
          <Route path="/teams" element={
            <ProtectedRoute>
              <TeamList currentUser={currUser}/>
            </ProtectedRoute>
          } />
          <Route path="/teams/:id" element={
            <ProtectedRoute>
              <TeamDetails />
            </ProtectedRoute>
          } />
          <Route path="/pokemon" element={
            <ProtectedRoute>
              <PokemonList />
            </ProtectedRoute>
          } />

          <Route path="/battle" element={
            <ProtectedRoute>
              <Battle currentUser={currUser}/>
            </ProtectedRoute>
          } />

          {/* Catch-all route to redirect to homepage */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  );
}

export default RoutesList;