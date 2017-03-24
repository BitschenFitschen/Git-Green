var setStock = ["ACAN", "ACCA", "ACOL", "ADVT", "AERO", "APHQF", "AGTK", "RSSFF", "AMMJ", "ACBFF", "ADYNF", "BLPG", "BLOZF", "CBDS", "CPMD", "CANL", "CANV", "CBIS", "CBICF", "CNBX", "CGRW", "CGRA", "CHUM", "CLSH", "CVSI", "MJTK", "DIGP", "DPWW", "ENRT", "ERBB", "ETST", "EDXC", "FFRMF", "FUTL", "FSPM", "GWPH", "GBHPF", "CANN", "GTSO", "GRNH", "GBLX", "GRCU", "GRWC", "PHOT", "HEMP", "HLSPY", "INSY", "JMDA", "KAYS", "KSHB", "LSCG", "LXRP",  "MJNE", "MJMJ", "MJNA", "MSRT", "MYDX", "MCPI", "MCIG", "MDBX", "MNTR", "MDCL" "NCAP", "NMUS", "NTRR", "OWCP", "OGRMF", "PMCB", "PNPL", "PRRE", "PZOO", "SRNA", "SPLIF", "SPRWF", "TAUG", "TRTC", "TCKF", "TBQBF", "THCZ", "THCBF", "TURV",  "USMA",  "VPCO", "VAPE", "VAPI", "VDGSF", "VPRB", "WDLF",  "OPMZ", "FTPM", "ZDPY", "ZYNE"]


// $("#submit-button").on("click", function(event){
// 	event.preventDefault();

// 	var newStock = $("#input-box").val();

// 	display("").val();

// });


var apiUrl = "http://webhose.io/search?token=f613b0c1-4567-4751-8760-c3da580bc119&format=json&q=Cannabis%2C%20Marijuana%20thread.country%3AUS%20site_category%3Abusiness%20(site_type%3Anews)"


// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
      url: apiUrl,
      method: "GET"

    })

    .done(function(response){
    	console.log(response)
    

    $(".ask").html(response.author);

  });

