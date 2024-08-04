class ToDoItem {
  constructor(
    title,
    description,
    dueDate,
    priority,
    notes = "",
    checked = false,
    id = Date.now()
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.notes = notes;
    this.checked = checked;
    this.id = id;
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

  removeTodo(todo) {
    const index = this.todos.indexOf(todo);
    if (index > -1) {
      this.todos.splice(index, 1);
    }
  }

  updateTodo(id, updatedTodo) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index > -1) {
      const todo = this.todos[index];
      Object.assign(todo, updatedTodo);
    }
  }

  listTodos() {
    return this.todos;
  }
}

class ProjectManager {
  constructor(name) {
    this.name = name;
    this.projects = [];
  }

  addProject(project) {
    if (project instanceof Project) {
      this.projects.push(project);
    }
  }

  listProjects() {
    return this.projects;
  }
}

const project1 = new Project("Sample Project 1");
const todo = new ToDoItem("test", "test", "2023-12-31", "High", "Notes", false);

project1.addTodo(todo);
console.log(project1);
console.log(project1.listTodos());

const updatedProperties1 = {
  title: "Updated Title",
  description: "Updated Description",
  dueDate: "2024-01-01",
  priority: "Medium",
  notes: "Updated Notes",
  checked: true,
};

project1.updateTodo(todo.id, updatedProperties1);
console.log(project1.listTodos());

const projectTest = new ProjectManager("Project Manager");
const project2 = new Project("Sample Project 2");
projectTest.addProject(project1);
projectTest.addProject(project2);

console.log(projectTest, "test");

// // What to do next
// Complete CRUD Operations:

// Project Management:

// Create Projects: Implement functionality to create new projects.
// Delete Projects: Add functionality to delete projects.
// List Projects: Ensure you can list all projects.
