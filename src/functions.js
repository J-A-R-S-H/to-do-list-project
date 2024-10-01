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
      saveProjectsToLocalStorage();
    } else {
      console.log("Didn't work adding the todo item");
    }
  }

  removeTodo(todo) {
    if (todo > -1) {
      this.todos.splice(todo, 1);
      saveProjectsToLocalStorage();
    }
  }

  updateTodo(id, updatedTodo) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index > -1) {
      const todo = this.todos[index];
      Object.assign(todo, updatedTodo);
      saveProjectsToLocalStorage();
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
          saveProjectsToLocalStorage();
        }
      },
      listProjects() {
        return projects;
      },

      removeProject(project) {
        if (project > -1) {
          projects.splice(project, 1);
          saveProjectsToLocalStorage();
        }
      },
    };
  }

  if (!instance) {
    instance = init();
  }

  return instance;
}

export const projectManager = ProjectManager();

function loadProjectsFromLocalStorage() {
  const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
  savedProjects.forEach((projectData) => {
    const project = new Project(projectData.name);
    projectData.todos.forEach((todoData) => {
      const todo = new ToDoItem(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority,
        todoData.notes,
        todoData.checked,
        todoData.id
      );
      project.addTodo(todo);
    });
    projectManager.addProject(project);
  });
}

loadProjectsFromLocalStorage();

function saveProjectsToLocalStorage() {
  const projects = projectManager.listProjects();
  localStorage.setItem("projects", JSON.stringify(projects));
}
