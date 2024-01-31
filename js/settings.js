document.addEventListener('click', (e) => {
    const colorOption = e.target.closest('.color-option');
    if (!colorOption) return;
    document.querySelectorAll('.color-option').forEach(colorOption => colorOption.classList.remove('is-selected'));
    colorOption.classList.add('is-selected');
    
    const color = colorOption.dataset.color;
    
    let root = document.documentElement;
    root.style.setProperty('--main-color', color);
    root.style.setProperty('--window-color', color);
    root.style.setProperty('--border-color', "white");
    root.style.setProperty('--button-color', color);
    root.style.setProperty('--button-color', color);
});
function loadfunc() {    
    var load=document.getElementById("load");
   load.remove();
}
function loading() {
    var x=Math.floor(Math.random()*2+2)* 1000;
    setTimeout(loadfunc, x)
}
function startMusic(){
    var audio= document.getElementById('audio');
    var icon= document.getElementById("music");          
    if (audio.muted == false) {
        audio.muted = true;
        icon.classList.remove("fa-volume-up");
        icon.classList.add("fa-volume-off"); 
    }else {
        audio.muted = false;
        audio.play();
        icon.classList.remove("fa-volume-off");
        icon.classList.add("fa-volume-up");
    }
}