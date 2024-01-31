/**                button control game               **/
function playPauseGame(){
    var icon= document.getElementById("play-pause");  
    icon.setAttribute('data-play', icon.dataset.play==="true"? "false":"true");      
    if (icon.dataset.play== "false") {
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause"); 
    }else {
       icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    }
}
function RestartGame(){
    document.getElementById("b1").disabled = false;
    document.getElementById("b2").disabled = false;
    document.getElementById("b3").disabled = false;      
    var type=document.getElementById("game-type").textContent;
    playPauseGame()
    startGame(type);
}
function RestartGamAfterLose(){
    document.getElementById("message").innerHTML="";
    document.getElementById("result-lose").style.display="none";
    RestartGame();
}
function leaveGame(){
    playPauseGame();
    document.getElementById("close-window").style.display="block";
}
function leaveGameAfterLoseWin(){ window.location.reload();}
function nextLevel(){
    var level =document.getElementById("level-nbr");  
    var curLevel = eval(level.textContent);  
    var newLevel =level.innerHTML=curLevel +1; 
    document.getElementById("result-win").style.display="none"; 
    level.innerHTML=newLevel;   
    document.getElementById("level").style.display="block"; 
    RestartGame(); 
    setTimeout(function(){
        document.getElementById("level").style.display="none";
    },2500) 
}