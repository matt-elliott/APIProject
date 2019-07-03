//(function () {
  var restaurants = [];
  var loc;
  var lat;
  var lng;
  var map;
  var service;

  $('#loader').show();
  $('#map').hide();
  $('#listView').hide();

  function noResults() {
    $('#listView').html(`<div class="error col-12"><h2>Nothing found, please try again</h2>`);
    $('#map').hide();
    $('#listView').show();
    $('#loader').hide();
  }

  function findUserByIp() {
    $.ajax({
      url: 'http://ip-api.com/json'
    }).then(function success(response) {
      console.log(response.lat);
      loc = new google.maps.LatLng(response.lat, response.lon);
      getData();
    },
    function fail(data, status){
      console.log(status);
    });
  }

  function getLocation() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 34.0207305,
        lng: -118.6919308
      },
      zoom: 18
    })

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        loc = new google.maps.LatLng(lat, lng);
        getData();
        map.setCenter(loc);
        console.log(loc)
      }, function(error) {
        console.log(error);
        findUserByIp();

      }, {timeout:5000, enableHighAccuracy: true});
    } else {
      console.log('html5 geolocation failed')
      $('#listView').append('<div class="restaurant-view"><h2>We\'re Sorry, we were unable to find you.</h2></div>');
    }
  }

  function getData() {
    var query = $('#food-input').val();
    
    $('#loader').show();
    $('#map').hide();
    $('#listView').hide();
    
    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${query}&latitude=${loc.lat()}&longitude=${loc.lng()}&categories=restaurants`,
      headers: {
        Authorization: `Bearer ktigyrLk8IGtOoqqF4SB07jfVpMdNXYUuxDVfAKW_O5dAb4fa7megmQRsMeggxdnbc7Vma5Cx8qGcBLlZ0PFKLDKKz6xZX3GyZAijIWhmAn9tNeeHh3XAUYDQ_03WnYx`,
        'X-Requested-With' : XMLHttpRequest
      },
      method: 'GET',
    }).then(function (response) {
      console.log('got response!')

      restaurants = response.businesses;
      console.log(restaurants.length);
      if (restaurants.length === 0) {
        console.log('no results');
        noResults();
        return;
      }

      // loc = new google.maps.LatLng(lat, lng);
      map = new google.maps.Map(document.getElementById('map'), {
        center: loc, zoom: 14, radius: 500
      });

      buildListView();
      dropPins(map, restaurants);
    });
  }

  function buildListView() {
    $('#loader').hide();
    $('#map').show();
    $('#listView').empty();
    $('#listView').show();

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
    // var map = new google.maps.Map(document.getElementById('map'), { center: loc, zoom: 12 });
    if( items.length === undefined ) {
      length = 1;
    } else {
      length = items.length;
    }

    for (var i = 0; i < length; i++) {
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
  $('#button-submit').on("click", getLocation);
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
//})();
