import { ToDoItem, Project, projectManager } from "./functions";
import "./styles.css";

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
<li>${projectData.name}</li>
<button data-index='${i}'>delete</button>
<button data-index='${i}'>select</button>


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
  const editTodoForm = document.querySelector("#edit-todo-form");

  todoListWrapper.innerHTML = "";
  console.log(todoData, "ec");
  todoData.forEach((todo, index) => {
    let todoEl = document.createElement("div");
    todoEl.innerHTML = `
<p>${todo.title}</p>
<p>${todo.description}</p>
<p>${todo.dueDate}</p>
<p>${todo.priority}</p>
<p>${todo.notes}</p>
<button id='edit-btn' data-id='${todo.id}'>Edit</button>
<button id='delete-btn' data-index='${index}'>Delete</button>
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

    const deleteButton = todoEl.querySelector("#delete-btn");
    deleteButton.addEventListener("click", () => {
      projects.removeTodo(index);
      renderTodoList();
    });

    const indexedTodo = todoData[index];

    const todoEditName = document.querySelector("#edit-todo-name");
    const todoEditDescription = document.querySelector(
      "#edit-todo-description"
    );
    const todoEditDate = document.querySelector("#edit-todo-date");
    const todoEditPriority = document.querySelectorAll(
      "input[name='edit-todo-priority']"
    );
    const todoEditNotes = document.querySelector("#edit-todo-notes");
    const editButton = todoEl.querySelector("#edit-btn");
    const editModal = document.querySelector("#edit-modal");

    editButton.addEventListener("click", (e) => {
      todoEditName.value = indexedTodo.title;
      todoEditDescription.value = indexedTodo.description;
      todoEditDate.value = indexedTodo.dueDate;
      todoEditPriority.forEach((radioButton) => {
        if (radioButton.value === indexedTodo.priority) {
          radioButton.checked = true;
        }
      });
      todoEditNotes.value = indexedTodo.notes;

      editModal.style.display = "flex";

      editTodoForm.dataset.todoId = editButton.dataset.id;
    });

    todoListWrapper.appendChild(todoEl);

    editTodoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = editTodoForm.dataset.todoId;
      const selectedPriority = Array.from(todoEditPriority).find(
        (radio) => radio.checked
      )?.value;

      const editedTodo = new ToDoItem(
        todoEditName.value,
        todoEditDescription.value,
        todoEditDate.value,
        selectedPriority,
        todoEditNotes.value
      );
      projects.updateTodo(id, editedTodo);
      renderTodoList();
      editModal.style.display = "none";
    });

    const cancelEditBtn = document.querySelector("#cancel-edit");
    cancelEditBtn.addEventListener("click", () => {
      console.log("check");
      editModal.style.display = "none";
    });
  });
}

const todoForm = document.querySelector("#todo-form");

todoForm.addEventListener("submit", (e, projects = project1) => {
  e.preventDefault();
  const todoName = document.querySelector("#todo-name");
  const todoDescription = document.querySelector("#todo-description");
  const todoDate = document.querySelector("#todo-date");
  const todoNotes = document.querySelector("#todo-notes");
  const todoPriority = document.querySelectorAll("input[name='todo-priority']");
  const selectedPriority = Array.from(todoPriority).find(
    (radio) => radio.checked
  )?.value;

  const newTodo = new ToDoItem(
    todoName.value,
    todoDescription.value,
    todoDate.value,
    selectedPriority,
    todoNotes.value
  );
  projects.addTodo(newTodo);
  renderTodoList();
});

renderTodoList();
