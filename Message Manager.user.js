// ==UserScript==
// @name         Message Manager
// @namespace    http://tampermonkey.net/
// @version      0.3.1
// @description  Des opérations sur vos messages
// @author       Lisa
// @match        https://2sucres.org/*
// @grant        none
// ==/UserScript==

//angular.element('.forum-view').scope().dateFromTimestamp(Date.now()/1000)

'use strict';

let token = app.csrf;
let request;
let results = [];
let index = 0;

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
      if(elmnt.offsetHeight + elmnt.offsetTop - pos2 < document.getElementsByClassName("ms-footer")[0].offsetTop){
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
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

function enableButtons(){
    document.getElementById("compter").onclick = function(){ count(document.getElementById('pseudo').value,document.getElementById('min').value,document.getElementById('max').value) };
    document.getElementById("searchAut").onclick = function(){ searchAut(document.getElementById('pseudo').value,document.getElementById('min').value,document.getElementById('max').value) };
    document.getElementById("searchMsg").onclick = function(){ searchMsg(document.getElementById('pseudo').value,document.getElementById('min').value,document.getElementById('max').value) };
    document.getElementById("compter").style = "";
    document.getElementById("searchAut").style = "";
    document.getElementById("searchMsg").style = "";
}

function disableButtons(){
    document.getElementById("compter").onclick = function(){};
    document.getElementById("searchAut").onclick = function(){};
    document.getElementById("searchMsg").onclick = function(){};
    document.getElementById("compter").style = "background: rgba(0,0,0,0.5)";
    document.getElementById("searchAut").style = "background: rgba(0,0,0,0.5)";
    document.getElementById("searchMsg").style = "background: rgba(0,0,0,0.5)";
}

async function getMessage (id) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            request = xhr.response;
        }
    }
    xhr.open("POST", '/web-api/51', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`do=message-retrieve-by-id&msg_id=${id}&AJAX-CSRF=${token}`);
}

async function searchAut(pseudo, min, max){
    let compteur = 0;
    results = [];
    disableButtons();
    document.getElementById("mm-icon").className = "fa fa-circle-o-notch fa-spin"
    document.getElementById("result").innerHTML = '0/0';
    document.getElementById("result").style = "background:rgba(255, 0, 0, 0.5); border: 1px solid rgba(0,0,0,0.3); color:white";
    for(let i = min; i<=max; i++){
        document.getElementById("cancel").onclick = function(){ i=max; i++ }
        await getMessage(i);
        if(i==1) await sleep(1000);
        await sleep(200);
        while(request == null){
            await sleep(50);
            await getMessage(i);
        }
        if(typeof(request.error) !== "undefined"){
            i--;
        } else{
            if(request.message != false){
                if(request.message.id != i){
                    getMessage(i);
                    i--;
                } else {
                    if(request.message.user_pseudo_custom.toLowerCase() == pseudo.toLowerCase()){
                        compteur++;
                        results.push(i);
                    }
                }
            }
        }
        document.getElementById("result").innerHTML = `${compteur}/${i}`;
    }
    enableButtons();
    document.getElementById("mm-icon").className = "fa fa-gears"
    document.getElementById("result").style = "background:rgba(50, 255, 50, 0.5); border: 1px solid rgba(0,0,0,0.3); color: white";
}

async function searchMsg(text, min, max){
    let compteur = 0;
    results = [];
    disableButtons();
    document.getElementById("mm-icon").className = "fa fa-circle-o-notch fa-spin"
    document.getElementById("result").innerHTML = '0/0';
    document.getElementById("result").style = "background:rgba(255, 0, 0, 0.5); border: 1px solid rgba(0,0,0,0.3); color:white";
    for(let i = min; i<=max; i++){
        document.getElementById("cancel").onclick = function(){ i=max; i++ }
        await getMessage(i);
        if(i==1) await sleep(1000);
        await sleep(200);
        while(request == null){
            await sleep(50);
            await getMessage(i);
        }
        if(typeof(request.error) !== "undefined"){
            i--;
        } else{
            if(request.message != false){
                if(request.message.id != i){
                    getMessage(i);
                    i--;
                } else {
                    if(request.message.content.toLowerCase().includes(text.toLowerCase())){
                        compteur++;
                        results.push(i);
                    }
                }
            }
        }
        document.getElementById("result").innerHTML = `${compteur}/${i}`;
    }
    enableButtons();
    document.getElementById("mm-icon").className = "fa fa-gears"
    document.getElementById("result").style = "background:rgba(50, 255, 50, 0.5); border: 1px solid rgba(0,0,0,0.3); color: white";
}

async function count(pseudo, min, max){
    let compteur = 0;
    disableButtons();
    document.getElementById("mm-icon").className = "fa fa-circle-o-notch fa-spin"
    document.getElementById("result").innerHTML = '0/0';
    document.getElementById("result").style = "background:rgba(255, 0, 0, 0.5); border: 1px solid rgba(0,0,0,0.3); color:white";
    for(let i = min; i<=max; i++){
        document.getElementById("cancel").onclick = function(){ i=max; i++ }
        await getMessage(i);
        if(i==1) await sleep(1000);
        await sleep(200);
        while(request == null){
            await sleep(50);
            await getMessage(i);
        }
        if(typeof(request.error) !== "undefined"){
            i--;
        } else{
            if(request.message != false){
                if(request.message.id != i){
                    getMessage(i);
                    i--;
                } else {
                    if(request.message.user_pseudo_custom.toLowerCase() == pseudo.toLowerCase()){
                        compteur++;
                    }
                }
            }
        }
        document.getElementById("result").innerHTML = `${compteur}/${i}`;
    }
    enableButtons();
    document.getElementById("mm-icon").className = "fa fa-gears"
    document.getElementById("result").style = "background:rgba(50, 255, 50, 0.5); border: 1px solid rgba(0,0,0,0.3); color: white";
}

function css(){
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "#messagemanager { background: #333941; border: 1px solid #001315; color: #B8B8B8; position: fixed; right: 15px; top: 100px; font-family: Roboto,sans-serif; width: 200px;z-index: 1} #messagemanager > div {cursor: move; background-color: #1c2029 !important; } #messagemanager > input { background: none; color: white; width: 96%; border-width: 0 0 1px; border-color: rgba(0,0,0,0.12); margin: 2%; height: 30px;} #messagemanager > input:focus {border-bottom: 2px solid #3F51B5} #result { background : rgba(0, 0, 0, 0.5);border: 1px solid rgba(0,0,0,0.3); color:white} #messagemanager > a > .zmdi {color: white} #messagemanager > a:hover {cursor: pointer}";
    document.body.appendChild(css);
}

async function minimize() {
    await sleep(50);
    document.body.insertAdjacentHTML( 'beforeend', '<aside id="m-mm" layout="column" class="topic-message mt-2 no-ml no-pb no-pl no-pr no-pt no-mr layout-column" style="position: fixed; bottom: 0px; right: 0px; z-index: 1; width: 200px;"><div class="toolbar-msg pl-2 flex-100"><i class="fa fa-gears" id="mm-icon" style="color: white;font-size: 20px"></i> Message Manager </div><md-icon id="expand" class="md-secondary ng-scope material-icons" style="position: absolute; right: 5px; cursor: pointer; color: white">open_in_new</md-icon></aside>');
    document.getElementById("expand").onclick = function(){launch(); $("#m-mm").remove()}
}

async function launch () {
    await sleep(50);
    document.body.insertAdjacentHTML( 'beforeend', '<aside id="messagemanager" layout="column" class="topic-message mt-2 no-ml no-pb no-pl no-pr no-pt no-mr layout-column"><div id="messagemanagerheader" class="toolbar-msg pl-2 flex-100"><i class="fa fa-gears" id="mm-icon" style="color: white;font-size: 20px"></i> Message Manager </div><md-icon id="minimize" class="md-secondary ng-scope material-icons" style="position: absolute; right: 5px; top: -5px; cursor: pointer; color: white">minimize</md-icon><input type="text" id="pseudo" placeholder="Pseudo ou message"></input><br><input type="number" id="min"  placeholder="ID message min" min="1"></input><br><input type="number" id="max" placeholder="ID message max" min="1"></input><br><button class="no-mb md-raised md-accent pull-right mr-1 md-button ng-binding ng-scope md-ink-ripple" title="Compter" id="compter">Compter</button><br><button class="no-mb md-raised md-accent pull-right mr-1 md-button ng-binding ng-scope md-ink-ripple" title="Recherche auteur" id="searchAut"><md-icon class="material-icons">search</md-icon> Auteur</button><br><button class="no-mb md-raised md-accent pull-right mr-1 md-button ng-binding ng-scope md-ink-ripple" title="Recherche message" id="searchMsg"><md-icon class="material-icons">search</md-icon> Message</button><button class="no-mb md-raised md-accent pull-right mr-1 md-button ng-binding ng-scope md-ink-ripple" id="result">/</button><md-icon id="cancel" class="md-secondary ng-scope material-icons" style="position: absolute; right: 15px; bottom: 57px; cursor: pointer; color: red">clear</md-icon><br><a id="prev" class="btn-circle btn-circle-primary no-focus"><i class="zmdi zmdi-chevron-left"></i></a><a id="view" class="btn-circle btn-circle-primary no-focus" style="position: absolute; right:75px; bottom: 0px;"><i class="zmdi zmdi-eye"></i></a><a id="next" class="btn-circle btn-circle-primary no-focus" style="position: absolute; right:0px; bottom: 0px;"><i class="zmdi zmdi-chevron-right"></i></a></aside>');
    css();
    document.getElementById("minimize").onclick = function(){ minimize(); $("#messagemanager").remove()}
    document.getElementById("view").onclick = function(){if(results.length!==0) angular.element('.forum-view').scope().showMessage(results[index]);}
    document.getElementById("prev").onclick = function(){if(index>=0 && results.length!==0) angular.element('.forum-view').scope().showMessage(results[--index]);}
    document.getElementById("next").onclick = function(){if(index<results.length)angular.element('.forum-view').scope().showMessage(results[++index]);}
    enableButtons();
    dragElement(document.getElementById("messagemanager"));
}

minimize();
