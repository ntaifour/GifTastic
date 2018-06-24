var gifList = ["Movies", "Rick and Morty", "Red Pandas", "Otters", "Looping GIFs", "Trippy", "Soothing", "Donald Trump", "Kanye West"];
var currentGif; 
var pausedGif; 
var animatedGif; 
var stillGif;

// creates buttons
function createButtons(){
	$('#buttonRow').empty();
	for(var i = 0; i < gifList.length; i++){
		var gifButton = $('<button>').text(gifList[i]).addClass('gifButton').attr({'data-name': gifList[i]});
        $('#buttonRow').append(gifButton);
    }
}



function Display(){
    $('.display').empty();

    var gif = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&api_key=cJpVt3udm4XbbUi5Z68cHZRKT2jX6QOJ";
    $.ajax({
        url: queryURL, 
        method: 'GET'
    }).done(function(response){
        currentGif = response.data;
        $.each(currentGif, function(index, value){
            animatedGif= value.images.original.url;
            pausedGif = value.images.original_still.url;

    
            gifDisplay= $('<img>').attr('src', pausedGif).attr('data-state', "still");

         
          gifDisplay.attr("data-still", animatedGif);
          gifDisplay.attr("data-animate", pausedGif);
            var rating = value.rating;
            //gives blank ratings 'unrated' text
            if(rating == ''){
                rating = 'Unrated';
            }
            var rating = $('<h5>').html('Rated: '+ rating).addClass('ratingStyle');
            
            // $('.display').append(gifDisplay);
            $('.display').append(rating, gifDisplay);
        });

    });
}

//to toggle images.
function gifAnimate(){


       var state = $(this).attr("data-state");
       var animatedGif= $(this).attr("data-animate");
       var pausedGif = $(this).attr("data-still");
  
      if (state === "still") {
        $(this).attr("src", animatedGif);
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", pausedGif);
        $(this).attr("data-state", "still");
      }

}

createButtons();

$("#addGif").on("click", function (event) {
    // Prevents the page from reloading as this is the default action for a submit button in a form
    event.preventDefault();

    var item = $("#newGifInput").val().trim();
       //don't add item if its empty
       if(item == "")
       {
        return;
       }

    // Add the new search term to the foods array
    gifList.push(item);

    createButtons();
    // Clear out the text field after adding a new search button
    $("#newGifInput").val("")

  });
 
  $(document).on("click", ".gifButton", Display);
  $(document).on("click", "img", gifAnimate);