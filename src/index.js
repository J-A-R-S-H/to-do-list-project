import { ToDoItem, Project, projectManager } from "./functions";

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

const project1 = new Project("Sample Project 1");
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

console.log(project1.listTodos());
const todoListWrapper = document.querySelector("#todoListWrapper");

function renderTodoList(projects = project1) {
  const todoData = projects.listTodos();
  todoListWrapper.innerHTML = "";
  console.log(todoData, "ec");
  todoData.forEach((todo, index) => {
    let todoEl = document.createElement("div");
    todoEl.innerHTML = `
<p>${todo.title}</p>
<p>${todo.description}</p>
<p>${todo.dueDate}</p>
<p>${todo.notes}</p>
<button data-index='${index}'>Delete</button>
<input type='checkbox' id='todo-checkbox' data-id='${todo.id}'>
    `;
    const allCheckboxes = todoEl.querySelectorAll("#todo-checkbox");
    console.log(allCheckboxes, "null");

    allCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const id = e.target.dataset.id;
        const updatedTodo = {
          checked: e.target.checked,
        };
        projects.updateTodo(id, updatedTodo);
        console.log(project1.listTodos());
      });
    });
    todoListWrapper.appendChild(todoEl);
  });
}

renderTodoList();

const todoForm = document.querySelector("#todo-form");
const todoName = document.querySelector("#todo-name");

todoForm.addEventListener("submit", (e, projects = project1) => {
  e.preventDefault();
  const newTodo = new ToDoItem(todoName.value, "", "2024-08-25", "", "", "");
  projects.addTodo(newTodo);
  renderTodoList();
});
