class ToDoItem {
  constructor(title, description, dueDate, priority, notes = "") {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.notes = notes;
  }
}

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    if (todo instanceof ToDoItem) {
      this.todos.push(todo);
    } else {
      console.log("Didn't work adding the todo item");
    }
  }

  listTodos() {
    return this.todos;
  }
}

// Example usage:
const project = new Project("Sample Project");
const todo = new ToDoItem("test", "tset", "2023-12-31", "High", "Notes");

console.log(project);
project.addTodo(todo);
console.log(project.listTodos());
