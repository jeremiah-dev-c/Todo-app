const savedTasks = localStorage.getItem('tasks')
const tasks = savedTasks ? JSON.parse(savedTasks) : []

const savedLabels = localStorage.getItem('labels')
const labels = savedLabels ? JSON.parse(savedLabels) : []

let selectedColor = '#61A5FA'

const renderTask = (task) => {
        let targetId = ""
    
    if (task.status == "Today") {
        targetId = "tasks-today"
    } else if (task.status == "Later") {
        targetId = "tasks-later"
    } else if (task.status == "Done") {
        targetId = "tasks-done"
    }

    const labelColor = labels.find(l => l.name == task.label)?.color || '#b8d2ec'
    
    document.getElementById(targetId).innerHTML += `<div class="task ${task.status == "Done" ? "checked" : ""}" data-id="${task.id}"> 
        <div class="checkbox">
        <span class="material-symbols-outlined">check</span></div>
        <span class="task-text">${task.text}</span>
        <span class="priority ${task.priority}">${task.priority}</span>
        <span class="tag" style="color: ${labelColor}; border-color: ${labelColor};">${task.label}</span>
        </div>`

        
    }


tasks.forEach((task) => renderTask(task))


const taskClick = document.getElementById('add-btn');
const taskPopup = document.getElementById('newtask-popup');
const overlay = document.getElementById('overlay')

    taskClick.addEventListener('click', () => {
        taskPopup.classList.remove('hidden')
        overlay.classList.remove('hidden')

        document.getElementById('task-label').innerHTML = labels.map(label =>
        `<option>${label.name}</option>`
        ).join('')
    })

const emptyTaskClick = document.getElementById('empty-add-btn');

emptyTaskClick.addEventListener('click', () => {
    taskPopup.classList.remove('hidden')
    overlay.classList.remove('hidden')

    document.getElementById('task-label').innerHTML = labels.map(label =>
        `<option>${label.name}</option>`
        ).join('')
})

const taskNameInput = document.getElementById('task-name');
const cancelPopup = document.getElementById('cancel-btn');

cancelPopup.addEventListener('click', () => {
    taskPopup.classList.add('hidden')
    overlay.classList.add('hidden')
    taskNameInput.value = ""
    errorMessage.classList.add('hidden')
    taskNameInput.classList.remove('required')
})

const addTask = document.getElementById('done-btn');

const errorMessage = document.getElementById('error-message');

addTask.addEventListener('click', () => {
    const popupInput = document.getElementById('task-name').value;
    const popupTaskDate = document.getElementById('task-date').value;
    const popupTaskPriority = document.getElementById('task-priority').value;
    const popupTaskLabel = document.getElementById('task-label').value;

    const newTask = {
    "id": Date.now(),
    "text" : popupInput,
    "label" : popupTaskLabel,
    "status" : popupTaskDate,
    "priority" : popupTaskPriority
    }

    if (popupInput == "") {
        errorMessage.classList.remove('hidden')
        taskNameInput.classList.add('required')
    }else {
        tasks.push(newTask)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        taskPopup.classList.add('hidden')
        renderTask(newTask, tasks.length - 1)
        overlay.classList.add('hidden')
        checkEmptySections()
    }

    taskNameInput.value = ""
})

const checkEmptySections = () => {
    const todayLength = document.getElementById('tasks-today').children.length
    const laterLength = document.getElementById('tasks-later').children.length
    const doneLength = document.getElementById('tasks-done').children.length
    const sectionToday = document.getElementById('section-today')
    const sectionLater = document.getElementById('section-later')
    const sectionDone = document.getElementById('section-done')

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

    const emptyState = document.getElementById('empty-state')

    if (todayLength == 0 && laterLength == 0 && doneLength == 0) {
        emptyState.classList.remove('hidden')
    }else emptyState.classList.add('hidden')
}


document.getElementById('task-list').addEventListener('click', (event) => {
    if (event.target.closest('.checkbox')){
        event.target.closest('.task').classList.add('checked')
        const id = event.target.closest('.task').dataset.id
        const task = tasks.find(t => t.id == id)
        if (task.status == 'Done'){
            tasks.splice(tasks.indexOf(task), 1)
            event.target.closest('.task').remove()
            localStorage.setItem('tasks', JSON.stringify(tasks))
            checkEmptySections()
        }else {
            task.status = "Done"
            localStorage.setItem('tasks', JSON.stringify(tasks))
            event.target.closest('.task').remove()
            renderTask(task)
            checkEmptySections()
        }
    }
})

const labelClick = document.getElementById('add-label');
const labelPopup = document.getElementById('label-popup');

labelClick.addEventListener('click', () => {
    labelPopup.classList.remove('hidden')
    overlay.classList.remove('hidden')
    document.querySelector('.color-dot').classList.add('selected')
})

const labelErrorMessage = document.getElementById('label-error-message');
const labelInput = document.getElementById('label-input');
const cancelLabelPopup = document.getElementById('cancel-label-btn');

cancelLabelPopup.addEventListener('click', () => {
    labelPopup.classList.add('hidden')
    overlay.classList.add('hidden')
    labelInput.value = ""
    labelErrorMessage.classList.add('hidden')
    labelInput.classList.remove('required')
    document.querySelector('.color-dot').classList.add('selected')
    document.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('selected'))
    document.getElementById('preview-label-dot').style.backgroundColor = ''
    document.getElementById('preview-label-text').style.color = ''
    document.getElementById('preview-label-text').textContent = 'My label'
})


document.getElementById('color-palette').addEventListener('click', (event) => {
    if (event.target.classList.contains('color-dot')) {
        selectedColor = event.target.dataset.color
        const previewDot = document.getElementById('preview-label-dot')
        const previewText = document.getElementById('preview-label-text')
        previewDot.style.backgroundColor = selectedColor
        previewText.style.color = selectedColor
        document.querySelectorAll('.color-dot').forEach(dot => {
        dot.classList.remove('selected')
        })
        event.target.classList.add('selected')
    }
})

const logLabelInput = document.getElementById('preview-label-text');

const updateValue = (e) => {
    logLabelInput.textContent = e.target.value;
}

labelInput.addEventListener('input', updateValue)

const saveLabel = document.getElementById('save-label-btn')

saveLabel.addEventListener('click', () => {
    const labelName = document.getElementById('label-input').value

    const labelData = {
    "id" : Date.now(),
    "name" : labelName,
    "color" : selectedColor
    }

    if (labelInput.value == "") {
        labelErrorMessage.classList.remove('hidden')
        labelInput.classList.add('required')
    }else {
        labels.push(labelData)
        localStorage.setItem('labels', JSON.stringify(labels))
        labelPopup.classList.add('hidden')
        labelErrorMessage.classList.add('hidden')
        renderLabels(labelData)
        overlay.classList.add('hidden')
        document.getElementById('preview-label-dot').style.backgroundColor = ''
        document.getElementById('preview-label-text').style.color = ''
        document.getElementById('preview-label-text').textContent = 'My label'
        labelInput.classList.remove('required')
        document.querySelector('.color-dot').classList.add('selected')
        document.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('selected'))
        checkEmptySections()
    }

    if (labels.length >= 5) {
        labelClick.classList.add('hidden')
    }

    labelInput.value = ""
})

    const renderLabels = (labels) => {

    document.getElementById('label-list').innerHTML += `
    <div class="cat" id="filter-label" data-id="${labels.id}">
        <span class="label-dot" style="background-color:${labels.color};"></span>
            ${labels.name}
        <span class="count" id="count-test"></span>
        <span class="delete-label-icon  material-symbols-outlined" id="delete-label-btn">close</span>
    </div>`
    }

labels.forEach((labels) => renderLabels(labels))

document.getElementById('label-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-label-icon')){
        const id = event.target.closest('.cat').dataset.id
        const label = labels.find(t => t.id == id)
        labels.splice(labels.indexOf(label), 1)
        event.target.closest('.cat').remove()
        localStorage.setItem('labels', JSON.stringify(labels))
    }
    if (labels.length < 5) {
        labelClick.classList.remove('hidden')
    }
})

const filterAll = document.getElementById('filter-all')
const filterToday = document.getElementById('filter-today');
const filterDone = document.getElementById('filter-done');

filterAll.addEventListener('click', () => {
    document.querySelectorAll('.cat').forEach(cat => cat.classList.remove('active'))
    filterAll.classList.add('active')
    document.getElementById('tasks-today').innerHTML = ""
    document.getElementById('tasks-later').innerHTML = ""
    document.getElementById('tasks-done').innerHTML = ""
    document.getElementById('section-today').classList.remove('hidden')
    document.getElementById('section-later').classList.remove('hidden')
    document.getElementById('section-done').classList.remove('hidden')
   tasks.forEach((task) => renderTask(task))
})

filterToday.addEventListener('click', () => {
    document.querySelectorAll('.cat').forEach(cat => cat.classList.remove('active'))
    filterToday.classList.add('active')
    document.getElementById('tasks-today').innerHTML = ""
    document.getElementById('tasks-later').innerHTML = ""
    document.getElementById('tasks-done').innerHTML = ""
    document.getElementById('section-later').classList.add('hidden')
    document.getElementById('section-done').classList.add('hidden')
    document.getElementById('section-today').classList.remove('hidden')
    tasks.filter(task => task.status == "Today").forEach(task => renderTask(task))
})

filterDone.addEventListener('click', () => {
    document.querySelectorAll('.cat').forEach(cat => cat.classList.remove('active'))
    filterDone.classList.add('active')
    document.getElementById('tasks-today').innerHTML = ""
    document.getElementById('tasks-later').innerHTML = ""
    document.getElementById('tasks-done').innerHTML = ""
    document.getElementById('section-today').classList.add('hidden')
    document.getElementById('section-later').classList.add('hidden')
    document.getElementById('section-done').classList.remove('hidden')
    tasks.filter(task => task.status == "Done").forEach(task => renderTask(task))
})



checkEmptySections()




