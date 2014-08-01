<?php

  session_start();
  
  parse_str($_POST['formData'], $formData);

  $email = $formData['email'];
  $password = $formData['password'];
  $password = password_hash($password, PASSWORD_DEFAULT);
   //$file = 'log.txt'; 
   //file_put_contents($file,$email);


  include('db_connect.php');
  
  $sql = "select * from user where email='$email'"; 
		
  $result= sqlQuery($sql);
  $NumRows = mysql_num_rows($result);
		  
  if($NumRows==0)
  {	
		$sql="insert into user (email,password) values ('$email','$password')";
		$result= sqlQuery($sql);
		
		$_SESSION['user']=autoIncrementValue('user');
		$output = array('status' => true, 'message' => 'Welcome user!');
	      
  }
  else if($NumRows!=0)
  {
	   $output = array('status' => false, 'message' => 'To email afto anikei se allon xrhsth'); 
			 
  }
  mysql_close($server); 
 
  echo json_encode($output);
?>