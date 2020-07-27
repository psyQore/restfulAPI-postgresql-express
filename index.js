const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // => req.body

// Routes

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1 ", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
  // console.log(req.params)
});

// create a todo
app.post("/todos", async (req, res) => {
  try {
    // await
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
    // console.log(req.body); para testear ruta
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; // Where
    const { description } = req.body; // Set

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo Actualizado");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("El Todo se ha eliminado correctamente");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(4000, () => {
  console.log("Serve on Port http://localhost:4000");
});
