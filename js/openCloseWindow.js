/*       Help         */
    function openHelp(){
        document.getElementById("help").style.display ="block";
    }
    function closeHelp(){
        document.getElementById("help").style.display ="none";
    }
 /*       Rating         */
    function openRating(){
        document.getElementById("rating").style.display ="block";
    }
    function closeRating(){
        document.getElementById("rating").style.display ="none";
    }
/*       About-us         */
    function openAboutUs(){
        document.getElementById("about-us").style.display ="block";
    }
    function closeAboutUs(){
        document.getElementById("about-us").style.display ="none";
    }
 /*       Login         */ 
    function openLogin(){
        document.getElementById("login-window").style.display ="block";
    }
    function closeLogin(){
        var badge=document.getElementById("badge-icon");
        if(badge.style.display==="none"){
            badge.style.display ="block";
        }
        document.getElementById("login-window").style.display ="none";
    }
 /*       Setting         */ 
    function openSetting(){
        document.getElementById("setting").style.display ="block";
    }
    function closeSetting(){
        document.getElementById("setting").style.display ="none";
    }
 /*       close window leave game         */ 
    function closeLeaveWindow(){
        document.getElementById("close-window").style.display ="none";
    }
    function confirmLeaveWindow(){
        window.location.reload();
    }