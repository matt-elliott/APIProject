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
    var query = $('#food-input').val();
    var lat = 34.0594726;
    var lng = -118.4460542;
    
    //GET https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972
    // $.ajax({
    //   queryUrl: `https://api.yelp.com/v3/businesses/search?term=${query}&latitdue=${lat}&longitude=${lng}`,
    //   headers: {
    //     Authorization: `Bearer ktigyrLk8IGtOoqqF4SB07jfVpMdNXYUuxDVfAKW_O5dAb4fa7megmQRsMeggxdnbc7Vma5Cx8qGcBLlZ0PFKLDKKz6xZX3GyZAijIWhmAn9tNeeHh3XAUYDQ_03WnYx`,
    //   },
    //   method: 'GET',
    // }).then(function (response) {
    //   buildListView();
    // });


    response = {
      "businesses": [
          {
              "id": "zcZWzI0sE51fOV6Ao-c_TA",
              "alias": "lamonicas-new-york-pizza-los-angeles",
              "name": "Lamonica's New York Pizza",
              "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/cdSN8XSnr_kanhy-UUSpzA/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/lamonicas-new-york-pizza-los-angeles?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 959,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "chicken_wings",
                      "title": "Chicken Wings"
                  }
              ],
              "rating": 4,
              "coordinates": {
                  "latitude": 34.0609817504883,
                  "longitude": -118.446723937988
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$",
              "location": {
                  "address1": "1066 Gayley Ave",
                  "address2": "",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90024",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "1066 Gayley Ave",
                      "Los Angeles, CA 90024"
                  ]
              },
              "phone": "+13102088671",
              "display_phone": "(310) 208-8671",
              "distance": 178.88745005169872
          },
          {
              "id": "jGuzp8hsKy27ZmK1jsvgYw",
              "alias": "800-degrees-woodfired-kitchen-los-angeles",
              "name": "800 Degrees Woodfired Kitchen",
              "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/iNJAWoqDjTmTpq73uoOAMg/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/800-degrees-woodfired-kitchen-los-angeles?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 2313,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "salad",
                      "title": "Salad"
                  }
              ],
              "rating": 3.5,
              "coordinates": {
                  "latitude": 34.059930827289,
                  "longitude": -118.44431695965
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$$",
              "location": {
                  "address1": "10889 Lindbrook Dr",
                  "address2": "",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90024",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "10889 Lindbrook Dr",
                      "Los Angeles, CA 90024"
                  ]
              },
              "phone": "+13104431911",
              "display_phone": "(310) 443-1911",
              "distance": 167.94978078043746
          },
          {
              "id": "hdabpPPAaPp6Q3rQ47zZOw",
              "alias": "enzos-pizzeria-los-angeles",
              "name": "Enzo's Pizzeria",
              "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/8G7i8THu--7xQ5uDq1585A/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/enzos-pizzeria-los-angeles?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 624,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  }
              ],
              "rating": 3.5,
              "coordinates": {
                  "latitude": 34.0623435974121,
                  "longitude": -118.446647644043
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$",
              "location": {
                  "address1": "10940 Weyburn Ave",
                  "address2": "",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90024",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "10940 Weyburn Ave",
                      "Los Angeles, CA 90024"
                  ]
              },
              "phone": "+13102083696",
              "display_phone": "(310) 208-3696",
              "distance": 326.71962414807103
          },
          {
              "id": "lkdJKRYmd_ZL9gHmHRpYxw",
              "alias": "pizzana-los-angeles-3",
              "name": "Pizzana",
              "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/VqYsuX2eluOxtyIuS1rraw/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/pizzana-los-angeles-3?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 548,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "italian",
                      "title": "Italian"
                  }
              ],
              "rating": 4,
              "coordinates": {
                  "latitude": 34.053392,
                  "longitude": -118.466013
              },
              "transactions": [],
              "price": "$$",
              "location": {
                  "address1": "11712 San Vicente Blvd",
                  "address2": "",
                  "address3": null,
                  "city": "Los Angeles",
                  "zip_code": "90049",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "11712 San Vicente Blvd",
                      "Los Angeles, CA 90049"
                  ]
              },
              "phone": "+13104817108",
              "display_phone": "(310) 481-7108",
              "distance": 1959.0478904005643
          },
          {
              "id": "t5Ggj9n2ApvawNWTXvwMAg",
              "alias": "d-amores-famous-pizza-los-angeles",
              "name": "D'Amore's Famous Pizza",
              "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/0v4XZxSMp5u6WpVjN8XBKw/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/d-amores-famous-pizza-los-angeles?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 194,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "italian",
                      "title": "Italian"
                  }
              ],
              "rating": 3,
              "coordinates": {
                  "latitude": 34.06009,
                  "longitude": -118.444769
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$",
              "location": {
                  "address1": "1136 Westwood Blvd",
                  "address2": "",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90024",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "1136 Westwood Blvd",
                      "Los Angeles, CA 90024"
                  ]
              },
              "phone": "+13102091212",
              "display_phone": "(310) 209-1212",
              "distance": 136.85681276179815
          },
          {
              "id": "d4MMhJy8Jh_SULv5fpsGhQ",
              "alias": "pitfire-artisan-pizza-los-angeles-5",
              "name": "Pitfire Artisan Pizza",
              "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/WoeRLxpJh-1qw37VN04lIg/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/pitfire-artisan-pizza-los-angeles-5?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 768,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "sandwiches",
                      "title": "Sandwiches"
                  },
                  {
                      "alias": "italian",
                      "title": "Italian"
                  }
              ],
              "rating": 4,
              "coordinates": {
                  "latitude": 34.046508826591,
                  "longitude": -118.433719711996
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$$",
              "location": {
                  "address1": "2018 Westwood Blvd",
                  "address2": "",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90025",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "2018 Westwood Blvd",
                      "Los Angeles, CA 90025"
                  ]
              },
              "phone": "+13104819860",
              "display_phone": "(310) 481-9860",
              "distance": 1835.539449715277
          },
          {
              "id": "SetdpX_Ogh0DeYTBo5vBYg",
              "alias": "johnnies-new-york-pizzeria-los-angeles-14",
              "name": "Johnnie's New York Pizzeria",
              "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/j4mcz_8Pm6RQZwn2_Y-Jyg/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/johnnies-new-york-pizzeria-los-angeles-14?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 44,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "italian",
                      "title": "Italian"
                  }
              ],
              "rating": 3.5,
              "coordinates": {
                  "latitude": 34.0481,
                  "longitude": -118.46312
              },
              "transactions": [
                  "delivery"
              ],
              "location": {
                  "address1": "11819 Wilshire Blvd",
                  "address2": "Ste 103",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90025",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "11819 Wilshire Blvd",
                      "Ste 103",
                      "Los Angeles, CA 90025"
                  ]
              },
              "phone": "+13104772111",
              "display_phone": "(310) 477-2111",
              "distance": 2018.1650896300516
          },
          {
              "id": "plkTsuBDc8Sx1aA05p6lQw",
              "alias": "blaze-fast-fired-pizza-los-angeles-10",
              "name": "Blaze Fast-Fire'd Pizza",
              "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/g7Spqf8WDX2EScRhw31lbw/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/blaze-fast-fired-pizza-los-angeles-10?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 20,
              "categories": [
                  {
                      "alias": "salad",
                      "title": "Salad"
                  },
                  {
                      "alias": "hotdogs",
                      "title": "Fast Food"
                  },
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  }
              ],
              "rating": 4.5,
              "coordinates": {
                  "latitude": 34.06814,
                  "longitude": -118.442134
              },
              "transactions": [],
              "price": "$",
              "location": {
                  "address1": "617 Charles Young Dr E",
                  "address2": null,
                  "address3": null,
                  "city": "Los Angeles",
                  "zip_code": "90095",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "617 Charles Young Dr E",
                      "Los Angeles, CA 90095"
                  ]
              },
              "phone": "+13102064773",
              "display_phone": "(310) 206-4773",
              "distance": 1029.2002784189424
          },
          {
              "id": "60Ve0JohNX0j0MfjkLBoUA",
              "alias": "upper-crust-pizzeria-beverly-hills",
              "name": "Upper Crust Pizzeria",
              "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/lVigixs9a7s97GSdYTn4QQ/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/upper-crust-pizzeria-beverly-hills?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 225,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "salad",
                      "title": "Salad"
                  },
                  {
                      "alias": "chicken_wings",
                      "title": "Chicken Wings"
                  }
              ],
              "rating": 4.5,
              "coordinates": {
                  "latitude": 34.0633623764201,
                  "longitude": -118.399212433729
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$$",
              "location": {
                  "address1": "243 S Beverly Dr",
                  "address2": "",
                  "address3": "",
                  "city": "Beverly Hills",
                  "zip_code": "90212",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "243 S Beverly Dr",
                      "Beverly Hills, CA 90212"
                  ]
              },
              "phone": "+13105045056",
              "display_phone": "(310) 504-5056",
              "distance": 4336.591516901485
          },
          {
              "id": "gmnMLeZsJ9UH49Xgd5u2Rg",
              "alias": "roccos-tavern-los-angeles-2",
              "name": "Rocco's Tavern",
              "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/tthhg94b4uxnPfpPZbgSzw/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/roccos-tavern-los-angeles-2?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 314,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "sportsbars",
                      "title": "Sports Bars"
                  },
                  {
                      "alias": "italian",
                      "title": "Italian"
                  }
              ],
              "rating": 4.5,
              "coordinates": {
                  "latitude": 34.06191,
                  "longitude": -118.44764
              },
              "transactions": [
                  "pickup"
              ],
              "price": "$$",
              "location": {
                  "address1": "1000 Gayley Ave",
                  "address2": "",
                  "address3": null,
                  "city": "Los Angeles",
                  "zip_code": "90024",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "1000 Gayley Ave",
                      "Los Angeles, CA 90024"
                  ]
              },
              "phone": "+14242483145",
              "display_phone": "(424) 248-3145",
              "distance": 310.80967591213863
          },
          {
              "id": "tqSbtO_2ZYYB1-eORVwfzw",
              "alias": "cafe-glace-los-angeles-6",
              "name": "Cafe Glace",
              "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/1csw6161y32ZTmyvqvcUWg/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/cafe-glace-los-angeles-6?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 290,
              "categories": [
                  {
                      "alias": "persian",
                      "title": "Persian/Iranian"
                  },
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "sandwiches",
                      "title": "Sandwiches"
                  }
              ],
              "rating": 4,
              "coordinates": {
                  "latitude": 34.05444,
                  "longitude": -118.44139
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$",
              "location": {
                  "address1": "1441 Westwood Blvd",
                  "address2": "",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90024",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "1441 Westwood Blvd",
                      "Los Angeles, CA 90024"
                  ]
              },
              "phone": "+13104788080",
              "display_phone": "(310) 478-8080",
              "distance": 703.2699491323494
          },
          {
              "id": "gMvpjDPNcQcXXkYhn0RyQw",
              "alias": "midici-the-neapolitan-pizza-company-century-city",
              "name": "MidiCi The Neapolitan Pizza Company",
              "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/esxOvZbeVRKkGJ5Rc6CAjQ/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/midici-the-neapolitan-pizza-company-century-city?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 215,
              "categories": [
                  {
                      "alias": "wine_bars",
                      "title": "Wine Bars"
                  },
                  {
                      "alias": "italian",
                      "title": "Italian"
                  },
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  }
              ],
              "rating": 4,
              "coordinates": {
                  "latitude": 34.0583149556867,
                  "longitude": -118.417975879787
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$$",
              "location": {
                  "address1": "10250 Santa Monica Blvd",
                  "address2": "Ste 1395",
                  "address3": null,
                  "city": "Century City",
                  "zip_code": "90067",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "10250 Santa Monica Blvd",
                      "Ste 1395",
                      "Century City, CA 90067"
                  ]
              },
              "phone": "+14242781005",
              "display_phone": "(424) 278-1005",
              "distance": 2589.7957660619477
          },
          {
              "id": "tqd0Pu0LnvcsVj-NOYv7nw",
              "alias": "fresh-brothers-brentwood-brentwood",
              "name": "Fresh Brothers - Brentwood",
              "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/UL8NKrRrkCSAxTgDnZIEfQ/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/fresh-brothers-brentwood-brentwood?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 330,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "salad",
                      "title": "Salad"
                  },
                  {
                      "alias": "chicken_wings",
                      "title": "Chicken Wings"
                  }
              ],
              "rating": 3.5,
              "coordinates": {
                  "latitude": 34.0529787105699,
                  "longitude": -118.467106315345
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$$",
              "location": {
                  "address1": "11740 San Vicente Blvd",
                  "address2": "",
                  "address3": "",
                  "city": "Brentwood",
                  "zip_code": "90049",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "11740 San Vicente Blvd",
                      "Brentwood, CA 90049"
                  ]
              },
              "phone": "+13108260777",
              "display_phone": "(310) 826-0777",
              "distance": 2069.461101093832
          },
          {
              "id": "8TlXpfI0uvwLIlBlresR6g",
              "alias": "dominos-pizza-los-angeles",
              "name": "Domino's Pizza",
              "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/LMv5jCbXAijFox1ZRxjfFQ/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/dominos-pizza-los-angeles?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 114,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "chicken_wings",
                      "title": "Chicken Wings"
                  },
                  {
                      "alias": "sandwiches",
                      "title": "Sandwiches"
                  }
              ],
              "rating": 2,
              "coordinates": {
                  "latitude": 34.055931,
                  "longitude": -118.442341
              },
              "transactions": [],
              "price": "$",
              "location": {
                  "address1": "1371 Westwood Blvd",
                  "address2": "",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90024",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "1371 Westwood Blvd",
                      "Los Angeles, CA 90024"
                  ]
              },
              "phone": "+13108245000",
              "display_phone": "(310) 824-5000",
              "distance": 521.6267633827141
          },
          {
              "id": "mIVWtPdnOWFQJ8j1dy6B2w",
              "alias": "berris-pizza-los-angeles-2",
              "name": "Berri's Pizza",
              "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/Vqx0HHCXsWXERYXPt9abiQ/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/berris-pizza-los-angeles-2?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 251,
              "categories": [
                  {
                      "alias": "salad",
                      "title": "Salad"
                  },
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "sandwiches",
                      "title": "Sandwiches"
                  }
              ],
              "rating": 3.5,
              "coordinates": {
                  "latitude": 34.04745,
                  "longitude": -118.44357
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$$",
              "location": {
                  "address1": "11078 Santa Monica Blvd",
                  "address2": "",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90025",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "11078 Santa Monica Blvd",
                      "Los Angeles, CA 90025"
                  ]
              },
              "phone": "+13108782210",
              "display_phone": "(310) 878-2210",
              "distance": 1355.4135763880447
          },
          {
              "id": "hZtvbwPMgYKwYEquPSM-iQ",
              "alias": "double-zero-venice",
              "name": "Double Zero",
              "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/dAtyFaApsmsX_nyEX4wZWA/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/double-zero-venice?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 45,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "vegan",
                      "title": "Vegan"
                  }
              ],
              "rating": 4,
              "coordinates": {
                  "latitude": 33.996824,
                  "longitude": -118.457977
              },
              "transactions": [
                  "restaurant_reservation"
              ],
              "location": {
                  "address1": "1700 Lincoln Blvd",
                  "address2": null,
                  "address3": null,
                  "city": "Venice",
                  "zip_code": "90291",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "1700 Lincoln Blvd",
                      "Venice, CA 90291"
                  ]
              },
              "phone": "+14242804672",
              "display_phone": "(424) 280-4672",
              "distance": 7052.3147612557605
          },
          {
              "id": "91meCwrmojpFj4XGecn34A",
              "alias": "italian-express-los-angeles",
              "name": "Italian Express",
              "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/hp9-lqQUcM9MaPmbMLcCPQ/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/italian-express-los-angeles?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 254,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "italian",
                      "title": "Italian"
                  },
                  {
                      "alias": "salad",
                      "title": "Salad"
                  }
              ],
              "rating": 3,
              "coordinates": {
                  "latitude": 34.060317,
                  "longitude": -118.442658
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$$",
              "location": {
                  "address1": "10845 Lindbrook Dr",
                  "address2": "",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90024",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "10845 Lindbrook Dr",
                      "Los Angeles, CA 90024"
                  ]
              },
              "phone": "+13102085572",
              "display_phone": "(310) 208-5572",
              "distance": 326.6422505486424
          },
          {
              "id": "VLQFXs5F7BK40KA10VDSaA",
              "alias": "lenzinis-pizza-los-angeles-4",
              "name": "Lenzini's Pizza",
              "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/j0i7IKrQP2WNAwzL2bYvVw/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/lenzinis-pizza-los-angeles-4?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 435,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "italian",
                      "title": "Italian"
                  }
              ],
              "rating": 4,
              "coordinates": {
                  "latitude": 34.0246168187149,
                  "longitude": -118.411065714121
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$",
              "location": {
                  "address1": "3500 Overland Ave",
                  "address2": "Ste 120",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90034",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "3500 Overland Ave",
                      "Ste 120",
                      "Los Angeles, CA 90034"
                  ]
              },
              "phone": "+13105598241",
              "display_phone": "(310) 559-8241",
              "distance": 5041.289508014781
          },
          {
              "id": "bELqNoqvhAcrOyL-i-iwpA",
              "alias": "california-pizza-kitchen-at-westwood-los-angeles",
              "name": "California Pizza Kitchen at Westwood",
              "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/EYRyFzpPR4aeMPiR7UkFUA/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/california-pizza-kitchen-at-westwood-los-angeles?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 335,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  },
                  {
                      "alias": "newamerican",
                      "title": "American (New)"
                  },
                  {
                      "alias": "salad",
                      "title": "Salad"
                  }
              ],
              "rating": 3,
              "coordinates": {
                  "latitude": 34.06213,
                  "longitude": -118.44719
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$$",
              "location": {
                  "address1": "1001 Broxton Ave",
                  "address2": null,
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90024",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "1001 Broxton Ave",
                      "Los Angeles, CA 90024"
                  ]
              },
              "phone": "+13102099197",
              "display_phone": "(310) 209-9197",
              "distance": 328.5869714016103
          },
          {
              "id": "R4E4UIgdZt0jmLtm-ZpPOA",
              "alias": "papa-johns-pizza-los-angeles-25",
              "name": "Papa John's Pizza",
              "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/jbrtAryZpare2g-XoIkS7w/o.jpg",
              "is_closed": false,
              "url": "https://www.yelp.com/biz/papa-johns-pizza-los-angeles-25?adjust_creative=5iCsI2DOwhKNzlcx8lc0Fg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5iCsI2DOwhKNzlcx8lc0Fg",
              "review_count": 59,
              "categories": [
                  {
                      "alias": "pizza",
                      "title": "Pizza"
                  }
              ],
              "rating": 2.5,
              "coordinates": {
                  "latitude": 34.0567741394043,
                  "longitude": -118.443000793457
              },
              "transactions": [
                  "delivery",
                  "pickup"
              ],
              "price": "$",
              "location": {
                  "address1": "1301 Westwood Blvd",
                  "address2": "",
                  "address3": "",
                  "city": "Los Angeles",
                  "zip_code": "90024",
                  "country": "US",
                  "state": "CA",
                  "display_address": [
                      "1301 Westwood Blvd",
                      "Los Angeles, CA 90024"
                  ]
              },
              "phone": "+13104782999",
              "display_phone": "(310) 478-2999",
              "distance": 411.20447479764266
          }
      ],
      "total": 1300,
      "region": {
          "center": {
              "longitude": -118.4460542,
              "latitude": 34.0594726
          }
      }
    }
    restaurants = response.businesses;
    loc = new google.maps.LatLng(lat, lng);
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.0594726, lng: -118.4460542 }, zoom: 12
    });

    buildListView();
  }

  function buildListView() {
    $('#listView').empty();
    console.log(restaurants);
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