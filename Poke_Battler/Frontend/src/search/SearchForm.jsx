import { useState } from "react";

/** Search bar for PB
 *
 * {TeamList, PokemonList} -> SearchForm
 */

function SearchForm({ handleSearch }) {
  const [formData, setFormData] = useState({searchParam: ""});
  console.log("* SearchForm");

  /** Update formData as user types into search bar */
  function handleChange(evt) {
    const fieldName = evt.target.name;
    const value = evt.target.value;

    setFormData(currData => {
      currData[fieldName] = value;
      return { ...currData };
    });
  }

  /** Sends formData to parent component on form submission */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(formData.searchParam);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row justify-content-center">
        <div className="col-8">
          <input type="text"
                 name="searchParam"
                 className="form-control form-control-lg"
                 placeholder="Enter search..."
                 onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-lg btn-primary">Search</button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;