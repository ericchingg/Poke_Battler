import { useState } from "react";

/** Create team for user
 *
 */

function TeamForm({ handleCreate, currentUser }) {
  const [formData, setFormData] = useState({user_id: currentUser.id, name: ''});

  console.log("* TeamForm");

  /** Update formData as user types into form */
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({...formData, [name]: value}));
	};
  

  /** Sends formData to parent component on form submission */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleCreate(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row justify-content-center">
        <div className="col-8">
          <input type="text"
                 name="name"
                 className="form-control form-control-lg"
                 placeholder="Enter Team name.."
                 onChange={handleChange}
                //  value={formData.name}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-lg btn-primary">Create Team</button>
        </div>
      </div>
    </form>
  );
}

export default TeamForm;