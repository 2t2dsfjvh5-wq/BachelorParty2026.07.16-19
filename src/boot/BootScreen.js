import "./BootScreen.css";
import { typeLine } from "./Typewriter.js";
import { MapScreen, initMap } from "../screens/MapScreen";

export function BootScreen() {

    return `
    <div class="boot">

        <div class="logo">
            PYTHON INTELLIGENCE AGENCY
        </div>

        <div class="title">
            OPERATION
            <span>LAST COMMIT</span>
        </div>

        <div class="terminal">
            <div id="terminalText"></div>
        </div>

        <div class="enterBtn">
            ENTER MISSION
        </div>

    </div>
    `;
}

export function startBoot() {

    const lines = [
        "Initializing secure environment...",
        "Loading Python Intelligence Agency...",
        "Scanning target...",
        "Target identified: Jan Kadlec",
        "Occupation: Python Developer",
        "Destination: Austria",
        "Mission date: 16.07.2026 - 19.07.2026",
        "",
        "ACCESS GRANTED"
    ];

    const terminal = document.getElementById("terminalText");

    let i = 0;

    async function next() {

        if (i >= lines.length) return;

        const div = document.createElement("div");

        terminal.appendChild(div);

        await typeLine(div, "> " + lines[i], 18);

        terminal.scrollTop = terminal.scrollHeight;

        i++;

        await new Promise(r => setTimeout(r, 300));

        next();
    }

    next();

    const button = document.querySelector(".enterBtn");

    button.addEventListener("click", () => {

        document.querySelector("#app").innerHTML = MapScreen();

        initMap();

    });

}