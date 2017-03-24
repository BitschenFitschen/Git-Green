//javascript logicJS
//we need the input from the search bar to be saved into this variable to be passed into the .get for Yahoo Fianance

var Markit = {};
/**
* Define the QuoteService.
* First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
* Second argument is fCallback, a callback function executed onSuccess of API.
*/
Markit.QuoteService = function(sSymbol, fCallback) {
    this.symbol = sSymbol;
    this.fCallback = fCallback;
    this.DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
    this.makeRequest();
};
/**
* Ajax success callback. fCallback is the 2nd argument in the QuoteService constructor.
*/
Markit.QuoteService.prototype.handleSuccess = function(jsonResult) {
    this.fCallback(jsonResult);
};
/**
* Ajax error callback
*/
Markit.QuoteService.prototype.handleError = function(jsonResult) {
    console.error(jsonResult);
};
/**
* Starts a new ajax request to the Quote API
*/
Markit.QuoteService.prototype.makeRequest = function() {
    //Abort any open requests
    if (this.xhr) { this.xhr.abort(); }
    //Start a new request
    this.xhr = $.ajax({
        data: { symbol: this.symbol },
        url: this.DATA_SRC,
        dataType: "jsonp",
        success: this.handleSuccess,
        error: this.handleError,
        context: this
    });
};

new Markit.QuoteService("AAPL", function(jsonResult) {

    //Catch errors
    if (!jsonResult || jsonResult.Message){
        console.error("Error: ", jsonResult.Message);
        return;
    }

    //If all goes well, your quote will be here.
    console.log(jsonResult);

    //Now proceed to do something with the data.
    $("h1").first().text(jsonResult.Name);

    /**
    * Need help? Visit the API documentation at:
    * http://dev.markitondemand.com
    */
});

// <!--var searchTerm = $('search-button').val();

// var KEY = "K4FrZyyZTgnvqHT8F6VY" + "&text=" ;

// var APIURL = "https://www.enclout.com/api/v1/yahoo_finance/show.json?auth_token=";

// var queryURL = APIURL +  KEY + searchTerm;


//  $.ajax({
// 	dataType: "json",
// 	url: queryURL,
// 	method: "GET"
// 	})

//  .done(function(response){
// 		console.log(response)
// 	});
   
  


var APIURL = "http://webhose.io/search?token=f613b0c1-4567-4751-8760-c3da580bc119&format=json&q=Cannabis%2C%20Marijuana%20thread.country%3AUS%20site_category%3Abusiness%20(site_type%3Anews)"


  $.ajax({
      url: APIURL,
      method: "GET"

    })

    .done(function(response){
      console.log(response)
    
    var shortenedArray = response.posts.slice(95,99);
    for(var i = 0; i < shortenedArray.length; i++) {
      console.log(shortenedArray[i].title)
        $('#ask').append('<span>' + shortenedArray[i].title + '</span>')
    }

  var shortenedArray = response.posts.slice(95, 99);
        for (var i = 0; i < shortenedArray.length; i++) {
            console.log(shortenedArray[i].thread.main_image)
            $('#bid').append('<img src = "' + shortenedArray[i].thread.main_image + '"/>')
        }


  });

   var config = {
    apiKey: "AIzaSyB5WJgKJ_QJwHUIItRHlSXA-wqqINki-Lg",
    authDomain: "recent-search-f703c.firebaseapp.com",
    databaseURL: "https://recent-search-f703c.firebaseio.com",
    storageBucket: "recent-search-f703c.appspot.com",
    messagingSenderId: "310199294002"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

    // Initial Values
    var search = "";

    // Capture Button Click
    $("#search-button").on("click", function(event) {
      event.preventDefault();

      
      search = $("#recent-input").val().trim();

      $("#user-input").append("<div>" + search + "</div>");
      // Code for the push
      dataRef.ref().push({

        search: search,
        });
      });

      
    dataRef.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().search);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

      console.log("limited:", snapshot.val());

      // Change the HTML to reflect
      $("#search-display").html(snapshot.val().name);

       

       });