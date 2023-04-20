import './App.css';
import { useState } from 'react';
import TodoList from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css'

function App()
{
  const [entryID, setEntryID] = useState("");

  const setEntryIdHandler = (id) =>
  {
    console.log("ID:", id);
    setEntryID(id);
  }

  return (
    <div className="App">
      <TodoList setEntryID={setEntryIdHandler} entryID={entryID} />
    </div>
  );
}

export default App;
