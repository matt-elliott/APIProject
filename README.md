# What Should I Eat for Lunch Today?

## A restaurant finding app
https://matt-elliott.github.io/APIProject/

## The Problem
We have noticed it is hard for teams to pick their weekly lunch outings so we developed a simple web app to find restaurants near the user that match their search criterea.

## The Build
To solve this problem we used build our app with Node.js utilizing the Google Maps API and Yelp's APIs to search and return nearby restaurants that can match the users search.

## Directions
Go to site, enter the type of food you would like (ie: Mexican Food) and click submit.
The site will ask to allow it to get your location: click yes. Then you will see a map
and local eateries that fit your criterea.

### Algorithm
1. get user location
2. User inputs food type or genre ie: "hamburger", "chinese"
3. app gives list of close by restaurants that match user food option
  - uses yelp api to find close by restaurants
4. shows list and a map of close by restaurants
  - use google maps api to show location & how busy it is
5. use zomato api to get the menu 

### Division of work
1. Tansu : Google Maps API and JavaScript
2. Jeremy : Front End pages
3. Matt : User location and Urban API and JavaScript
