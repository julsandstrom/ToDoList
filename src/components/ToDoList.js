import { useEffect, useState } from "react";
export default function ToDoList({
  onToDoList,
  onSetToDoList,
  onComplete,
  onDelete,
}) {
  const [isEditable, setIsEditable] = useState(null);
  const [tempName, setTempName] = useState("");
  const [editError, setEditError] = useState("");

  useEffect(() => {
    if (editError) {
      const timer = setTimeout(() => {
        setEditError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [editError]);

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

    const isDuplicate = onToDoList.some(
      (name) =>
        name.text.toLowerCase() === tempName.toLowerCase() && name.id !== itemId
    );

    if (isDuplicate) {
      setEditError("Duplicates are not allowed! ");
      return;
    }

    onSetToDoList(
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
      {onToDoList.map((item) => (
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
              <button onClick={() => onComplete(item.id)}>Complete</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
