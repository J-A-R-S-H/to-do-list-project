export class ToDoItem {
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

export function ProjectManager() {
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

const projectManager = ProjectManager();
const project2 = new Project("Sample Project 2");
projectManager.addProject(project1);
projectManager.addProject(project2);
console.log(projectManager.listProjects(), "test");

projectManager.removeProject(1);

// // What to do next
// Complete CRUD Operations:

// Project Management:

// Create Projects: Implement functionality to create new projects.
// Delete Projects: Add functionality to delete projects.
// List Projects: Ensure you can list all projects.

const projectForm = document.querySelector("#project-form");
const projectTitle = document.querySelector("#project-title");
const projectWrapper = document.querySelector("#project-wrapper");

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  projectManager.addProject(new Project(projectTitle.value));
  console.log(projectManager.listProjects(), "added");

  renderProjectsList();
});

function renderProjectsList() {
  projectWrapper.innerHTML = "";
  for (let i = 0; i < projectManager.listProjects().length; i++) {
    const projectData = projectManager.listProjects()[i];
    console.log(projectData, "project data");

    let projectEl = document.createElement("div");
    projectEl.innerHTML = `
<p>${projectData.name}</p>
<button data-index='${i}'>delete</button>
`;

    const deleteButton = projectEl.querySelector("button"); //damn this is actually so smart, I stole this but selecting projectEl instead of the document query select sheesh
    deleteButton.addEventListener("click", () => {
      projectManager.removeProject(i);
      renderProjectsList();
    });
    projectWrapper.appendChild(projectEl);
  }
}

renderProjectsList();
