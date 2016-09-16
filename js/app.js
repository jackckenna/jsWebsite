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

	var newpg = document.getElementById(page);

    if (newpg.style.visibility === 'hidden') {
        newpg.style.visibility = 'visible';
    } else {
        newpg.style.visibility = 'hidden';
    }
    
}


MN.addEventListener = function(){
	//this.li.removeEventListener("click", function(){}.bind(this));
	this.lis.forEach(function(li) {
		li.addEventListener("click", function(){
			var id = li.getAttribute("id");
			//clicked ? clicked = true : clicked = false;
			console.log(id);
			this.changePage(id);
		}.bind(this));
	}.bind(this));

}