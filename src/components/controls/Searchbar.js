import { useContext } from "react";
import { AllContext } from "../main/Home";

const Searchbar = () => {
  const { searchInput, setSearchInput } = useContext(AllContext);

  return (
    <div className="text-container">
      <input
        type="text"
        placeholder="Search for blog titles..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        autoFocus
      />
      <button className="delete-text" onClick={() => setSearchInput("")}>
        <i className="fas fa-backspace"></i>
      </button>
    </div>
  );
};

export default Searchbar;
