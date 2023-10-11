import "./App.css";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiOutlineCheckSquare } from "react-icons/ai"
import { BiSolidEdit } from "react-icons/bi"


function App() {
  const [isCompleateScreen, setIsCompleateScreen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [addShow, setAddShow] = useState(true)
  const[editIndex,setEditIndex]=useState(null)
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodo = {
      title: newTitle,
      description: newDescription
    }
    if (!newTodo) return alert('Fields cannot be empty')
    let updateTodoArr = [...todos];
    updateTodoArr.push(newTodo);
    setTodos(updateTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updateTodoArr))
    setNewTitle("");
    setNewDescription("");
    // setTodos([newTodo,...todos]);
  };

  const handleEdit = (index) => {
    let editTodo=todos[index];
    setEditIndex(index)
    setNewTitle(editTodo.title)
    setNewDescription(editTodo.description)
    setAddShow(false)
  }
  const handleEditSubmit = () => {
    todos[editIndex]={title:newTitle,description:newDescription}
    localStorage.removeItem("todolist");
    const newTodoList = [...todos];
    localStorage.setItem("todolist", JSON.stringify(newTodoList))
    setNewTitle("");
    setNewDescription("");
    setAddShow(true)
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...todos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setNewTitle("");
    setNewDescription("");
    setTodos(reducedTodo);

  };
  console.log(todos);

  const handleComplete = (index) => {
    let now = new Date();
    let day = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = day + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;
    let filteredItem = {
      ...todos[index],
      completedOn: completedOn
    }
    
    let updateCompletedArr = [...completedTodos];
    updateCompletedArr.push(filteredItem);
    setCompletedTodos(updateCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updateCompletedArr))
  }

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompleted = JSON.parse(localStorage.getItem('completedTodos'))
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompleted) {
      setCompletedTodos(savedCompleted);
    }
  }, [])

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">

            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Task title" />

          </div>
          <div className="todo-input-item">

            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Task description" />

          </div>
          <div className="todo-input-item">
            {addShow ? <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button> : <button type="button" onClick={handleEditSubmit} className="primaryBtn">Edit</button>}

          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleateScreen === false && "active"}`}
            onClick={() => setIsCompleateScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleateScreen === true && "active"}`}
            onClick={() => setIsCompleateScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleateScreen === false && todos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineCheckSquare className="check-icon" onClick={() => handleComplete(index)} />
                  <BiSolidEdit className="edit-icon" onClick={() => handleEdit(index)} />
                  <RiDeleteBin6Line className="icon" onClick={() => handleDeleteTodo(index)} title="Delete" />


                </div>
              </div>
            )
          })}
          {isCompleateScreen === true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><i>Completed on:{item.completedOn}</i></p>
                </div>
                <div>

                  <RiDeleteBin6Line className="icon" onClick={() => handleDeleteCompletedTodo(index)} title="Delete" />

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
