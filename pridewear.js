/*
	Siddharth Rao
	sidrao@uw.edu
	Date: 24th July 2014
	File: pridewear.js
*/

(function() {

	var URL = "images.txt";
	var searchQuery = "";
	var totalCount = 0;
	var ajaxText;

	window.onload = function() {
		$("search").onclick = searchClicked;
		$("back").onclick = backToSearch;
		$("buyform").onsubmit = validateForm;
	}

	/*
		Called when the search button is clicked.
		Checks if the user has typed anything in the search box
		if yes, searches for images in the database for the
		query. If no, gives a message to the user about his/her
		error.
	*/
	function searchClicked() {
		totalCount = 0;
		$("searchresults").innerHTML = "";
		$("notification").innerHTML = "";
		searchQuery = $("inputbox").value;
		var proceed = false;
		if (searchQuery) {
			proceed = true;
		}
		searchQuery = searchQuery.trim();
		searchQuery = searchQuery.split(" ");
		if (proceed) {
			makeAjaxRequest();
		} else {
			$("notification").innerHTML = "Please enter a search query";
		}
	}

	
	//Makes an ajax request.
	function makeAjaxRequest() {
		ajaxText = new XMLHttpRequest();
		ajaxText.onreadystatechange = function () {
			if (ajaxText.readyState == 4) {
				if (ajaxText.status == 200) {
					ajaxCompleted(ajaxText);
				} else {
					console.log("Error: " + ajaxText.status + " " + ajaxText.statusText);
				}
			}
		};
		ajaxText.open("GET", URL, true);
		ajaxText.send(null);
	}

	//Returns the response text from the text file on the server.
	function ajaxCompleted(ajaxText) {
		var lines = ajaxText.responseText.split("\n");
		var imageMatched = false;
		for(var i = 0; i < lines.length; i++) {
			//Looping through all the words in the search query
			for (var j = 0; j < searchQuery.length; j++) {
				if (lines[i].toLowerCase().indexOf(searchQuery[j].toLowerCase()) > -1) {
					imageMatched = true; //If any of the words are in the filename
				}
			}
			
			if (imageMatched) {
				totalCount++; //Counting the number of results found.
				
				//Exploding the string containing the filename 
				//and the price of the product
				var nameAndPrice = lines[i].split("|");
				var imageName = nameAndPrice[0];
				var price = nameAndPrice[1];

				//Making the container div
				var container = document.createElement("div");
				container.className = "imagecontainer";
				$("searchresults").appendChild(container);
				
				//The image itself
				var img = new Image();
				img.src = "images/" + imageName;
				img.onclick = imageClicked;
				img.className = "imageresult img-thumbnail";
				container.appendChild(img);

				//PriceTag
				var priceTag = document.createElement("p");
				priceTag.className = "price";
				priceTag.className = priceTag.className + " lead";
				priceTag.innerHTML = price;
				container.appendChild(priceTag);
			}
		}
		if (totalCount == 0) { //No results found
			$("notification").innerHTML = "Sorry, but we could not find any items for the above search query";
		}
	}

	//Called when any of the images is clicked
	//User may be buying a product at this time.
	function imageClicked() {
		var image = this;
		image.className = "picture img-thumbnail";
		//Taking the image name and price and
		//putting the values in hidden parameters.
		//This has to be done before we make the divs 
		//invisible
		console.log(image.parentNode);
		console.log(image.nextSibling.innerHTML);
		console.log(image.src);
		$("hiddenprice").value = image.nextSibling.innerHTML;
		$("hiddenname").value = image.src;
		makeDivsInvisible();
		console.log(image.src);
		$("pictureBox").appendChild(image);
	}
	
	/*
		Makes the divs in the search page invisible.
		Called when the user is about to make a purchase.
	*/
	function makeDivsInvisible() {
		$("searchBox").style.display = "none";
		$("searchresults").style.display = "none";
		$("backbutton").style.display = "block";
		$("userBuyForm").style.display = "block";
		$("form").style.display = "block";
	}
	
	/*
		Goes back to the search area.
		Makes the unnecessary divs invisible
		and the necessary visible.
	*/
	function backToSearch() {
		console.log("in back");
		$("searchBox").style.display = "block";
		$("searchresults").innerHTML = "";
		ajaxCompleted(ajaxText);
		$("searchresults").style.display = "block";
		$("backbutton").style.display = "none";
		$("pictureBox").innerHTML = "";
		$("userBuyForm").style.display = "none";
		$("errormessage").innerHTML = "";
		$("errormessage").style.display = "none";
		$("hiddenprice").value = "";
		$("hiddenname").value = "";
	}


	/*
		Validates the form data dynamilcally before the
		user submits the form. Saves time because the
		user is notified about the errors before he/she
		can actually submit the form.
	*/
	function validateForm() {
		console.log("in validate form");
		var result = "Errors:";
		var name = document.forms["buy"]["name"].value;
		if(!(name.match(/(^[a-zA-Z]+ [a-zA-Z]+$)+$/))) {
			result += "<br />Please enter your first name followed by your last name with a space in between";
		}


		var address = document.forms["buy"]["address"].value;
		if(address == "") {
			result += "<br />Please enter your Address";
		}


		var email = document.forms["buy"]["email"].value;
		if(!(email.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/))) {
			result += "<br />Please enter a valid Email Address."
			
		}

		var phone = document.forms["buy"]["phone"].value;
		if(!(phone.length < 10)) {
			result += "<br />Please enter a valid phone number."
			
		}
		
		var quantity = document.forms["buy"]["quantity"].value;
		if(!(quantity.match(/^[1-9][0-9]*$/))) {
			result += "<br />Please enter a valid quantity [1-49]."
		}


		if (result != "Errors:") {
			$("errormessage").style.display = "block";
			$("errormessage").innerHTML = result;
			return false;
		} else {
			return true;
		}
	}

	/*
	Returns the DOM object of the element passed
	in as a parameter.
	*/
	function $(id) {
		return document.getElementById(id);
	}
})();