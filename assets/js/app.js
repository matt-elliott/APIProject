(function () {
  var restaurants = [];

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
    // var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var loc = "Westwood";
    var map = new google.maps.Map(document.getElementById('map'), { center: { lat: 34.0594726, lng: -118.4460542 }, zoom: 12 });
    
    var input = $('#food-input').val();
    var request = {
      query: input,
      location: { lat: 34.0594726, lng: -118.4460542 },
      radius: 15,
      type: ['restaurant', "food"]
    };

    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, function (response) {
      
      restaurants = response;
      
      buildListView();
    });
  }

  function buildListView() {
    if (restaurants.length === 0) {
      $('#listView').html(`<div class="error"><h2>Nothing found, squire…</h2>`);
      return;
    }

    $('#listView').empty();

    restaurants.forEach(function (item) {
      var itemID = restaurants.indexOf(item);

      var html =`
        <div class="col-xs-12 col-md-6">
          <h4><button class="btn btn-link restaurant-btn"  data-restaurant-id="${itemID}">${item.name}</button></h4>
          <img src="https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png">
          <span class="price-level-${item.price_level}"></span>
          <span class="${item.opening_hours.open_now}"></span>
          <span class="${item.rating}"></span>
        </div>`;

      $('#listView').append(html);
    });
  }

  function loadSingleRestaurantView() {
    var selectedRestaurantID = $(this).attr('data-restaurant-id');
    var restaurant = restaurants[selectedRestaurantID];
    console.log(restaurant);
    var restaurantView = `
      <aside id="${restaurant.name}" class="restaurant-view">
        <h3 class="restaurant-name">${restaurant.name}</h3>
        <div class="row">
          <figure class="col">
            <img src="${restaurant.photos[0].getUrl()}" class="img-thumbnail">
          </figure>
          <div class="col" id="restaurant-info">
            <address>${restaurant.formatted_address}</address>
            <p class="price-level">Price level: ${restaurant.price_level}</p>
            <p class="rating-level">Rating: ${restaurant.rating}</p>
          </div>
        </div>
        <span class="btn close-btn"></span>
      </aside>
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