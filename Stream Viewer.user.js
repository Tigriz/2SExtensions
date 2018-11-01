// ==UserScript==
// @name         Stream Viewer
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Regarder un stream sur 2S
// @author       Lisa
// @match        https://2sucres.org/*
// @grant        none
// ==/UserScript==

'use strict';
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY + 20;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

async function sleep (delay) {
    return new Promise((resolve, reject) => setTimeout(resolve, delay))
}

function css(){
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "#streamviewer { background: #333941; border: 1px solid #001315; color: #B8B8B8; position: fixed; left: 15px; top: 100px; font-family: Roboto,sans-serif; min-width: 230px; min-height: 220px; z-index: 1;  resize: both; overflow: auto } #streamviewerheader { cursor: move; background-color: #1c2029 !important } #streamviewer > input { background: none; color: white; width: 195px; border-width: 0 0 1px; border-color: rgba(0,0,0,0.12); margin: 5px; height: 30px;} #streamviewer > input:focus {border-bottom: 2px solid #3F51B5}";
    document.body.appendChild(css);
}

async function minimize() {
    await sleep(50);
    document.body.insertAdjacentHTML( 'beforeend', '<aside id="m-sv" layout="column" class="topic-message mt-2 no-ml no-pb no-pl no-pr no-pt no-mr layout-column" style="position: fixed; bottom: 0px; right: 200px; z-index: 2; width: 200px;"><div class="toolbar-msg pl-2 flex-100"><i class="fa fa-gears" id="mm-icon" style="color: white;font-size: 20px"></i> Stream Viewer </div><md-icon id="exp-sv" class="md-secondary ng-scope material-icons" style="position: absolute; right: 5px; cursor: pointer; color: white">open_in_new</md-icon></aside>');
    css();
    document.getElementById("exp-sv").onclick = function(){launch(); $("#m-sv").remove()}
}

async function launch () {
    await sleep(50);
    document.body.insertAdjacentHTML( 'beforeend', '<aside id="streamviewer" layout="column" class="topic-message mt-2 no-ml no-pb no-pl no-pr no-pt no-mr layout-column"><div id="streamviewerheader" class="toolbar-msg pl-2"><i class="fa fa-gears" id="fors-icon" style="color: white;font-size: 20px"></i> Stream Viewer</div><md-icon id="mini-sv" class="md-secondary ng-scope material-icons" style="position: absolute; top: -5px; right: 5px; cursor: pointer; color: white">minimize</md-icon><input type="text" id="username" placeholder="Username"><iframe id="iframe" src="https://player.twitch.tv/?channel=forsen" allowfullscreen="true" scrolling="no" style="width: 100%; height: 100%" frameborder="0"></iframe></aside>');
    css();
    document.getElementById("mini-sv").onclick = function(){minimize(); $( "#streamviewer" ).remove();}
    document.getElementById('username').onkeypress = function(e){
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13'){
            document.getElementById("iframe").setAttribute("src", `https://player.twitch.tv/?channel=${this.value}`);
        }
    }
    dragElement(document.getElementById("streamviewer"));
}

minimize();
