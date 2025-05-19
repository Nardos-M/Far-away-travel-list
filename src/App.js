import { useState } from "react";

export default function App() {
  const [items, setItem] = useState([]);

  function handleAddItems(item) {
    setItem((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log(id);
    setItem((items) => items.filter((items) => items.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  /* this function is moved to the parent component
  function handleAddItems(item) {
    // adding new item with out mutating the original one
    // ...items is an array with the rest of the items in the array. and item is the new one thats going to be added
    setItem((items) => [...items, item]);

    //so the item is on hte form component but it should be displayed in the packing list
    // we need to pass that but via props is not the actual way coz the form by itself is not parent component 
    // instead we need to lift up the state
  }
    */

  function handleSubmit(e) {
    e.preventDefault();

    //cant submit if there is item/ description
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    //handleAddItems(newItem); this is replaced by next line coz the function is also lifted
    // and now passed through props

    onAddItems(newItem);

    //once submit button is clicked it set it to its default state
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 you have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
