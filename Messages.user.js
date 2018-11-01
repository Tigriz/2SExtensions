// ==UserScript==
// @name         Messages
// @version      0.0.1
// @description  Permet de naviguer entre les messages.
// @author       Lisa
// @match        https://2sucres.org/message/*
// @grant        none
// ==/UserScript==

const angular = window.angular
let $scope = null

async function sleep (delay) {
    return new Promise((resolve, reject) => setTimeout(resolve, delay))
}

async function onContentChange () {
        await sleep(50);
        let messageId = window.location.href;
        messageId = Number(messageId.slice(28));
        document.getElementById("messagesPrev").onclick = function(){
            angular.element('.forum-view').scope().showMessage(--messageId);
        }
        document.getElementById("messagesNext").onclick = function(){
            angular.element('.forum-view').scope().showMessage(++messageId);
        }
}

async function loadScope () {
    const forumEl = document.getElementById('forum-container')
    return new Promise(async (resolve, reject) => {
        while (angular.element(forumEl).scope() === undefined) {
            await sleep(100)
        }
        $scope = angular.element(forumEl).scope()
        resolve($scope)
    })
}

async function bootstrap () {
    await loadScope()
    window.innerScope = $scope
    await sleep(100);
    onContentChange();
    document.getElementsByClassName("topic-title")[0].innerHTML = '<a id="messagesPrev" class="btn-circle btn-circle-primary btn-circle-sm btn-circle-raised" style="float: left;"><i class="zmdi zmdi-long-arrow-left"></i></a><a id="messagesNext" class="btn-circle btn-circle-primary btn-circle-sm btn-circle-raised" style="float: right;"><i class="zmdi zmdi-long-arrow-right"></i></a>';
}

bootstrap().catch(console.error)
