import React, { useEffect, useState } from 'react'
import './CSS/Todo.css'
import { RiTodoFill } from 'react-icons/ri';
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const Todo = () => {

  const [list,setList] = useState([])
  const [input,setInput] = useState("");

  const handelAddTodo = () => {
    if(input.trim() === "") return;
    setList(prev => [...prev,input])
    setInput("");
  }

  const handelRemoveItem = (index) => {
    setList(list.filter((_,i) => i != index))
  }

  const listContent = list.map((val,index) => (
    <li key={index}>
      {val}
      <button 
        className='removeBtn'
        onClick={() => handelRemoveItem(index)}>
        <MdDelete />
      </button>
    </li>
  ))

  useEffect(() => {
    const savedList = localStorage.getItem("myitem");
    console.log("Loaded from localStorage:", savedList);
    if (savedList) {
      setList(JSON.parse(savedList));
    }
  }, []);

  useEffect(() => {
    console.log("Saving to localStorage:", list);
    localStorage.setItem("myitem", JSON.stringify(list));
  }, [list]);

  return (
    <div className='todo'>
      <div className="todo-header">
        <RiTodoFill />
        To-do List
      </div>

      <div className="todo-list">
        <ul>
          {listContent}
        </ul>
      </div>

      <div className="todo-add">
        <input 
          type="text" 
          onChange={(e) => {setInput(e.target.value)}}
          placeholder='Add your Task'
          value={input} 
          onKeyDown={(e) => {
            if(e.key === "Enter")
            {
              handelAddTodo()
            }
          }}
          className='todo-input' />
        <button 
          onClick={handelAddTodo} 
          className="todo-add-btn">
            ADD
            <IoIosAdd />
        </button>
      </div>
    </div>
  )
}

export default Todo