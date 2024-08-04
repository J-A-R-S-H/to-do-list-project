function toDoItem(title, description, dueDate, priority, notes = "") {
  return {
    title,
    description,
    dueDate: new Date(dueDate),
    priority,
    notes,
  };
}
