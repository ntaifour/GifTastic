var gifList = ["Sports", "Rick and Morty", "Red Pandas", "Looping GIFs", "Kanye West", "Trippy", "Donald Trump", "Otters", "Movies", "Soothing"];
var currentGif; 
var pausedGif; 
var animatedGif; 
var stillGif;

// creates buttons
function createButtons(){
	$('#gifButtons').empty();
	for(var i = 0; i < gifList.length; i++){
		var showBtn = $('<button>').text(gifList[i]).addClass('showBtn').attr({'data-name': gifList[i]});
		$('#gifButtons').append(showBtn);
	}

	// displays gifs on click
	$('.showBtn').on('click', function(){
		$('.display').empty();

		var gif = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&api_key=cJpVt3udm4XbbUi5Z68cHZRKT2jX6QOJ";
		$.ajax({
            url: queryURL, 
            method: 'GET'
        }).done(function(response){
			currentGif = response.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var rating = value.rating;
				//gives blank ratings 'unrated' text
				if(rating == ''){
					rating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+rating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnClick').addClass('pauseOnClick');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}


// animates and pauses gif on click
// still working on getting pause to work
$(document).on('click', '.playOnClick',function(){
    $(this).attr('src', $(this).data('animated'));
});
$(document).on('click', 'pauseOnClick', function(){
    $(this).attr('src', $(this).data('paused'));
});

// sets a button from input
$('#addGif').on('click', function(){
var newGif = $('#newGifInput').val().trim();
gifList.push(newGif);
createButtons();
return false;
});

createButtons();