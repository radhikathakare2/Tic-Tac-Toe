let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newgameBtn = document.querySelector("#new-game");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let count = 0;

msgcontainer.classList.add("hide");
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.classList.add("o");
            box.innerText = "O";
            turnO = false;
        } else {
            box.classList.add("x");
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();

        if(count===9 && !(isWinner)){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Draw";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}


const showWinner = (winner) => {
    if (winner === "O") {
        msg.innerText = `Congratulations, Winner is Player 1 (O)`;
        msgcontainer.classList.remove("hide");
        disableBoxes();
    } else if (winner === "X") {
        msg.innerText = `Congratulations, Winner is Player 2 (X)`;
        msgcontainer.classList.remove("hide");
        disableBoxes();
    }
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);

                showWinner(pos1Val);
            }
        }
    }
}

const resetGame = () => {
    turnO = true;
    count=0;
    enableBoxes();
    msgcontainer.classList.add("hide");

}

newgameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);