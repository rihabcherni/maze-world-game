function updateAv(img) {
    var resPageLogin = document.getElementById("res-login")
    var resNav = document.getElementById("res-nav")    
    resPageLogin.src =img;
    resNav.src =img;
}
function Submitlogin(){
    var nom= document.getElementById("nom").value;
    var loginName=document.getElementById("login-name");
    if (nom){
        loginName.innerHTML = nom;
    }
    else{
        loginName.innerHTML = "anonymous";
    }
    document.getElementById("badge-icon").style.display ="block";
    document.getElementById("login-window");
    closeLogin();
}