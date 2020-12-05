var input = document.getElementsByClassName("t");
var arr;
Object.prototype.validate = function () {
    var input = this;

    function check(element) {
        var ifSpaces = /^\s\s*|\s\s*$/g
        if (element.value == "" || ifSpaces.test(element.value)) {
            element.classList.add("error-field")
        } else {
            element.classList.remove("error-field")
        }
    }

    function runLoop(el) {
        document.body.onsubmit = function (e) {
            e.preventDefault()
            if (input.length == undefined) {
                check(el)
            } else {
                arr.forEach(v => {
                    check(v)
                })
            }
        }
        el.onblur = function () {
            check(el)
        }
    }

    function inputTypeText(el) {
        if (el.length == undefined) {
            runLoop(el)

        } else {
            arr = [].slice.call(el)
            arr.forEach((v, i, a) => {
                runLoop(v)
            })
        }
    }
    inputTypeText(input)
}


input.validate()