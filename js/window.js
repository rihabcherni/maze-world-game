//<!----> 
 const date = new Date();
 let day = date.getDate();
 let month = date.getMonth() + 1;
 let year = date.getFullYear();
 let hour = date.getHours();
 let min = date.getMinutes();
  let currentDate = `${day}-${month}-${year}`;
 let currentHours = `${hour}:${min}`;
 console.log(currentDate); 
 console.log(currentHours); 
//<!----> 


