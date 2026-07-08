import "./style.css";

import { BootScreen, startBoot } from "./boot/BootScreen";
import { bootSequence } from "./boot/BootLoader";

async function start() {

    await bootSequence();

    document.body.classList.add("glitch");
    await new Promise(r => setTimeout(r, 500));
    document.body.classList.remove("glitch");

    document.querySelector("#app").innerHTML = BootScreen();

    startBoot();
}

start();