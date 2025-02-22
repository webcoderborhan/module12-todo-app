// Selecting necessary elements
// Input field for new task

const newTaskInput = document.getElementById("new-task");
// Button to add/update task
const addTaskButton = document.getElementById("addTask");
// List of incomplete tasks
const incompleteTaskList = document.getElementById("items");
// List of completed tasks
const completeTaskList = document.querySelector(".complete-list ul");

// Variable to track the task being edited
let editingTask = null;

// Function to create a new task element
function createTaskElement(taskText) {
  // Li Creattion
  const li = document.createElement("li");
  console.log(li);
  li.classList.add("item");

  // Checkbox creation
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  // complete event fire
  checkbox.addEventListener("change", completeTask);

  // Label Creation
  const label = document.createElement("label");
  label.textContent = taskText;

  // Edit Button Creation
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit");
  // edit event fire
  editButton.addEventListener("click", editTask);

  // add element to the list item (li)
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(editButton);

  return li;
}

// Function to add or update a task
function addOrUpdateTask(event) {
  // Prevent browser reload
  event.preventDefault();

  //   Get the task text
  const taskText = newTaskInput.value.trim();
  //  if input is empty do nothing
  if (taskText === "") return;

  if (editingTask) {
    // editing task
    editingTask.querySelector("label").textContent = taskText;
    addTaskButton.value = "Add Task";
    editingTask = null;
  } else {
    // Add new task
    const listItem = createTaskElement(taskText);
    incompleteTaskList.appendChild(listItem);
  }

  newTaskInput.value = ""; //Clear the input field
}

// Event listener for adding or updating a task
addTaskButton.addEventListener("click", addOrUpdateTask);

// Function to edit an existing task
function editTask() {
  const listItem = this.parentElement; // get the parent(li)
  const label = listItem.querySelector("label"); // get label
  //   Populate the new task input field with the incomplete task text
  newTaskInput.value = label.textContent;

  //   Update the add task button to update task
  addTaskButton.value = "Update Task";
  editingTask = listItem; // set the editing mode
}

// Function to mark a task as completed
function completeTask() {
  const listItem = this.parentElement; // get the parent (li)
  this.remove(); //Remove the checkbox when it is checked as completed
  listItem.querySelector(".edit").remove(); // remove the edit button to the completed panel

  //  Delete Button Creation
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", deleteTask);

  listItem.appendChild(deleteButton); // add the delete button to the completed panel's li

  //Add the task item to completed panel
  completeTaskList.appendChild(listItem);
}

// Function to delete a completed task
function deleteTask() {
  const listItem = this.parentElement; // get parent (li)
  listItem.remove();
}

