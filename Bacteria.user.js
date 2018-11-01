// ==UserScript==
// @name         Bacteria
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  Améliore l'expérience utilisateur de Bacteria
// @author       Lisa
// @match        https://2sucres.org/*
// @icon         http://image.noelshack.com/fichiers/2018/34/4/1535023345-icon.png
// @grant        none
// ==/UserScript==

const $ = window.$
const angular = window.angular
let $scope = null

async function sleep (delay) {
    return new Promise((resolve, reject) => setTimeout(resolve, delay))
}

function setParsedFlag (el) {
    el['data-2ux-parsed'] = ''
}

function query (selector) {
    const output = []
    const list = document.querySelectorAll(selector)
    for (let i = 0; i < list.length; ++i) {
        if (list[i]['data-2ux-parsed'] === undefined) output.push(list[i])
        setParsedFlag(list[i])
    }
    return output
}

// Génération de la grille
function getGrid(){
    // Cherche les images
    let grid = document.querySelectorAll(".message-image-ns>img");
    let logo = 0; // Image d'en-tête
    let row = 0;
    let col = 0;
    for (let slot of grid) {
        slot.style = "margin-right: -4px";
        // Une fois que le logo est passé
        if(logo++ > 7){
            // On met les informations de la grille
            slot.setAttribute("row", row++);
            slot.setAttribute("col", col);
            // Changement de colonne
            if(row==8){
                col++;
                row = 0;
            }
        }
    }
    return grid;
}

async function onContentChange () {
    try {
        await sleep(50) // wait for DOM to update (couldn't find something better than that :/)
        if ($scope.currentPageType === 'message-list') {
            // Cherche si l'auteur est le Bot
            if(document.getElementsByClassName("user-pseudo-0")[0].innerHTML.replace(/\s+/g, '') == "Bacteria"){
                // Former la grille
                getGrid();
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(4)").innerHTML = "✔️ Vous avez le script !";

                // Mise en forme
                // Logo
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)").style = "text-align: center";
                // Grille
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(5)").style = "text-align: center";
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(6)").style = "text-align: center";
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(7)").style = "text-align: center";
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(8)").style = "text-align: center";
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(9)").style = "text-align: center";
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(10)").style = "text-align: center";
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(11)").style = "text-align: center";
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(12)").style = "text-align: center";
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(13)").style = "text-align: center";
                document.querySelector(".topic-message:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(14)").style = "text-align: center";

                let xhr = new XMLHttpRequest();

                // Enlève la réactivité des liens
                let links = query('a.message-image-ns')
                for (let link of links) {
                    link.href = "#navbar";
                    link.target = "";
                }

                // Le code du move
                let selected;

                // Le joueur
                let username = query(".message-avatar>a")[0].getAttribute("href").slice(9);
                let id = 0;
                let player = 0;
                if(username==document.getElementsByClassName("user-pseudo-0")[1].innerHTML.toLowerCase().replace(/\s+/g, '')){
                    console.log("Player 1");
                    player = 1;
                    id = query(".message-date")[1].getAttribute("href").slice(9);
                }
                if(username==document.getElementsByClassName("user-pseudo-0")[2].innerHTML.toLowerCase().replace(/\s+/g, '')){
                    console.log("Player 2");
                    player = 2;
                    id = query(".message-date")[2].getAttribute("href").slice(9);
                }

                // Son token
                let token = app.csrf;

                // Création de l'évènement click
                document.addEventListener('click', function(event) {
                    if (event.target.tagName.toUpperCase() == 'IMG') {
                        // Enregistre les coordonnées sur la grille
                        let row = +event.target.getAttribute("row");
                        let col = +event.target.getAttribute("col");
                        // Wata sélection
                        if (event.target.src == "https://image.noelshack.com/fichiers/2018/34/3/1534891473-1.png" && (player == 1 || player == 0)){
                            selected = String(row)+String(col)
                            console.log(row,col,"Wata!");
                            for (let slot of getGrid()) {
                                // Efface les emplacements précédents
                                if(slot.getAttribute("src")=="http://image.noelshack.com/fichiers/2018/34/3/1534937373-p1mt2.png" || slot.getAttribute("src")=="http://image.noelshack.com/fichiers/2018/34/3/1534937373-p1mt1.png") slot.setAttribute("src", "https://image.noelshack.com/fichiers/2018/34/3/1534891649-0.png");
                                // Met les nouveaux emplacements
                                if(slot.getAttribute("src")=="https://image.noelshack.com/fichiers/2018/34/3/1534891649-0.png"){
                                    let rowFinal = +slot.getAttribute("row");
                                    let colFinal = +slot.getAttribute("col");
                                    //console.log("salut"+rowFinal+colFinal);
                                    // Movetype 1
                                    if((col+1 == colFinal || col-1 == colFinal || col == colFinal) && (row+1 == rowFinal || row-1 == rowFinal || row == rowFinal) && (row!=rowFinal || col!=colFinal)){
                                        console.log(slot);
                                        slot.setAttribute("src", "http://image.noelshack.com/fichiers/2018/34/3/1534937373-p1mt1.png");
                                    }
                                    // Movetype 2
                                    if (((row+2 == rowFinal || row-2 == rowFinal) && col==colFinal) || ((col+2 == colFinal || col-2 == colFinal) && row==rowFinal)) slot.setAttribute("src", "http://image.noelshack.com/fichiers/2018/34/3/1534937373-p1mt2.png");
                                }
                            }
                        }
                        // Wata confirmation
                        if (event.target.src=="http://image.noelshack.com/fichiers/2018/34/3/1534937373-p1mt2.png" || event.target.src =="http://image.noelshack.com/fichiers/2018/34/3/1534937373-p1mt1.png"){
                            selected = selected + String(row) + String(col);
                            console.log(selected);
                            xhr.open("POST", '/web-api/51', true);
                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            xhr.send(`do=message-edit&id=${id}&content=${selected}&AJAX-CSRF=${token}`);
                            for (let slot of getGrid()) {
                                // Efface les emplacements précédents
                                if(slot.getAttribute("src")=="http://image.noelshack.com/fichiers/2018/34/3/1534937373-p1mt2.png" || slot.getAttribute("src")=="http://image.noelshack.com/fichiers/2018/34/3/1534937373-p1mt1.png") slot.setAttribute("src", "https://image.noelshack.com/fichiers/2018/34/3/1534891649-0.png");
                            }
                        }
                        // Kamai sélection
                        if (event.target.src == "https://image.noelshack.com/fichiers/2018/34/3/1534891473-2.png" && (player == 2 || player == 0)){
                            selected = String(row)+String(col)
                            console.log(row,col,"Kamai !");
                            for (let slot of getGrid()) {
                                // Efface les emplacements précédents
                                if(slot.getAttribute("src")=="http://image.noelshack.com/fichiers/2018/34/3/1534953485-p2mt1.png" || slot.getAttribute("src")=="http://image.noelshack.com/fichiers/2018/34/3/1534953485-p2mt2.png") slot.setAttribute("src", "https://image.noelshack.com/fichiers/2018/34/3/1534891649-0.png");
                                // Met les nouveaux emplacements
                                if(slot.getAttribute("src")=="https://image.noelshack.com/fichiers/2018/34/3/1534891649-0.png"){
                                    let rowFinal = +slot.getAttribute("row");
                                    let colFinal = +slot.getAttribute("col");
                                    // Movetype 1
                                    if((col+1 == colFinal || col-1 == colFinal || col == colFinal) && (row+1 == rowFinal || row-1 == rowFinal || row == rowFinal) && (row!=rowFinal || col!=colFinal)) slot.setAttribute("src", "http://image.noelshack.com/fichiers/2018/34/3/1534953485-p2mt1.png");
                                    // Movetype 2
                                    if (((row+2 == rowFinal || row-2 == rowFinal) && col==colFinal) || ((col+2 == colFinal || col-2 == colFinal) && row==rowFinal)) slot.setAttribute("src", "http://image.noelshack.com/fichiers/2018/34/3/1534953485-p2mt2.png");
                                }
                            }
                        }
                        // Kamai confirmation
                        if (event.target.src=="http://image.noelshack.com/fichiers/2018/34/3/1534953485-p2mt1.png" || event.target.src =="http://image.noelshack.com/fichiers/2018/34/3/1534953485-p2mt2.png"){
                            selected = selected + String(row) + String(col);
                            console.log(selected);
                            xhr = new XMLHttpRequest();
                            xhr.open("POST", '/web-api/51', true);
                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            xhr.send(`do=message-edit&id=${id}&content=${selected}&AJAX-CSRF=${token}`);
                            for (let slot of getGrid()) {
                                // Efface les emplacements précédents
                                if(slot.getAttribute("src")=="http://image.noelshack.com/fichiers/2018/34/3/1534953485-p2mt1.png" || slot.getAttribute("src")=="http://image.noelshack.com/fichiers/2018/34/3/1534953485-p2mt2.png") slot.setAttribute("src", "https://image.noelshack.com/fichiers/2018/34/3/1534891649-0.png");
                            }
                        }
                    }
                });
            }
        }
    } catch (err) {}
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
    // run when $scope is ready
    await loadScope()
    window.innerScope = $scope
    $scope.$apply = new Proxy($scope.$apply, {
        apply (target, that, args) {
            onContentChange.apply(that, args)
            target.apply(that, args)
        }
    })
}

bootstrap().catch(console.error)
