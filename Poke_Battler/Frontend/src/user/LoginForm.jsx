import { useState } from "react";
import { v4 as uuid } from "uuid";
import Alert from "./Alert.jsx";

/** Login form for Jobly
 *
 * Props: handleLogin function
 * State: formData, errors
 *
 *
 * RoutesList -> LoginForm
*/

function LoginForm({ handleLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  console.log("* LoginForm");

  /** Update formData as user types into form fields */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(currData => ({
      ...currData,
      [name]: value
    }));
  }

  /** Sends formData to JoblyApp on form submission */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try{
      await handleLogin(formData);
    }
    catch (errs) {
      setErrors(errs);
    }
  }

  return (
    <div className="LoginForm">
      <h2>Welcome back!</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group row align-items-center mb-3">
          <label for="username-input" className="col-sm-4 col-form-label">Username</label>
          <div className="col-sm-8">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="username"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row align-items-center mb-3">
          <label for="password-input" className="col-sm-4 col-form-label">Password</label>
          <div className="col-sm-8">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
        </div>

          <button type="submit" className="btn btn-dark">Login</button>
        {errors.length > 0 && <Alert messageStyle="alert alert-danger" messages={errors} />}
      </form>

    </div>
  );
}

export default LoginForm;