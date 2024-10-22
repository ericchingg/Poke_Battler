import { useState , useEffect } from "react";
// import { Link } from 'react-router-dom';
// import { v4 as uuid } from "uuid";
import Alert from "./Alert.jsx";
// import User from "../../../Backend/models/user.js";
import PokeApi from "../api/api.jsx";
import { Navigate } from "react-router-dom";

/** Profile form for editing user information
 *
 * Props: handleProfileUpdate function, currentUser (object with user data), errors like ["message1", ...]
 * State: formData, errors
 *
 * RoutesList -> ProfileForm
*/

function ProfileForm({ handleProfileUpdate, currentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState([]);
  
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: ""
      });
    }
  }, [currentUser]);

  console.log("* ProfileForm");

  /** Update formData as user types into form fields */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(currData => ({
      ...currData,
      [name]: value
    }));
  }

  /** Sends formData to the backend to update profile information */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await handleProfileUpdate(formData);
      setErrors([]); // Clear errors on successful update
    } catch (errs) {
      setErrors(errs);
    }
  }

  async function handleDelete() {
    try { 
      const deletedUser = await PokeApi.deleteUser(formData.username);
      alert(`User ${deletedUser} has been deleted.`);
      localStorage.removeItem('token');
      window.location.reload()
    } catch (errs) {
      setErrors(errs);
    }
  }


  return (
    <div className="ProfileForm">
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row align-items-center mb-3">
          <label htmlFor="username-input" className="col-sm-4 col-form-label">Username</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="username"
              id="username-input"
              className="form-control"
              onChange={handleChange}
              value={formData.username}
              disabled
              autoComplete="username"
            />
            <small className="form-text text-muted">Username cannot be changed</small>
          </div>
        </div>

        <div className="form-group row align-items-center mb-3">
          <label htmlFor="email-input" className="col-sm-4 col-form-label">Email</label>
          <div className="col-sm-8">
            <input
              id="email-input"
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
        </div>

        <div className="form-group row align-items-center mb-3">
          <label htmlFor="password-input" className="col-sm-4 col-form-label">New Password</label>
          <div className="col-sm-8">
            <input
              type="password"
              name="password"
              id="password-input"
              className="form-control"
              onChange={handleChange}
              value={formData.password}
              placeholder="Leave blank to keep the current password"
              autoComplete="current-password"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-dark">Save Changes</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
        {errors.length > 0 && <Alert messageStyle="alert alert-danger" messages={errors} />}
      </form>
    </div>
  );
}

export default ProfileForm;