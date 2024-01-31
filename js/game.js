/**************  Matrice avec complete wall sans algorithme     ********************** */
function randomMatrice(L , C){
    var matrix = [];  
    let posStart=1;
    let posEnd= C-2;
    // posStart=posStart%2===1?posStart:posStart+1;   // position imapire 
    // posEnd=(posEnd%2===1 && posStart===posEnd)?posEnd:posEnd+1; // position imapire 
    for(var i = 0; i < L; i++) {
        const row = [];
        for(var j = 0; j < C; j++) {
            var classeCell="";
            if(i===0 || j===0 || i===L-1 || j===C-1 || (i%2===0 && j%2===0)){
                classeCell="wall";  
            }
            if(i=== posStart && j===1){
                classeCell="";
                classeCell="start-img";
            }
            if(i=== posStart && j===C-2){
                classeCell="";
                classeCell="start2-img";
            }
            if( i===posEnd && j===C-2){
                classeCell="";
                classeCell="end-img";
            }
            row.push(classeCell);
        }
        matrix.push(row);              
    }
    partition(matrix,1  ,  (nbLig+1)/2 -2 , 1 ,(nbCol+1)/2- 2 ); // (Matrice , debutLigne , nbrLigneVideSansWall , , debutColonne , nbrColonneVideSansWall  )
    return [matrix ,posStart];  // return matrice + position de debut
}
/***************   recherche position item start et end     ****************** */
function posItem(Matrice ,nbLig, nbCol, typeItem){
    var pos=[0,0]; 
    for(var i = 0 ; i < nbLig ; i++ )   {
        for(var j = 0 ; j < nbCol ; j++ )   {
            if(Matrice[i][j]==typeItem){
                pos=[i,j];
            }  
        }
    }
    return pos;
}
/***************   teste si class cellule est wall ****************** */
function IsWall(cell){
    if(cell){
            if(cell!=="wall"){
                return true;
            }
    }
    return false;    
}
/***************   recherche item et modifier score , chronometre  et message  ****************** */
function IsItem(cell , score, chronometre,testS1S2){
    let posS=false;
    if(testS1S2===1){
        var msg =document.getElementById("message");
        if(cell==="wall"){
            cell="wall";
            msg.innerHTML=""
        }else if(cell==="gold5"){
            cell="";
            score+=5;
            msg.innerHTML="Add 5 gold"
        }else if(cell==="gold3"){
            cell="";
            score-=3;
            msg.innerHTML="lose 3 gold"
        }else if(cell==="sec5"){
            cell="";
            chronometre+=5;
            var time= document.getElementById("time");
            var lastTime= eval(time.textContent)+5;
            time.innerHTML=lastTime;
            msg.innerHTML="Add 5 seconds"
        }else if(cell==="interg"){
            var t=["win3","lose3","return0"];
            let randItem= t[Math.floor(Math. random() * t.length)]; 
            if(randItem==="win3"){
                cell="";
                score+=3;
                msg.innerHTML="Add 3 golds"
            }else  if(randItem==="lose3"){
                cell="";
                score-=3;  
                msg.innerHTML="You lose 3 golds"   
            }else if(randItem==="return0"){
                cell="";
                msg.innerHTML="You go back to your initial position !!!"     
                posS=true;
            }
        }else if(cell==="enemies"){
            cell="";
            score=0;
            msg.innerHTML="Enemies !!! you lose !!!!"     
        } else{
            msg.innerHTML="keep moving!!!"     
        }
    }else{
        if(cell==="wall"){
            cell="wall";
        }else if(cell==="gold5"){
            cell="";
        }else if(cell==="gold3"){
            cell="";
        }else if(cell==="sec5"){
            cell="";
        }else if(cell==="interg"){
            cell="";
        }else if(cell==="enemies"){
            cell="enemies";
        }else if(cell==="end-img"){
            cell="end-img";
        }
    }
    return [cell,score, chronometre, posS];
}
/***********         Aficher Maze Matrice ********** */
function AfficherMatrice(Matrice,nbLig , nbCol){
    var M = document.getElementById('table');
    while (M.firstChild) {M.firstChild.remove()} //remove old table maze
    for(var i = 0; i < nbLig; i++) {
        var L = document.createElement('tr');
        for(var j = 0; j < nbCol; j++) {
                var C = document.createElement('td');
                if(Matrice[i][j]!==""){
                    C.classList.add(Matrice[i][j]);
                    var src="";
                    if(Matrice[i][j]=="start-img"){//start
                        src =document.getElementById('startImage').textContent;  
                    }else if(Matrice[i][j]=="start2-img"){//start2
                        src =document.getElementById('startImage2').textContent; 
                    }else if(Matrice[i][j]=="end-img"){ //end
                        src =document.getElementById('endImage').textContent;  
                    }else if(Matrice[i][j]=="gold5"){ // "gold5"
                        src="assets/icon/tresor.PNG"; 
                    }else if(Matrice[i][j]=="sec5"){// "sec5"
                        src="assets/icon/horloge.jpg";
                    }else if(Matrice[i][j]=="gold3"){ // "gold3" 
                       src="assets/icon/piece.PNG"; 
                    }else if(Matrice[i][j]=="interg"){// "interg"
                        src="assets/icon/point.png";
                    }else if(Matrice[i][j]=="enemies"){ // "enemies"
                        src="assets/icon/tete-mort.jpg"; 
                    }  
                    C.style.backgroundImage=  'url('+src+')';
                    C.style.backgroundSize=  "cover";
                    C.style.backgroundRepeat=  "no-repeat";            
                }
            L.appendChild(C);
        }
        M.appendChild(L);
    }
    return Matrice;
}
/****************        enemies Move pause*************** */
    // random position de enemies
    function MoveEnemies(M,nbLig , nbCol){
        var arrayEn=[];
            for(var i = 1; i < nbLig-1; i++) {
                for(var j = 1; j < nbCol-1; j++) {
                    if(M[i][j]==="enemies"){ // "enemies"
                        arrayEn.push([i,j])
                    }    
                }
            } 
            arrayEn.forEach(el => {
                x=el[0];
                y=el[1];
                let gaps = RandomBooleanArray([true, true, true,false]);               
                if(gaps[0]===true){
                    if(M[x+1][y]===""){
                        M[x+1][y]="enemies"
                        M[x][y]=""
                    }else if(M[x][y+1]==="" ){
                        M[x][y+1]="enemies"
                        M[x][y]=""
                    }else if(M[x-1][y]===""){
                        M[x-1][y]="enemies"
                        M[x][y]=""
                    }else if(M[x][y-1]===""){
                        M[x][y-1]="enemies"
                        M[x][y]=""
                    }
                }else  if(gaps[1]===true){
                    if(M[x-1][y]===""){
                        M[x-1][y]="enemies"
                        M[x][y]=""
                    }else if(M[x][y-1]===""){
                        M[x][y-1]="enemies"
                        M[x][y]=""
                    }else  if(M[x+1][y]===""){
                        M[x+1][y]="enemies"
                        M[x][y]=""
                    }else if(M[x][y+1]==="" ){
                        M[x][y+1]="enemies"
                        M[x][y]=""
                    }
                }else  if(gaps[2]===true){
                    if(M[x][y+1]==="" ){
                        M[x][y+1]="enemies"
                        M[x][y]=""
                    }else  if(M[x+1][y]===""){
                        M[x+1][y]="enemies"
                        M[x][y]=""
                    }else if(M[x-1][y]===""){
                        M[x-1][y]="enemies"
                        M[x][y]=""
                    }else if(M[x][y-1]===""){
                        M[x][y-1]="enemies"
                        M[x][y]=""
                    }
                }else  if(gaps[3]===true){
                    if(M[x-1][y]===""){
                        M[x-1][y]="enemies"
                        M[x][y]=""
                    }else if(M[x+1][y]===""){
                        M[x+1][y]="enemies"
                        M[x][y]=""
                    }else  if(M[x][y-1]===""){
                        M[x][y-1]="enemies"
                        M[x][y]=""
                    }else if(M[x][y+1]==="" ){
                        M[x][y+1]="enemies"
                        M[x][y]=""
                    }
                }else{
                    if(M[x+1][y]===""){
                        M[x+1][y]="enemies"
                        M[x][y]=""
                    }if(M[x-1][y]===""){
                        M[x-1][y]="enemies"
                        M[x][y]=""
                    }else if(M[x][y+1]==="" ){
                        M[x][y+1]="enemies"
                        M[x][y]=""
                    } if(M[x][y-1]===""){
                        M[x][y-1]="enemies"
                        M[x][y]=""
                    }else {
                        M[x][y]="enemies"
                    }
                }         
            });
        return M;
    }
    //affiche maze avec enemies
    function MoveEnemiesFn() { 
        var icon= document.getElementById("play-pause");  
        if(icon.dataset.play== "false") {
            var table = document.getElementById("table")
            if(table!==undefined){
                var nbLig =table.rows.length;
                var nbCol =table.rows.length;
                if(nbLig>0 && nbCol>0){
                    var M=[];
                    $("#table tr").each(function() {
                        var L = [];
                        var C = $(this).find('td');
                        C.each(function() {
                            var c=$(this).attr("class")===undefined ? "":$(this).attr("class");
                            L.push(c);
                        });
                        M.push(L);
                    });
                    M= MoveEnemies(M,nbLig,nbCol);
                    AfficherMatrice(M,nbLig,nbCol);
                }
            }
        }
    }
    EnemiesInterval=setInterval(MoveEnemiesFn, 1000); 
    //pause enemies apres clique sur boutton pause game
    function PauseEnemies(){
        var icon= document.getElementById("play-pause");  
        if(icon.dataset.play== "true") {
            clearInterval(EnemiesInterval);
        }else{
            if(!EnemiesInterval){
                setInterval(MoveEnemiesFn, 1000); 
            }
        }
    }
    PauseEnemies(); 
/***********          Move player ********** */
    /*  Find item : modify score and chronometre* */
    function moveLRTDFindItem(M, np, cp,score, chronometre, posS,testS1S2,posE){ 
        // np =newpostion playe apres movement 
        // cp =current position avant movement
        //posS =intialPosition player au debut de jeux 
        if( M[np[0]][np[1]]==="wall"){
            np=cp;
            return [M, np, cp,score, chronometre];     
        }
        if(M[np[0]][np[1]]==="" && score>0){ // td vide n'admet pas de classe
            if(testS1S2===1){
                var x=IsItem(M[np[0]][np[1]], score, chronometre,testS1S2) //modification score , chronometre , position selon newpositon classe cellule
                M[cp[0]][cp[1]]=x[0];
                score=score-1;
                chronometre=x[2];
                M[np[0]][np[1]]="start-img";  
            } else{
                var x=IsItem(M[np[0]][np[1]], score, chronometre,testS1S2) //modification score , chronometre , position selon newpositon classe cellule
                M[cp[0]][cp[1]]=x[0];
                M[np[0]][np[1]]="start2-img";
            }
        }else{
            if(testS1S2===1){
                var x=IsItem(M[np[0]][np[1]], score, chronometre,testS1S2)//modification score , chronometre , position selon newpositon classe cellule
                M[cp[0]][cp[1]]="";
                score=x[1];
                chronometre=x[2];
                // position player apres movement 
                if(x[3]===true){   // retrun0 : retourner player a position 0 
                    M[posS][0]="start-img";
                }else{// passe player au nouvelle position
                    M[np[0]][np[1]]="start-img";   
                }  
            } else{
                var x=IsItem(M[np[0]][np[1]], score, chronometre,testS1S2)//modification score , chronometre , position selon newpositon classe cellule
                M[cp[0]][cp[1]]=x[0];
                score=x[1];
                if(x[3]===true){   // retrun0 : retourner player a position 0 
                    M[posS][0]="start2-img";
                }else{// passe player au nouvelle position
                    if(posE[0] !== np[0] && posE[1] !== np[1] ){ 
                        M[np[0]][np[1]]="start2-img";
                    }else{
                        M[cp[0]][cp[1]]="start2-img";  
                    }   
                } 
          }
        }          
        return [M, np, cp,score, chronometre];
    }
    /*  move left right up down + (score =0)=> lose + (playerstart=end )=>win */
    function move(Matrice ,nbLig , nbCol, score,chronometre,intialPosS){
            $(document).ready(function(){
                $(document).on("keydown", function (e) {     
                    var posS=posItem(Matrice, nbLig,nbCol,"start-img");
                    var posS2=posItem(Matrice, nbLig,nbCol,"start2-img");
                    var posE=posItem(Matrice, nbLig,nbCol,"end-img");
                    var newPos=[-1,-1];
                    var newPos2=[-1,-1];
                    var M=Matrice;
                    if (e.keyCode < 37 || e.keyCode > 40) {
                        return;
                    }else{ 
                        // movement left , right , up ,down
                        var icon= document.getElementById("play-pause");   
                        if(icon.dataset.play== "false") { // ne move pas si jeux est en pause
                            switch (e.keyCode) {
                                case 37: //left
                                    newPos[0]=posS[0];
                                    newPos[1]=posS[1]-1;

                                    newPos2[0]=posS2[0];
                                    newPos2[1]=posS2[1]+1;
                                break;
                                case 38: // up
                                    newPos[0]=posS[0]-1;
                                    newPos[1]=posS[1];

                                    newPos2[0]=posS2[0]+1;
                                    newPos2[1]=posS2[1];
                                break;
                                case 39: //right
                                    newPos[0]=posS[0];
                                    newPos[1]=posS[1]+1;

                                    newPos2[0]=posS2[0];
                                    newPos2[1]=posS2[1]-1;
                                break;// down
                                case 40:
                                    newPos[0]=posS[0]+1;
                                    newPos[1]=posS[1];

                                    newPos2[0]=posS2[0]-1;
                                    newPos2[1]=posS2[1];
                                break;
                            }
                        }
                        // condition si new position apres movement different de bordure(wall externe) de matrice 
                        if((newPos[1]>=0 && newPos[1]<=nbCol-1) && (newPos[0]>=0 &&  newPos[0]<=nbLig-1)){
                            var Res=moveLRTDFindItem(Matrice,newPos,posS,score, chronometre , intialPosS,1,posE)
                            M=Res[0];  // Nouveau Matrice apres movement 
                            newPos=Res[1]; // Nouveau position player apres movement 
                            posS=Res[2]; // position intial
                            score=Res[3]; // Nouveau score apres movement 
                            chronometre=Res[4]; // Nouveau chronometre apres movement 
                        }else{
                            // pas de modification :position intial ne modifier pas
                            newPos=posS;  
                        }
                            if((newPos2[1]>=0 && newPos2[1]<=nbCol-1) && (newPos2[0]>=0 &&  newPos2[0]<=nbLig-1)){
                                    var Res=moveLRTDFindItem(Matrice,newPos2,posS2,score, chronometre , intialPosS, 2,posE)
                                    // M=Res[0];  // Nouveau Matrice apres movement 
                                    newPos2=Res[1]; // Nouveau position player apres movement 
                                    posS2=Res[2]; // position intial
                                
                            }else{
                                // pas de modification :position intial ne modifier pas
                                    switch (e.keyCode) {
                                        case 37: //left
                                            newPos2[0]=posS2[0];
                                            newPos2[1]=posS2[1]-1;
                                        break;
                                        case 38: // up
                                            newPos2[0]=posS2[0]-1;
                                            newPos2[1]=posS2[1];
                                        break;
                                        case 39: //right
                                            newPos2[0]=posS2[0];
                                            newPos2[1]=posS2[1]+1;
                                        break;// down
                                        case 40:
                                            newPos2[0]=posS2[0]+1;
                                            newPos2[1]=posS2[1];
                                        break;
                                    }
                                    var Res=moveLRTDFindItem(Matrice,newPos2,posS2,score, chronometre , intialPosS, 2,posE)
                                    // M=Res[0];  // Nouveau Matrice apres movement 
                                    newPos2=Res[1]; // Nouveau position player apres movement 
                                    posS2=Res[2]; // position intial
                                
                            }
                    }
                    // condition si score=0 ->lose 
                    if(score===0){
                        document.getElementById("result-lose").style.display="block";
                        document.getElementById("score").innerHTML ="score= 0";

                    }else{
                        document.getElementById("score").innerHTML ="score="+score;
                        AfficherMatrice(M,nbLig,nbCol) 
                    }
                    //condition start= end -> win find end 
                    if(posE[0] === newPos[0] && posE[1] === newPos[1] ){ 
                        document.getElementById("result-win").style.display="block";
                        var icon= document.getElementById("play-pause");  
                        icon.setAttribute('data-play', icon.dataset.play="true");      // icon play 
                    }
                });
            })
    }
/***********          Niveau easy , medium , difficult    ************/
function meduimGame(Matrice ,nbLig, nbCol){
    var t=["gold5","sec5","gold3","interg"];
    var items=[];
    let nbrItems= 3; 
    for(var i=0;i<t.length;i++){  //pour chaque items i de table t
        var j=1;
        while(j<=nbrItems){ // creer nbrItem de t[i]
            var choix=[];
            let randL= randomValue(nbLig-2,1);
            let randC= randomValue(nbCol-2,1);
            randL=randL%2===0? randL+1: randL;
            randC=randC%2===0? randC+1: randC;
            if(Matrice[randL][randC].length===0){
                choix.push(t[i],randL,randC) //choix exp : ["gold5",5,6] 
                items.push(choix);  // items :tableau de choix 
                j++;
            }
        }
    }
    items.forEach(V => {  // remplir maze par les items de array items
            Matrice[V[1]][V[2]]=V[0];
    });
    return Matrice;
}
function difficultGame(Matrice ,nbLig, nbCol){
    var Matrice= meduimGame(Matrice ,nbLig, nbCol );  // meme fonctionnalités de meduim
    let nbrEnemies= 4;
    var i =0;
    while( i<nbrEnemies){
      let l= randomValue(nbLig-2,1);
      let c= randomValue(nbCol-2,1);     
      if(Matrice[l][c].length===0){
        Matrice[l][c]="enemies";
        i++;   
      } 
    }
}
function startGame(type){
    var theme=document.getElementById("theme-type").textContent;
    document.getElementById("game-type").innerHTML=type;
    var chronometre,score;
    var Matrice=[];
    var posS;
    document.getElementById("menu").style.display ="none";
    document.getElementById("background-animated").style.zIndex=1;
    if(type==="easy"){
      chronometre=20; nbLig=13;nbCol=13;score=30;
      var x= randomMatrice(nbLig ,nbCol );
      Matrice= x[0];
      posS= x[1]; // postion debut
    }
    if(type==="medium"){
      chronometre=40;nbLig=17;nbCol=17;score=70;
      var x= randomMatrice(nbLig ,nbCol );
      Matrice= x[0];
      posS= x[1]; // postion debut
      Matrice= meduimGame(Matrice , nbCol,nbLig )
    }
    if(type==="difficult"){
      chronometre=60;nbLig=19;nbCol=19;score=120;
      var x= randomMatrice(nbLig ,nbCol ); // return matrice + position de debut
      Matrice= x[0]; // matrice
      posS= x[1];  // postion debut
      difficultGame(Matrice , nbCol,nbLig);
    }
    document.getElementById("total-time").innerHTML= chronometre;
    document.getElementById("niveau").innerHTML =type +" "+ theme +" Game";
    document.getElementById("score").innerHTML ="score="+ score;
    document.getElementById("time").innerHTML =chronometre;
    AfficherMatrice(Matrice,nbLig , nbCol)
    move(Matrice ,nbLig , nbCol ,score,chronometre,posS) //posS = position debut
}
/******************        chronometre  ************* */
function chronometreDiminue(){
    var lastTime= eval(document.getElementById("time").textContent);
    var score= eval(document.getElementById("score").textContent);
    var icon= document.getElementById("play-pause");  
    var win = $('#result-win').css('display') == 'block';
    var lose= $('#result-lose').css('display') == 'block';
    var time;
    if(score===0 || lastTime===0 || win || lose){
       document.getElementById("b1").disabled = true;
       document.getElementById("b2").disabled = true;
       document.getElementById("b3").disabled = true;      
        return;    
    }
    if (icon.dataset.play=== "true") {
         time= lastTime;
    }else{
        var time= lastTime-1;
        var total= document.getElementById("total-time").textContent;
        var pour= (time*100)/total;
         document.getElementById("timespan").style.width=pour+"%";
        if(time<0){
            return ;
        }else if(time>0){
            document.getElementById("time").innerHTML = time;
        }else if (time===0){
            document.getElementById("time").innerHTML = time;
            document.getElementById("result-lose").style.display="block";
        }
    }
}
var timer= setInterval(chronometreDiminue, 1000)
