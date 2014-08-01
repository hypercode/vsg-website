<?php

  session_start();
  include('db_connect.php');
  parse_str($_POST['formData'], $formData);
  
  $user_id = $_SESSION['user'];
  $subject = $formData['subject'];
  $comment = $formData['comment'];
  
   $sql = "select * from user where id='$user_id'";   
   $result= sqlQuery($sql);
   if($row = mysql_fetch_array($result))
   {
	   $user_email=$row['email'];
	   $user_name=$row['name'];
	   $user_location=$row['location'];
	   
	   $to = "feedback@vsg.gr";
	   $message = $comment."\r\n\r\n".$user_name."(".$user_location.")";
	   $headers="From: ".$user_email;
	  
	   if(mail($to,$subject,$message,$headers))
         $output = array('status' => true);
	   else
	     $output = array('status' => false);
   }
   else
     $output = array('status' => false);
  
  
    echo json_encode($output);
  
?>