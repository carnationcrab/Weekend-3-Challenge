var verbose = true;
//var completeChecker = '<button class="complete btn btn-danger">Complete</button>'
//var buttonDel = '<button id="delete" class="delete btn btn-danger">Delete</button>'



console.log('in client.js');

function onReady() {
    if (verbose) { console.log('in the onReady function')}

    $('#submit').on('click', addTask);
    $('#taskList').on('click', '.delete', deleteTask);
    $('#completedTaskList').on('click', '.delete', deleteTask);

    $('#taskList').on('click', '.complete', markComplete);
    $('#completedTaskList').on('click', '.complete', markComplete);
    

    getAllTasks();

    
}

//$('#checkyCheck').on('click', moveToComplete);



function addTask() {
    if (verbose) { console.log('obtained values from inputs and assigned to variables') };
    var taskName = $('#taskName').val();
    var taskDesc = $('#taskDescription').val();
    var dueDate = $('#dueDate').val();
    var complete = $('input[type=radio]:checked', '#completionChecker').val()
    
    var newTask = {
        name: taskName,
        description: taskDesc,
        dueDate: dueDate,
        complete: complete,
    };
    if (verbose) { console.log('newTask ->', newTask)};

    $.ajax({
        type: 'POST',
        url: '/toDoRoute',
        data: newTask,
        success: function() {
            if (verbose) {console.log('in client-side POST route');}
            getAllTasks();
            $( '#addTask' ).each(function(){
                this.reset();
            });
            $( '#completionChecker' ).each(function(){
                this.reset();
            });
        }
        });
    }

function getAllTasks(){
    $.ajax({
        type: 'GET',
        url: '/toDoRoute',
        success: function(res) {
            taskAppend(res);
            if (verbose) {console.log('in client-side GET route with ->', res);
            }
        }
    });
}


function taskAppend(tasks) {
    //var delButtonThing = $('<button>', {class: 'delete-button', text:'remove me!'});

    $('#taskList').empty();
    $('#completedTaskList').empty();  
    var currentDate = new Date();
    
    function formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      }
      

    for (var i = 0; i < tasks.length; i++) {
        var name = tasks[i].name;
        var desc = tasks[i].description;
        var due = tasks[i].due;
        var comp = tasks[i].complete;
        var id = tasks[i].id;
        var buttonDel = ('<button class="delete btn btn-danger" data-id="' + id + '">Delete</button>');
        var completeChecker = ('<button class="complete btn btn-success" data-id="' + id + '">Complete</button>');
        //var niceDue = formatDate(due);
        var niceDay = formatDate(currentDate);

        if (comp === 'complete') {
            
            $('#completedTaskList').append('<tr data-id="' + id + 
            '"><td>' + name +
            '</td><td>' + desc +
            '</td><td>' + due + 
            '</td><td>' + niceDay +
            '</td><td>' + buttonDel +
            '</td><tr>');

            console.log('button', buttonDel);
            
        } else {
            $('#taskList').append('<tr data-id="' + id + '"><td>' + name +
            '</td><td>' + desc +
            '</td><td>' + due +
            '</td><td>' + completeChecker +
            '</td><td>' + buttonDel +
            '</td><tr>');

            console.log('button', buttonDel);
        }
        
    }
};

function deleteTask() {
    var result = confirm("Want to delete?");
    if (result) {
        var thisID = $(this).data('id');
        console.log(thisID);
        $.ajax ({
          method: 'DELETE',
          url: '/toDoRoute/'+thisID,
          success: function(res) {
            console.log(res);
            getAllTasks();
          }
        });
    }    
    console.log('click!');
    
  }

function markComplete() {
    console.log('clicked on complete!');
    var thisID = $(this).data('id');
    var aTask = {
        id: thisID,
    };
    $.ajax( {
        method: 'PUT',
        url: '/toDoRoute/'+thisID,
        data: aTask,
        success: function(res){
            console.log('completed a task, in the PUT client route', res);
            getAllTasks();
        }
    })
}

$(document).ready(onReady);

