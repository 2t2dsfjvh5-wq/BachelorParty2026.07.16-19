import { missionPoints } from "../data/mission";
import "./MapScreen.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function MapScreen() {

    return `
    <div class="map-screen">

        <div class="map-header">
            🛰️ P.I.A. SATELLITE SYSTEM
        </div>

        <div class="map-content">

    <div class="map-wrapper">

        <button id="resetMap">
            🎯 RESET VIEW
        </button>

        <div id="map"></div>

    </div>

    <div class="mission-panel">

        <h2 id="missionTitle">MISSION</h2>

        <p id="missionDay">
            Klikni na bod na mapě.
        </p>

        <hr>

        <div id="missionDescription">
            Vyber některý z waypointů.
        </div>

        <hr>

        <h3>MISSION PLAN</h3>

        <ul class="plan">
            <li>🚗 Čtvrtek – Odjezd</li>
            <li>🏨 Ubytování</li>
            <li>🥾 Pátek – Túra</li>
            <li>🍺 Pátek večer – Hospoda</li>
            <li>🏔 Sobota – Ferrata</li>
            <li>🏠 Neděle – Návrat</li>
        </ul>

        <div class="countdown">

            <h2>MISSION STARTS IN</h2>

            <div id="countdown"></div>

        </div>

    </div>

</div>

        <div class="bottom-bar">

            <span>SATELLITE LINK</span>

            <div class="progress">

                <div class="progress-fill"></div>

            </div>

            <span>CONNECTED</span>

        </div>

    </div>
    `;
}


export function initMap() {

    const map = L.map("map");

    const panel = document.querySelector(".mission-panel");

    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
            attribution: "&copy; OpenStreetMap & CARTO"
        }
    ).addTo(map);

    L.control.scale().addTo(map);

    const radarIcon = L.divIcon({
        className: "",
        html: `<div class="target-marker"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
    });

    missionPoints.forEach(point => {

        L.marker(point.coords, {
            icon: radarIcon
        })
        .addTo(map)
        .on("click", () => {

            map.flyTo(point.coords, 13, {
                duration: 1.5
            });

            document.getElementById("missionTitle").textContent = point.name;
            document.getElementById("missionDay").textContent = point.day;
            document.getElementById("missionDescription").textContent = point.description;

            panel.classList.remove("panel-flash");
            void panel.offsetWidth;
            panel.classList.add("panel-flash");

        });

    });

    L.polyline(
        missionPoints.map(point => point.coords),
        {
            color: "#00ff66",
            weight: 3,
            opacity: 0.8
        }
    ).addTo(map);

    const bounds = L.latLngBounds(
        missionPoints.map(point => point.coords)
    );

    map.fitBounds(bounds, {
        padding: [60, 60]
    });

    document.getElementById("resetMap").addEventListener("click", () => {

        map.fitBounds(bounds, {
            padding: [60, 60]
        });

    });

    // Zobraz první bod po spuštění
    const first = missionPoints[0];

    document.getElementById("missionTitle").textContent = first.name;
    document.getElementById("missionDay").textContent = first.day;
    document.getElementById("missionDescription").textContent = first.description;

}


  export function startCountdown() {

    const target = new Date("2026-07-16T08:00:00");
    const element = document.getElementById("countdown");

    function update() {

        const now = new Date();
        const diff = target - now;

        if (diff <= 0) {
            element.textContent = "MISSION STARTED";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        element.textContent =
            `${days} DAYS ${hours} HOURS ${minutes} MINUTES`;
    }

    update();

    setInterval(update, 60000);
}