<?php
	/*
		Author: Siddharth Rao
		sidrao@uw.edu
	*/
	include("common.php");
?>
		<div id="searchBox">
			<input id="inputbox" type="text" class="form-control" placeholder="Search by school or college">
			<button type="submit" id="search" type="button" class="btn btn-primary">Search</button>
		</div>

		<div id="notification" class="lead">
		</div>

		<div id="searchresults">
	    </div>

	    <div id="backbutton">
	    	<button id="back" type="button" class="btn btn-default">&lt; Back</button>
	    </div>

	    <div id="userBuyForm">
	    	<div id="pictureBox">
	    	</div>
	    	<div id="form">
	    		<h1 class="lead" id="heading">Order here and pay at your doorstep.</h1>

				<form id="buyform" name="buy" class="form-horizontal" role="form" action="submit.php" method="post">
					<div class="form-group">
					    <label for="formname" class="col-sm-2 control-label">Name</label>
					    <div class="col-sm-6">
					      <input type="text" name="name" class="form-control" id="formname" placeholder="Enter your full name">
					    </div>
 					</div>
					<div class="form-group">
					    <label for="formaddress" class="col-sm-2 control-label">Address</label>
					    <div class="col-sm-6">
					      <input type="text" name="address" class="form-control" id="formaddress" placeholder="Address">
					    </div>
 					</div>
 					<div class="form-group">
					    <label for="formemail" class="col-sm-2 control-label">Email</label>
					    <div class="col-sm-6">
					      <input type="email" name="email" class="form-control" id="formemail" placeholder="Email">
					    </div>
 					</div>
 					<div class="form-group">
					    <label for="formphone" class="col-sm-2 control-label">Phone Number</label>
					    <div class="col-sm-4">
					      <input type="text" name="phone" class="form-control" id="formphone" maxlength="10" placeholder="Phone Number">
					    </div>
 					</div>
 					<div class="form-group">
					    <label for="formquantity" class="col-sm-2 control-label">Quantity</label>
					    <div class="col-sm-2">
					      <input type="text" name="quantity" class="form-control" id="formquantity" maxlength="2">
					    </div>
 					</div>
 					<input id="hiddenname" type="hidden" name="imagename">
 					<input id="hiddenprice" type="hidden" name="price">
 					<button id ="orderbutton" type="submit" class="btn btn-success">Order now</button>
 				</form>
	    	</div>
	    </div>
	    <div id="errormessage" class="alert alert-danger" role="alert">
	    </div>
	</body>
</html>
