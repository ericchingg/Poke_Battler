import { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../userContext.js";


/** Homepage for PB
 *
 * Props: None
 * State: None
 *
 * RoutesList -> Homepage
 */

function Homepage() {
  const { user } = useContext(userContext);
  console.log("* Homepage");
  return (
    <div className="homepage">
      <div className="container text-center">
        <h1>Poke Battler</h1>
        <h3>Lets Battle!</h3>
        {user && <h2>Welcome back, {user.username}!</h2>}
        {!user &&
          <>
            <Link to={'/login'} className="btn btn-dark fw-bold me-3">Log In</Link>
            <Link to={'/signup'} className="btn btn-dark fw-bold me-3">Sign Up</Link>
          </>
        }
      </div>
    </div>
  );
}

export default Homepage;