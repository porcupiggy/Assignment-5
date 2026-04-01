import { crops } from "./crops.js";

let map;
let chart;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 20, lng: 0 }
    });
    console.log(crops);
    placeMarkers(crops);
    drawChart(crops);
}
function placeMarkers(data) {
    data.forEach(crop => {
        const marker = new google.maps.Marker({
            position: { lat: crop.lat, lng: crop.lng },
            map,
            title: crop.name
        });

        const info = new google.maps.InfoWindow({
            content: `
                <strong>${crop.name}</strong><br>
                Season: ${crop.season}<br>
                Selling Price: ${crop.price}g<br>
                <img src="${crop.image}" width="40" height="40" style="image-rendering: pixelated;">
            `
        });

        marker.addListener('click', () => {
            info.open(map, marker);
        });
    });
}
function drawChart(data) {
    const sorted = [...data]
        .sort((a, b) => b.price - a.price)
        .slice(0, 5);

    const labels = sorted.map(c => c.name);
    const prices = sorted.map(c => c.price);
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Selling Price (g)',
                data: prices,
                backgroundColor: 'rgba(26,115,232,0.75)'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });
}
