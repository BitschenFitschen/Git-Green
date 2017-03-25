//javascript logicJS
//we need the input from the search bar to be saved into this variable to be passed into the .get for MarketData API

var Markit = {};
/**
* Define the QuoteService.
* First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
* Second argument is fCallback, a callback function executed onSuccess of API.
*/
$(document).ready(function(){

		$("#btn").button();
		$("#sym").focus();

		//form submit event
		$("form").submit(function(e){

			e.preventDefault();

			$("#btn").button("loading");

			var ticker = $("#sym").val();

      new Markit.QuoteService(ticker, function(jsonResult) {

        //Catch errors
        if (!jsonResult || jsonResult.Message){
            console.error("Error: ", jsonResult.Message);
            return;
        }

        //If all goes well, your quote will be here.
        console.log(jsonResult);

        //Now proceed to do something with the data.
        $("#company-title").first().text(jsonResult.Name);

        $("#symbol").first().text(jsonResult.Symbol);
        $("#daysHigh").first().text(jsonResult.High);
        $("#daysLow").first().text(jsonResult.Low);
        $("#open").first().text(jsonResult.Open);
        $("#change").first().text(jsonResult.Change);
        $("#volume").first().text(jsonResult.Volume);
        $("#lastTrade").first().text(jsonResult.LastPrice);

      });
		});
	});

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



// var Markit = {};
// /**
//  * Define the InteractiveChartApi.
//  * First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
//  * Second argument is duration (int) for how many days of history to retrieve.
//  */
// Markit.InteractiveChartApi = function(symbol,duration){
//     this.symbol = symbol.toUpperCase();
//     this.duration = duration;
//     this.PlotChart();
// };

// Markit.InteractiveChartApi.prototype.PlotChart = function(){

//     var params = {
//         parameters: JSON.stringify( this.getInputParams() )
//     }

//     //Make JSON request for timeseries data
//     $.ajax({
//         beforeSend:function(){
//             $("#chartDemoContainer").text("Loading chart...");
//         },
//         data: params,
//         url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp",
//         dataType: "jsonp",
//         context: this,
//         success: function(json){
//             //Catch errors
//             if (!json || json.Message){
//                 console.error("Error: ", json.Message);
//                 return;
//             }
//             this.render(json);
//         },
//         error: function(response,txtStatus){
//             console.log(response,txtStatus)
//         }
//     });
// };

// Markit.InteractiveChartApi.prototype.getInputParams = function(){
//     return {
//         Normalized: false,
//         NumberOfDays: this.duration,
//         DataPeriod: "Day",
//         Elements: [
//             {
//                 Symbol: this.symbol,
//                 Type: "price",
//                 Params: ["ohlc"] //ohlc, c = close only
//             },
//             {
//                 Symbol: this.symbol,
//                 Type: "volume"
//             }
//         ]
//         //,LabelPeriod: 'Week',
//         //LabelInterval: 1
//     }
// };

// Markit.InteractiveChartApi.prototype._fixDate = function(dateIn) {
//     var dat = new Date(dateIn);
//     return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
// };

// Markit.InteractiveChartApi.prototype._getOHLC = function(json) {
//     var dates = json.Dates || [];
//     var elements = json.Elements || [];
//     var chartSeries = [];

//     if (elements[0]){

//         for (var i = 0, datLen = dates.length; i < datLen; i++) {
//             var dat = this._fixDate( dates[i] );
//             var pointData = [
//                 dat,
//                 elements[0].DataSeries['open'].values[i],
//                 elements[0].DataSeries['high'].values[i],
//                 elements[0].DataSeries['low'].values[i],
//                 elements[0].DataSeries['close'].values[i]
//             ];
//             chartSeries.push( pointData );
//         };
//     }
//     return chartSeries;
// };

// Markit.InteractiveChartApi.prototype._getVolume = function(json) {
//     var dates = json.Dates || [];
//     var elements = json.Elements || [];
//     var chartSeries = [];

//     if (elements[1]){

//         for (var i = 0, datLen = dates.length; i < datLen; i++) {
//             var dat = this._fixDate( dates[i] );
//             var pointData = [
//                 dat,
//                 elements[1].DataSeries['volume'].values[i]
//             ];
//             chartSeries.push( pointData );
//         };
//     }
//     return chartSeries;
// };

// Markit.InteractiveChartApi.prototype.render = function(data) {
//     //console.log(data)
//     // split the data set into ohlc and volume
//     var ohlc = this._getOHLC(data),
//         volume = this._getVolume(data);

//     // set the allowed units for data grouping
//     var groupingUnits = [[
//         'week',                         // unit name
//         [1]                             // allowed multiples
//     ], [
//         'month',
//         [1, 2, 3, 4, 6]
//     ]];

//     // create the chart
//     $('#chartDemoContainer').highcharts('StockChart', {

//         rangeSelector: {
//             selected: 1
//             //enabled: false
//         },

//         title: {
//             text: this.symbol + ' Historical Price'
//         },

//         yAxis: [{
//             title: {
//                 text: 'OHLC'
//             },
//             height: 200,
//             lineWidth: 2
//         }, {
//             title: {
//                 text: 'Volume'
//             },
//             top: 300,
//             height: 100,
//             offset: 0,
//             lineWidth: 2
//         }],

//         series: [{
//             type: 'candlestick',
//             name: this.symbol,
//             data: ohlc,
//             dataGrouping: {
//                 units: groupingUnits
//             }
//         }, {
//             type: 'column',
//             name: 'Volume',
//             data: volume,
//             yAxis: 1,
//             dataGrouping: {
//                 units: groupingUnits
//             }
//         }],
//         credits: {
//             enabled:false
//         }
//     });
// };


   var APIURL = "http://webhose.io/search?token=f613b0c1-4567-4751-8760-c3da580bc119&format=json&q=Cannabis%2C%20Marijuana%20thread.country%3AUS%20site_category%3Abusiness%20(site_type%+ 3Anews)"


  $.ajax({
      url: APIURL,
      method: "GET"

    })

    .done(function(response){
      console.log(response)

    var shortenedArray = response.posts.slice(99);
    for(var i = 0; i < shortenedArray.length; i++) {
      console.log(shortenedArray[i].title)
        $('#article-title').append('<span>' + shortenedArray[i].title + '</span>')
    }

  var shortenedArray = response.posts.slice(99);
        for (var i = 0; i < shortenedArray.length; i++) {
            console.log(shortenedArray[i].thread.main_image)
            $('#new-image').append('<img src = "' + shortenedArray[i].thread.main_image + '"/>')
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
