// src/App.js
import React from "react";
import TodoList from "./components/TodoList";
// import "./app.css";


// app.jsx adalah file untuk eksekusi komponen
function App() {
  return (
    <div className="bg-white-200 min-h-screen flex items-center justify-center">
      {/* menampilkan komponen dari TodoList.jsx */}
      <TodoList />
    </div>
  );
}

export default App;
