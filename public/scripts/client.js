var verbose = true;

console.log('in client.js');

$(document).ready(onReady);

function onReady() {
    if (verbose) { console.log('in the onReady function')}

    $('#submit').on('click', addTask);
    //getAllTasks();
}

function addTask() {
    if (verbose) { console.log('obtained values from inputs and assigned to variables') };
    var taskName = $('#taskName').val();
    var taskDesc = $('#taskDescription').val();
    var dueDate = $('#dueDate').val();
    var complete = $('#completed').val();
    
    var newTask = {
        name: taskName,
        description: taskDesc,
        dueDate: dueDate,
        complete: complete
    };
    if (verbose) { console.log('newTask ->', newTask)};

    $.ajax({
        type: 'POST',
        url: '/toDoRoute',
        success: function(res) {
            taskAppend(res);
            if (verbose) {console.log('in client-side POST route with ->', res);}
        }
    });
    
}


