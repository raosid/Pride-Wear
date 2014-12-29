<?php
	/*
		Author: Siddharth Rao
		Email: sidrao@uw.edu
	*/

	//Making sure no illegal access to submit.php
	if(isset($_POST["name"]) && isset($_POST["address"]) && isset($_POST["email"])
		&& isset($_POST["phone"]) && isset($_POST["quantity"]) && isset($_POST["imagename"])
		&& isset($_POST["price"])) {

		//Saving all the parameters in variables.
		$name = $_POST["name"];
		$address = $_POST["address"];
		$email = $_POST["email"];
		$phone = $_POST["phone"];
		$quantity = $_POST["quantity"];
		$imagesrc = $_POST["imagename"];
		$price = $_POST["price"];
	} else { //invalid access to the page
		header("Location: index.php");
		die();
	}
	
	include("common.php");
	//Getting the Order Number
	$orderfile = "orderNumber.txt";
	$orderfile_contents = file_get_contents("$orderfile");
	
	$orderNumber = "OD" . $orderfile_contents;

	//Incrementing the order Number and saving it
	$orderfile_contents = (int)$orderfile_contents + 1;
	
	file_put_contents($orderfile, $orderfile_contents);


	//Saving the order
	$filename = "orders.txt";
	$filetext = file_get_contents($filename);
	$filetext .= "\nOrder Number: " . $orderNumber . 
				"\nName: " . $name . "\nAddress: " . 
				$address . "\nEmail: " . $email . 
				"\nPhone: " . $phone . "\nQuantity: " . 
				$quantity . "\nImage Name: " . $imagesrc . "\n\n\n\n";


	file_put_contents($filename, $filetext);


	?>

	<div id="finalmessage" class="alert alert-success" role="alert">
        <strong>Congratulations <?=$name?>!</strong> You have successfully ordered a cool 
        product from Pride Wear. Your order number is <strong><?=$orderNumber?></strong>.
        Save this number for future reference. Hope you enjoyed shopping with us.
	</div>
	<a id="goHomeButton" href="index.php" class="btn btn-primary">Continue shopping with Pride Wear</a>
	
	<?php
?>