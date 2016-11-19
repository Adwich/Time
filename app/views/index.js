function getTasks() {
    return $.ajax({
        url: "http://localhost:8888/api/tasks",
        type: "GET"
    });
};

function createTask(task) {
    return $.ajax({
        url: "http://localhost:8888/api/tasks",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(task),
        dataType: 'json'
    });
};

function updateTasksView(tasks) {
    var items = [];
    $.each(tasks, function(key, val) {
        var task = JSON.stringify(val.name);
        items.push("<li id='" + key + "'>" + task + "</li>");
    });
    $("#tasks").empty();
    $("<ul/>", {
        "class": "my-new-list",
        html: items.join("")
    }).appendTo("#tasks");
};

$(document).ready(function() {
    // GET every 1 second
    //setTimeout(pollServerForNewTask, 1000);
    getTasks()
        .done((tasks) => {
            updateTasksView(tasks);
        })
        .fail(() => console.log('not ok'));

    // POST
    $('#task-submit').click(function() {
        var task = {
            name: $('#task-name').val(),
            desc: $('#task-desc').val(),
            priority: $('#task-priority').val(),
            deadline: $('#task-deadline').val()
        };
        createTask(task)
            .done(function(res) {
                getTasks()
                    .done((tasks) => {
                        updateTasksView(tasks);
                    })
                    .fail(() => console.log('not ok'));
            })
            .fail(() => console.log("fail"));
    });
});
