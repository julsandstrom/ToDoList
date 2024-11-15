import { useEffect, useState } from "react";
export default function CompletedList({
  onCompleted,
  onSetCompleted,
  onReturn,
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

    const isDuplicate = onCompleted.some(
      (name) =>
        name.text.toLowerCase() === tempName.toLowerCase() && name.id !== itemId
    );

    if (isDuplicate) {
      setEditError("Duplicates are not allowed! ");
      return;
    }

    onSetCompleted(
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
      <h2>Completed Task</h2>
      {onCompleted.map((item) => (
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
              <button onClick={() => onReturn(item.id)}>Remove</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
