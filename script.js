const map = L.map('map')
map.setView([-6.903, 107.6510], 13);
const basemapOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <ahref="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

// Tambahkan kontrol fullscreen
map.addControl(new L.Control.Fullscreen());

// Titik koordinat awal (home)
const home = {
  lat: -6.903,
  lng: 107.6510,
  zoom: 13
};

// Pindahkan tampilan ke lokasi home
map.setView([home.lat, home.lng], home.zoom);

// Tambahkan tombol GPS/lokasi
map.addControl(
  L.control.locate({
    position: 'topleft',
    flyTo: true,
    locateOptions: {
      enableHighAccuracy: true
    }
  })
);

// Tambahkan tombol Home custom
const homeButton = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function (map) {
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" style="width:20px; height:20px; margin:7px;" title="Go to Home">';
    container.style.backgroundColor = 'white';
    container.style.width = '34px';
    container.style.height = '34px';
    container.style.cursor = 'pointer';

    container.onclick = function () {
      map.setView([home.lat, home.lng], home.zoom);
    };

    return container;
  }
});
map.addControl(new homeButton());

var symbologyPoint = {
radius: 3,
fillColor: "#9dfc03",
color: "#000",
weight: 1,
opacity: 1,
fillOpacity: 0.5
}

// Memuat file GeoJSON landcover
$.getJSON("asset/data-spasial/landcover_ar.geojson", function (data) {
    L.geoJSON(data, {
        style: function(feature) {
            switch (feature.properties.REMARK) {
                case 'Danau/Situ':
                case 'Empang':
                case 'Sungai':
                    return { fillColor: "#97DBF2", fillOpacity: 0.8, weight: 0.5, color: "#4065EB" };
                case 'Hutan Rimba':
                    return { fillColor: "#38A800", fillOpacity: 0.8, color: "#38A800" };
                case 'Perkebunan/Kebun':
                    return { fillColor: "#E9FFBE", fillOpacity: 0.8, color: "#E9FFBE" };
                case 'Permukiman dan Tempat Kegiatan':
                    return { fillColor: "#FFBEBE", fillOpacity: 0.8, weight: 0.5, color: "#FB0101" };
                case 'Sawah':
                    return { fillColor: "#01FBBB", fillOpacity: 0.8, weight: 0.5, color: "#4065EB" };
                case 'Semak Belukar':
                    return { fillColor: "#FDFDFD", fillOpacity: 0.8, weight: 0.5, color: "#00A52F" };
                case 'Tanah Kosong/Gundul':
                    return { fillColor: "#FDFDFD", fillOpacity: 0.8, weight: 0.5, color: "#000000" };
                case 'Tegalan/Ladang':
                    return { fillColor: "#EDFF85", fillOpacity: 0.8, color: "#EDFF85" };
                case 'Vegetasi Non Budidaya Lainnya':
                    return { fillColor: "#000000", fillOpacity: 0.8, weight: 0.5, color: "#000000" };
                default:
                    return { fillColor: "#CCCCCC", fillOpacity: 0.5, color: "#999999" }; // default style
            }
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<b>Tutupan Lahan: </b>' + feature.properties.REMARK);
        }
    }).addTo(landcover);
});
