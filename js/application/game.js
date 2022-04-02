function volume() {
    let audio = document.getElementById('audio');
    if(audio.duration > 0 && !audio.paused) {
        audio.muted = !audio.muted;
    }
    else {
        audio.play();
    }
}

function retry(){
    var r =confirm("Voulez-vous recommencer la partie ?");
    if (r == true) {
        location.reload();
    }
}

function return_menu(){
    var r =confirm("Voulez-vous retourner à l'accueil ?");
    if (r == true) {
        window.location.href='../index.html';
    }
}

function printMap() {
    const map = document.querySelector("boulderdash");
    map.innerHTML = "";
    map.style.setProperty('--grid-rows', 16);
    map.style.setProperty('--grid-cols', 32);
    for (let c = 0; c < (32 * 16); c++) {
        let cell = document.createElement("div");
        cell.style.backgroundImage = "url('../img/textures/diamond.png')";
        cell.style.backgroundSize = "cover";
        map.appendChild(cell).className = "grid-item";
    }
}