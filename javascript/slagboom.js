   var BX, BY, PootX, PootY, LSB, DSB, Straal;
   var Hoek, Oversteek;
   var DraaiPX, DraaiPY;
   var AniNr;
   BX = 0; BY = 400;
  
  
  //**************************************************************
  function LaadSlagBoom() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var img = new Image();    
    img.src = "Images/TBB2.jpg";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);   

    PootX = 50;
    PootY = 200;
    Straal = 10; 

    //ctx.fillStyle = "#000000";
    //ctx.fillRect(0,0,canvas.width,canvas.width);
  
    //poot
    ctx.fillStyle = "#CC9966";
    ctx.fillRect(BX+100,BY,PootX,PootY);
    
    //teken slagboom    
    DraaiPX = BX + 125; 
    DraaiPY = BY + 50;
    LengteSB = 500;
    DikteSB = 20;
    Oversteek = 50;
    Hoek = 0;
    TekenSlagBoom(DraaiPX, DraaiPY,LengteSB,DikteSB, Oversteek,Hoek);     
   
    ctx.beginPath();  
    ctx.fillStyle = "#000000";   
    ctx.arc(BX + 125, BY + 50, 10, 0, 2*Math.PI);
    ctx.fill();        
  }

  //**************************************************************
  function TekenSlagBoom(DraaiPX,DraaiPY,L,B, Oversteek, Hoek) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
 
    var StukL;  
    var Kleur;
    var LSB, DSB, Straal;    
    
    StukL = Math.floor((L+Oversteek)/6)+1;

    for (var i=0; i < 6; i++) {
      if ((i % 2)== 0) { 
        Kleur = "#FF0000";   
      }
      else {
        Kleur = "#FFFFFF";    
      }

      TekenSBStuk(DraaiPX,DraaiPY, B, StukL-Oversteek, Hoek, Kleur, Oversteek);                          
      Oversteek = Oversteek - StukL;       
    }     
  }

  //*****************************************
  function TekenSBStuk(BX, BY, Breedte, Lengte, Hoek,Kleur, BL) { 
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var X, Y;

    ctx.beginPath(); 
    ctx.strokeStyle = Kleur;   
    ctx.lineWidth = Breedte;     

    
    X = -Math.floor(Math.cos(Hoek) * BL) +BX;
    Y = -Math.floor(Math.sin(Hoek) * BL) +BY;    
    ctx.moveTo(X,Y); 

    X = Math.floor(Math.cos(Hoek) * Lengte) +BX;
    Y = Math.floor(Math.sin(Hoek) * Lengte) +BY;    
    ctx.lineTo(X,Y);
    ctx.stroke();         
  }      

  //*****************************************  
  function OpenSlagBoom() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    AniNr = 0;
    Hoek = 0;  
       
    TekenInterval = setInterval(function(){OpenSlagBoomNu(canvas, ctx);},50); //wow, dit werkt!         
  }
  
  //*****************************************  
  function OpenSlagBoomNu(canvas, ctx) {  
    DraaiPX = BX + 125; 
    DraaiPY = BY + 50;
    LengteSB = 500;
    DikteSB = 20;
    Oversteek = 50;

    PootX = 50;
    PootY = 200;
    Straal = 10; 
    
    var img = new Image();    
    img.src = "Images/TBB2.jpg";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);   
    //ctx.fillStyle = "#000000";
    //ctx.fillRect(0,0,canvas.width,canvas.width);
  
    //poot
    ctx.fillStyle = "#CC9966";
    ctx.fillRect(BX+100,BY,PootX,PootY);
       
    TekenSlagBoom(DraaiPX, DraaiPY,LengteSB,DikteSB, Oversteek, Hoek);  
   
    ctx.beginPath();  
    ctx.fillStyle = "#000000";   
    ctx.arc(BX + 125, BY + 50, 10, 0, 2*Math.PI);
    ctx.fill();    
    
    Hoek = - ((0.5*Math.PI) / 100)*AniNr;
    if (AniNr == 60) {clearInterval(TekenInterval); }
    else {AniNr++;} 
  }