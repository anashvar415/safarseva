mapboxgl.accessToken = window.mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: window.coordinates, // [lng, lat]
    zoom: 9
});

const marker = new mapboxgl.Marker()
    .setLngLat(window.coordinates)
    .addTo(map) ;