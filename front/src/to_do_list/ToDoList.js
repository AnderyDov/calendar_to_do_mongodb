import { useState } from "react";
import "./toDoList.css";

export default function ToDoList({
  countY,
  countM,
  currentD,
  render,
  setRender,
}) {
  let [addTask, setAddTask] = useState(false);
  let [editTask, setEditTask] = useState(false);
  let [targetIndex, setTargetIndex] = useState(null);
  let [text, setText] = useState("");

  let date = new Date(
    new Date().getFullYear() + countY,
    new Date().getMonth() + countM,
    currentD
  );
  date = `${currentD} ${
    date.toDateString().split(" ")[1]
  } ${date.getFullYear()}`;

  let showListEdit;

  let textFeld = addTask && (
    <textarea
      cols="30"
      rows="10"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );

  let butSaveEdit = editTask && (
    <button onClick={handlerSave}>сохранить изменения</button>
  );

  let butEditAdd;
  if (addTask) {
    butEditAdd = <button onClick={handlerAddTask}>добавить в список</button>;
  } else {
    butEditAdd = (
      <button onClick={() => setAddTask(true)}>добавить задачу</button>
    );
  }

  let butOut = (addTask || editTask) && (
    <button onClick={handlerOut}>отмена</button>
  );

  if (localStorage.getItem(date)) {
    let arr = JSON.parse(localStorage.getItem(date));
    showListEdit = arr.map((item, index) => {
      return (
        <li key={index}>
          <div onClick={() => handlerEdit(index)}>{item}</div>
          <button onClick={() => handlerDel(index)}>удалить</button>
        </li>
      );
    });
  }

  let out = (
    <div className="toDoList">
      <h3>Список дел на: {date}</h3>
      {textFeld}
      {butSaveEdit}
      {butEditAdd}
      {butOut}
      {showListEdit}
    </div>
  );

  function handlerAddTask() {
    setAddTask(false);
    setEditTask(false);
    if (localStorage.getItem(date)) {
      let store = JSON.parse(localStorage.getItem(date));
      if (text !== "") store.push(text);
      store = JSON.stringify(store);
      localStorage.setItem(date, store);
    } else {
      let store = [];
      if (text !== "") store.push(text);
      store = JSON.stringify(store);
      localStorage.setItem(date, store);
    }
    setText("");
    setRender(!render);
  }

  function handlerDel(index) {
    let store = JSON.parse(localStorage.getItem(date));
    store = store.filter((item, i) => {
      return i !== index;
    });
    store = JSON.stringify(store);
    localStorage.setItem(date, store);
    setRender(!render);
  }

  function handlerEdit(index) {
    setAddTask(true);
    setEditTask(true);
    setTargetIndex(index);
    let store = JSON.parse(localStorage.getItem(date));
    setText(store[index]);
  }

  function handlerSave() {
    setAddTask(false);
    setEditTask(false);
    setText("");
    let store = JSON.parse(localStorage.getItem(date));
    store[targetIndex] = text;
    localStorage.setItem(date, JSON.stringify(store));
  }

  function handlerOut() {
    setAddTask(false);
    setEditTask(false);
    setText("");
    setTargetIndex(null);
  }

  return out;
}
