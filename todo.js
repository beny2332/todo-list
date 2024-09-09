// Get DOM elements
const taskInput = document.getElementById('task-input')
const addTaskButton = document.getElementById('add-task-button')
const taskList = document.getElementById('task-list')

// Add event listener to the add task button
addTaskButton.addEventListener('click', addTask)

// Function to create a new task item
function createTaskItem(task) {
      const taskItem = document.createElement('div')

      // Create and append checkbox
      const taskCheckbox = document.createElement('input')
      taskCheckbox.type = 'checkbox'
      taskCheckbox.checked = task.completed
      taskItem.appendChild(taskCheckbox)

      // Create and append task text
      const taskTitle = document.createElement('title')
      taskTitle.textContent = task.text
      taskTitle.style.textDecoration = task.completed ? 'line-through' : 'none'
      taskItem.appendChild(taskTitle)

      // Create and append delete button
      const taskDeleteButton = document.createElement('button')
      taskDeleteButton.textContent = '🗑️'
      taskItem.appendChild(taskDeleteButton)

      // Add event listener for checkbox to toggle completion
      taskCheckbox.addEventListener('change', function() {
        taskTitle.style.textDecoration = this.checked ? 'line-through' : 'none'
        saveToLocalStorage()
      })

      // Add event listener for delete button
      taskDeleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem)
        saveToLocalStorage()
      })

      // Add event listener for title change
      taskTitle.addEventListener('click', () => {
        taskTitle.contentEditable = 'true'
        taskTitle.focus()
      } )

      // Add event listener for when editing is finished
      taskTitle.addEventListener('blur', () => {
        taskTitle.contentEditable = 'false'
        saveToLocalStorage()
      })

      // Add a keydown event listener to handle the Enter key
      taskTitle.addEventListener('keydown', (event)=>{
        if (event.key === 'Enter'){
          event.preventDefault()
          taskTitle.blur()
        }
      })

      return taskItem
}
// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim()
    if (taskText !== '') {
      const task = {
        text: taskText,
        completed: false
      }
      const taskItem = createTaskItem(task)
      taskList.appendChild(taskItem)
      taskInput.value = ''
      saveToLocalStorage()
    }
}



// Function to save tasks to local storage
function saveToLocalStorage() {
    const tasks = Array.from(taskList.children).map(taskItem => ({
      text: taskItem.querySelector('title').textContent,
      completed: taskItem.querySelector('input').checked
    }))
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(task => {
      const taskItem = createTaskItem(task)
      taskList.appendChild(taskItem)
    })
}

// Load tasks when the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage)