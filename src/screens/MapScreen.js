import "./MapScreen.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function MapScreen() {

    return `
    <div class="map-screen">

        <div class="map-header">
            P.I.A. SATELLITE SYSTEM
        </div>

        <div class="map-content">

            <div id="map"></div>

            <div class="mission-panel">

                <h2>MISSION</h2>

                <p><strong>Target:</strong> Jan Kadlec</p>

                <p><strong>Location:</strong> Austria</p>

                <p><strong>Date:</strong> 16–19.07.2026</p>

                <p><strong>Status:</strong></p>

                <div class="status online">
                    ● READY
                </div>

            </div>

        </div>

    </div>
    `;
}


export function initMap() {

    const map = L.map("map").setView([47.5162, 14.5501], 7);

    const target = [47.2692, 11.4041];

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap"
        }
    ).addTo(map);

    const radarIcon = L.divIcon({
        className: "",
        html: `<div class="target-marker"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
    });

    L.marker(target, {
        icon: radarIcon
    })
    .addTo(map)
    .bindPopup(`
        <b>🎯 MISSION TARGET</b><br>
        Jan Kadlec<br>
        Austria
    `)
    .openPopup();

}