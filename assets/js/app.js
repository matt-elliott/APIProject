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
  presentMap(position);
}

function getData(position) {
  // var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var loc = "Westwood";
  var map = new google.maps.Map(document.getElementById('map'), { center: { lat: 34.0594726, lng: -118.4460542 }, zoom: 12 });

  var input = $('#food-input').val();
  var request = {
    query: input,
    location: { lat: 34.0594726, lng: -118.4460542 },
    // location: {
    //   lat: 34.0594726,
    //   lng: -118.4460542
    // },
    radius: 5,
    type: ['restaurant', "food"]
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, function (response) {
    buildListView(response);
  })
}

function buildListView(res) {
  console.log(res);
  if (res.length === 0) {
    $('#listView').html(`<div class="error"><h2>Nothing found, squire…</h2>`);
    return;
  }

  $('#listView').empty();

  res.forEach(function (item) {
    var html =
      `
      <div class="col-xs-12 col-md-6">
        <img src="https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png">
        <h4>${item.name}</h4>
        <span class="price-level-${item.price_level}"></span>
        <span class="${item.opening_hours.open_now}"></span>
        <span class="${item.rating}"></span>
      </div>
    `;
    $('#listView').append(html);
    // $('#listView').append(html);
  });
}

// present map on page //

function presentMap(position) {
  var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var map = new google.maps.Map(document.getElementById('map'), { center: loc, zoom: 12 });

  $("#map").append(map);
  $("#map").css({
    "min-height": "550px"
  });
  console.log(map);
}

// create a function to show the drop pins on the map //

function dropPins(map, loc) {
  var pins = new google.maps.Marker({
    position: location,
    map: map
  });

}
// $('#button-submit').on("click", getLocation);
$('#button-submit').on("click", getData);
$('#button-submit').trigger("click");
