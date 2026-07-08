export async function bootSequence() {

    const app = document.querySelector("#app");

    app.innerHTML = `
        <div class="boot-loader">
            <div id="bootText"></div>
        </div>
    `;

    const boot = document.getElementById("bootText");
const cursor = document.createElement("span");

cursor.className = "cursor";

boot.appendChild(cursor);
    const lines = [
        "SYSTEM ONLINE",
        "",
        "Loading secure modules...",
        "Checking encrypted storage...",
        "Establishing satellite link...",
        "Authorizing agent...",
        "",
        "ACCESS GRANTED"
    ];

    for (const line of lines) {

        const div = document.createElement("div");

        boot.insertBefore(div, cursor);

for (const char of line) {

    div.textContent += char;

    await new Promise(r => setTimeout(r, 30));

}

await new Promise(r => setTimeout(r, 350));

    }

    await new Promise(r => setTimeout(r, 1200));
    cursor.remove();document.querySelector(".boot-loader").classList.add("fade");

await new Promise(r => setTimeout(r, 1000));

}