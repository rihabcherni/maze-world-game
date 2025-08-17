const next = document.querySelector(".carousel-btn-next"),
back = document.querySelector(".carousel-btn-back"),
carousel = document.querySelector(".carousel-cards");
let angle = 0;
next.addEventListener("click", () => { //next translation axe Z + rotation angle sur Y 
  angle -= 45;
  carousel.style.transform = `translateZ(-25rem) rotateY(${angle}deg)`;
});
back.addEventListener("click", () => {
  angle += 45;
  carousel.style.transform = `translateZ(-25rem) rotateY(${angle}deg)`;
});
function imageTheme(theme){
  var link= "assets/theme/";
  var win= "assets/theme/winImage/";
  var start= "assets/theme/startImage/";
  var end= "assets/theme/EndImage/";
  var x= document.getElementById('theme-type').innerHTML=theme;
  var array =[];
  if(theme==="autumn"){
    array =["autumn.PNG", "start-autumn.PNG","end-autumn.PNG","res-autumn.PNG"] ;
  }else if(theme==="spring"){
    array =["spring.PNG", "start-spring.PNG","end-spring.PNG","res-spring.PNG"] ;
  }else if(theme==="winter"){
    array =["winter.PNG", "start-winter.PNG","end-winter.PNG","res-winter.PNG"] ;
  }else if(theme==="summer"){
    array =["summer.PNG", "start-summer.PNG","end-summer.PNG","res-summer.PNG"] ;
  }else if(theme==="newYear"){
    array =["new-year.jpg", "start-happynewyear.PNG","end-happynewyear.PNG","res-happynewyear.PNG"] ;
  }else if(theme==="diwali"){
    array =["diwali.jpg", "start-diwali.PNG","end-diwali.PNG","res-diwali.PNG"] ;
  }else if(theme==="christmas"){
    array =["christmas.jpg", "start-christmas.PNG","end-christmas.PNG","res-christmas.PNG"] ;
  }else if(theme==="halloween"){
    array =["halloween.jpg", "start-halloween.PNG","end-halloween.PNG","res-halloween.PNG"] ;
  }
  document.getElementById("startImage").innerHTML= start+array[1];
  document.getElementById("endImage").innerHTML= end+array[2];
  document.getElementById('result-img').src=win+array[3];
  AnimatedBackground(theme);
  document.getElementById("background-animated").style.zIndex=6;
  document.getElementById("theme").style.display ="none";

}
function AnimatedBackground(theme){ // iframe source
  var src="animation/"+theme+"/index.html";
  document.getElementById("background-page").setAttribute('src',src);
}