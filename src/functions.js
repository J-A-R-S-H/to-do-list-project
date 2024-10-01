export class ToDoItem {
  constructor(
    title,
    description,
    dueDate,
    priority = "",
    notes = "",
    checked = false,
    id = generateUniqueId()
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checked = checked;
    this.id = id;
  }
}

function generateUniqueId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export class Project {
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
    if (todo > -1) {
      this.todos.splice(todo, 1);
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

function ProjectManager() {
  let instance;
  function init() {
    const projects = [];
    return {
      addProject(project) {
        if (project instanceof Project) {
          projects.push(project);
        }
      },
      listProjects() {
        return projects;
      },

      removeProject(project) {
        if (project > -1) {
          projects.splice(project, 1);
        }
      },
    };
  }

  if (!instance) {
    instance = init();
  }

  return instance;
}

export const project1 = new Project("Sample Project 1");
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

export const projectManager = ProjectManager();
const project2 = new Project("Sample Project 2");
projectManager.addProject(project1);
projectManager.addProject(project2);
console.log(projectManager.listProjects(), "test");

projectManager.removeProject(1);
const todo1 = new ToDoItem(
  "test",
  "test",
  "2023-12-31",
  "High",
  "Notes",
  false
);
const todo2 = new ToDoItem(
  "smt else",
  "test",
  "2023-12-31",
  "High",
  "Notes",
  false
);
project1.addTodo(todo1);
project1.addTodo(todo2);

let projectSereliazed = JSON.stringify(project1);
localStorage.setItem("project1", projectSereliazed);
console.log(localStorage, "localstorgea");
let projectDeSerialized = JSON.parse(localStorage.getItem("project1"));

console.log(projectDeSerialized, "deserial");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
