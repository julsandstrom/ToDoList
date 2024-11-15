import { useEffect, useState } from "react";
export default function InputHandler({ onlogMessage, onDeleteAll }) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (inputError) {
      const timer = setTimeout(() => {
        setInputError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [inputError]);

  function handleSubmit(e) {
    e.preventDefault();

    if (inputValue.length < 1) {
      setInputError("Empty strings are not allowed");
      return;
    }

    setInputError("");
    onlogMessage(inputValue);
    setInputValue("");
  }

  function handleDeletAll(e) {
    e.preventDefault();
    setInputError("");
    onDeleteAll();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Create a list
          <input
            style={{ marginLeft: "10px", marginBottom: "20px" }}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="submit" style={{ marginRight: "40px" }}>
          Add
        </button>
        <button onClick={handleDeletAll}>Delete All</button>
        {inputError && <p style={{ color: "white" }}>{inputError}</p>}
      </form>
    </div>
  );
}
