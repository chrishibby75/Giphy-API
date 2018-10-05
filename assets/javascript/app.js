$(document).ready(function () {
    //array of planets
    var planets = ["Planet Venus", "Planet Jupiter", "Planet Saturn", "Planet Neptune"];

    //displayPlanet function re-renders the HTML to display the right content
    function displayPlanet() {
        var planet = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + planet + "&api_key=zh6QW2fMxH8GVD6ovNNSRkE6W9DLAcri";
        console.log(queryURL);
        //create AJAX call for the planet button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //$("#planet-view").empty();
            var results = response.data;
            console.log(response);



            for (var i = 0; i < results.length; i++) {
                console.log(results[i])
                var planetDiv = $("<div>");
                planetDiv.addClass("planetpictures");

                //create the element to have the rating displayed
                var rating = results[i].rating;

                var p = $("<h2>").text("Rating: " + rating);

                //allow image to still or animate
                var planetImage = $("<img>");
                planetImage.attr("src", results[i].images.fixed_height_still.url);
                planetImage.attr("data-still", results[i].images.fixed_height_still.url);
                planetImage.attr("data-animate", results[i].images.fixed_height.url);
                planetImage.attr("data-state", "still");
                planetImage.addClass("planetImage");

                //display rating
                planetDiv.prepend(p);

                //display planet image
                planetDiv.prepend(planetImage);
                $("#planet-view").prepend(planetDiv);
            }

            //if the variable state is equal to 'still',
            // then update the src attribute of this image to it's data-animate value,
            // and update the data-state attribute to 'animate'.
            // If state does not equal 'still', then update the src attribute of this
            // image to it's data-animate value and update the data-state attribute to 'still'



            $(".planetImage").on("click", function () {
                var state = $(this).attr("data-state");
                console.log(state);

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }
    function renderButtons() {
        $("#planetbuttons").empty();

        for (var i = 0; i < planets.length; i++) {
            var planetAdd = $("<button>");
            planetAdd.addClass("planet");
            planetAdd.attr("data-name", planets[i]);
            planetAdd.text(planets[i]);
            $("#planetbuttons").append(planetAdd);
        }
    }

    $("#add-planet").on("click", function (event) {
        event.preventDefault();

        var planet = $("#planet-input").val().trim();
        planets.push(planet);
        renderButtons();
    });

    $(document).on("click", ".planet", displayPlanet);

    renderButtons();




});