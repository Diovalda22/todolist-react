// src/App.js
import React from "react";
import TodoList from "./components/TodoList";
import VectorImg from './assets/vector.png'
// import "./app.css";


// app.jsx adalah file untuk eksekusi komponen
function App() {
  return (
    <div className="bg-pink-50 min-h-screen flex items-center justify-center">
      <img src={VectorImg} alt="gambar" className="mx-[80px]"/>
      <TodoList />
    </div>
  );
}

export default App;
