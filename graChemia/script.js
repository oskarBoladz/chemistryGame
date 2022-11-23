periodicTable=JSON.parse(localStorage.getItem('periodicTable'));
//console.log(periodicTable)
console.log("Kacper Staszewski || Oskar Bołądź")
redSrc='red.png'
blueSrc='blue.png'

onclickAnwser=false

class dataGame{
    gameExist=true
    whoWin=null

    p1pos=1
    p2pos=1
    rollNumber=null
    atomsUsed=[]
    atomNowInUse=null
    turn="red" //2 blue    1 red
    isTurn=false
    roll(){
        this.rollNumber=Math.floor(Math.random() * 6) + 1;
        document.getElementById('rN').innerHTML=this.rollNumber
    }
    rollAtom(){
        this.atomNowInUse=Math.floor(Math.random() * 110) + 2;
    }
}

const game= new dataGame()

clearAtomTablecos = () =>{
    document.getElementById("o1").innerHTML=""
    document.getElementById("o2").innerHTML=""
    document.getElementById("o3").innerHTML=""
    document.getElementById('atomicNumber').innerHTML=""
    document.getElementById('icon').innerHTML=""
    document.getElementById('mass').innerHTML=""
}

function drawPawn(pawnName,Pos){
    pawn= document.createElement("img")
    if(pawnName=="red"){pawn.src=redSrc}
    else{pawn.src=blueSrc}
    pawn.setAttribute("class", "pawn");
    pawn.setAttribute("id", pawnName);
    id="t"+Pos.toString()
    document.getElementById(id).appendChild(pawn)
}
drawPawn("red",1)
drawPawn("blue",1)
document.getElementById("p1").style.textDecoration = "underline";
document.getElementById("p1").style.textDecorationColor = "var(--yellow)";

pawnMove = (posMov,pawn) =>{

    document.getElementById(pawn).remove()
    if(pawn=="red"){
        game.p1pos+=posMov
        if(game.p1pos<=0){game.p1pos=1}
        /*if((game.p1pos>=24)||(game.p2pos>=24) ){
            if(game.p1pos>=24){
                game.whoWin="Player 1"
                document.getElementById("p1").style.borderColor="var(--yellow)"
                
            }else{
                game.whoWin="Player 2"
                document.getElementById("p2").style.borderColor="var(--yellow)"
                
            }
            game.gameExist=false
            game.isTurn=true
            document.getElementById("winDisplay").innerHTML="WIN"
            return;
        }*/
        if(game.p1pos>=24){
                game.whoWin="Player 1"
                document.getElementById("p1").style.borderColor="var(--yellow)"
                game.gameExist=false
                game.isTurn=true
                document.getElementById("winDisplay").innerHTML="WIN"

                pawn= document.createElement("img")
                pawn.src=redSrc
                pawn.setAttribute("class", "pawn");
                pawn.setAttribute("id", "red");
                onclickAnwser=true
                document.getElementById("t0").appendChild(pawn)
                clearAtomTablecos()
                return;
            }
        drawPawn("red",game.p1pos)
        
    }else{
        game.p2pos+=posMov
        if(game.p2pos<=0){game.p2pos=1}

        if(game.p2pos>=24){
            game.whoWin="Player 2"
            document.getElementById("p2").style.borderColor="var(--yellow)"
            game.gameExist=false
            game.isTurn=true
            onclickAnwser=true
            document.getElementById("winDisplay").innerHTML="WIN"

            pawn= document.createElement("img")
                pawn.src=blueSrc
                pawn.setAttribute("class", "pawn");
                pawn.setAttribute("id", "blue");
                document.getElementById("t0").appendChild(pawn)
                clearAtomTablecos()
            return;
        }
        drawPawn("blue",game.p2pos)
        
    }
    
}

randomAtom = () =>{
    
    randomTable=[]
    game.rollAtom()
    
    document.getElementById('atomicNumber').innerHTML=periodicTable.elements[game.atomNowInUse]["number"]
    document.getElementById('icon').innerHTML=periodicTable.elements[game.atomNowInUse]["symbol"]
    document.getElementById('mass').innerHTML=periodicTable.elements[game.atomNowInUse]["atomic_mass"]
    //console.log(periodicTable.elements[game.atomNowInUse]["name"])
    randomTable.push(periodicTable.elements[game.atomNowInUse]["name"])
    while(randomTable.length!=3){
        c=Math.floor(Math.random() * 110) + 2
        if(c!=game.atomNowInUse){
            console.log(c)
            randomTable.push(periodicTable.elements[c]["name"])
        }
    }


    randomTable.sort()
    document.getElementById("o1").innerHTML=randomTable[0]
    document.getElementById("o2").innerHTML=randomTable[1]
    document.getElementById("o3").innerHTML=randomTable[2]

}

anwClick = (name) =>{
    if(!onclickAnwser){
        onclickAnwser=true
        if(name == periodicTable.elements[game.atomNowInUse]["name"]){
            rollNextGame()
        }else{
            if(game.turn=="red"){

                pawnMove(-2,"red")
            }else{

                pawnMove(-2,"blue")
            }
            rollNextGame()
        }
    }
    clearAtomTablecos()
}

rollNextGame=()=>{
    game.isTurn=false
    if(game.turn=="red"){
        game.turn="blue"
    }else{
        game.turn="red"
    }

    if(game.turn=="red"){
        document.getElementById("p1").style.textDecoration = "underline";
        document.getElementById("p1").style.textDecorationColor = "var(--yellow)";
        document.getElementById("p2").style.textDecoration = "none";
    }else{
        document.getElementById("p2").style.textDecoration = "underline";
        document.getElementById("p2").style.textDecorationColor = "var(--yellow)";
        document.getElementById("p1").style.textDecoration = "none";}
}

rollTheDice=()=>{
    
    if(!(game.isTurn)){
        
        onclickAnwser=false
        if(game.turn=="red"){
            document.getElementById("p1").style.textDecoration = "underline";
            document.getElementById("p1").style.textDecorationColor = "var(--yellow)";
            document.getElementById("p2").style.textDecoration = "none";
        }else{
            document.getElementById("p2").style.textDecoration = "underline";
            document.getElementById("p2").style.textDecorationColor = "var(--yellow)";
            document.getElementById("p1").style.textDecoration = "none";}
    

        game.roll()

        game.isTurn=true
        pawnMove(game.rollNumber,game.turn)
        
        randomAtom()
    }
    

}


