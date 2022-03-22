function volume() {
    let audio = document.getElementById('audio');
    if(audio.duration > 0 && !audio.paused) {
        audio.muted = !audio.muted;
    }
    else {
        audio.play();
    }
}