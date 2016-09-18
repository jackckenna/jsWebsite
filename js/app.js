
//Set the object 
var MN = MN || {};


//On load start initialize
$(function() {  
	MN.init(); 

});


//Initialize startup functions
MN.init = function(){
	this.elementsSetup();
	this.addEventListener();
	this.scrollHeaderChange();

};


MN.scrollHeaderChange = function(){

	$(document).scroll(function() { 
        scroll_pos = $(this).scrollTop();
        if(scroll_pos > 810) {
        	$("header").css('background-color', '#0c0c0c');
        } 
        else{
        	$("header").css('background-color', 'rgba(255,255,255,0.3)');
        }
    });
};

//Elements from the DOM setup 
MN.elementsSetup = function(){
  	this.$lis = $("li");
  	//asign accessToken 
  	this.accessToken = "BQB9WShB4Wjr90_6QHUTlLOyAQo6mjMv0oqdYWa1juEQBzeQem1EFLXlGwj_YPvrqL-rARNWnAtu56YP0mJe74cPLyX_fzR4UkzGyWwS4wxNFRvW0iIFgrdKle9uCdyFOMFwhvFeii1NjAc5L8g9ALnquznnMA";

};

//When the page changes 
MN.changePage = function(page) {
	
	//get new page div
	var page = "#"+page+"_page";

	if(page == "#album_page"){
		this.getApi();
	};


	var $newpg = $(page);	
	$($newpg).show();
	$($newpg).siblings().hide();
};


MN.addEventListener = function(){
	//when an li is clicked get the attribute and send it to changePage
	$('li').on("click", function(li) {
   		var $id = $(this).attr('id');
		MN.changePage($id);
    });

    $('#searchBtn').on("click", function(li) {
   		var $id = $(this).attr('id');
   		var $value = $('#searchBox').val();
		MN.searchAlbum($value);
    });

};
	



MN.getApi= function(){
	    
	//use AJAX to get the API
	$.ajax({
	   url: "https://api.spotify.com/v1/artists/3CGzpCMqpqHnafmn2PFQd9/albums",
	   headers: {
	       'Authorization': 'Bearer ' + this.accessToken
	   },
	   success: function(result) {
	   		//loop through each object and save the variables
	   		$.each(result.items, function(i,item){
                var artistReturnedResult = result.items;
                var avalibleMarket = result.items[i].available_markets;
                if( avalibleMarket.indexOf('GB') > -1 ){
	                var name = "<h3>Name:</h3> " + result.items[i].name;
	                var link = "<h3>Spotify Listen:</h3> <form action='" + result.items[i].external_urls.spotify+ "'><input type='submit' value='View Album'/></form>";
	                var img = "<img src="+result.items[i].images[1].url+" height="+result.items[i].images[1].height+" width="+result.items[i].images[1].width+">"
	               	var nameCol = name + "<br/>" + link + "<br/><br/>"+ img+ "<br/><br/><br/><br/><hr>";
	               	//append to the artist info div
					$(".artistInfo").append(nameCol); 
				};
           });
	   }
	});
};


MN.searchAlbum= function(searchVal){
	
	var searchItm = searchVal;
	//use AJAX to get the API
	$.ajax({
	   url: "https://api.spotify.com/v1/search?q=album:"+searchItm+"%20artist:charlie%20simpson&type=album",
	   headers: {
	       'Authorization': 'Bearer ' + this.accessToken
	   },
	   success: function(result) {
		   	console.log(result);
	        var artistReturnedResult = result.items;
	        var name = "<h3>Name:</h3> " + result.albums.items[0].name;
	         var link = "<h3>Spotify Listen:</h3> <form action='" + result.albums.items[0].external_urls.spotify+ "'><input type='submit' value='View Album'/></form>";
	        var img = "<img src="+result.albums.items[0].images[1].url+" height="+result.albums.items[0].images[1].height+" width="+result.albums.items[0].images[1].width+">"
	       	var nameCol = name + "<br/>" + link + "<br/><br/>"+ img+ "<br/><br/><br/><br/>";
	       	//append to the artist info div
	       	console.log(nameCol);
			$(".albumSearch").append(nameCol); 
	   }
	});
};


