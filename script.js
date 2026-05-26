const tasks = [
    {
        "text" : "Meeting with product owner",
        "label" : "dev",
        "status" : "today",
        "priority" : "medium"
    },
    {
        "text" : "Finalize mock-up",
        "label" : "design",
        "status" : "later",
        "priority" : "low"
    },
    {
        "text" : "Write README",
        "label" : "review",
        "status" : "done",
        "priority": "high"
    }
]

tasks.forEach((task) => {
    let targetId = ""
    
    if (task.status == "today") {
        targetId = "tasks-today"
    } else if (task.status == "later") {
        targetId = "tasks-later"
    } else if (task.status == "done") {
        targetId = "tasks-done"
    }
    
    document.getElementById(targetId).innerHTML += `<div class="task">
        <div class="checkbox"></div>
        <span class="task-text">${task.text}</span>
        <span class="priority ${task.priority}">${task.priority}</span>
        <span class="tag ${task.label}">${task.label}</span>
        </div>`
})

