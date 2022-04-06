function volume() 
{
    let audio = document.getElementById('audio');
    if(audio.duration > 0 && !audio.paused) { 
        audio.muted = !audio.muted;
        if(audio.muted == true) { window.sessionStorage.setItem('muted', 'true'); }
        else { window.sessionStorage.setItem('muted', 'false'); }
    }
    else { 
        audio.play();
        window.sessionStorage.setItem('muted', 'false');
    }
}

window.addEventListener("load", () => {
    if(window.sessionStorage.getItem('muted') == 'true') { document.getElementById('audio').muted = true; }
});