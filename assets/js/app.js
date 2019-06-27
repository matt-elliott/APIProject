function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    var warningView = $('body').attr('<aside>');
    warningView.attr('class', 'bg-warning text-dark');
    warningView.html('<h2>Nothing Found!</h2>');
  }
}

function showPosition(position) {
  getData(position);
}

function getData(position) {
  var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
  var map = new google.maps.Map(document.getElementById('map'), { center: loc, zoom: 12 });
  
  var input = $('#food-prompt').val();
  var request = {
    query: input,
    location: {
      lat: 34.0594726,
      lng: -118.4460542
    },
    radius: '500',
    type: ['restaurant', "food"]
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, function (response) {
    buildListView(response);
  })
}

function buildListView(res) {
  if (res.length === 0) {
    $('#listView').html(`<div class="error"><h2>Nothing found, squire…</h2>`);
    return;
  }
  res.forEach( function(item) {
    var html =
    `
      <div class="col">
        <img src="https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png">
        <h1>${item.name}</h1>
      </div>
    `;
    $('#listView').append(html);
  });
}

$('button').on("click", getLocation);