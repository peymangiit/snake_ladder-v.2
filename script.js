const diceEl = document.querySelector("#dice");
const buttonEl = document.querySelector(".roll-btn");
const pawn = document.querySelector("#pawn");
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
var move = 0; 
function getDiceFace() {
    let result = Math.ceil(Math.random() * 6); // give a number between 1-6
    droll = result;
    move = move + droll;
    if ( move == 42){
        buttonEl.disabled = true;
        document.querySelector("h2").textContent = `پایان`;
    }
    return diceRolls[result];
}

buttonEl.addEventListener("click", () => {
    diceEl.classList.add("roll-animation");
    setTimeout(() => {
        diceEl.classList.remove("roll-animation");
        diceEl.innerHTML = `<div class="dice" id="dice">${getDiceFace()}</div>`;
        if (move > 42){
            document.querySelector("h3").textContent = "دوباره تاس بیاندازید! عدد تاس زیاد است ";
            move -= droll
            console.log(move);

        }
        else
            document.querySelector("h3").textContent = `حرکت به خانه ${move}`;

    }, 1000);
});


//if n==0 and droll == 6 box1 drop == true
//droll result+n(pawn placement before) dragover show green boxshadow
// e.target.id.slice(3) check if equal to n 
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
    if (e.target.id.slice(3) == (move)){
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

}
function drop(e){
    e.preventDefault();
    if (e.target.id.slice(3) == (move)){
        let pawnID = e.dataTransfer.getData("text/plain");
        e.target.appendChild(document.getElementById(pawnID));
        e.target.style.backgroundColor = "transparent";
        e.target.style.boxShadow = "";
        checkLadderAndTrap(move);
    }
    else{
        e.target.style.backgroundColor = "transparent";
        e.target.style.boxShadow = "";
    }
}

function checkLadderAndTrap(stopper){
     //ladders
     if (stopper == 3) {
        setTimeout(() => {
            document.querySelector("#box14").appendChild(pawn);
            move = 14;
            document.querySelector("h3").textContent = `حرکت به خانه ${move}`;
        }, 500);
    }

    if (stopper == 13) {
        setTimeout(() => {
            document.querySelector("#box26").appendChild(pawn);
            move = 26;
            document.querySelector("h3").textContent = `حرکت به خانه ${move}`;
        }, 1000);
    }
    if (stopper == 19) {
        setTimeout(() => {
            document.querySelector("#box32").appendChild(pawn);
            move = 32;
            document.querySelector("h3").textContent = `حرکت به خانه ${move}`;
        }, 1000);
    }
    //snakes bit action
    if (stopper == 16) {
        setTimeout(() => {
            document.querySelector("#box4").appendChild(pawn);
            move = 4;
            document.querySelector("h3").textContent = `بازگشت به خانه ${move}`;
        }, 1000);
    }
    if (stopper == 28) {
        setTimeout(() => {
            document.querySelector("#box2").appendChild(pawn);
            move = 2;
            document.querySelector("h3").textContent = `بازگشت به خانه ${move}`;
        }, 1000);
    }
    if (stopper == 38) {
        setTimeout(() => {
            document.querySelector("#box21").appendChild(pawn);
            move = 21;
            document.querySelector("h3").textContent = `بازگشت به خانه ${move}`;
        }, 1000);
    }

}

