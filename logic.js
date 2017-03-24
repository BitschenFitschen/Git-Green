var setStock, text, sLen, i;

setStock = ["ACAN", "ACCA", "ACOL", "ADVT", "AERO", "APHQF", "AGTK", "RSSFF", "AMMJ", "ACBFF", "ADYNF", "BLPG", "BLOZF", "CBDS", "CPMD", "CANL", "CANV", "CBIS", "CBICF", "CNBX", "CGRW", "CGRA", "CHUM", "CLSH", "CVSI", "MJTK", "DIGP", "DPWW", "ENRT", "ERBB", "ETST", "EDXC", "FFRMF", "FUTL", "FSPM", "GWPH", "GBHPF", "CANN", "GTSO", "GRNH", "GBLX", "GRCU", "GRWC", "PHOT", "HEMP", "HLSPY", "INSY", "JMDA", "KAYS", "KSHB", "LSCG", "LXRP",  "MJNE", "MJMJ", "MJNA", "MSRT", "MYDX", "MCPI", "MCIG", "MDBX", "MNTR", "MDCL", "NCAP", "NMUS", "NTRR", "OWCP", "OGRMF", "PMCB", "PNPL", "PRRE", "PZOO", "SRNA", "SPLIF", "SPRWF", "TAUG", "TRTC", "TCKF", "TBQBF", "THCZ", "THCBF", "TURV",  "USMA",  "VPCO", "VAPE", "VAPI", "VDGSF", "VPRB", "WDLF",  "OPMZ", "FTPM", "ZDPY", "ZYNE"];
sLen = setStock.length;
text = "<ul>";
for (i = 0; i < sLen; i++) {
    text += "<li>" + setStock[i] + "</li>";
}
text += "</ul>";
document.getElementById("company-list").innerHTML = text;

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
    console.log(jsonResult.Name);

    //Now proceed to do something with the data.
    $("#company-title").first().text(jsonResult.Name);


    /**
    * Need help? Visit the API documentation at:
    * http://dev.markitondemand.com
    */
});

   var APIURL = "http://webhose.io/search?token=f613b0c1-4567-4751-8760-c3da580bc119&format=json&q=Cannabis%2C%20Marijuana%20thread.country%3AUS%20site_category%3Abusiness%20(site_type%3Anews)"


  $.ajax({
      url: APIURL,
      method: "GET"

    })

    .done(function(response){
      console.log(response)
    
    var shortenedArray = response.posts.slice(45,46);
    for(var i = 0; i < shortenedArray.length; i++) {
      console.log(shortenedArray[i].title)
        $('#article-title').append('<span>' + shortenedArray[i].title + '</span>')
    }

  var shortenedArray = response.posts.slice(45,46);
        for (var i = 0; i < shortenedArray.length; i++) {
            console.log(shortenedArray[i].thread.main_image)
            $('#stock-image').append('<img src = "' + shortenedArray[i].thread.main_image + '"/>')
        }

   var shortenedArray = response.posts.slice(45,46);
    for(var i = 0; i < shortenedArray.length; i++) {
      console.log(shortenedArray[i].title)
        $('#article-text').append('<span>' + shortenedArray[i].text + '</span>')
    }

    var shortenedArray = response.posts.slice(45,46);
    for(var i = 0; i < shortenedArray.length; i++) {
      console.log(shortenedArray[i].title)
        $('#news-url').append('<link>' + shortenedArray[i].url + '</link>')
    }


  });







// //firebase info retention(recent searches)
// var config = {
//     apiKey: "AIzaSyB5WJgKJ_QJwHUIItRHlSXA-wqqINki-Lg",
//     authDomain: "recent-search-f703c.firebaseapp.com",
//     databaseURL: "https://recent-search-f703c.firebaseio.com",
//     storageBucket: "recent-search-f703c.appspot.com",
//     messagingSenderId: "310199294002"
//   };
//   firebase.initializeApp(config);

//  var dataRef = firebase.database();

//    // Initial Values
//     var search = "";

//    // Capture Button Click
//     $("#recent-search").on("click", function(event) {
//       event.preventDefault();

     
//       search = $("#recent-input").val().trim();

//      // Code for the push
//       dataRef.ref().push({

//        search: search,
//         });
//       });

     
//     dataRef.ref().on("child_added", function(childSnapshot) {

//      // Log everything that's coming out of snapshot
//       console.log(childSnapshot.val().search);

//      // Handle the errors
//     }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });

//    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

//      console.log("limited:", snapshot.val());

//      // Change the HTML to reflect
//       $("#search-display").html(snapshot.val().name);

//       });


