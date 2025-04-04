// main.js
const { app, start } = require('./litez.js');

app("TodoApp", {
  data: {
    title: "My Todo List",
    todos: ["Learn LiteZ", "Build an App"],
    completed: []
  },

  ui: {
    heading: "title size=24",
    list: "todos as 'pending' tap=toggleTodo",
    list: "completed as 'done' tap=toggleTodo",
    button: "'Add New Todo' tap=addTodo"
  },

  actions: {
    addTodo() {
      this.data.todos.push("New Task");
    },

    toggleTodo(task, index, list) {
      if (list === this.data.todos) {
        this.data.todos.remove(index);
        this.data.completed.push(task);
      } else {
        this.data.completed.remove(index);
        this.data.todos.push(task);
      }
    }
  }
});

start("TodoApp");

// Optional: Test an action
// const todoApp = LiteZ.apps["TodoApp"];
// todoApp.trigger("addTodo"); // Adds "New Task"
// todoApp.trigger("toggleTodo", "Learn LiteZ", 0, todoApp.data.todos); // Moves "Learn LiteZ" to completed