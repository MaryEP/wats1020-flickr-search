		// Asynchronous Flickr Search
$(document).on('ready', function(){
		// Create a function`searchImages()`to handle process of taking search terms and sending them to Flickr
		//Execute the `searchImages()` function to fetch images for the user.
  var searchImages = function(tags) {
		// var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?format=json";
  var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    console.log(tags);
		
    $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';
		//Construct a `$.getJSON()` call to send a request object including the tags the user submitted
    $.getJSON( flickrAPI, {
			//Accept a string value called `tags` as an argument. tags: "form-group.text",
      tags: tags,
      tagmode: "any",
      format: "json"
			//add a 'done' handler()
    }).done(function( data ) {
			
      $('#images').empty();
      $('h1.search-title').first()[0].innerHTML = "Search results for: " + tags;
      $.each( data.items, function( i, item ) {
        var newListItem = $("<li>")
        var newTitle = $('<p class="image-title">').html(item.title.slice(0, 20)).appendTo(newListItem);
        var newDate = $('<p class="image-date">').text(item.date_taken.slice(0, 10)).appendTo(newListItem);
				
        var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
				//tried all elements to get description to slice after about 50 characters, but no luck!
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr').appendTo(newListItem);
				
				// Allow users to click the images to see a larger version with more information.
        var newButton = $("<button class='btn btn-sm btn-primary'>Enlarge Image</button>").attr({
        'data-title': item.title,
        'data-toggle': "modal",
        'data-target': "#infoModal",
        'data-imgsrc': item.media.m,
        'data-description': item.description,
        'type': "button"
        }).appendTo(newListItem);
				//Update the display to add the images to the list with the id `#images`
        newListItem.appendTo( "#images" );
        if ( i === 30 ) {
          return false;}
      });
    });
  };
			//Attach an event to the search button (`button.search`) to execute the search when clicked.
 $('button.search').on('click', function(event){
	 		//Prevent the default event execution
    event.preventDefault();
	 	//Get the value of the 'input[name="searchText"]' and use that as the `tags` value you send to `searchImages()`.
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    console.log(searchTextInput);
	 	//input[name="searchText"].value
    searchImages(searchTextInput.value);
  });
	
 $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); 
    var title = button.data('title'); 
    var imgSrc = button.data('imgsrc');
    var imageDescription = button.data('description');
    var modal = $(this);
    modal.find('.modal-title').html(title);
    var modalBody = modal.find('.modal-body');
    modalBody.empty();
    var modalDescription = $("<p class='image-description'>").html(imageDescription).appendTo(modalBody);
  });
});
/////END////
	
	
//success:function(feed) {
			     // add variable 'thumbs' as empty array to store images
			//var thumbs = [];
//for(var i=0, l=feed.items.length; i < l && i < 15; ++i)
  //html: 
 // items.push( "<li id='" + key + "'>" + val + "</li>" )} 
 // .appendTo( "#images" );
 //         });
                 
       // $.getJSON( "ajax/test.json", function( data ) {
  //var items = [];
  //$.each( data, function( key, val ) {
  //  items.push( "<li id='" + key + "'>" + val + "</li>" ); 
            //items.join( "" )
 // });
 // $( "<ul/>", {
 //   "class": "my-new-list",
 //   html: items.join( "" )
 // }).appendTo( "body" );
//});
    /*
	$('#feed').html('<span><img src="images/lightbox-ico-loading.gif" alt=""/></span>');
	$.ajax({
		type:'GET',
		url:"http://api.flickr.com/services/feeds/photos_public.gne",
		data:"id="+flickrid+"&lang=en-us&format=json&jsoncallback=?",
        // add lightbox effect
      addLB();
    },
      });
    }*/
    
   /* (function() {
      var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      $.getJSON( flickerAPI, {
        tags: "mount rainier",
        tagmode: "any",
        format: "json"
      })
        .done(function( data ) {
          $.each( data.items, function( i, item ) {
            $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
            if ( i === 3 ) {
              return false;
            }
          });
        });*/
 