<?php
  session_start();
  $user_id=$_SESSION['user'];
  $action=$_POST['action'];
  include('db_connect.php');
  
  if($action == 'save_schedule')
  {
	   parse_str($_POST['formData'], $formData);
	   $message = $formData['schedule_message'];
	   $time = $formData['schedule_time'];
	   $date = $formData['schedule_date'];
	   $type = $formData['schedule_type'];
	   
	   if($type == 'daily')
	      $date = NULL;
		
		
		$sql = "insert into schedules (message,time,date,user_id) values ('$message','$time','$date','$user_id')";
	    $result= sqlQuery($sql);
		
		if($result)
		  $output = array('status' => true , 'message' => 'data saved');
		else
		  $output = array('status' => false , 'message' => 'data not saved');
  }
  else if($action == 'load_schedules')
  {
	  $schedules=array();
	  
	  $sql = "select id,message,TIME_FORMAT(`time`, '%H:%i') as time,date from schedules where user_id='$user_id' order by date,time";   
	  $result= sqlQuery($sql);
		  
	   while($row = mysql_fetch_array($result))
	   {
		   $schedules[] = array('id' => $row['id'],'message' => $row['message'], 'time' => $row['time'], 'date' => $row['date']);
		   
	   }
	   $output=$schedules;
  }
  else if($action == 'delete_schedule')
  {
	  $id = $_POST['id'];
	  
	  $sql = "delete from schedules where id='$id' and user_id='$user_id'";
	  $result= sqlQuery($sql);
	  
	  if($result)
	    $output = array('status' => true );
	  else
	    $output = array('status' => false );
	  
  }
  
  mysql_close($server); 
  echo json_encode($output);
?>