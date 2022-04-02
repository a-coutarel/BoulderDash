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
    let T = 'T';
    let V = 'V';
    let R = 'R';
    let M = 'M';
    let P = 'P';
    let D = 'D';
    let tab = [
        [T,T,T,T,R,T,T,T,R,T,T,T,T,V,T,T,T,T,T,T,R,T,T,T,T,V,T,T,T,T,T,T],
        [T,T,P,T,T,T,T,R,D,T,T,M,M,M,M,M,M,M,M,T,T,T,T,D,T,T,T,T,R,T,T,T],
        [T,T,T,R,T,T,T,R,V,T,T,T,T,V,T,T,T,T,R,T,R,T,T,T,T,T,T,T,T,T,T,T],
        [T,T,R,T,T,T,T,R,T,T,T,T,T,T,T,T,R,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
        [T,T,T,T,R,T,T,T,R,T,T,T,T,V,T,T,T,T,T,T,R,T,T,T,T,V,T,T,T,T,T,T],
        [T,T,R,T,T,T,T,R,D,T,T,M,M,M,M,M,M,M,M,T,T,T,T,D,T,T,T,T,R,T,T,T],
        [T,T,T,R,T,T,T,R,V,T,T,T,T,V,T,T,T,T,R,T,R,T,T,T,T,T,T,T,T,T,T,T],
        [T,T,R,T,T,T,T,R,T,T,T,T,T,T,T,T,R,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
        [T,T,T,T,R,T,T,T,R,T,T,T,T,V,T,T,T,T,T,T,R,T,T,T,T,V,T,T,T,T,T,T],
        [T,T,R,T,T,T,T,R,D,T,T,M,M,M,M,M,M,M,M,T,T,T,T,D,T,T,T,T,R,T,T,T],
        [T,T,T,R,T,T,T,R,V,T,T,T,T,V,T,T,T,T,R,T,R,T,T,T,T,T,T,T,T,T,T,T],
        [T,T,R,T,T,T,T,R,T,T,T,T,T,T,T,T,R,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
        [T,T,T,T,R,T,T,T,R,T,T,T,T,V,T,T,T,T,T,T,R,T,T,T,T,V,T,T,T,T,T,T],
        [T,T,R,T,T,T,T,R,D,T,T,M,M,M,M,M,M,M,M,T,T,T,T,D,T,T,T,T,R,T,T,T],
        [T,T,T,R,T,T,T,R,V,T,T,T,T,V,T,T,T,T,R,T,R,T,T,T,T,T,T,T,T,T,T,T],
        [T,T,R,T,T,T,T,R,T,T,T,T,T,T,T,T,R,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
    ];
    const map = document.querySelector("boulderdash");
    map.innerHTML = "";
    map.style.setProperty('--grid-rows', 16);
    map.style.setProperty('--grid-cols', 32);
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 32; j++) {
            let cell = document.createElement("div");  
            switch (tab[i][j]) {
                case T: cell.style.backgroundImage = "url('../img/textures/dirt.png')"; break;
                case V: cell.innerHTML = ""; break;
                case R: cell.style.backgroundImage = "url('../img/textures/stone.png')"; break;
                case M: cell.style.backgroundImage = "url('../img/textures/wall.png')"; break;
                case P: cell.style.backgroundImage = "url('../img/textures/rockford.png')"; break;
                case D: cell.style.backgroundImage = "url('../img/textures/diamond.png')"; break;
            }
            map.appendChild(cell).className = "grid-item";
        }
    }
}