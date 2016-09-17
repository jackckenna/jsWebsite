var MN = MN || {};

window.addEventListener("load", function(){ 
  MN.init();

});

//var clicked = false;

MN.init = function(){
	this.domElementsSetup();
	this.addEventListener();
}


MN.domElementsSetup = function(){
	this.home = document.getElementById("home_page");
  	this.lis = Array.from(document.getElementsByTagName("li"));

};

MN.changePage = function(page) {
	
	var page = page+"_page";

	if(page == "album_page"){
		this.getApi();
	}

	var newpg = document.getElementById(page);
	console.log(newpg);
	$(newpg).show();
	$(newpg).siblings().hide();
}


MN.addEventListener = function(){
	//this.li.removeEventListener("click", function(){}.bind(this));
	this.lis.forEach(function(li) {
		li.addEventListener("click", function(){
			var id = li.getAttribute("id");
			console.log(id);
			this.changePage(id);
		}.bind(this));
	}.bind(this));

	

}

MN.getApi= function(){

	var accessToken = "e0213fed63364b669aba9116bb89d9d5";
	$.ajax({
	   url: "https://api.spotify.com/v1/artists/3CGzpCMqpqHnafmn2PFQd9/albums",
	   headers: {
	       'Authorization': 'Bearer ' + accessToken
	   },
	   success: function(result) {
	       $.each(result.items, function(i,item){
                var artistReturnedResult = result.items;
                var avalibleMarket = result.items[i].available_markets;
                if( avalibleMarket.indexOf('GB') > -1 ){
	                var name = "<h4>Name:</h4> " + result.items[i].name;
	                var link = "<h4>Spotify Listen:</h4> " + result.items[i].external_urls.spotify;
	                var img = "<img src="+result.items[i].images[1].url+" height="+result.items[i].images[1].height+" width="+result.items[i].images[1].width+">"
	               	var nameCol = name + "<br/>" + link + "<br/><br/>"+ img+ "<br/><br/><br/><br/>";
					$(".artistInfo").append(nameCol); 
				}
           })
	   }
	});

}

