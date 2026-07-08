import './style.css'

document.querySelector('#app').innerHTML = `
<div class="boot">

    <div class="title">
        OPERATION
        <span>LAST COMMIT</span>
    </div>

    <div class="terminal">
        <div id="terminalText"></div>
    </div>

</div>
`;

const lines = [
    "Initializing secure environment...",
    "Loading Python Intelligence Agency...",
    "Decrypting mission package...",
    "Target identified: Jan Kadlec",
    "Mission date: 16.07.2026 - 19.07.2026",
    "",
    "ACCESS GRANTED"
];

const terminal = document.getElementById("terminalText");

let line = 0;

function writeLine(){

    if(line >= lines.length) return;

    const div=document.createElement("div");
    div.textContent="> "+lines[line];

    terminal.appendChild(div);

    line++;

    setTimeout(writeLine,700);

}

setTimeout(writeLine,800);