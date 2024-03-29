function getCurrentPosition () {
  if ( "geolocation" in navigator ) {  
    navigator.geolocation.getCurrentPosition (
      function ( position ) {  
        var aktuelle_position = document.getElementById("AusgabeAktuellePosition");  
        aktuelle_position.innerHTML = "aktueller Breitengrad: " + position.coords.latitude + "<br>" + "aktueller Laengengrad: " + position.coords.longitude;
        setWorkingPlace (position.coords.latitude, position.coords.longitude);
        getDistanceToWorkingPlace (position.coords.latitude, position.coords.longitude);
      }
    );
  } 
  else {  
    alert("I'm sorry, but geolocation services are not supported by your browser.");  
  }
}
function setWorkingPlace (pos_current_lat, pos_current_long) {
//use google map api to set Working Place
  var latlng = new google.maps.LatLng(pos_current_lat, pos_current_long);
  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  var marker = new google.maps.Marker({ 
    position: latlng, 
    map: map,
    title:"Bitte legen sie Ihren Arbeitsort auf der Karte fest!",
    draggable: true
  });
  marker.setMap(map);
  google.maps.event.addListener(marker, 'dragend', function() { 
    updateMarkerPosition(marker.getPosition()); 
  }); 
}
function updateMarkerPosition (latlng) {
//document.getElementById('info').innerHTML = [ latlng.lat(), latlng.lng() ].join(', ');
  document.getElementById('info').innerHTML = [ latlng.lat(), latlng.lng() ].join(', ') + '<input type="submit" value="Markierten Arbeitsort uebernehmen!" />';
}
function getDistanceToWorkingPlace (pos_current_lat, pos_current_long) {
  var Breitengrad_aktuell = pos_current_lat;
  var Breitengrad_Arbeit = 48.399623;
  var Laengengrad_aktuell = pos_current_long;
  var Laengengrad_Arbeit = 9.996607;
  var radius = 6371; // km	    
  var distance = Math.acos(Math.sin(pos_current_lat) * Math.sin(Breitengrad_Arbeit) + Math.cos(pos_current_lat) * Math.cos(Breitengrad_Arbeit) * Math.cos(Laengengrad_Arbeit - pos_current_long)) * radius;    
	   
  var benutzer_information = document.getElementById("AusgabeBenutzerInformation");  
  if (Math.round(distance) < 5) {
    benutzer_information.innerHTML = ("<h3>Herzlich Wilkommen auf Arbeit! Viel Spass bei Ihrem heutigen Arbeitstag!<h3>").fontcolor("green");
    setClockInTime ();
  }
  else {
    benutzer_information.innerHTML = "<h3>Leider befinden sie sich nicht auf der Arbeit, bitte begeben sie sich dorthin und starten sie die Zeitmessung erneut! Danke!<h3>".fontcolor("red");
    exit;
  }
}
function setClockInTime () {
  var arbeitsbeginn = document.getElementById("AusgabeClockInZeit");  
  var aktuelle_zeit = new Date();
  arbeitsbeginn.innerHTML = "Folgender Arbeitsbeginn wurde registriet: " + aktuelle_zeit;
}
function setClockOutTime () {
//set the clock out time 
}
function startTiming () {
//beginne die Zeit hochzuzählen
}
