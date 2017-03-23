

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "a50e858e6b9ee58df61b788f341003e7" // TODO 0 put your api key here ***COMPLETE***
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			// TODO 2 ***COMPLETE***
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
        model.browseItems = response.results;
			// invoke the callback function that was passed in.
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7 ***COMPLETE***
  // clear everything from both lists
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // TODO 6 ***COMPLETE***
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section

  model.watchlistItems.forEach(function(movie) {
    var userList = $("<li></li>").text(movie.original_title);
    $("#section-watchlist ul").append(userList);
  });

  // for each movie on the current browse list,
  model.browseItems.forEach(function(movie) {

    // TODO 3 ***COMPLETE***
		// insert a list item into the <ul> in the browse section
      var movieTitle = $("<p></p>").text(movie.original_title);
      var movieList = $("<li></li>").append(movieTitle);
      $('#section-browse ul').append(movieList);

		// TODO 4 ***COMPLETE***
		// the list item should include a button that says "Add to Watchlist"
    var addButton = $('<button></button>').text('Add to Watchlist').click(function(){
        model.watchlistItems.push(movie);
        render();
    });
    movieList.append(addButton);

		// TODO 5 ***COMPLETE***
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
  });

}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

