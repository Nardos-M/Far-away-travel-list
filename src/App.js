export default function App() {
  return(
    <div className="app">
    <Logo />
    <Form />
    <PackingList />
    <Stats />

    </div>
  )
}
function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form() {
  return (
    <>
      <div className="add-form">
      <h3>what do you need for your 😍 trip?</h3>
      </div>
    </>
  );
}
function PackingList() {
  return <div className="list">List</div>
}
function Stats() {
  return(
    <footer className="stats">
      <em>💼 you have X items onn your list, and you already packed X (X%)</em>
    </footer>
  );
}
