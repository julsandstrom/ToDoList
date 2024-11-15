import { useEffect, useState, useRef } from "react";
import ToDoList from "./ToDoList";
import InputHandler from "./InputHandler";
import CompletedList from "./CompletedList";

export default function MainListHandler() {
  const [toDoList, SetToDoList] = useState([]);
  const [complete, setComplete] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const completedItemsRef = useRef(new Set());

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  function deleteAll() {
    setErrorMessage("");
    SetToDoList([]);
    setComplete([]);
    completedItemsRef.current.clear();
  }

  function addComplete(itemId) {
    const completeItem = toDoList.find((item) => item.id === itemId);
    setErrorMessage("");
    const isDuplicateComplete = complete.some(
      (item) => item.text.toLowerCase() === completeItem.text.toLowerCase()
    );

    if (
      completeItem &&
      !completedItemsRef.current.has(itemId) &&
      !isDuplicateComplete
    ) {
      SetToDoList((prevMessage) =>
        prevMessage.filter((item) => item.id !== itemId)
      );

      setComplete((prevComplete) => [...prevComplete, completeItem]);
      completedItemsRef.current.add(itemId);
    } else {
      setErrorMessage("It's already in the list!");
    }
  }
  function listDeletion(itemId) {
    const updatedList = toDoList.filter((item) => item.id !== itemId);
    SetToDoList(updatedList);
  }

  function logMessage(ipt) {
    const inputMessage = ipt.toLowerCase();

    SetToDoList((prevMessage) => {
      if (
        !prevMessage.some((item) => item.text.toLowerCase() === inputMessage)
      ) {
        setErrorMessage("");
        return [...prevMessage, { text: ipt, id: crypto.randomUUID() }];
      } else {
        setErrorMessage("It's already in the list!");
        console.log(prevMessage);
        return prevMessage;
      }
    });
  }

  function returnToDo(itemId) {
    const returnItem = complete.find((item) => item.id === itemId);
    const duplicateToDo = toDoList.some(
      (item) => item.text.toLowerCase() === returnItem.text.toLowerCase()
    );
    if (returnItem && !duplicateToDo) {
      setComplete((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      SetToDoList((prevMessage) => [...prevMessage, returnItem]);
      setErrorMessage("");
      completedItemsRef.current.delete(itemId);
    } else {
      setErrorMessage("It's already in the list!");
    }
  }

  return (
    <div>
      <span>Jensen Uppgift - Julian Sandström</span>
      <h1>To Do Lists!</h1>
      <InputHandler onlogMessage={logMessage} onDeleteAll={deleteAll} />
      {errorMessage && <p style={{ color: "white" }}>{errorMessage}</p>}
      <ToDoList
        onToDoList={toDoList}
        onSetToDoList={SetToDoList}
        onComplete={addComplete}
        onDelete={listDeletion}
      />
      <CompletedList
        onCompleted={complete}
        onSetCompleted={setComplete}
        onReturn={returnToDo}
      />
    </div>
  );
}
