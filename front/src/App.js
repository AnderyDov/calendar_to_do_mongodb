import { useState } from "react";
import "./App.css";
import Calendar from "./calendar/Calendar";
import ToDoList from "./to_do_list/ToDoList";

function App() {
  let [countY, setCountY] = useState(0);
  let [countM, setCountM] = useState(0);
  let [currentD, setCurrentD] = useState(new Date().getDate());
  let [render, setRender] = useState(false);

  return (
    <div className="App">
      <ToDoList
        countY={countY}
        countM={countM}
        currentD={currentD}
        render={render}
        setRender={setRender}
      />
      <Calendar
        countY={countY}
        countM={countM}
        currentD={currentD}
        setCurrentD={setCurrentD}
        setCountY={setCountY}
        setCountM={setCountM}
      />
    </div>
  );
}

export default App;
