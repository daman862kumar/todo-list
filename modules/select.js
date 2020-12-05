Object.prototype.select = function () {
  function getAttributes1(el){
    var nodes=[]
    if(el.attributes.length>0){
      for ( var t = 0; t<el.attributes.length; t++){
     
        nodes.push(el.attributes[t])
    }
    return nodes
    }
    
    
  }
  
    var reset = false

    var currentSelect;
    for (var b = 0; b < this.length; b++) {

      var select = this;
      var arr = [];


      var prev = undefined;
      var currentHover = undefined;

      function createHTML(name, classname, appendTo, innerhtml = "") {
        var element = document.createElement(name);
        element.className = classname
        if (innerhtml !== "")
          element.innerHTML = innerhtml
        appendTo.append(element)
        var elementClass = document.getElementsByClassName(classname)[0];
        return elementClass
      }

      var selectDiv = document.createElement("div");
      selectDiv.className = "select-div"
      select[b].parentElement.insertBefore(selectDiv, select[b]);
      selectDiv.append(select[b])
      select[b].style.opacity = "0"
      select[b].style.left = "-100px"
      select[b].style.position = "relative"

     

      selectDiv.innerHTML += "<span class='select-span'>" + select[b].children[0].innerText + "</span>"

      var selectCdiv = document.getElementsByClassName("select-div")
      var divCparent = document.getElementsByClassName("div-parent")
      var divParent = createHTML("div", "div-parent", selectCdiv[b])
      var searchDiv = createHTML("input", "search-div", divCparent[b])
      var searchCdiv = document.getElementsByClassName("search-div")
      var optionParent = createHTML("div", "option-div-parent", divCparent[b])
      var optionCparent = document.getElementsByClassName("option-div-parent")
     
      for (var i = 0; i < select[b].children.length; i++) {
       
        var option = createHTML("div", "option-div visible", optionCparent[b], select[b].children[i].innerHTML)
        arr.push(select[b].children[i].innerHTML)
       
        var output_div = document.getElementsByClassName("option-div-parent");
        output_div[b].children[i].addEventListener("mouseover", function () {
          currentHover = this;
        })
        output_div[b].children[i].addEventListener("mouseleave", function () {
          currentHover = undefined;
        })
        var attr=getAttributes1(select[b].children[i])
        if(attr!==undefined){
          for(var at=0;at<attr.length;at++){
            var o=document.getElementsByClassName("option-div-parent")[b].children[i]
            o.setAttribute(`${attr[at].name}`,`${attr[at].value}`)
            
          }
        }
      }

      selectDiv.addEventListener("click", function (e) {

        currentSelect = Array.prototype.indexOf.call([...document.getElementsByClassName("select-div")], this)

        reset = true
        if (e.target == this) {

          this.classList.toggle("open")
          this.querySelector(".div-parent").classList.toggle("active")
        }

        document.getElementsByClassName("search-div")[currentSelect].focus()
      })



      for (var option = 0; option < optionCparent[b].children.length; option++) {

        optionCparent[b].children[option].addEventListener("click", function (e) {
          var sele = document.getElementsByClassName("select")
          var currentIndex = Array.prototype.indexOf.call(this.parentNode.children, this)

          for (var t = currentSelect; t <= currentSelect; t++) {
            sele[t].options.selectedIndex = `${currentIndex}`
          }


          selectDiv.classList.remove("open")
          this.parentElement.parentElement.classList.remove("active")
          document.getElementsByClassName("select-span")[currentSelect].innerHTML = this.innerText
          /*  console.log(select[currentIndex]) */

        })
      }


      var last = undefined;
      var list = arr;
      srch(arr)

      function srch(a) {

        searchCdiv[b].addEventListener("input", function (event) {

          var searchValue = this.value;
          for (var j = 0; j < list.length; j++) {

            var output_div = this.nextElementSibling.children

            if (a[j].toUpperCase().indexOf(searchValue.toUpperCase()) > -1 && a[j].toUpperCase().indexOf(
                searchValue.toUpperCase()) == 0) {

              output_div[j].style.display = "block"
              output_div[j].classList.add("visible")

            } else {
              output_div[j].classList.add("not-visible")
              output_div[j].classList.remove("visible")
              output_div[j].style.display = "none"


            }

            output_div[j].classList.remove("selected")

          }

        })
      }

      Object.prototype.ms = function () {
        for (var i = 0; i < this.length; i++) {
          this[i].addEventListener("keydown", moveCursor)
        }
      }
      document.getElementsByClassName("search-div").ms()


    }

    var getNextSibling = function (elem, selector) {

      var sibling = elem.nextElementSibling;

      while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling
      }

    };
    var getPrevSibling = function (elem, selector) {

      var sibling = elem.previousElementSibling

      while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.previousElementSibling
      }

    };

    function moveCursor(event) {
      this.classList.add("ea")
      if (event.keyCode == 40) {

        var a = moveSelection("down", currentHover, prev)
        prev = a[1];
        currentHover = a[0]
        document.getElementsByClassName("selected")[0].scrollIntoView({
          block: "nearest",
          inline: "nearest"
        })
      } else if (event.keyCode == 38) {
        var a = moveSelection("up", currentHover, prev)
        prev = a[1];
        currentHover = a[0]
        document.getElementsByClassName("selected")[0].scrollIntoView({
          block: "nearest",
          inline: "nearest"
        })
      } else if (event.keyCode == 13) {
        document.getElementsByClassName("selected")[0].click()
      }


    }

    function moveSelection(key, currentHover, prev) {

      var sel = document.getElementsByClassName("selected")

      if (currentHover !== undefined) {
        reset = false;

        if (prev) {
          prev.classList.remove("selected")
        }
        prev = currentHover;
        currentHover.classList.add("selected")
        currentHover = undefined;
        return [currentHover, prev]
      } else {
        if (reset == true) {

          if (document.getElementsByClassName("selected").length !== 0) {
            document.getElementsByClassName("selected")[0].classList.remove("selected")
          }

          prev = document.getElementsByClassName("select-div")[currentSelect].getElementsByClassName("visible")[0];

          reset = false
        }
        if (sel.length == 0) {
          var oldselect = currentSelect;

          prev = document.getElementsByClassName("select-div")[currentSelect].getElementsByClassName("visible")[0];
          document.getElementsByClassName("select-div")[currentSelect].getElementsByClassName("visible")[0]
            .classList.add("selected");
        } else {

          visible = document.getElementsByClassName("select-div")[currentSelect].getElementsByClassName("visible");



          if (key == "down") {

            if (visible[visible.length - 1].classList.contains("selected")) {

              visible[visible.length - 1].classList.remove("selected")
              visible[0].classList.add("selected");
              prev = visible[0]

            } else {

              prev.classList.remove("selected")
              getNextSibling(prev, ".visible").classList.add("selected");

              prev = getNextSibling(prev, ".visible");

            }
          } else {

            if (visible[0].classList.contains("selected")) {
              visible[0].classList.remove("selected")
              visible[visible.length - 1].classList.add("selected");
              prev = visible[visible.length - 1]

            } else {
              prev.classList.remove("selected")
              getPrevSibling(prev, ".visible").classList.add("selected");

              prev = getPrevSibling(prev, ".visible");

             
            }
          }
        }
        return [currentHover, prev]
      }
    }
  }


