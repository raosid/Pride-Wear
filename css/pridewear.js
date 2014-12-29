(function() {

	var URL = "images.txt";
	var searchQuery = "";
	
	window.onload = function() {
		$("searchbutton").onclick = searchClicked;
	}

	
	function searchClicked() {
		searchQuery = $("inputbox").value;
		if (searchQuery) {
			makeAjaxRequest();
		} else { //user did not type anything
			//do nothing for now.
		}
	}

	
	//Makes an ajax request.
	function makeAjaxRequest() {
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function () {
			if (ajax.readyState == 4) {
				if (ajax.status == 200) {
					ajaxCompleted(ajax);
				} else {
					console.log("Error: " + ajax.status + " " + ajax.statusText);
				}
			}
		};
		ajax.open("GET", URL, true);
		ajax.send(null);
	}

	//returns the response text from the text file on the server.
	function ajaxCompleted(ajax) {
		var lines = ajax.responseText.split("\n");
		console.log(lines);
		for(var i = 0; i < 2; i++) {
			if (lines[i].indexOf(searchQuery) > -1) {
				console.log("in true");
				//Making the container div
				var container = document.createElement("div");
				container.className = "imagecontainer";
				$("searchresults").appendChild(container);
				//The image itself
				/*var img = new Image();
				img.onload = function () {
					container.appendChild(img);
				}
				img.src = "images/" + lines[i];
				console.log("images/" + lines[i]);*/
			} else {
				console.log("in false");
			}
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
