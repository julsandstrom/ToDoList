function App() {
  const [objects, setObjects] = useState([]);

  function removeObject(removeThis) {
    const updatedList = objects.filter((item) => item.name !== removeThis.name);
    setObjects(updatedList);
  }

  function addObject(newObject) {
    setObjects([...objects, newObject]);
  }

  return (
    <div className="App">
      <SearchForm onAddObject={addObject} />
      <DisplayObjects onRemoval={removeObject} onObjects={objects} />
    </div>
  );
}

export default App;

function SearchForm({ onAddObject }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !value) {
      alert("Either name or keyword is missing");
      return;
    }

    const newObject = {
      id: Date.now(),
      name,
      value,
    };

    onAddObject(newObject);

    setName("");
    setValue("");
  };

  return (
    <div>
      <main className="main-form">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-4 fw-normal">To Do List</h1>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingInput">
              Keyword(buy, clean, fix...etc)
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="floatingPassword">Give it a name</label>
          </div>

          <div className="checkbox mb-5">
            <label>
              <input type="checkbox" value="remember-me" /> Add Shortcut
            </label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Save Object
          </button>
        </form>
      </main>
    </div>
  );
}

function DisplayObjects({ onRemoval, onObjects }) {
  return (
    <div>
      <ul>
        {onObjects.map((items) => (
          <li key={items.id}>
            <strong>{items.name}</strong>: {items.value}
            <button onClick={() => onRemoval(items)}>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


import { useState } from "react";
import "./App.css";

export default function App() {
  const [lists, setLists] = useState([]);

  function addedListHandler(newList) {
    setLists((prevList) => [...prevList, newList]);
    console.log(lists);
  }
  return (
    <div className="App">
      <ListForm onAddedListHandler={addedListHandler} />
      <ToDoList onLists={lists} onSetLists={setLists} />
    </div>
  );
}

function ListForm({ onAddedListHandler }) {
  const [name, setName] = useState("");

  const randomId = crypto.randomUUID();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newList = {
      id: randomId,
      name,
    };
    onAddedListHandler(newList);
    setName("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>List Creator</h1>
        <label htmlFor="form-input">Name the list</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function ToDoList({ onLists, onSetLists }) {
  const [tempName, setTempName] = useState("");
  const [editIdx, setEditIdx] = useState(null);

  const handleEditClick = (idx) => {
    setEditIdx(idx);
    setTempName(onLists[idx].name);
  };

  const handleSaveClick = (idx) => {
    onSetLists((prevList) =>
      prevList.map((list, i) =>
        i === idx ? { ...list, name: tempName } : list
      )
    );
    setEditIdx(null);
  };

  return (
    <div>
      {onLists.map((list, idx) => (
        <div key={idx}>
          {editIdx === idx ? (
            <div>
              <input
                key={idx}
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
              <button onClick={() => handleSaveClick(idx)}>Save</button>
            </div>
          ) : (
            <div>
              <input key={idx} value={list.name} disabled />
              <button onClick={() => handleEditClick(idx)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}




import { useState } from "react";
import "./App.css";

export default function App() {
  const [objects, setObjects] = useState([
    { name: "Couch", weight: 79, room: "Living Room" },
    { name: "Bed", weight: 54, room: "Bedroom" },
    { name: "Table", weight: 15, room: "Kitchen" },
  ]);

  function addNewItem(name) {
    setObjects([...objects, name]);
    console.log(objects);
  }
  return (
    <div className="App">
      <RandomArray onObjects={objects} />
      <InputForm onObjects={objects} onAddNewItem={addNewItem} />
    </div>
  );
}

function RandomArray({ onObjects }) {
  return (
    <div>
      {onObjects.map((object, idx) => (
        <p key={idx}>{object.name}</p>
      ))}
    </div>
  );
}

function InputForm({ onObjects, onAddNewItem }) {
  const [name, setName] = useState("");
  const [message, setMesage] = useState("");
  const [matched, setMatched] = useState(false);
  function handleSearch() {
    console.log("clicked", name);

    const matchingObject = onObjects.find((object) => object.name === name);
    if (matchingObject) {
      setMesage("You found a match!");
      setMatched(true);
    } else {
      setMesage("Nope, did not find that!");
      setMatched(false);
    }
  }
  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="type something"
        onChange={(e) => setName(e.target.value)}
      />
      {!matched ? (
        <button onClick={() => handleSearch()}>Search</button>
      ) : (
        <button onClick={() => onAddNewItem(name)}>add</button>
      )}
      {message && <p>{message} </p>}
    </div>
  );
}
