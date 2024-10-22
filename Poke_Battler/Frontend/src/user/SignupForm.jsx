import { useState } from "react";
import { Link } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import Alert from "./Alert.jsx";

/** Signup form for PbApp
 *
 * Props: handleSignup function, errors like ["message1", ...]
 * State: formData, errors
 *
 * RoutesList -> Signup Form
*/

function SignupForm({ handleSignup }) {
  const defaultFormData = {
    username: "",
    password: "",
    email: ""
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState([]);
  console.log("* SignupForm");

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

    try {
      await handleSignup(formData);
    }
    catch (errs) {
      setErrors(errs);
    }
  }

  return (
    <div className="SignupForm">
    <h2>Sign up for a Poke Battler account</h2>
    <p>Already using Poke Battler? Log in <Link to={'/login'}> here</Link>.</p>
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
            />
          </div>
        </div>

        <div className="form-group row align-items-center mb-3">
          <label htmlFor="password-input" className="col-sm-4 col-form-label">Password</label>
          <div className="col-sm-8">
            <input
              type="password"
              name="password"
              id="password-input"
              className="form-control"
              onChange={handleChange}
            />
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
            />
          </div>
        </div>

          <button type="submit" className="btn btn-dark">Submit</button>
        {errors.length > 0 && <Alert messageStyle="alert alert-danger" messages={errors} />}
      </form>

    </div>
  );

}

export default SignupForm;