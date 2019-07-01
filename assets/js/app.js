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
    //  loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map = new google.maps.Map(document.getElementById('map'), { center: { lat: 34.0594726, lng: -118.4460542 }, zoom: 12 });
    
    var input = $('#food-input').val();
    var request = {
      query: input,
      location: { lat: 34.0594726, lng: -118.4460542 },
      radius: 15,
      type: 'restaurant'
    };
function showPosition(position) {
  // getData(position);
  presentMap(position);
  console.log(position);
}

function getData() {
  // var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  // var loc = "Westwood";
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
  });

  presentMap({ lat: 34.0594726, lng: -118.4460542 });
}

    service = new google.maps.places.PlacesService(map);
    
    service.textSearch(request, function (response, status) {
      if( status === google.maps.places.PlacesServiceStatus.OK ) {
        restaurants = response;
        buildListView();
      } else {
        console.error(status);
        noResults();
      }
    });
  }

  function buildListView() {
    $('#listView').empty();

    restaurants.forEach(function (item) {
      var itemID = item.place_id;
      var name = item.name === undefined ? '' : item.name;
      var priceLevel = item.price_level === undefined ? '' : item.price_level;
      var openNow = item.opening_hours === undefined ? '' : item.opening_hours.open_now;
      var rating = item.rating === undefined ? '' : item.rating;

      var html =`
        <div class="col-xs-12 col-md-6">
          <h4><button class="btn btn-link restaurant-btn"
            data-restaurant-id="${itemID}">${name}</button></h4>
          <img src="https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png">
          <span class="price-level-${priceLevel}"></span>
          <span class="${openNow}"></span>
          <span class="${rating}"></span>
        </div>`;

      $('#listView').append(html);
    });
  }

  function loadSingleRestaurantView() {
    var restaurantID = $(this).attr('data-restaurant-id');
    var request = {
      placeId: restaurantID
    }

    service.getDetails(request, function(place, status) {
      if( status === google.maps.places.PlacesServiceStatus.OK ) {
        buildRestaurantView(place);
      } else {
        console.error(status);
      }
    });
  }
  
  function buildRestaurantView(place) {
    console.log(place);
    var reviews = $('<div>');
    reviews.attr('id','reviews');
    
    place.reviews.forEach(function(review) {
      var html = `
        <div class="review">
          <header class="review-header row">
          <div class="col-3 profile-photo">
              <img src="${review.profile_photo_url}" class="img-fluid">
            </div>
            <div class="col-6 name">
              <span class="rating rating-${review.rating}"></span>
              <h3>${review.author_name}</h3>
              <span class="small">${review.relative_time_description}</span>
            </div>
          </header>
          <article class="review-body row">
            <p class="reivew-text col">${review.text}</p>
          </article>
        </div>
      `;

      reviews.append(html);
    });
    console.log(reviews[0]);
    var restaurantView = `
      <aside id="${place.name}" class="restaurant-view">
        <h3 class="restaurant-name">${place.name}</h3>
        <div class="row">
          <figure class="col">
            <img src="${place.photos === undefined ? '' :  place.photos[0].getUrl()}" class="img-thumbnail">
          </figure>
          <div class="col" id="restaurant-info">
            <address>${place.formatted_address}</address>
            <span class="phone-number"><a href=tel:${place.formatted_phone_number}">${place.formatted_phone_number}</a></span>
            <p class="price-level price-level-${place.price_level}">Price level:</p>
            <p class="rating-level rating-${place.rating}">Rating: ${place.rating}</p>
            <p class="webiste">Website: <a href="${place.website}" target="_blank">${place.website}</a></p>
          </div>
        </div>
        ${reviews[0].outerHTML}
        <span class="btn close-btn">X</span>
      </aside>
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
    $('body').append(restaurantView);
  }  

  // $('#button-submit').on("click", getLocation);
  $('#button-submit').on("click", getData);
  $('#button-submit').trigger("click");

  //listeners
  $(document).on("click", '.restaurant-btn', loadSingleRestaurantView);
  $(document).on("click", '.close-btn', function() {
    var parent = $(this).parent();
    parent.fadeOut('slow');
    setTimeout(function() {
      parent.remove();
    }, 500);
  });
})();
// present map on page //

function presentMap(position) {
  console.log('p', position);
  // var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var map = new google.maps.Map(document.getElementById('map'), { center: position, zoom: 12 });

  $("#map").append(map);

  dropPins(position);

}

// create a function to show the drop pins on the map //
// retrieve the results from user input //
// drop pins with given restaurant results //

function dropPins(position) {

  var map = new google.maps.Map(document.getElementById('map'), { center: position, zoom: 12 });

  // var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  console.log('p', position);
  var pins = new google.maps.Marker({
    position: position,
    map: map,
    animation: google.maps.Animation.DROP
  });


  //$("#map").append(pins);

  // animate the pins in map //

}

// $('#button-submit').on("click", getLocation);
$('#button-submit').on("click", getData);
$('#button-submit').trigger("click");
