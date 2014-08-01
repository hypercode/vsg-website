<?php

  session_start();
  
  parse_str($_POST['formData'], $formData);

  $email = $formData['email'];
  $password = $formData['password'];
   
   //$file = 'log.txt'; 
   //file_put_contents($file,$email);
  

  include('db_connect.php');
  
  $sql = "select * from user where email='$email'"; 
		
  $result= sqlQuery($sql);
  $NumRows = mysql_num_rows($result);
		  
  if($NumRows!=0)
  {	
		$row = mysql_fetch_array($result);
		
		$_SESSION['user']=$row["id"];
		$_SESSION['location']=$row["location"];
		$hash=$row["password"]; 
		
		$password_is_correct = password_verify($password,$hash);
		
		if($password_is_correct)
		    $output = array('status' => true, 'location' => $row["location"],'message' => 'Welcome user!');
		else
		    $output = array('status' => false, 'message' => 'Login denied'); 
	      
  }
  else
  {
	   $output = array('status' => false, 'message' => 'Login denied'); 
			 
  }
  mysql_close($server); 
 
  echo json_encode($output);
  
?>