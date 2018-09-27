$(document).ready(function() {
    //array of planets
    var planets = ["Venus", "Jupiter", "Saturn", "Neptune"];

    //displayPlanet function re-renders the HTML to display the right content
    function displayPlanet() {
        var planet = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + planet + "zh6QW2fMxH8GVD6ovNNSRkE6W9DLAcri&limit=10";

        //create AJAX call for the planet button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            $("#planet-view").empty();

            var results = response.data;

            console.log(response);
        })
    }

    
})