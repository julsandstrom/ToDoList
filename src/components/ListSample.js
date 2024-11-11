import { useEffect, useState, useRef } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <ListItems
        items={[
          { id: 1, name: "Couch", weight: 35 },
          { id: 2, name: "Stool", weight: 325 },
          { id: 3, name: "Bed", weight: 355 },
          { id: 4, name: "Car", weight: 3115 },
        ]}
      />
    </div>
  );
}

function ListItems({ items }) {
  const [stuff, setStuff] = useState(items);
  const [hasAddedItem, setHasAddedItem] = useState(false);

  useEffect(() => {
    setStuff(items);
  }, [items]);
  const totalWeight = stuff.reduce((acc, item) => acc + item.weight, 0);

  useEffect(() => {
    const randomName = "Cocuch";
    if (stuff.length > 0 && stuff.find((item) => item.name === randomName)) {
      console.log("Matched");
      setHasAddedItem(false);
    } else if (!hasAddedItem.current) {
      const extraItem = [{ id: 5, name: "knife", weight: 44 }];
      setStuff((prevItem) => [...prevItem, extraItem]);
      setHasAddedItem(true);
      console.log("not matched, adding extra item");
    }
  }, [stuff, hasAddedItem]);

  return (
    <>
      <p>{totalWeight}</p>
      <div>
        {stuff.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
    </>
  );
}
