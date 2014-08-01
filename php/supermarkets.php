<?php

   session_start();
  
   $user_id=$_SESSION['user'];
   $user_location=$_SESSION['location'];

   $supermarkets=array();
   include('db_connect.php');
   
   $sql = "select * from delivery_supermarkets where location='$user_location'"; 
	   
   $result= sqlQuery($sql);
	   
   while($row = mysql_fetch_array($result))
   {
     $supermarkets[] = array('name' => $row['name'],'address' => $row['address'], 'tel' => $row['tel']);   
   }
   $output=$supermarkets;
	  
    
   mysql_close($server); 
   echo json_encode($output);

?>