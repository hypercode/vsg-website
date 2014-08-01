<?php

   session_start();
  
   $user_id=$_SESSION['user'];
   $user_location=$_SESSION['location'];
   $user_location =  explode(",",$user_location);
   $user_location = $user_location[0];
   
   $action=$_POST['action'];
   
   $taxis=array();
   
   include('db_connect.php');
   
   if($action == 'get_city_taxis')
       $sql = "select * from white_taxi where location='$user_location'"; 
   else if($action == 'get_greece_taxis')
       $sql = "select * from white_taxi where location!='$user_location'"; 
   
   
   $result= sqlQuery($sql);
	   
   while($row = mysql_fetch_array($result))
   {
     $taxis[] = array('id' => $row['id'] ,'owner' => $row['owner'],'location' => $row['location'], 'tel' => $row['tel'],
	                   'url' => $row['url'],  'email' => $row['email']);   
   }
   $output=$taxis;
	  
    
   mysql_close($server); 
   echo json_encode($output);

?>