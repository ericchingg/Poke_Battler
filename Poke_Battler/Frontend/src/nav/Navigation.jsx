import { NavLink } from "react-router-dom";
import "./Navigation.css";

/** Navbar for PB
 *
 * Props: currUser => {
 *                      username,
 *                      email
 *                    }
 *        handleLogout
 *
 * State: None
 *
 * App -> Navigation
 */

function Navigation({ currUser, handleLogout }) {
  console.log("* Navigation");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
      <ul className="nav justify-content-center">
        <li className="nav-item px-2">
          <NavLink to={'/'} className='link text-decoration-none'>Poke Battler</NavLink>
        </li>
        {currUser === null &&
          <>
            <li className="nav-item px-2">
              <NavLink to={'/login'} className='link text-decoration-none'>Log In</NavLink>
            </li>

            <li className='nav-item px-2'>
              <NavLink to={'/signup'} className='link text-decoration-none'>Sign Up</NavLink>
            </li>
          </>
        }
        {currUser &&
          <>
            
            <li className="nav-item px-2">
              <NavLink to={'/battle'} className='link text-decoration-none'>Battle</NavLink>
            </li>

            <li className="nav-item px-2">
              <NavLink to={'/pokemon'} className='link text-decoration-none'>Pokemon</NavLink>
            </li>

            <li className="nav-item px-2">
              <NavLink to={'/teams'} className='link'>Teams</NavLink>
            </li>

            <li className="nav-item px-2">
              <NavLink to={'/profile'} className='link text-decoration-none'>My Profile</NavLink>
            </li>

            <li className="nav-item px-2">
              <NavLink
                to={'/'}
                onClick={handleLogout}
                className='link text-decoration-none'
              >
                Log Out {currUser.username}
              </NavLink>
            </li>
          </>
        }
      </ul>
    </nav>
  );
}

export default Navigation;