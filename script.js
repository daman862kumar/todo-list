const footerHeight = document.getElementsByClassName("todo-footer")[0].clientHeight
document.getElementsByClassName("todo-footer")[0].style.height = "60px"
var el = document.getElementsByClassName("calender")[0];
el.datepicker()
var height = document.getElementsByClassName("datepicker")[0].scrollHeight + 10
var todo_header = document.getElementsByClassName("todo-header")[0]

function openCalender(e) {

    e.preventDefault()
    var date = document.getElementsByClassName("datepicker")[0]
    var filter = document.getElementsByClassName("filters")[0]
    if (window.getComputedStyle(filter).getPropertyValue("opacity") == "1") {
        filter.style.height = "0px";
        filter.style.overflow = "hidden";

        filter.style.opacity = "0";
        filter.style.padding = "0";
        document.getElementsByClassName("todo-body")[0].style.height = "374px"
        todo_header.style.paddingBottom = "0px";
    }
    if (window.getComputedStyle(date).getPropertyValue("opacity") == "1") {
        date.style.height = "0px";
        date.style.overflow = "hidden";
        date.style.opacity = "0";
        todo_header.style.paddingBottom = "0px";
        document.getElementsByClassName("todo-body")[0].style.height = "374px"
        document.getElementsByClassName("todo-body")[0].classList.remove = "shrink"
    } else {
        date.style.height = height + "px"
        date.style.opacity = "1"
        date.style.overflow = "visible";
        document.getElementsByClassName("todo-body")[0].style.height = "310px"
        document.getElementsByClassName("todo-body")[0].classList.add = "shrink"
        todo_header.style.paddingBottom = "63px";
    }
}

function openFilter(e) {

    e.preventDefault()
    var date = document.getElementsByClassName("datepicker")[0]
    var filter = document.getElementsByClassName("filters")[0]
    if (window.getComputedStyle(date).getPropertyValue("opacity") == "1") {
        date.style.height = "0px";
        date.style.opacity = "0";
        date.style.overflow = "hidden";
        todo_header.style.paddingBottom = "0px";
        document.getElementsByClassName("todo-body")[0].style.height = "374px"
    }
    if (window.getComputedStyle(filter).getPropertyValue("opacity") == "1") {
        filter.style.height = "0px";
        filter.style.opacity = "0";
        filter.style.overflow = "hidden";
        filter.style.padding = "0";
        todo_header.style.paddingBottom = "0px";
        document.getElementsByClassName("todo-body")[0].style.height = "374px"
        document.getElementsByClassName("todo-body")[0].classList.remove = "shrink"
    } else {
        filter.style.height = "63px"
        filter.style.opacity = "1"
        filter.style.overflow = "visible";
        filter.style.padding = "15px";
        todo_header.style.paddingBottom = "63px";
        document.getElementsByClassName("todo-body")[0].style.height = "310px"
        document.getElementsByClassName("todo-body")[0].classList.add = "shrink"
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

function expand2() {
    document.getElementsByClassName("todo-footer")[0].classList.add("expand")
    document.getElementsByClassName("todo-footer")[0].style.height = "calc(100% - 168px)"
}

function expand() {


    var expandMore = document.getElementsByClassName("expand-more");
    var arr = [].slice.call(expandMore)

    arr.forEach(v => {
        v.addEventListener("click", function () {
            document.getElementById("submit").removeAttribute("data-edit")
            document.getElementById("submit").removeAttribute("data-source")
            reset()
            var date = document.getElementsByClassName("datepicker")[0]
            var filter = document.getElementsByClassName("filters")[0]
            if (window.getComputedStyle(date).getPropertyValue("opacity") == "1") {
                date.style.height = "0px";
                date.style.opacity = "0";
                date.style.overflow = "hidden";
                todo_header.style.paddingBottom = "0px";
                document.getElementsByClassName("todo-body")[0].style.height = "374px"
            }
            if (window.getComputedStyle(filter).getPropertyValue("opacity") == "1") {
                filter.style.height = "0px";
                filter.style.opacity = "0";
                filter.style.overflow = "hidden";
                todo_header.style.paddingBottom = "0px";
                document.getElementsByClassName("todo-body")[0].style.height = "374px"
            }
            if (!v.hasAttribute("disabled")) {
                document.getElementsByClassName("todo-footer")[0].classList.toggle("expand")
                if (document.getElementsByClassName("todo-footer")[0].classList.contains("expand")) {

                    document.getElementsByClassName("todo-footer")[0].style.height = "calc(100% - 168px)"
                } else {
                    document.getElementsByClassName("todo-footer")[0].classList.remove("expand")
                    document.getElementsByClassName("todo-footer")[0].style.height = "60px"
                }
            }
        })


    })

}

var btn = document.getElementsByClassName("add-todo");
var arrBtn = [].slice.call(btn);
arrBtn.forEach(v => {
    v.addEventListener("click", function (e) {
        var title = document.getElementById("task-title").value
        var des = document.getElementById("task-des").value
        var date = document.getElementById("date").value
        var time = document.getElementById("time").value
        if (title == "") {
            showError()
        } else {
            if (des == "") {
                des = "Enter Description"
            }
            if (date == "") {
                var d = new Date()
                var inputDate = d.getDate()
                var inputMonth = d.getMonth()
                var inputYear = d.getFullYear()
                var date = `${inputDate}/${inputMonth+1}/${inputYear}`;

            }
            if (time == "") {
                var d = new Date()
                var hour = d.getHours()
                var min = d.toLocaleString('en-US', {
                    minute: 'numeric'
                })
                time = `${hour}:${min}`;

            }
            var todoItem = {
                title: title,
                des: des,
                date: date,
                time: time,
                checked: false

            }
            if (this.hasAttribute("data-edit")) {
                addTodo(todoItem, false, true)
                clear(this)
            } else {
                addTodo(todoItem)
                clear(this)
            }

        }

    })
})

function clear() {
    var i = document.querySelectorAll(".input-wrapper *");

    var arr = [].slice.call(i);
    arr.forEach(v => {

        v.value = ""
    })
}
var date = new Date()

function noTodo(flag = "empty") {
    if (flag == "empty") {
        if (document.getElementsByClassName("todo-body")[0].children[1] == undefined) {

            document.getElementsByClassName("no-data")[0].style.display = "block"
        } else {
            document.getElementsByClassName("no-data")[0].style.display = "none"
        }
    }
    if (flag == "error") {
        console.error("Something Went Very Wrong")
        if (document.getElementsByClassName("todo-body")[0].children[1] == undefined) {

            document.getElementsByClassName("no-data")[0].style.display = "block"
        } else {
            document.getElementsByClassName("no-data")[0].style.display = "none"
        }
    }
}
var id1 = 0;

function addTodo(data, sync = false, edit = false) {

    if (edit == false) {
        if (sync == false) {

            if (localStorage.getItem("tasks") === null || localStorage.getItem("tasks") === undefined || localStorage.getItem("tasks") === "undefined") {

                var task = [];
                localStorage.setItem("tasks", JSON.stringify([]))
            } else {
                try {
                    task = JSON.parse(localStorage.getItem("tasks"))
                } catch {
                    noTodo("error")
                }




            }
            if(data.data_id!==undefined){
                id1=data.data_id
            }
            data.data_id = id1
            task.push(data)
            localStorage.setItem("tasks", JSON.stringify(task))
        }
        console.log(data)
       

        if (data.checked === "true") {

            var html = ` <div class="todo-item completed" data-checked="true" data-id="${id1}">`
        } else {
            var html = ` <div class="todo-item" data-checked="false" data-id="${id1}">`
        }

        id1++
        html += ` 
                    <div class="timeline">
                        <div class="date">
                            <div class="day">${new Date().toLocaleString('en-US', { weekday: 'short'})}</div>
                            <div class="d-date">${new Date().getDate()}</div>
                        </div>
                        <div class="done"><span></span></div>
                    </div>
                    <div class="task-div">
                        <div>
                            <a href="#" class="task-title">${data.title}</a>
                            <p class="task-des">${data.des}</p>
                        </div>
    
                        <div class="time">
                            <p>${data.time}</p>
                        </div>
                        <div class="options">
                          <a href="#" class="action-btn" onclick="done(this)"><i class="fa fa-check"></i></a>
                            <a href="#" class="action-btn" onclick="viewTodo(this)"><i class="fa fa-eye"></i></a>`
        if (data.checked === "true") {

            html += `<a href="#" class="action-btn edit" disabled="true" onclick="edit(this)"><i class="fa fa-edit"></i></a>`
        } else {
            html += `<a href="#" class="action-btn edit" onclick="edit(this)"><i class="fa fa-edit"></i></a>`
        }
        html += `
                            <a href="#" class="action-btn" onclick="removeTodo(this)"><i class="fa fa-trash"></i></a>
    
                        </div>
                    </div>
                </div>`
        document.getElementsByClassName("todo-body")[0].innerHTML += html
        noTodo()


    } else {
        var title = document.getElementById("task-title").value
        var des = document.getElementById("task-des").value
        var date = document.getElementById("date").value
        var time = document.getElementById("time").value
        var id = document.getElementById("submit").dataset.source
        console.log(data)
        if(data.data_id!==undefined){
            id1=data.data_id
            alert()
        }
        else{
            id1=Number(id)
        }
       
        var todoItem = {
            title: title,
            des: des,
            date: date,
            time: time,
            checked: false,
            data_id:id1

        }
        
        id = Number(id)
        var element = document.getElementsByClassName("todo-body")[0].children[id + 1]
        element.getElementsByClassName("task-title")[0].innerHTML = document.getElementById("task-title").value
        element.getElementsByClassName("task-des")[0].innerHTML = document.getElementById("task-des").value

        element.getElementsByClassName("time")[0].innerHTML = `<p>${document.getElementById("time").value}</p>`
        try {
            var data = JSON.parse(localStorage.getItem("tasks"))
            var info = data[id]
            data[id] = todoItem

            localStorage.setItem("tasks", JSON.stringify(data))
            noTodo()
        } catch {
            noTodo("error")
        }



    }

}

function removeArrItem(i, array) {
    const index = i;
    if (index > -1) {
        array.splice(index, 1);
        return array
    }

}

function viewTodo(el) {
    var element = el.closest(".todo-item")
    var parent = element.parentElement
    var id = Number(element.dataset.id)
    try {
        var data = JSON.parse(localStorage.getItem("tasks"))
        var info = data[id]
        var html = `  <p class="v-title">${info.title}</p>
    <div class="timeline" style="padding: 5px 10px;border-bottom: 1px solid rgb(220, 220, 220);">
        <div class="date">
            <div class="day">Mon</div>
            <div class="d-date">27</div>
        </div>
        <div class="time" id="timeView">
        <p>${info.time}</p>
        </div>
    </div>
    <div class="v-over">
        <p class="v-des">${info.des}</p>
    </div>`
        document.getElementsByClassName("view-modal-body")[0].innerHTML = html


        document.getElementsByClassName("view-modal")[0].style.transform = "scale(1)"
        document.getElementsByClassName("view-modal")[0].style.opacity = "1"
    } catch {
        noTodo("error")
    }

}



function edit(el) {
    
    var element = el.closest(".todo-item")
    if (!element.classList.contains("completed")) {
        expand2()
        var parent = element.parentElement
        var id = Number(element.dataset.id)
        try {
            var data = JSON.parse(localStorage.getItem("tasks"))
            var info = data[id]
            document.getElementById("task-title").value = info.title
            document.getElementById("task-des").value = info.des
            document.getElementById("date").value = info.date
            document.getElementById("time").value = info.time
            document.getElementById("submit").dataset.edit = "true"
            document.getElementById("submit").dataset.source = id
        } catch {
            noTodo("error")
        }

    }




}
function reset(){
    document.getElementById("task-title").value = ""
            document.getElementById("task-des").value = ""
            document.getElementById("date").value = ""
            document.getElementById("time").value = ""
}

function removeTodo(el) {
    var element = el.closest(".todo-item")
    var parent = element.parentElement


    var data = JSON.parse(localStorage.getItem("tasks"))
    var id = Number(element.dataset.id)
    data.forEach(v => {
        if (v.data_id == id) {

            var lid = data.indexOf(v)
            element.remove()
            var newData = removeArrItem(lid, data)

            localStorage.setItem("tasks", JSON.stringify(newData))
            noTodo()
        }
    })

    /* element.remove()
    var newData = removeArrItem(id, data)

    localStorage.setItem("tasks", JSON.stringify(newData))
    noTodo() */


}

function done(el) {
    var element = el.closest(".todo-item")
    var parent = element.parentElement
    element.classList.toggle("completed")

    var id = Number(element.dataset.id)
    var data = JSON.parse(localStorage.getItem("tasks"))
    if (element.classList.contains("completed")) {
        data[id].checked = "true"
        element.dataset.checked = "true"
        el.nextElementSibling.nextElementSibling.setAttribute("disabled", "true")
    } else {
        data[id].checked = "false"
        element.dataset.checked = "false"
        el.nextElementSibling.nextElementSibling.removeAttribute("disabled")
    }



    var newField = data[id]
    data[id] = newField
    localStorage.setItem("tasks", JSON.stringify(data))
    noTodo()


}

function showError() {
    alert("enter title")
}

function loadData() {


    if (localStorage.getItem("tasks") === null || localStorage.getItem("tasks") === "undefined" || localStorage.getItem("tasks") === undefined) {

        task = [];
        localStorage.setItem("tasks", JSON.stringify([]))
    } else {

        try {
            var data = JSON.parse(localStorage.getItem("tasks"))
            data.forEach(v => {
                addTodo(v, true)
            })
        } catch {
            noTodo("error")
        }

    }





}

function sort1(type = "asc") {
    if (type == "des") {
        var li = document.getElementsByClassName("todo-item")

        var switching = true;

        while (switching) {
            switching = false;
            for (var i = 0; i < li.length; i++) {

                if (li[i + 1] !== undefined) {
                    if (li[i].getElementsByClassName("task-title")[0].innerText.toUpperCase() < li[i + 1].getElementsByClassName("task-title")[0].innerText.toUpperCase()) {
                        switchLi()
                    }
                }
            }
        }

        function switchLi() {
            switching = true;

            document.getElementsByClassName("todo-body")[0].insertBefore(li[i + 1], li[i])
        }

    } else {
        var li = document.getElementsByClassName("todo-item")

        var switching = true;

        while (switching) {
            switching = false;
            for (var i = 0; i < li.length; i++) {

                if (li[i + 1] !== undefined) {
                    if (li[i].getElementsByClassName("task-title")[0].innerText.toUpperCase() > li[i + 1].getElementsByClassName("task-title")[0].innerText.toUpperCase()) {
                        switchLi()
                    }
                }
            }
        }

        function switchLi() {
            switching = true;

            document.getElementsByClassName("todo-body")[0].insertBefore(li[i + 1], li[i])
        }

    }

}

document.body.onload = function () {
    loadData()
    noTodo()
    expand()

    var select = [...document.getElementsByClassName("option-div")]


    select.forEach(v => {
        v.addEventListener("click", function (e) {
            var filterName = this.dataset.status.toLowerCase()

            if (filterName == "pending") {
                var hide = [...document.getElementsByClassName("hide")]
                hide.forEach(v => {
                    v.classList.remove("hide")
                })

                var items = [...document.querySelectorAll(".todo-item[data-checked='true']")]
                items.forEach(v => {
                    v.classList.add("hide")
                })
                document.getElementsByClassName("category")[0].innerHTML=filterName
            }
            if (filterName == "completed") {
                var hide = [...document.getElementsByClassName("hide")]
                hide.forEach(v => {
                    v.classList.remove("hide")
                })

                var items = [...document.querySelectorAll(".todo-item[data-checked='false']")]
                items.forEach(v => {
                    v.classList.add("hide")
                })
                document.getElementsByClassName("category")[0].innerHTML=filterName
            }
            if (filterName == "asc") {
                sort1()
            }
            if (filterName == "all") {
                var hide = [...document.getElementsByClassName("hide")]
                hide.forEach(v => {
                    v.classList.remove("hide")
                })
                document.getElementsByClassName("category")[0].innerHTML="All Category"
            }
            if (filterName == "des") {
                sort1("des")
            }
            openFilter(e)
        })
    })

}
var dateInput = document.getElementById("date");
dateInput.addEventListener("keydown", function (e) {
    e.preventDefault()
})