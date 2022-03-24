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