// src/app.js
import { app } from './litez';

export default app({
  data: {
    title: "My Todo List",
    todos: ["Learn LiteZ", "Build an App"],
    completed: []
  },

  ui: {
    heading: "title size=24",
    pendingList: "todos as='Pending' tap=toggleTodo",
    doneList: "completed as='Done' tap=toggleTodo",
    button: "'Add New Todo' tap=addTodo"
  },

  actions: {
    addTodo() {
      this.data.todos.push("New Task");
    },

    toggleTodo(task, index, list) {
      if (list === this.data.todos) {
        this.data.todos.splice(index, 1);
        this.data.completed.push(task);
      } else {
        this.data.completed.splice(index, 1);
        this.data.todos.push(task);
      }
    }
  }
});