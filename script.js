const tasks = []

const renderTask = (task) => {
        let targetId = ""
    
    if (task.status == "Today") {
        targetId = "tasks-today"
    } else if (task.status == "Later") {
        targetId = "tasks-later"
    } else if (task.status == "Done") {
        targetId = "tasks-done"
    }
    
    document.getElementById(targetId).innerHTML += `<div class="task">
        <div class="checkbox"></div>
        <span class="task-text">${task.text}</span>
        <span class="priority ${task.priority}">${task.priority}</span>
        <span class="tag ${task.label}">${task.label}</span>
        </div>`
    }

tasks.forEach((task) => renderTask(task))


const taskClick = document.getElementById('add-btn');
const emptyTaskClick = document.getElementById('empty-add-btn')
const taskPopup = document.getElementById('newtask-popup');
const overlay =document.getElementById('overlay')

taskClick.addEventListener('click', () => {
    taskPopup.classList.remove('hidden')
    overlay.classList.remove('hidden')
})

emptyTaskClick.addEventListener('click', () => {
    taskPopup.classList.remove('hidden')
    overlay.classList.remove('hidden')
})


const cancelPopup = document.getElementById('cancel-btn');
cancelPopup.addEventListener('click', () => {
    taskPopup.classList.add('hidden')
    overlay.classList.add('hidden')
})

const addTask = document.getElementById('done-btn')

addTask.addEventListener('click', () => {
    const popupInput = document.getElementById('task-name').value;
    const popupTaskDate = document.getElementById('task-date').value;
    const popupTaskPriority = document.getElementById('task-priority').value;
    const popupTaskLabel = document.getElementById('task-label').value;

    const newTask = {
    "text" : popupInput,
    "label" : popupTaskLabel,
    "status" : popupTaskDate,
    "priority" : popupTaskPriority
    }

    tasks.push(newTask)
    renderTask(newTask)
    checkEmptySections()
})

const checkEmptySections = () => {
    const todayLength = document.getElementById('tasks-today').children.length
    const laterLength = document.getElementById('tasks-later').children.length
    const doneLength = document.getElementById('tasks-done').children.length
    const sectionToday = document.getElementById('section-today')
    const sectionLater = document.getElementById('section-later')
    const sectionDone = document.getElementById('section-done')
    const emptyState = document.getElementById('empty-state')

    if (todayLength == 0){
        sectionToday.classList.add('hidden')
    }else {
        sectionToday.classList.remove('hidden')
    }if (laterLength == 0){
        sectionLater.classList.add('hidden')
    }else {
        sectionLater.classList.remove('hidden')
    }if (doneLength === 0){
        sectionDone.classList.add('hidden')
    }else {
        sectionDone.classList.remove('hidden')
    }

    if (todayLength == 0 && laterLength == 0 && doneLength == 0) {
        emptyState.classList.remove('hidden')
    }else emptyState.classList.add('hidden')
}

checkEmptySections()




