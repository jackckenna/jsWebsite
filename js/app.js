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

};
	



MN.getApi= function(){

	//asign accessToken 
	var accessToken = "e0213fed63364b669aba9116bb89d9d5";
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

