const diceEl = document.querySelector("#dice");
const buttonEl = document.querySelector(".roll-btn");
const players =["پرتاب تاس برای بازیکن شماره یک", "پرتاب تاس برای بازیکن شماره دو"];
const diceRolls = [
    "",
    "&#9856;",
    "&#9857;",
    "&#9858;",
    "&#9859;",
    "&#9860;",
    "&#9861;",
];

var droll = 0;
var move = [0,0]; 
var currentPlayer = 0;

document.querySelector("h4").innerHTML = players[0];

function getDiceFace() {
    let result = Math.ceil(Math.random() * 6); // give a number between 1-6
    droll = result;
    move[currentPlayer] = move[currentPlayer] + droll;
    if ( move[currentPlayer] == 42){
        buttonEl.disabled = true;
        document.querySelector("h2").textContent = `پایان`;
        
    }
    return diceRolls[result];
}

buttonEl.addEventListener("click", () => {

    buttonEl.disabled = true;

    diceEl.classList.add("roll-animation");
    
    setTimeout(() => {
        diceEl.classList.remove("roll-animation");
        diceEl.innerHTML = `<div class="dice" id="dice">${getDiceFace()}</div>`;

        if (move[currentPlayer] > 42){
            document.querySelector("h3").textContent = "دوباره تاس بیاندازید! عدد تاس زیاد است ";
            move[currentPlayer] -= droll
            currentPlayer = currentPlayer == 0 ? 1 : 0;
            console.log(move[currentPlayer]);
        }
        else
            document.querySelector("h3").textContent = `حرکت به خانه ${move[currentPlayer]}`;

        checkColision();

        buttonEl.disabled = false;
        [players[0],players[1]] = [players[1],players[0]];
        document.querySelector("h4").innerHTML = players[0];
        console.log(move);

    }, 1000);
});



const dragEl = document.querySelectorAll(".drag");
dragEl.forEach(element =>{
    element.addEventListener('dragstart',drag_start,false);
}) ;

const Boxes = document.querySelectorAll(".box");
Boxes.forEach(box => {
    box.addEventListener("dragover", drag_over);
    box.addEventListener("dragleave", drag_leave);
    box.addEventListener("drop", drop);
})

function drag_start(event) {    
    event.dataTransfer.setData("text/plain",event.target.id);
} 

//#2cd9156b green
//#d915156b red
function drag_over(e){
    e.preventDefault();
    if (e.target.id.slice(3) == move[currentPlayer]){
        e.target.style.backgroundColor = "#2cd9156b";
        e.target.style.boxShadow = "0 0 12px 2px #2cd915";

    }
    else{
        e.target.style.backgroundColor = "#d915156b";
        e.target.style.boxShadow = "0 0 10px #d91515";

    } 
        
}
function drag_leave(e){
    e.preventDefault();
    e.target.style.backgroundColor = "transparent";
    e.target.style.boxShadow = "";

    // when pawn drop on place
}
function drop(e){
    e.preventDefault();
    
    if (e.target.id.slice(3) == move[currentPlayer]){
        let pawnID = e.dataTransfer.getData("text/plain");
        let pawn = document.getElementById(pawnID);
        e.target.appendChild(pawn);
        e.target.style.backgroundColor = "transparent";
        e.target.style.boxShadow = "";

        checkLadderAndTrap(move[currentPlayer],pawn);
        setTimeout(()=>{
            currentPlayer = currentPlayer == 0 ? 1 : 0;
        },600);
    }
    else{
        e.target.style.backgroundColor = "transparent";
        e.target.style.boxShadow = "";
    }
    if (document.querySelector("#box42").firstChild) {
        finished();
    }
}

function checkLadderAndTrap(stopper,pawn){
     //ladders
     if (stopper == 3) {
        setTimeout(() => {
            document.querySelector("#box14").appendChild(pawn);
            move[currentPlayer] = 14;
            document.querySelector("h3").textContent = `حرکت به خانه ${move[currentPlayer]}`;
            checkColision()
            console.log(move);

        }, 500);
    }

    if (stopper == 13) {
        setTimeout(() => {
            document.querySelector("#box26").appendChild(pawn);
            move[currentPlayer] = 26;
            document.querySelector("h3").textContent = `حرکت به خانه ${move[currentPlayer]}`;
            checkColision()
            console.log(move);

        }, 500);
    }
    if (stopper == 19) {
        setTimeout(() => {
            document.querySelector("#box32").appendChild(pawn);
            move[currentPlayer] = 32;
            document.querySelector("h3").textContent = `حرکت به خانه ${move[currentPlayer]}`;
            checkColision()
            console.log(move);

        }, 500);
    }
    //snakes bit action
    if (stopper == 16) {
        setTimeout(() => {
            document.querySelector("#box4").appendChild(pawn);
            move[currentPlayer] = 4;
            document.querySelector("h3").textContent = `بازگشت به خانه ${move[currentPlayer]}`;
            checkColision()
            console.log(move);

        }, 500);
    }
    if (stopper == 28) {
        setTimeout(() => {
            document.querySelector("#box2").appendChild(pawn);
            move[currentPlayer] = 2;
            document.querySelector("h3").textContent = `بازگشت به خانه ${move[currentPlayer]}`;
            checkColision()
            console.log(move);

        }, 500);
    }
    if (stopper == 38) {
        setTimeout(() => {
            document.querySelector("#box21").appendChild(pawn);
            move[currentPlayer] = 21;
            document.querySelector("h3").textContent = `بازگشت به خانه ${move[currentPlayer]}`;
            checkColision()
            console.log(move);

        }, 500);
    }

}
function checkColision(){
    if (move[currentPlayer] == move[currentPlayer==0?1:0]){
        move[currentPlayer==0?1:0]=0;
        document.getElementById(`player${currentPlayer==0?1:0}`).appendChild(document.getElementById(`pawn${currentPlayer==0?1:0}`));
    }
}

// ending functions
function finished(){
    document.querySelector(".finish").classList.toggle("show");
    document.querySelector("h2").textContent = "";
    document.querySelector("h3").textContent = " با پرتاب تاس بازی را شروع کنید";
    buttonEl.disabled = false;
    diceEl.innerHTML = '<div class="dice" id="dice">&#9856; </div>';
}

const restartEl = document.querySelector("#restart");
restartEl.addEventListener("click", () =>{
    document.querySelector("#player0").appendChild(document.querySelector("#pawn0"));
    document.querySelector("#player1").appendChild(document.querySelector("#pawn1"));
    [move[0], move[1]] = [0, 0];
    document.querySelector(".finish").classList.toggle("show");
})