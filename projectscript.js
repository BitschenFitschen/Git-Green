


var APIURL = "http://webhose.io/search?token=f613b0c1-4567-4751-8760-c3da580bc119&format=json&q=Cannabis%2C%20Marijuana%20thread.country%3AUS%20site_category%3Abusiness%20(site_type%3Anews)"


// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
      url: APIURL,
      method: "GET"
    }).done(function(response){
    	console.log(response)
    

    $("#ask").html(response.author);

  });