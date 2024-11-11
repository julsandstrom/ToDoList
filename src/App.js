import { useEffect, useState, useRef } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Shop />
    </div>
  );
}

function Shop() {
  const [message, setMessage] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function logMessage(ipt) {
    const inputMessage = ipt.toLowerCase();

    setMessage((prevMessage) => {
      if (
        !prevMessage.some((item) => item.text.toLowerCase() === inputMessage)
      ) {
        return [...prevMessage, { text: ipt, id: crypto.randomUUID() }];
      } else {
        setErrorMessage("It's already in the list!");
        console.log(prevMessage);
        return prevMessage;
      }
    });
  }

  return (
    <div>
      <h1>To Do Lists!</h1>
      <InputExample onlogMessage={logMessage} />
      {errorMessage && <p style={{ color: "white" }}>{errorMessage}</p>}
      <DisplayText onMessage={message} onSetMessage={setMessage} />
    </div>
  );
}

function DisplayText({ onMessage, onSetMessage }) {
  const [isEditable, setIsEditable] = useState(null);
  const [tempName, setTempName] = useState("");
  const [editError, setEditError] = useState("");

  function handleEdit(itemId, currentText) {
    setIsEditable(itemId);
    setTempName(currentText);
    setEditError("");
  }

  function handleSave(itemId) {
    if (tempName.length < 1) {
      setEditError("Empty strings are not allowed");
      return;
    }

    const isDuplicate = onMessage.some(
      (name) =>
        name.text.toLowerCase() === tempName.toLowerCase() && name.id !== itemId
    );

    if (isDuplicate) {
      setEditError("Duplicates are not allowed! ");
      return;
    }

    onSetMessage(
      (
        prevItem //Checks id to only update what is necessary
      ) =>
        prevItem.map((item) =>
          item.id === itemId ? { ...item, text: tempName } : item
        )
    );
    setEditError("");
    setIsEditable(null);
    setTempName("");
  }

  return (
    <div>
      {onMessage.map((item) => (
        <div key={item.id}>
          {isEditable === item.id ? (
            <>
              <input
                value={tempName} //Making it editable otherwise with item.text its stuck with whatever was there before.
                onChange={(e) => setTempName(e.target.value)}
              />
              <button
                type="submit"
                onClick={() => handleSave(item.id, item.text)}
              >
                Save
              </button>
              {editError && <p style={{ color: "white" }}>{editError}</p>}
            </>
          ) : (
            <>
              <input disabled value={item.text} />
              <button onClick={() => handleEdit(item.id, item.text)}>
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function InputExample({ onlogMessage }) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Create a list
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
        {inputError && <p style={{ color: "white" }}>{inputError}</p>}
      </form>
    </div>
  );
}
