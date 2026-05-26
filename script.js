const tasks = [
    {
        "text" : "Meeting with product owner",
        "label" : "Dev",
        "status" : "Today",
        "priority" : "Medium"
    },
    {
        "text" : "Finalize mock-up",
        "label" : "Design",
        "status" : "Later",
        "priority" : "Low"
    },
    {
        "text" : "Write README",
        "label" : "Review",
        "status" : "Done",
        "priority": "High"
    }
]

tasks.forEach((task) => {
    let targetId = ""
    
    if (task.status == "Today") {
        targetId = "tasks-today"
    } else if (task.status == "Later") {
        targetId = "tasks-later"
    } else if (task.status == "Done") {
        targetId = "tasks-done"
    }
    
    document.getElementById(targetId).innerHTML += `<div class="task">
        <span class="task-text">${task.text}</span>
        <span class="priority ${task.priority}">${task.priority}</span>
        <span class="tag ${task.label}">${task.label}</span>
        </div>`
})

