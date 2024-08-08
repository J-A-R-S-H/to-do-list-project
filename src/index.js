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

function renderTodoList() {
  renderTodoList.innerHTML = "";
  for (let i = 0; i < project1.listTodos().length; i++) {
    console.log(i, "yes");
  }
}

renderTodoList();
