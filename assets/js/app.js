(function () {
  var restaurants = [];
  var loc;
  var map;
  var service;

  function noResults() {
    $('#listView').html(`<div class="error"><h2>Nothing found, please try again</h2>`);
  }

  function getLocation() {
    if (navigator.geolocation) {
      console.log('show');
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      var warningView = $('body').attr('<aside>');
      warningView.attr('class', 'bg-warning text-dark');
      warningView.html('<h2>Nothing Found!</h2>');
    }
  }

  function showPosition(position) {
    getData(position.coords.latitude, position.coords.longitude);
  }

  function getData(lat, lng) {
    var lat = 34.0594726;
    var lng = -118.4460542;
    console.log('getData', lat, lng);
    var query = $('#food-input').val();
  
    //TODO : MOVE THIS VARIABLE INSIDE RESPONSE FUNCTION
    var response;
    
    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${query}&latitude=${lat}&longitude=${lng}`,
      headers: {
        Authorization: `Bearer ktigyrLk8IGtOoqqF4SB07jfVpMdNXYUuxDVfAKW_O5dAb4fa7megmQRsMeggxdnbc7Vma5Cx8qGcBLlZ0PFKLDKKz6xZX3GyZAijIWhmAn9tNeeHh3XAUYDQ_03WnYx`,
        'X-Requested-With' : XMLHttpRequest
      },
      longitude: lng,
      latitude: lat,
      method: 'GET',
    }).then(function (response) {
      console.log('got response!')

      restaurants = response.businesses;
      loc = new google.maps.LatLng(lat, lng);
      map = new google.maps.Map(document.getElementById('map'), {
        center: loc, zoom: 15
      });

      buildListView();
      dropPins(map, restaurants);
    });
  }

  function buildListView() {
    $('#listView').empty();
    console.log(restaurants);
    restaurants.forEach(function (item) {
      var itemID = item.id;
      var name = item.name === undefined ? '' : item.name;
      var priceLevel = item.price_level === undefined ? '' : item.price_level;
      var openNow = item.opening_hours === undefined ? '' : item.opening_hours.open_now;
      var rating = item.rating === undefined ? '' : item.rating;

      var html = `
        <li class="col-xs-12 col-md-6">
          <div class="wrapper">
            <h4><button class="btn btn-link restaurant-btn"
              data-restaurant-id="${itemID}">${name}</button></h4>
            <img src="https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png">
            <span class="price-level-${priceLevel}"></span>
            <span class="${openNow}"></span>
            <span class="${rating}"></span>
          </div>
        </li>`;

      $('#listView').append(html);
    });
  }

  function loadSingleRestaurantView() {
    var restaurantID = $(this).attr('data-restaurant-id');
    console.log(restaurantID);
    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${restaurantID}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ktigyrLk8IGtOoqqF4SB07jfVpMdNXYUuxDVfAKW_O5dAb4fa7megmQRsMeggxdnbc7Vma5Cx8qGcBLlZ0PFKLDKKz6xZX3GyZAijIWhmAn9tNeeHh3XAUYDQ_03WnYx`,
        'X-Requested-With' : 'XMLHttpRequest'
      },
    }).then(function(response) {  
      buildRestaurantView(response);
    });    
  }

  function buildRestaurantView(place) {
    console.log(place);
    /** TODO: GET REVIEWS AND POPULATE **/

    var restaurantView = `<aside id = "${place.name}" class="restaurant-view">
      <h3 class="restaurant-name"> ${place.name}</h3 >
        <div class="row">
          <figure class="col" id="restaurantMap">
          </figure>
            <div class="col" id="restaurant-info">
              <address>${place.location.display_address[0]},
              ${place.location.display_address[1]}</address>
              <p class="phone-number"><a href="tel:${place.phone}">${place.phone}</a></p>
              <p class="price-level price-level-${place.price}">Price level:</p>
              <p class="rating-level rating-${place.rating}">Rating:</p>
              <p class="webiste">Website: <a href="${place.url}" target="_blank">Website</a></p>
            </div>
        </div>
        <span class="btn close-btn">X</span>
      </aside>
    `;

    $('body').append(restaurantView);
    presentMap(place.coordinates.latitude, place.coordinates.longitude, place);
  }

  // present map on page //

  function presentMap(lati, long, place) {
    console.log('p', lati, long);
    var mapCenter = new google.maps.LatLng(lati,long);
    // var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var restaurantMap = new google.maps.Map(document.getElementById('restaurantMap'), { center: mapCenter, zoom: 12 });

    dropPins(restaurantMap, place);
  }

  // create a function to show the drop pins on the map //
  // retrieve the results from user input //
  // drop pins with given restaurant results //

  function dropPins(map, items) {
    var length;
    console.log(items);
    // var map = new google.maps.Map(document.getElementById('map'), { center: loc, zoom: 12 });
    if( items.length === undefined ) {
      length = 1;
      console.log('resetting', length, items.length, 0 < items.length);
    } else {
      length = items.length;
    }
    for (var i = 0; i < length; i++) {
      console.log(restaurants[i].coordinates.latitude);
      marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {
          lat: restaurants[i].coordinates.latitude,
          lng: restaurants[i].coordinates.longitude
        }
      });

      clearMarkers();
    }

    function clearMarkers() {
      markers = [];

      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    }

    marker.addListener('click', toggleBounce);

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }
  /** FOR TESTING **/
  // setTimeout(getLocation, 1500);
  $('#button-submit').on("click", getData);
  $('#button-submit').trigger("click");
 
  // $('#button-submit').on("click", getLocation);
  //listeners
  $(document).on("click", '.restaurant-btn', loadSingleRestaurantView);
  $(document).on("click", '.close-btn', function () {
    var parent = $(this).parent();
    parent.fadeOut('slow');
    setTimeout(function () {
      parent.remove();
    }, 500);
  });
})();