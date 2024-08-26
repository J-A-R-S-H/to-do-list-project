export class ToDoItem {
  constructor(
    title,
    description,
    dueDate,
    priority,
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
    const todos = [];

    return {
      addProject(project) {
        if (project instanceof Project) {
          projects.push(project);
        }
      },
      listProjects() {
        return projects;
      },
      removeProject(projectId) {
        const index = projects.findIndex((p) => p.id === projectId);
        if (index > -1) {
          projects.splice(index, 1);
          // Optionally remove todos associated with the project
          todos = todos.filter((todo) => todo.projectId !== projectId);
        }
      },
      addTodoToProject(todo, projectId) {
        const projectExists = projects.some((p) => p.id === projectId);
        if (projectExists && todo instanceof ToDoItem) {
          todos.push({ ...todo, projectId });
        }
      },
      listTodos() {
        return todos;
      },
      removeTodoById(todoId) {
        const index = todos.findIndex((todo) => todo.id === todoId);
        if (index > -1) {
          todos.splice(index, 1);
        }
      },
      updateTodoById(todoId, updatedTodo) {
        const index = todos.findIndex((todo) => todo.id === todoId);
        if (index > -1) {
          Object.assign(todos[index], updatedTodo);
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

export const projectManager = ProjectManager();
const project2 = new Project("Sample Project 2");
projectManager.addProject(project1);
projectManager.addProject(project2);
console.log(projectManager.listProjects(), "test");

projectManager.removeProject(1);
