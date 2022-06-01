var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -5,
    cursor: true,
});

var bounds = [[0, 0], [1000, 1000]];
var image = L.imageOverlay('assets/images/Livonia_Light.png', bounds).addTo(map);
map.fitBounds(bounds);

var yx = L.latLng;

var xy = function(x, y) {
    if (L.Util.isArray(x)) {
        return yx(x[1], x[0]);
    }
    return yx(y, x);
};

var popupOptions ={
    autoPan: false,
    // closeButton: false,
    className : 'popupCustom',
} 

var MapIcon = L.Icon.extend({
    options: {
        iconSize:     [20, 20],
    }
});
var killerIcon = new MapIcon({
    iconUrl: 'assets/images/killer.png',
});
var victimIcon = new MapIcon({
    iconUrl: 'assets/images/victim.png',
});

// var travel = L.polyline([killer, victim]).addTo(map);
// L.circleMarker([300, 675]).addTo(this.map).bindPopup('Dhaka');

var radius = 20;
var circle = L.circle([370, 578], radius).addTo(map);

var lat, lng;
map.addEventListener('mousemove', function(ev) {
    lat = ev.latlng.lat;
    lng = ev.latlng.lng;

    document.getElementById('locoverlay').innerHTML=lng + " / " + lat +"(x/y)";
});

var overlay="light";
function changeOverlay(){
    if(overlay=="light"){
        overlay="dark"
        image = L.imageOverlay('assets/images/Livonia_Dark.jpg', bounds).addTo(map);
    }
    else{
        overlay="light"
        image = L.imageOverlay('assets/images/Livonia_Light.png', bounds).addTo(map);
    }
}

$.getJSON( "assets/data/points.json", function( data ) {
    // console.log(data);
    for(i=0;i<data.length;i++){
        if(data[i].type=='killer'){
            var killer = xy(data[i].x, data[i].y);
            L.marker(killer, {icon: killerIcon}).addTo(map).bindPopup('Killer', popupOptions);
        }else{
            var victim = xy(data[i].x, data[i].y);
            L.marker(victim, {icon: victimIcon}).addTo(map).bindPopup('Victim', popupOptions);
        }
    }
    
  });