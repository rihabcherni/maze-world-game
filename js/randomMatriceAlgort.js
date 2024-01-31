/**********            random value entre min et max   **************** */
function randomValue(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/***random array de valeur  true et false [true, true, true, false] pour l'algritheme de recherche ****** */
function RandomBooleanArray(array) { 
    for(let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
} 
function posToSpace(x) {return 2 * (x-1) + 1;}
function posToWall(x) { return 2 * x;  }
function partition(M,r1, r2, c1, c2) {  // r1 = debutLigne , r2 = fin ligne , c1 =debut colonne , c2 = fin colonne
    let horiz, vert, x, y;
    // affecter un random valeur pour l'horizontale
    if((r2 < r1) || (c2 < c1)) { return false; } // si debut> fin => pas de traitement
    if(r1 == r2) {   // si debut ligne = fin ligne
      horiz = r1; 
    } else {
      x = r1+1;   // debut ligne ++
      y = r2-1;  // fin ligne--
      horiz =randomValue(Math.round(x + (y-x) / 4),  Math.round(x + 3*(y-x) / 4));//round =valeur arrondi de float = entier 
      // random min = Dligne+ diff(DLigne,fLigne)/4 
      // random  max= Dligne+ 3*diff(DLigne,fLigne)/4 
    }
       // affecter un random valeur pour le verticale 
    if(c1 == c2) {
      vert = c1;
    } else {
      x = c1 + 1;
      y = c2 - 1;
      vert =randomValue(Math.round(x + (y - x) / 3), Math.round(x + 2 * (y - x) / 3));
        // random min = Dligne+ diff(DLigne,fLigne)/4 
        // random  max= Dligne+ 3*diff(DLigne,fLigne)/4
    } 
    for(let i =posToWall(r1)-1; i <=posToWall(r2)+1; i++) {
      for(let j =posToWall(c1)-1; j <=posToWall(c2)+1; j++) {
        if((i ==posToWall(horiz)) || (j ==posToWall(vert))) {
            M[i][j] = "wall";  // ligne ou colonne de wall pour vertical et horizontal
        }
      }
    } 
    let gaps = RandomBooleanArray([true, true, true, false]);
    // supprimer les wall selon valeur de gap(true or false) et horiz et verticale
    if(gaps[0]) {
      let gapPosition =randomValue(c1, vert);
      M[posToWall(horiz)][posToSpace(gapPosition)] ="";
    }
    if(gaps[1]) {
      let gapPosition =randomValue(vert+1, c2+1);
      M[posToWall(horiz)][posToSpace(gapPosition)] ="";
    } 
    if(gaps[2]) {
      let gapPosition =randomValue(r1, horiz);
      M[posToSpace(gapPosition)][posToWall(vert)] ="";
    } 
    if(gaps[3]) {
      let gapPosition =randomValue(horiz+1, r2+1);
      M[posToSpace(gapPosition)][posToWall(vert)] ="";
    }
    // appelle recursive de partition
    partition(M,r1, horiz-1, c1, vert-1); 
    partition(M,horiz+1, r2, c1, vert-1);
    partition(M,r1, horiz-1, vert+1, c2);
    partition(M,horiz+1, r2, vert+1, c2);
}
