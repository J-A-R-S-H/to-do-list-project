import { ToDoItem, Project, projectManager, project1 } from "./functions";
import "./styles.css";

const projectForm = document.querySelector("#project-form");
const projectTitle = document.querySelector("#project-title");
const projectWrapper = document.querySelector("#project-wrapper");
const addModal = document.querySelector("#add-modal");

function useState(initialValue) {
  let state = initialValue;

  function setState(newValue) {
    state = newValue;
  }

  function getState() {
    return state;
  }

  return [getState, setState];
}
const [getterPL, setterPl] = useState(project1);

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
<button id='delete-btn' data-index='${i}'><svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" fill-rule="nonzero"/></svg></button>
<button id='select-btn' data-index='${i}'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.764 17.385l2.66 5.423-2.441 1.192-2.675-5.474-3.308 2.863v-12.389l10 7.675-4.236.71zm2.236-7.385h2v-4h-2v4zm0 2.619l2 1.535v-2.154h-2v.619zm-10 8.77v-1.389h-4v2h4v-.611zm-8-3.389h-2v4h4v-2h-2v-2zm-2-14h2v-2h2v-2h-4v4zm2 8h-2v4h2v-4zm8-12h-4v2h4v-2zm6 0h-4v2h4v-2zm4 4h2v-4h-4v2h2v2zm-18 2h-2v4h2v-4z"/></svg></button>


`;

    const deleteButton = projectEl.querySelector("#delete-btn"); //damn this is actually so smart, I stole this but selecting projectEl instead of the document query select sheesh
    deleteButton.addEventListener("click", () => {
      projectManager.removeProject(i);
      renderProjectsList();
    });
    const selectButton = projectEl.querySelector("#select-btn");
    selectButton.addEventListener("click", () => {
      console.log(projectManager.listProjects()[i], "test");
      console.log(i);
      setterPl(projectManager.listProjects()[i]);
      console.log(getterPL(), "getter");
      renderProjectsList();
      renderTodoList();
    });

    projectWrapper.appendChild(projectEl);
  }
}

renderProjectsList();

const todoListWrapper = document.querySelector("#todoListWrapper");

function renderTodoList(projects = getterPL()) {
  const todoData = projects.listTodos();
  const editTodoForm = document.querySelector("#edit-todo-form");

  todoListWrapper.innerHTML = "";
  console.log(todoData, "ec");
  todoData.forEach((todo, index) => {
    let todoEl = document.createElement("div");
    todoEl.classList.add("card-container");
    todoEl.innerHTML = `
    <div class='card-start'>
    <input type='checkbox' id='todo-checkbox' data-id='${todo.id}'>
<h2>${todo.title}</h2> 

<p>${todo.description}</p>
<p>${todo.dueDate}</p>
<p>${todo.priority}</p>
<p> ${todo.notes}</p>
</div>
<div class='card-end'>
<button id='edit-btn' data-id='${todo.id}'>Edit</button>
<button id='delete-btn' data-index='${index}'>Delete</button>
</div>
    `;
    const allCheckboxes = todoEl.querySelectorAll("#todo-checkbox");
    console.log(allCheckboxes, "checkboxes");

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
      editModal.style.display = "none";
    });
    const addBtn = document.querySelector(".add-btn");
    addBtn.addEventListener("click", () => {
      addModal.style.display = "flex";
    });
  });
}

const todoForm = document.querySelector("#todo-form");

todoForm.addEventListener("submit", (e, projects = getterPL()) => {
  e.preventDefault();

  addModal.style.display = "none";

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

  const currentProject = getterPL();
  currentProject.addTodo(newTodo);
  renderTodoList(currentProject);
});

renderTodoList();
