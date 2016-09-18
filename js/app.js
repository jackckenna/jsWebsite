//Set the object 
var MN = MN || {};

//On load start initialize
$(function() {  
	MN.init();
});


//Initialize startup functions
MN.init = function(){
	this.domElementsSetup();
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
MN.domElementsSetup = function(){
  	this.$lis = $("li");

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

	//asign accessToken 
	var accessToken = "BQACdnnoo-eyhFQOgYaQdi4sEKOu7gAqV-DgjUpYXjF0S_M_HL_0m-QQKmVnx5pcAf5IPg98fXhO2v_WiGNN9u50TLwp7tLjxpOACYmhJTb4NIzS9GTXvNm8gZPcfzpH3Wzy9luuxJnQV5Y7-lPuwoZnWsmhrw";
	//use AJAX to get the API
	$.ajax({
	   url: "https://api.spotify.com/v1/artists/3CGzpCMqpqHnafmn2PFQd9/albums",
	   headers: {
	       'Authorization': 'Bearer ' + accessToken
	   },
	   success: function(result) {
	   		//loop through each object and save the variables
	   		$.each(result.items, function(i,item){
                var artistReturnedResult = result.items;
                var avalibleMarket = result.items[i].available_markets;
                if( avalibleMarket.indexOf('GB') > -1 ){
	                var name = "<h3>Name:</h3> " + result.items[i].name;
	                var link = "<h3>Spotify Listen:</h3> " + result.items[i].external_urls.spotify;
	                var img = "<img src="+result.items[i].images[1].url+" height="+result.items[i].images[1].height+" width="+result.items[i].images[1].width+">"
	               	var nameCol = name + "<br/>" + link + "<br/><br/>"+ img+ "<br/><br/><br/><br/>";
	               	//append to the artist info div
					$(".artistInfo").append(nameCol); 
				};
           });
	   }
	});
};

MN.searchAlbum= function(searchVal){

	//https://api.spotify.com/v1/search?q=album:little%20hands%20artist:charlie%20simpson&type=album
	
	var searchItm = searchVal;

	//asign accessToken 
	var accessToken = "d5c387cd05064605a5447afa82921b68";
	//use AJAX to get the API
	$.ajax({
	   url: "https://api.spotify.com/v1/search?q=album:"+searchItm+"%20artist:charlie%20simpson&type=album",
	   headers: {
	       'Authorization': 'Bearer ' + accessToken
	   },
	   success: function(result) {
	   	console.log(result);

                var artistReturnedResult = result.items;
                var name = "<h3>Name:</h3> " + result.albums.items[0].name;
                var link = "<h3>Spotify Listen:</h3> " + result.albums.items[0].external_urls.spotify;
                var img = "<img src="+result.albums.items[0].images[1].url+" height="+result.albums.items[0].images[1].height+" width="+result.albums.items[0].images[1].width+">"
               	var nameCol = name + "<br/>" + link + "<br/><br/>"+ img+ "<br/><br/><br/><br/>";
               	//append to the artist info div
               	
               	console.log(nameCol);
				$(".albumSearch").append(nameCol); 

	   }
	});
};


