import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const api_url = "https://sebadev-todo-express.herokuapp.com/api/v1";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  const getAllTasks = async (url) => {
    try {
      const list = await axios.get(url + "/tasks");
      console.log(list.data.task);
      setList(list.data.task);
    } catch (error) {
      console.log(error);
    }
  };

  const postTask = async (url, name) => {
    try {
      const newTask = await axios.post(url + "/tasks", {
        name: name,
        completed: false,
      });
      console.log(newTask.data.task);
      const newList = [...list, newTask.data.task];
      setList(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (url, id) => {
    try {
      const deletedTask = await axios.delete(url + "/tasks" + `/${id}`);
      console.log(deletedTask);
      const newList = list.filter((item) => item._id !== id);
      setList(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (name) {
      postTask(api_url, name);
    }
    setName("");
  };

  const deleteItem = (id) => {
    if (id) {
      deleteTask(api_url, id);
    }
  };

  useEffect(() => {
    getAllTasks(api_url);
  }, []);
  return (
    <>
      <header>TODO-MERN</header>
      <main>
        <form className="form-container" onSubmit={addItem}>
          <input
            type="text"
            placeholder="Ingrese Texto"
            value={name}
            onChange={handleChange}
          />
          <button type="submit">Agregar</button>
        </form>
        {list.length > 0 && (
          <div className="list-container">
            {list.map((item) => {
              return (
                <div className="item-container" key={item._id}>
                  <p>{item.name}</p>
                  <button
                    className="del-btn"
                    onClick={() => deleteItem(item._id)}
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
