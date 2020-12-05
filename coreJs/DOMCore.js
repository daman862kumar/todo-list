Object.prototype.setAttributes = function (obj) {
    var element = this;
    if (element.length == undefined) {
        setAttr(element)
    } else {
        [].slice.call(element).forEach(v => {
            setAttr(v)
        })
    }

    function setAttr(el) {
        var attributes = obj
        for (attrKeys of Object.keys(attributes)) {
            if (attrKeys == "class") {
                classArr = attributes[attrKeys].trim().split(" ")
                for (var i = 0; i < classArr.length; i++) {
                    if (classArr[i] !== "") {
                        el.classList.add(classArr[i].trim())
                    }
                }
            } else {
                el.setAttribute(`${attrKeys}`, `${attributes[attrKeys]}`)
            }
        }
    }
}
Object.prototype.createElement = function (name, mergeAt = "afterend", innerhtml = "", attributes = "") {
    var element = document.createElement(name);
    if (attributes !== "") {
        if (typeof (attributes) === "object") {
            element.setAttributes(attributes)
        }

    }
    if (innerhtml !== "")
        element.innerHTML = innerhtml

    if (mergeAt == "beforeend") {
        this.insertAdjacentElement(mergeAt, element)
    }
    if (mergeAt == "afterend") {
        this.insertAdjacentElement(mergeAt, element)
    }
    if (mergeAt == "afterbegin") {
        this.insertAdjacentElement(mergeAt, element)
    }
    if (mergeAt == "beforebegin") {
        this.insertAdjacentElement(mergeAt, element)
    }


}
Object.prototype.getStyleOf = function (prop) {
    var element = this
    var arr = [];
    if (element.length == undefined) {
        getProp(element)
    } else {
        [].slice.call(element).forEach(v => {
            getProp(v)
        })
    }

    function getProp(el) {

        var style = window.getComputedStyle(el, null).getPropertyValue(prop);
        if (element.length == undefined) {
            arr = style

        } else {
            arr.push(style)
        }
    }
    return arr

}
Object.prototype.$ = function (selector) {

    if (document.querySelectorAll(selector).length == 1) {
        return document.querySelectorAll(selector)[0]
    } else {
        var a = [].slice.call(document.querySelectorAll(selector)).forEach(v => {
            return v
        })
        return a

    }
}
